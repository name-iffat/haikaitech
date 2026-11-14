import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { parseFrontmatter } from 'astro/markdown';
import { approvalSchema, blogSchema, evidenceSchema } from './schema.mjs';

export const SITE = 'https://haikaitech.my';
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const blogRoute = id => `/blog/${id}/`;
export const hash = bytes => createHash('sha256').update(bytes).digest('hex');

export function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const filename = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Symlinks are not allowed in content inputs: ${filename}`);
    return entry.isDirectory() ? walk(filename) : [filename];
  }).sort();
}

export function readPosts(root) {
  return walk(path.join(root, 'src/content/blog')).filter(file => file.endsWith('.md')).map(file => {
    const id = path.basename(file, '.md');
    if (!slugPattern.test(id) || path.dirname(file) !== path.join(root, 'src/content/blog')) {
      throw new Error(`Invalid blog filename (flat lowercase slugs required): ${file}`);
    }
    const raw = fs.readFileSync(file);
    const parsed = parseFrontmatter(raw.toString('utf8'));
    return { id, file, raw, body: parsed.content, data: blogSchema.parse(parsed.frontmatter),
      hasStatus: Object.hasOwn(parsed.frontmatter, 'status') };
  });
}

export function staticRoutes(root) {
  const pages = path.join(root, 'src/pages');
  return walk(pages).filter(file => file.endsWith('.astro') && !file.includes('[')).map(file => {
    const relative = path.relative(pages, file).replaceAll('\\', '/').replace(/\.astro$/, '');
    return '/' + relative.replace(/(?:^|\/)index$/, '').replace(/^\//, '') + '/';
  }).map(route => route.replaceAll('//', '/'));
}

export function projectRoutes(root) {
  return [...fs.readFileSync(path.join(root, 'constants.tsx'), 'utf8').matchAll(/id: '([^']+)'/g)]
    .map(match => `/projects/${match[1]}/`);
}

export function assertUniqueRoutes(routes) {
  const seen = new Set();
  for (const route of routes) {
    // Cloudflare treats .html and trailing slash variants as the same HTML route.
    const key = decodeURIComponent(route).replace(/\/index\.html$/, '/').replace(/\.html$/, '/').replace(/\/$/, '').toLowerCase();
    if (seen.has(key)) throw new Error(`Route collision: ${route}`);
    seen.add(key);
  }
}

function readJSON(file) { return JSON.parse(fs.readFileSync(file, 'utf8')); }

export function legacyIds(root) {
  return new Set(readJSON(path.join(root, 'content-engine/route-baseline.json')).blogRoutes
    .map(route => route.split('/')[2]));
}

function safeAsset(root, asset) {
  if (!/^(public|src\/assets)\/[a-zA-Z0-9_./-]+$/.test(asset) || asset.split('/').includes('..')) {
    throw new Error(`Invalid review asset: ${asset}`);
  }
  const resolved = path.resolve(root, asset);
  if (!fs.statSync(resolved).isFile() || fs.realpathSync(resolved) !== resolved) {
    throw new Error(`Review asset must be a regular local file: ${asset}`);
  }
  return resolved;
}

export function packageDigest(root, post) {
  const evidenceFile = path.join(root, `content-engine/evidence/${post.id}.json`);
  const evidenceBytes = fs.readFileSync(evidenceFile);
  const evidence = evidenceSchema.parse(JSON.parse(evidenceBytes.toString('utf8')));
  if (evidence.contentId !== post.id) throw new Error('Evidence contentId mismatch');
  // Bind all literal image references; remote images cannot be content-addressed here.
  const imageRefs = [
    ...[...post.body.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)].map(match => match[1]),
    ...[...post.body.matchAll(/!\[[^\]]*\]\(([^\s)]+)(?:\s+[^)]*)?\)/g)].map(match => match[1]),
  ];
  for (const reference of imageRefs) {
    const asset = reference.startsWith('/') ? `public${reference}` : reference;
    if (!evidence.assets.includes(asset)) throw new Error(`Image missing from review assets: ${reference}`);
  }
  const inputs = [
    ['article.md', post.raw], ['evidence.json', evidenceBytes],
    ...[...new Set(evidence.assets)].sort().map(asset => [asset, fs.readFileSync(safeAsset(root, asset))]),
  ];
  // A template change requires re-review of its rendered content.
  for (const file of ['src/pages/blog/[slug].astro', 'src/layouts/BaseLayout.astro']) {
    inputs.push([file, fs.readFileSync(path.join(root, file))]);
  }
  return `sha256:${hash(JSON.stringify(inputs.map(([name, bytes]) => [name, hash(bytes)])))}`;
}

export function eligibility(root, post, now = new Date()) {
  const published = post.data.status === 'published';
  const approvalFile = path.join(root, `content-engine/approvals/${post.id}.json`);
  if (!published && !fs.existsSync(approvalFile)) return { eligible: false, errors: [] };
  const errors = [];
  if (!post.data.authorId) errors.push('authorId is required');
  if (!post.body.trim()) errors.push('article body is empty');
  if (post.data.review?.evidence !== 'verified' || post.data.review?.disclosure !== 'cleared') {
    errors.push('evidence and disclosure review are incomplete');
  }
  if (published && post.data.pubDate > now) errors.push('publication date is in the future');
  if (post.data.updatedDate && (post.data.updatedDate > now || post.data.updatedDate < post.data.pubDate)) {
    errors.push('updatedDate is invalid');
  }
  try {
    const approval = approvalSchema.parse(readJSON(approvalFile));
    if (approval.contentId !== post.id || approval.route !== blogRoute(post.id)) errors.push('approval identity or route mismatch');
    if (new Date(approval.approvedAt) > now) errors.push('approval date is in the future');
    if (approval.digest !== packageDigest(root, post)) errors.push('approval digest is stale');
  } catch (error) { errors.push(`invalid approval package: ${error.message}`); }
  return { eligible: published && errors.length === 0, errors };
}

export function inspectPublication(root, { now = new Date(), enforceLegacy = true } = {}) {
  const posts = readPosts(root);
  const legacy = legacyIds(root);
  const errors = [];
  const published = [];
  const held = [];
  for (const file of walk(path.join(root, 'content-engine/approvals')).filter(file => file.endsWith('.json'))) {
    if (!posts.some(post => path.basename(file) === `${post.id}.json`)) {
      errors.push(`Orphan approval record: ${path.basename(file)}`);
    }
  }
  for (const filename of ['sitemap.xml', 'llms.txt', 'llms-full.txt', 'okf/blog.md']) {
    if (fs.existsSync(path.join(root, 'public', filename))) errors.push(`Generated artifact must not be stored in public/: ${filename}`);
  }
  assertUniqueRoutes([...staticRoutes(root), ...projectRoutes(root), ...posts.map(post => blogRoute(post.id)),
    ...walk(path.join(root, 'public')).filter(file => /\.html$/.test(file)).map(file => '/' + path.relative(path.join(root, 'public'), file).replaceAll('\\', '/'))]);
  for (const post of posts) {
    const result = eligibility(root, post, now);
    if (result.eligible) published.push(post);
    for (const error of result.errors) errors.push(`${post.id}: ${error}`);
    if (legacy.has(post.id) && !result.eligible) held.push(post.id);
  }
  for (const id of legacy) {
    if (!posts.some(post => post.id === id)) held.push(`${id} (missing file)`);
  }
  if (enforceLegacy && held.length) errors.push(`Legacy release hold: ${held.join(', ')}. Human review is required; no URLs will be silently removed.`);
  return { posts, published, held, errors };
}

export function assertPublication(root) {
  const result = inspectPublication(root);
  if (result.errors.length) throw new Error(`Publication validation failed:\n${result.errors.join('\n')}`);
  return result;
}
