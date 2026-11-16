# Phase A+B implementation report

Date: 2026-11-03. Local implementation only; no commit, push, merge or deployment.
No dependencies were installed or added. Existing unrelated working-tree edits
were retained. No global Hermes configuration or shared Koji handoff was changed.

## Implemented

- Captured 42 page URLs, nine article hashes, 15 project URLs and 27 public files
  before changing routing. The working tree, rather than an assumed clean HEAD,
  was the baseline.
- Corrected project/legal canonicals and removed the inner-page homepage default.
- Generated sitemap from actual rendered HTML, including localized pages, excluding
  noindex print/404 pages, with article publication/update dates.
- Generated blog listings in existing knowledge export URLs from eligible articles.
  Preserved non-blog business wording in templates for separate review.
- Replaced the obsolete catch-all with a top-level static 404 page and tested the
  original and replacement behavior using Wrangler Pages on localhost.
- Extended the Astro schema; centralized eligibility across route generation,
  homepages, index, related links and generated exports.
- Added approval/evidence JSON contracts. Digests bind exact Markdown, evidence,
  declared images/assets and article/base templates. Mutations require re-review.
- Added build enforcement through Astro's integration API, so a direct Astro build
  also checks publication. Missing/stale approvals and invalid published claims
  stop the build. Invalid/orphan approval records also fail validation.
- Checked generated output against baseline URLs/assets, canonical and sitemap
  policy, unpublished-content leaks and accidental private-directory copying.
- Updated deployment/startup documentation and added the business review queue.

## Files changed by this task

Existing source/configuration files modified:

```text
AGENTS.md
DEPLOYMENT.md
README.md
astro.config.mjs
package.json
public/_redirects
src/content.config.ts
src/layouts/BaseLayout.astro
src/pages/index.astro
src/pages/bm/index.astro
src/pages/blog/index.astro
src/pages/blog/[slug].astro
src/pages/projects/[slug].astro
src/pages/privacy-policy.astro
src/pages/terms-of-service.astro
src/pages/refund-cancellation-policy.astro
```

Removed public source copies; their public URLs are still generated at build:

```text
public/sitemap.xml       -> content-engine/sitemap-before.xml (baseline archive)
public/llms.txt          -> content-engine/export-templates/llms.txt
public/llms-full.txt     -> content-engine/export-templates/llms-full.txt
public/okf/blog.md       -> content-engine/export-templates/okf/blog.md
```

New files:

```text
content-engine/README.md
content-engine/route-baseline.json
content-engine/contracts/approval.schema.json
content-engine/contracts/evidence.schema.json
content-engine/approvals/.gitkeep
content-engine/evidence/.gitkeep
docs/content-engine-business-review.md
docs/content-engine-implementation.md
scripts/content/artifacts.mjs
scripts/content/integration.mjs
scripts/content/validate.mjs
scripts/content/test-build.mjs
scripts/content/test-pages.mjs
src/lib/content/schema.mjs
src/lib/content/publication.mjs
src/lib/content/posts.ts
src/pages/404.astro
tests/content/helpers.mjs
tests/content/publication.test.mjs
tests/content/artifacts.test.mjs
```

Generated test logs are ignored under `output/content-engine-tests/`.
No changes were made by this task to the nine existing article files, conversion
components, analytics function, styles, service prices or offer data. Some of those
files already had edits before this task; they still appear in the full git diff.

## Verification

- Node built-in test suite: 24 passing tests.
- `tsc --noEmit`: passed.
- `git diff --check`: passed.
- Isolated approved-fixture build: passed, 43 generated pages (42 baseline + 404).
- All 42 baseline page routes: HTTP 200 on local Pages.
- All baseline public files present in generated output; sitemap and knowledge
  export URLs return HTTP 200 locally.
- Sitemap/canonicals and draft exclusions: passed output assertions and unit tests.
- Old routing: Wrangler 4.95.0 ignores the catch-all as an infinite-loop rule;
  without 404.html, the original layout falls back to homepage with HTTP 200.
- Replacement: unknown paths and draft article paths return HTTP 404.
- Body/metadata/evidence/asset/template mutation: approval invalidation tests pass.
- Actual fixture builds reject stale approvals, unapproved published content and
  future-dated published content before rendering.
- Generated output retains WhatsApp URLs, `/api/track`, and the subscription
  endpoint. Tests do not execute analytics or send subscription requests.
- Real article hash comparison: all nine unchanged; zero approval records created.
- Real `npm run build`: intentionally fails the explicit legacy release hold.

Successful builds use temporary fixture-only approvals, never repository approvals.
The initial sandboxed baseline build hit an EPERM directory error; isolated builds
subsequently passed with permission to create temporary build directories/junctions.
No successful deployment artifact is claimed for the real unreviewed content tree.

## Legacy migration and unresolved items

The migration proposal is in `content-engine/README.md`. Existing routes remain
reserved and available for local review; no article was silently removed or approved.
All nine articles need human review before a real production build can succeed.
The current live deployment remains unchanged.

Live-domain 404 behavior could not be verified because this environment could not
resolve haikaitech.my. Local Pages behavior is verified. A production smoke check
remains part of a separately authorized release.

Approval files are human attestations, not authenticated signatures. Protect
approvals, policy code and production credentials before connecting Hermes.
Business prices/claims remain pending review; non-blog public knowledge is outside
the editorial publication gate. Full browser visual/interactive testing was not
performed; conversion references and HTTP/static output were checked.

## Approval needed before Phase C

1. Accept the documented per-article legacy migration strategy and review all nine
   articles, evidence and disclosure permissions.
2. Decide the authoritative pricing/offer facts and any factual corrections in
   `content-engine-business-review.md`; authorize edits explicitly.
3. Establish human ownership/access controls for approvals and repository policy.
4. Authorize Phase C's importer separately. Commits and any production release
   require separate explicit authorization; none were performed here.
