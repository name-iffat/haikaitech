import { inspectPublication, packageDigest } from '../../src/lib/content/publication.mjs';

try {
  const root = process.cwd();
  const report = inspectPublication(root);
  console.log(`Articles: ${report.posts.length}; eligible: ${report.published.length}; legacy held: ${report.held.length}`);
  if (process.argv.includes('--digests')) {
    for (const post of report.posts) {
      try { console.log(`${post.id}: ${packageDigest(root, post)}`); }
      catch (error) { console.error(`${post.id}: ${error.message}`); }
    }
  }
  for (const error of report.errors) console.error(error);
  if (report.errors.length) process.exitCode = 1;
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
