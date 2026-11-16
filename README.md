# HaikaiTech portfolio

Astro 6 + React 19 static website. Node 22+, npm.

```text
npm install
npm run dev                     # localhost:3000
npm test
npm run content:validate
npm run test:content:integration
npm run build
npm run preview
```

Production builds are intentionally held until the nine legacy articles receive
explicit human review. None have been automatically approved. Local development
shows unchanged legacy articles with a review notice and noindex metadata; new
drafts remain excluded.

- Publication workflow: `content-engine/README.md`
- Pre-change routes: `content-engine/route-baseline.json`
- Policy/schema: `src/lib/content/`
- SEO output: `scripts/content/artifacts.mjs`
- Deployment: `DEPLOYMENT.md`
- Pricing/claims review: `docs/content-engine-business-review.md`

No CMS, database, importer or pSEO generator is included.
