import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fixture, cleanup, article, approve, put } from './helpers.mjs';
import { eligibility, readPosts, inspectPublication, assertPublication, assertUniqueRoutes } from '../../src/lib/content/publication.mjs';
import { blogSchema } from '../../src/lib/content/schema.mjs';

const now = new Date('2026-11-03T00:00:00Z');
function scenario(name, run) {
  test(name, () => { const root = fixture(); try { run(root); } finally { cleanup(root); } });
}

scenario('only an approved published package is eligible', root => {
  const post = article(root, 'valid'); approve(root, post);
  assert.deepEqual(eligibility(root, post, now), { eligible: true, errors: [] });
});

for (const status of ['draft', 'in_review', 'approved']) {
  scenario(`${status} is excluded even with an approval`, root => {
    const post = article(root, 'unpublished', { status }); approve(root, post);
    assert.equal(eligibility(root, post, now).eligible, false);
    assert.equal(inspectPublication(root).published.length, 0);
  });
}

scenario('missing status defaults to draft and unknown metadata is rejected', root => {
  put(root, 'src/content/blog/new-draft.md', '---\ntitle: Draft\ndescription: Description\npubDate: 2026-01-01\n---\nDraft body');
  assert.equal(readPosts(root)[0].data.status, 'draft');
  assert.throws(() => blogSchema.parse({ title: 'T', description: 'D', pubDate: '2026-01-01', slug: '../evil' }));
});

scenario('published without approval fails closed', root => {
  article(root, 'no-approval');
  assert.throws(() => assertPublication(root), /invalid approval package/);
});

scenario('future published date fails even with matching approval', root => {
  const post = article(root, 'future', { pubDate: '2099-01-01' }); approve(root, post);
  assert.match(eligibility(root, post, now).errors.join(), /future/);
});

scenario('incomplete review and empty body fail', root => {
  const post = article(root, 'incomplete', { review: { evidence: 'pending', disclosure: 'pending' } }, '');
  approve(root, post);
  assert.match(eligibility(root, post, now).errors.join(), /body is empty/);
  assert.match(eligibility(root, post, now).errors.join(), /incomplete/);
});

for (const change of ['body', 'metadata', 'evidence', 'asset', 'template']) {
  scenario(`${change} change invalidates the approval digest`, root => {
    put(root, 'public/images/example.webp', 'original image bytes');
    const post = article(root, 'reviewed', {}, 'Article with ![Example](/images/example.webp).');
    approve(root, post, ['public/images/example.webp']);
    if (change === 'body') fs.appendFileSync(post.file, '\nAn additional claim.');
    if (change === 'metadata') fs.writeFileSync(post.file, post.raw.toString().replace('Fixture reviewed', 'Changed title'));
    if (change === 'evidence') fs.appendFileSync(path.join(root, 'content-engine/evidence/reviewed.json'), ' ');
    if (change === 'asset') put(root, 'public/images/example.webp', 'changed image bytes');
    if (change === 'template') put(root, 'src/pages/blog/[slug].astro', 'changed template');
    assert.match(eligibility(root, readPosts(root)[0], now).errors.join(), /digest is stale/);
  });
}

scenario('mismatched route, incomplete attestation and future approval fail', root => {
  const post = article(root, 'reviewed'); approve(root, post);
  const file = path.join(root, 'content-engine/approvals/reviewed.json');
  const original = JSON.parse(fs.readFileSync(file, 'utf8'));
  put(root, 'content-engine/approvals/reviewed.json', JSON.stringify({ ...original, route: '/wrong/' }));
  assert.match(eligibility(root, post, now).errors.join(), /route mismatch/);
  put(root, 'content-engine/approvals/reviewed.json', JSON.stringify({ ...original, approvedAt: '2099-01-01T00:00:00Z' }));
  assert.match(eligibility(root, post, now).errors.join(), /future/);
  put(root, 'content-engine/approvals/reviewed.json', JSON.stringify({ ...original, checks: { ...original.checks, disclosure: false } }));
  assert.match(eligibility(root, post, now).errors.join(), /invalid approval/);
});

scenario('undeclared images and private asset paths fail', root => {
  const post = article(root, 'image', {}, '<img src="/images/missing.webp" alt="Example">');
  assert.throws(() => approve(root, post), /Image missing/);
  assert.throws(() => approve(root, article(root, 'private'), ['../secret.txt']), /Invalid review asset/);
});

scenario('legacy files remain held; removing one cannot silently remove its URL', root => {
  put(root, 'content-engine/route-baseline.json', JSON.stringify({ blogRoutes: ['/blog/legacy/'], pageRoutes: ['/blog/legacy/'] }));
  article(root, 'legacy', { status: 'draft' });
  assert.throws(() => assertPublication(root), /Legacy release hold/);
  fs.unlinkSync(path.join(root, 'src/content/blog/legacy.md'));
  assert.throws(() => assertPublication(root), /missing file/);
});

scenario('static blog route collision is rejected', root => {
  article(root, 'collision', { status: 'draft' });
  put(root, 'src/pages/blog/collision.astro', 'collision');
  assert.throws(() => inspectPublication(root), /Route collision/);
});

scenario('stale approvals on non-published content and orphan records fail validation', root => {
  const post = article(root, 'reviewed-draft', { status: 'draft' }); approve(root, post);
  fs.appendFileSync(post.file, '\nChanged draft.');
  assert.throws(() => assertPublication(root), /digest is stale/);
  put(root, 'content-engine/approvals/unknown.json', '{}');
  assert.match(inspectPublication(root).errors.join(), /Orphan approval/);
});

scenario('manual copies of generated public exports are rejected', root => {
  put(root, 'public/llms.txt', 'Uncontrolled article list');
  assert.throws(() => assertPublication(root), /Generated artifact/);
});

test('Cloudflare HTML route aliases collide', () => {
  assert.throws(() => assertUniqueRoutes(['/privacy-policy/', '/privacy-policy.html']), /Route collision/);
  assert.throws(() => assertUniqueRoutes(['/blog/', '/blog/index.html']), /Route collision/);
});

scenario('invalid filenames cannot be normalized silently by Astro', root => {
  put(root, 'src/content/blog/Invalid_Slug.md', '---\ntitle: T\n---');
  assert.throws(() => readPosts(root), /Invalid blog filename/);
});

test('the baseline reserves all nine real legacy article URLs', () => {
  const root = process.cwd();
  const baseline = JSON.parse(fs.readFileSync(path.join(root, 'content-engine/route-baseline.json'), 'utf8'));
  assert.equal(baseline.blogRoutes.length, 9);
  const ids = new Set(readPosts(root).map(post => post.id));
  for (const route of baseline.blogRoutes) assert.ok(ids.has(route.split('/')[2]), route);
});
