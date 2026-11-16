# Cloudflare Pages deployment

Verified locally on 2026-11-03: Astro 6.4.2, React 19, Tailwind 3, static output,
no Cloudflare adapter. `.node-version` specifies 22. This is not a Vite SPA and
does not require a Gemini API key.

## Local verification

```text
npm install
npm run dev                     # localhost:3000
npm test
npm run content:validate
npm run test:content:integration # temporary fixture builds, no deployment
npm run build
npm run preview
```

Production builds currently stop on a deliberate legacy review hold. See
`content-engine/README.md`. Do not deploy stale `dist/` after a failed build.
The live deployment is unchanged until a separately authorized release.

## Pages configuration

- Build: `npm run build`; output: `dist`; root: this repository
- Node: 22 or a compatible later version
- Framework: Astro/static Pages, not a Worker deployment
- Production branch: `main`, according to AGENTS.md; confirm dashboard settings before release

The publication integration checks every Astro build, including direct CLI builds.
It validates before compilation, generates sitemap and public blog exports after
rendering, then validates output. There is no approval bypass flag. No CI or
dashboard configuration was changed in Phase A+B.

## Static routing and artifacts

`src/pages/404.astro` emits `/404.html`; `_redirects` has no homepage catch-all.
Missing paths must return 404, including unpublished article URLs. See
https://developers.cloudflare.com/pages/configuration/serving-pages/.

`sitemap.xml`, `llms.txt`, `llms-full.txt`, and `okf/blog.md` are generated into
`dist/`; do not recreate copies in `public/`. Sitemap entries come from actual
built HTML, excluding noindex pages such as the print source and 404. Blog exports
use centrally eligible articles. Non-blog business copy remains in
`content-engine/export-templates/` pending human review.

## Pages Functions

`functions/api/track.ts` is compiled by Pages and forwards GA4 events. It requires
the production `GA4_API_SECRET` Pages secret. Keep secrets out of content, logs
and client bundles. Analytics, Meta Pixel, enquiry and newsletter code is unchanged.

Local runtime checks use installed Wrangler without production bindings:

```text
npx wrangler pages dev dist --compatibility-date 2026-06-02
```

That compatibility date is the project's documented local runtime ceiling.
Static routing checks should not send analytics or submit subscription forms.

## Release — explicit authorization required

1. Resolve all legacy reviews and approve exact content digests.
2. Run tests, isolated integration tests, validation and `npm run build`.
3. Review the diff, routes, sitemap, canonical URLs and conversion paths.
4. Confirm production Pages settings and secrets without printing their values.
5. Obtain explicit authorization before committing, pushing, merging or deploying.
6. A push to `main` deploys production according to AGENTS.md.
7. If separately authorized, the documented CLI command is
   `npx wrangler pages deploy dist --project-name haikaitech --branch main`.
   `--branch production` is a Preview branch for this project.
8. Check production HTTP statuses and sitemap; retain the previous deployment for rollback.

Direct uploads bypass build checks. Restricted credentials and human-reviewed
branch protection remain necessary; file checks cannot prevent arbitrary uploads
by someone who has deployment access.
