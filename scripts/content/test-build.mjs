import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { fixture, cleanup, article, approve } from '../../tests/content/helpers.mjs';
import { readPosts } from '../../src/lib/content/publication.mjs';
import { checkArtifacts } from './artifacts.mjs';
import { testPages } from './test-pages.mjs';

const source = process.cwd();
const root = fixture();
const results = [];
const output = path.join(source, 'output/content-engine-tests');
fs.mkdirSync(output, { recursive: true });
const astro = fileURLToPath(new URL('../../node_modules/astro/bin/astro.mjs', import.meta.url));

function build(label, expectedError) {
  const result = spawnSync(process.execPath, [astro, 'build'], { cwd: root, encoding: 'utf8', timeout: 240000,
    env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1', WRANGLER_SEND_METRICS: 'false' } });
  const log = (result.stdout ?? '') + (result.stderr ?? '') + (result.error?.message ?? '');
  fs.writeFileSync(path.join(output, `${label}.log`), log);
  if (expectedError) {
    assert.notEqual(result.status, 0, label);
    assert.match(log, expectedError, label);
  } else {
    assert.equal(result.status, 0, `${label}: ${log.slice(-5000)}`);
  }
  results.push(label);
  console.log(`PASS ${label}`);
}

try {
  for (const folder of ['src', 'components', 'assets', 'public', 'content-engine', 'scripts', 'functions']) {
    fs.cpSync(path.join(source, folder), path.join(root, folder), { recursive: true });
  }
  for (const file of ['constants.tsx', 'types.ts', 'index.css', 'package.json', 'astro.config.mjs', 'tsconfig.json', 'tailwind.config.mjs', 'postcss.config.mjs']) {
    fs.copyFileSync(path.join(source, file), path.join(root, file));
  }
  fs.symlinkSync(path.join(source, 'node_modules'), path.join(root, 'node_modules'), 'junction');
  build('legacy-release-hold', /Legacy release hold/);

  // Fixture approvals exist only in this temporary copy and are removed in finally.
  for (const post of readPosts(root)) {
    const raw = post.raw.toString('utf8').replace(/^---\r?\n/, '---\nstatus: published\nauthorId: fixture-author\nreview: { evidence: verified, disclosure: cleared }\n');
    fs.writeFileSync(post.file, raw);
  }
  for (const post of readPosts(root)) {
    const assets = post.body.includes('/images/blog/tiktok-shopee-channel-roles.webp') ? ['public/images/blog/tiktok-shopee-channel-roles.webp'] : [];
    approve(root, post, assets);
  }
  for (const status of ['draft', 'in_review', 'approved']) {
    article(root, `sentinel-${status.replace('_', '-')}`, { status }, `UNPUBLISHED_SENTINEL_${status}_PRIVATE_BODY`);
  }
  article(root, 'sentinel-future-draft', { status: 'draft', pubDate: '2099-01-01' }, 'FUTURE_DRAFT_PRIVATE_SENTINEL');
  build('approved-fixture-build');
  checkArtifacts(root, path.join(root, 'dist'));
  const pages = JSON.parse(fs.readFileSync(path.join(root, 'content-engine/route-baseline.json'), 'utf8')).pageRoutes;
  for (const route of pages) {
    const file = path.join(root, 'dist', route, 'index.html');
    assert.ok(fs.existsSync(file), route);
  }
  for (const file of ['index.html', 'blog/index.html', 'services/index.html']) {
    const html = fs.readFileSync(path.join(root, 'dist', file), 'utf8');
    assert.match(html, /https:\/\/wa\.me\/60147533499/);
    assert.match(html, /\/api\/track/);
  }
  const js = fs.readdirSync(path.join(root, 'dist/assets')).filter(file => file.endsWith('.js'))
    .map(file => fs.readFileSync(path.join(root, 'dist/assets', file), 'utf8')).join('\n');
  assert.match(js, /https:\/\/invoice\.haikaitech\.my\/api\/subscribe/);
  results.push('42-baseline-urls-canonicals-sitemap-exclusions-conversions');
  console.log('PASS 42 baseline URLs, canonicals, sitemap, exclusions and conversion references');
  const http = await testPages(root, fileURLToPath(new URL('../../node_modules/wrangler/bin/wrangler.js', import.meta.url)), pages,
    path.join(output, 'pages-runtime.log'));
  results.push(http);
  console.log(`PASS Pages HTTP: old catch-all 200, replacement 404, all ${http.baselineRoutes200} baseline routes 200`);

  const post = readPosts(root).find(post => post.data.status === 'published');
  fs.appendFileSync(post.file, '\nStale approval fixture mutation.');
  build('stale-digest-rejected', /digest is stale/);
  fs.writeFileSync(post.file, post.raw);
  const approvalFile = path.join(root, 'content-engine/approvals', `${post.id}.json`);
  const approval = fs.readFileSync(approvalFile);
  fs.unlinkSync(approvalFile);
  build('unapproved-published-rejected', /invalid approval package/);
  fs.writeFileSync(approvalFile, approval);
  const future = article(root, 'future-published', { pubDate: '2099-01-01' }); approve(root, future);
  build('future-published-rejected', /publication date is in the future/);
  fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify({ fixtureOnly: true, results }, null, 2));
} finally {
  // Remove the junction itself; never recurse into the shared dependency directory.
  const link = path.join(root, 'node_modules');
  if (fs.existsSync(link) && fs.lstatSync(link).isSymbolicLink()) fs.unlinkSync(link);
  cleanup(root);
}
