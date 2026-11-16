import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fixture, cleanup, article, approve, put } from './helpers.mjs';
import { writeArtifacts, checkArtifacts } from '../../scripts/content/artifacts.mjs';

test('artifacts include localized eligible pages and exclude noindex and unpublished articles', () => {
  const root = fixture();
  const output = path.join(root, 'dist');
  try {
    const post = article(root, 'approved-post'); approve(root, post);
    article(root, 'hidden-draft', { status: 'draft' }, 'PRIVATE_DRAFT_BODY_SENTINEL');
    for (const route of ['/', '/bm/', '/blog/approved-post/', '/guide-content/', '/404/']) {
      const name = route === '/404/' ? '404.html' : route.slice(1) + 'index.html';
      put(root, `dist/${name}`, `<html><head><link rel="canonical" href="https://haikaitech.my${route}">${['/404/', '/guide-content/'].includes(route) ? '<meta name="robots" content="noindex, nofollow">' : ''}</head><body>Fixture</body></html>`);
    }
    for (const name of ['llms.txt', 'llms-full.txt', 'okf/blog.md']) {
      put(root, `content-engine/export-templates/${name}`, '# Export\n{{PUBLISHED_BLOG}}\n');
    }
    writeArtifacts(root, output);
    const sitemap = fs.readFileSync(path.join(output, 'sitemap.xml'), 'utf8');
    assert.match(sitemap, /<loc>https:\/\/haikaitech.my\/bm\/<\/loc>/);
    assert.match(sitemap, /<lastmod>2026-01-01T00:00:00.000Z<\/lastmod>/);
    assert.doesNotMatch(sitemap, /guide-content|404|hidden-draft/);
    for (const name of ['llms.txt', 'llms-full.txt', 'okf/blog.md']) {
      assert.match(fs.readFileSync(path.join(output, name), 'utf8'), /approved-post/);
    }
    put(root, 'dist/llms.txt', '/blog/hidden-draft/');
    assert.throws(() => checkArtifacts(root, output), /Unpublished content leaked/);
    put(root, 'dist/llms.txt', 'Fixture hidden-draft');
    assert.throws(() => checkArtifacts(root, output), /Unpublished content leaked/);
  } finally { cleanup(root); }
});

test('a homepage canonical on an inner page is rejected', () => {
  const root = fixture();
  try {
    put(root, 'dist/index.html', '<link rel="canonical" href="https://haikaitech.my/">');
    put(root, 'dist/projects/example/index.html', '<link rel="canonical" href="https://haikaitech.my/">');
    for (const name of ['llms.txt', 'llms-full.txt', 'okf/blog.md']) put(root, `content-engine/export-templates/${name}`, '{{PUBLISHED_BLOG}}');
    assert.throws(() => writeArtifacts(root, path.join(root, 'dist')), /Incorrect canonical/);
  } finally { cleanup(root); }
});
