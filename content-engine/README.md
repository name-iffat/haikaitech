# Publication controls and legacy review

Phase A+B, 2026-11-03. Implementation approval is not article approval.

## Proposed legacy migration — human review required

The nine Markdown files remain byte-identical to the pre-change baseline. Their
IDs and URLs are reserved by `route-baseline.json`. No approval records have been
created. New production builds are deliberately blocked; the live deployment is
untouched. Missing or draft legacy files also block release, preventing partial
migration from silently removing existing URLs.

1. Review `docs/content-engine-business-review.md` and approve authoritative offer facts.
2. Review each article with `npm run dev`: verify sources, claims, screenshots,
   rights and disclosure. The review banner and noindex are not access control.
3. Make only explicitly approved factual corrections, retaining filenames and URLs.
4. Add final publication metadata and review the rendered article.
5. Add a public-safe evidence declaration and calculate the final digest.
6. A human records approval of that exact digest. No script writes approvals.
7. All nine must be approved and published before release. Retirement requires
   separate URL/redirect migration approval; never edit the baseline to evade a hold.

Do not push to the auto-deploy branch before resolving or explicitly accepting
the blocked release state. Confidential material must never enter Markdown,
`public/`, tracked evidence, or local article previews.

## Article metadata

Existing title, description, pubDate, updatedDate, tags and lang fields remain.
Language defaults to `en`; Malay uses `ms-MY`. Filenames are flat, lowercase,
hyphenated slugs; frontmatter slug overrides are rejected.

```yaml
status: published
authorId: haikaitech
review:
  evidence: verified
  disclosure: cleared
```

States: `draft`, `in_review`, `approved`, `published`. Missing status defaults to
draft. Only published content with a reached date, completed review and matching
approval is eligible. Approved does not authorize publication. Future published
claims fail builds; future drafts remain excluded. Date-only values use midnight
UTC; use an ISO timestamp with `+08:00` for Malaysian local timing. No scheduler exists.

`getPublicPosts()` supplies article routes, both homepages, the index and related
links. Production exports use the same eligibility function. Future public blog
features must reuse this module rather than query the collection directly.

## Evidence declaration

Use `content-engine/evidence/<id>.json` and `contracts/evidence.schema.json`:

```json
{
  "schemaVersion": 1,
  "contentId": "example-article",
  "summary": "Human review summary; explain any absence of factual claims.",
  "claims": [
    { "claim": "Specific factual claim", "source": "Public URL or sanitized knowledge reference", "checkedOn": "2026-11-03" }
  ],
  "assets": ["public/images/blog/example.webp"]
}
```

Scripts check structure and integrity, not truth or consent. Private proof stays
outside the repository; use sanitized references. Empty claims are allowed only
when the human summary explains why external evidence is unnecessary.

## Approval format

Use `content-engine/approvals/<id>.json` and `contracts/approval.schema.json`.
This is a format example, not approval of any content:

```json
{
  "schemaVersion": 1,
  "contentId": "example-article",
  "route": "/blog/example-article/",
  "decision": "approved",
  "reviewer": "Human reviewer identity",
  "approvedAt": "2026-11-03T14:00:00+08:00",
  "digest": "sha256:<64 lowercase hexadecimal characters>",
  "checks": { "accuracy": true, "evidence": true, "disclosure": true, "assetRights": true }
}
```

`npm run content:validate -- --digests` prints candidate digests without creating
approvals. It still exits unsuccessfully while release holds remain.

Digest v1 hashes each input's exact bytes with SHA-256, serializes the ordered
`[relativeName, inputHash]` pairs as compact JSON, then hashes that JSON. Inputs:
the entire Markdown file, exact evidence JSON, sorted declared assets, the article
template and BaseLayout. Whitespace changes invalidate approvals. Literal image
references must be declared local assets; remote images are unsupported.
External sources are human-verified references, not network snapshots. Shared
CSS/islands are outside the content digest and require separate UI review.

Approval files are attestations, not authenticated signatures. Anyone with write
access could forge them. Hermes must not write approvals, policy/build code or
production credentials. Human-reviewed branch protection is required before
Phase C. No global Hermes settings were changed.

## Commands and artifact safety

- `npm test`: eligibility, metadata, collisions and digest mutation tests.
- `npm run content:validate`: real repository check; currently fails the legacy hold.
- `npm run build`: mandatory Astro validation before compilation; generated
  sitemap and knowledge exports are checked after rendering. No bypass flag exists.
- `npm run test:content:integration`: temporary copy with fixture-only approvals;
  checks all 42 baseline URLs, canonical/sitemap output, draft exclusions, conversion
  references, fail-closed builds and local Cloudflare HTTP routing.

Fixtures are never real article approvals. Logs are under ignored
`output/content-engine-tests/`. On Windows the integration runner needs permission
to create a temporary node_modules junction and start local Astro/Pages processes.
Its temporary tree and junction are removed after tests. Do not deploy test artifacts.

`export-templates/` retains unchanged non-blog business copy from public knowledge
files. Blog lists are regenerated from eligible metadata. `sitemap-before.xml`
retains the pre-change sitemap. No importer, case-study generator, pSEO pages or
deployment automation was implemented.
