import { getCollection } from 'astro:content';
import { inspectPublication } from './publication.mjs';

/** The only collection query used by public blog surfaces. No build-mode bypass. */
export async function getPublicPosts() {
  const report = inspectPublication(process.cwd(), { enforceLegacy: false });
  if (report.errors.length) throw new Error(report.errors.join('\n'));
  const visible = new Set(report.published.map(post => post.id));
  if (import.meta.env.DEV) {
    // Explicit local legacy review only. New drafts never enter indexes or routes.
    for (const post of report.posts) {
      if (report.held.includes(post.id) && !post.hasStatus) visible.add(post.id);
    }
  }
  return getCollection('blog', post => visible.has(post.id));
}
