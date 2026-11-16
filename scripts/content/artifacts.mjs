import fs from 'node:fs';
import path from 'node:path';
import { SITE, walk, blogRoute, assertPublication } from '../../src/lib/content/publication.mjs';

const escapeXML = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const escapeMarkdown = text => text.replace(/[\[\]<>\r\n]/g, ' ');

export function htmlRoutes(outDir) {
  return walk(outDir).filter(file => file.endsWith('.html')).map(file => {
    const relative = path.relative(outDir, file).replaceAll('\\', '/');
    const route = relative === '404.html' ? '/404/' : '/' + relative.replace(/index\.html$/, '').replace(/\.html$/, '/');
    return { file, route, html: fs.readFileSync(file, 'utf8') };
  });
}

export function writeArtifacts(root, outDir) {
  const report = assertPublication(root);
  const pages = htmlRoutes(outDir);
  const indexable = pages.filter(page => !/<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(page.html));
  const dates = new Map(report.published.map(post => [blogRoute(post.id), (post.data.updatedDate ?? post.data.pubDate).toISOString()]));
  const entries = indexable.sort((a, b) => a.route.localeCompare(b.route)).map(page =>
    `  <url><loc>${escapeXML(SITE + page.route)}</loc>${dates.has(page.route) ? `<lastmod>${dates.get(page.route)}</lastmod>` : ''}</url>`);
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`);
  const listing = report.published.sort((a, b) => b.data.pubDate - a.data.pubDate || a.id.localeCompare(b.id))
    .map(post => `- [${escapeMarkdown(post.data.title)}](${SITE}${blogRoute(post.id)}) — ${escapeMarkdown(post.data.description)}`).join('\n');
  for (const name of ['llms.txt', 'llms-full.txt', 'okf/blog.md']) {
    const template = fs.readFileSync(path.join(root, 'content-engine/export-templates', name), 'utf8');
    if (template.split('{{PUBLISHED_BLOG}}').length !== 2) throw new Error(`Missing or duplicate export placeholder: ${name}`);
    const destination = path.join(outDir, name);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, template.replace('{{PUBLISHED_BLOG}}', listing));
  }
  checkArtifacts(root, outDir, report);
}

export function checkArtifacts(root, outDir, report = assertPublication(root)) {
  const pages = htmlRoutes(outDir);
  const routes = new Set(pages.map(page => page.route));
  const baseline = JSON.parse(fs.readFileSync(path.join(root, 'content-engine/route-baseline.json'), 'utf8'));
  for (const route of baseline.pageRoutes) {
    if (!routes.has(route)) throw new Error(`Baseline URL missing from output: ${route}`);
  }
  for (const publicPath of baseline.publicFiles ?? []) {
    if (!fs.existsSync(path.join(outDir, publicPath))) throw new Error(`Baseline public asset missing: ${publicPath}`);
  }
  for (const post of report.published) {
    if (!routes.has(blogRoute(post.id))) throw new Error(`Published article missing from output: ${post.id}`);
  }
  for (const { html, route } of pages) {
    const canonicals = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/g)];
    if (canonicals.length !== 1 || canonicals[0][1] !== SITE + route) throw new Error(`Incorrect canonical: ${route}`);
  }
  const sitemap = fs.readFileSync(path.join(outDir, 'sitemap.xml'), 'utf8');
  for (const page of pages) {
    const expected = !/<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(page.html);
    if (sitemap.includes(`<loc>${SITE}${page.route}</loc>`) !== expected) throw new Error(`Sitemap eligibility mismatch: ${page.route}`);
  }
  const eligible = new Set(report.published.map(post => post.id));
  const surfaces = walk(outDir).filter(file => /\.(html|txt|md|xml|json|js)$/.test(file));
  for (const post of report.posts.filter(post => !eligible.has(post.id))) {
    for (const file of surfaces) {
      const text = fs.readFileSync(file, 'utf8');
      if (text.includes(blogRoute(post.id)) || text.includes(post.data.title) || (post.body.trim().length > 20 && text.includes(post.body.trim()))) {
        throw new Error(`Unpublished content leaked into ${path.relative(outDir, file)}: ${post.id}`);
      }
    }
  }
  // Review metadata, private inputs and raw source are never deployment artifacts.
  if (fs.existsSync(path.join(outDir, 'content-engine'))) throw new Error('Private review directory copied into output');
}
