import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { blogSchema } from '../../src/lib/content/schema.mjs';
import { readPosts, packageDigest } from '../../src/lib/content/publication.mjs';

export function put(root, name, text) {
  fs.mkdirSync(path.dirname(path.join(root, name)), { recursive: true });
  fs.writeFileSync(path.join(root, name), text);
}

export function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'haikaitech-content-test-'));
  put(root, 'src/pages/index.astro', '<main>Home</main>');
  put(root, 'src/pages/blog/[slug].astro', 'article template');
  put(root, 'src/layouts/BaseLayout.astro', 'base template');
  put(root, 'constants.tsx', 'export const PROJECTS = [];');
  put(root, 'content-engine/route-baseline.json', JSON.stringify({ blogRoutes: [], pageRoutes: ['/'] }));
  fs.mkdirSync(path.join(root, 'src/content/blog'), { recursive: true });
  return root;
}

export function cleanup(root) {
  const resolved = path.resolve(root);
  const parent = path.resolve(os.tmpdir());
  if (path.dirname(resolved) !== parent || !path.basename(resolved).startsWith('haikaitech-content-test-')) {
    throw new Error(`Unsafe fixture cleanup target: ${resolved}`);
  }
  fs.rmSync(resolved, { recursive: true, force: true });
}

export function article(root, id, changes = {}, body = 'Useful fixture content. No client information.') {
  const data = { title: `Fixture ${id}`, description: 'Fixture description', pubDate: '2026-01-01',
    tags: ['websites'], status: 'published', authorId: 'haikaitech',
    review: { evidence: 'verified', disclosure: 'cleared' }, ...changes };
  blogSchema.parse(data);
  put(root, `src/content/blog/${id}.md`, `---\n${Object.entries(data).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n')}\n---\n\n${body}\n`);
  return readPosts(root).find(post => post.id === id);
}

export function approve(root, post, assets = []) {
  put(root, `content-engine/evidence/${post.id}.json`, JSON.stringify({ schemaVersion: 1, contentId: post.id,
    summary: 'TEST FIXTURE ONLY; no approval of real content.', claims: [], assets }));
  put(root, `content-engine/approvals/${post.id}.json`, JSON.stringify({ schemaVersion: 1,
    contentId: post.id, route: `/blog/${post.id}/`, decision: 'approved', reviewer: 'TEST FIXTURE ONLY',
    approvedAt: '2026-01-01T00:00:00Z', digest: packageDigest(root, post),
    checks: { accuracy: true, evidence: true, disclosure: true, assetRights: true } }));
}
