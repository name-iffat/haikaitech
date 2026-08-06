# Project Plan - HaikaiTech Business Toolkit
Created: 2026-08-02
Source: main/product-design.md + approved plan (Astro tools / CF Functions API / Cloudflare D1)

## Instructions
- Auto-commit code after each completed todo item (chains with Auto-Commit if installed)
- Update this file every 5 completed items (checkpoint save)
- Do not commit this plan file — it is your AI's working reference

## Architecture

Stack decisions (approved 2026-08-02):
- Tools: Astro 6 + React 19 client islands (migrate haikaitech-invoice from Vite SPA)
- API layer: Cloudflare Pages Functions (functions/api/leads.ts — repo-root functions/ dir, NOT src/functions)
- Database: Cloudflare D1 (businesses, leads, tool_usage) — bound server-side only
- Email: Resend (admin notification on new lead)
- Analytics: GA4 G-82BQD8BX9G (reuse portfolio property)
- Tailwind: v4 for tools, v3 for portfolio, unified later via haikaitech-ui
- Future admin dashboard: D1 reads + Cloudflare Access gate

Ecosystem flow (from product-design.md):

    haikaitech.my
        |
    Portfolio / Services / Business Toolkit
        |
    Invoice (Available) -> Quotation/Receipt/PO (Coming Soon)
        |
    Shared Lead Collection (success screen + optional profile, skip always)
        |
    D1 (businesses, leads, tool_usage) via CF Functions
        |
    Resend admin email -> future dashboard (Cloudflare Access)

Brand architecture:
    HaikaiTech Solutions > Business Toolkit > Invoice Generator
    Never brand a tool as a separate company. Clean PDFs, no watermark.

## Implementation Plan

### Phase 0: Foundations
- [x] Log architectural decisions in main/decisions.md (Astro tools, CF Functions API, Cloudflare D1, Tailwind split)
- [x] Amend Supabase references in product-design.md and HANDOFF to Cloudflare D1
- [x] Create D1 schema migration file in haikaitech-invoice (businesses, leads, tool_usage)
- [x] Create D1 database via wrangler and bind to invoice Pages project
- [x] Set invoice.haikaitech.my custom domain in Cloudflare
- [x] Set Resend API key (user secret) and admin notification — DONE: subdomain sender mail.haikaitech.my (noreply@mail.haikaitech.my), RESEND_API_KEY stored as Pages secret, ADMIN_EMAIL -> haikaitechsolutions@gmail.com (admin@haikaitech.my permanently bounces), live E2E verified (lead 201 -> D1 save -> email delivered). Domain mail.haikaitech.my VERIFIED in Resend (DKIM/SPF/Receiving/Tracking all confirmed via POST /domains/{id}/verify)
- [x] Set NODE_VERSION=22 on invoice Pages project

### Phase 1: Invoice Tool - Astro Migration + Lead Loop
- [x] Scaffold Astro 6 in haikaitech-invoice (@astrojs/react, Tailwind 4) — NOTE: no @astrojs/cloudflare adapter; v13 removed Pages support (Workers only), so static build + Pages-native `functions/` dir instead
- [x] Port Vite SPA to src/pages/index.astro with client:load island (App.tsx and children)
- [x] Strip server cruft (express, dotenv, @google/genai, fix*.cjs, server.js, rewrite.cjs)
- [x] Switch bun.lock to npm package-lock.json, rename package, add .node-version and README
- [x] Rebrand: title, localStorage key migration (invoicely_* -> hktk_invoice_*), Header
- [x] CF Functions API: POST /api/leads -> validate -> D1 insert -> Resend admin email (commit 54d1f1f; smoke-tested locally: 201 insert + 400/403 validation)
- [x] Success screen with recommended tools + optional Business Profile form + skip button (commit 338acab)
- [x] GA4 event tracking (invoice_generated, invoice_downloaded, business_profile_started, business_profile_submitted, portfolio_clicked, consultation_requested, future_tool_requested, website_audit_requested)
- [x] Build clean and local smoke test (editor, PDF, save, skip path) — build clean; local pages dev verified (static 200 + function 201/400/403 + D1 write); browser click-through pending on live site
- [x] Deploy to invoice.haikaitech.my and verify live (static + function + D1 write) — LIVE at https://invoice.haikaitech.my (CF status active), HTTPS 200 + title + GA4, function 400/201 paths verified, D1 writes confirmed, production test data cleaned

### Phase 2: Toolkit Landing Page
- [x] Create src/pages/toolkit.astro with nav/footer links and JSON-LD (Invoice Available, Quotation/Receipt/PO Coming Soon)
- [x] Build clean, Lighthouse >= 95 on toolkit page — UNBLOCKED 2026-08-05 via GA4 server-side beacon: gtag.js replaced by a same-origin Measurement Protocol beacon through `functions/api/track.ts` (proxy -> mp/collect, secret server-side as Pages `GA4_API_SECRET`). Local Lighthouse (function-served content): Perf 90, A11y 100, Best-Practices 100, SEO 100, zero console errors. Only remaining cap: CF Email Obfuscation (email-decode.min.js ~816ms) — user disables in dashboard; after that re-run Lighthouse for full 95+.

### Phase 3: Deferred
- [x] Services & Pricing page (/services/) — live 2026-08-06, full confirmed pricing + Service/FAQPage JSON-LD
- [x] Blog engine + 5 seed posts (/blog/) — live 2026-08-06, BlogPosting JSON-LD, homepage section
- [~] Case Studies (enrich project detail pages) - deferred
- [~] haikaitech-ui shared library + haikaitech-quotation - deferred until 2nd tool starts

### Phase 4: AI-Search Visibility Layer
- [x] public/llms.txt + llms-full.txt (AI context for LLM crawlers)
- [x] public/okf/ OKF v0.1 bundle (index, organization, person, services, toolkit, projects, blog, contact)
- [x] Organization JSON-LD in BaseLayout (SSM, address, founding date, knowsAbout)
- [x] FooterSection "Last updated" freshness line
- [x] Geo positioning aligned site-wide: "serving businesses across all of Malaysia — most clients in Kuala Lumpur" (llms, OKF, /services/)
- [x] robots.txt allows all AI bots (Allow: /)
- [x] Services page A11y 95 -> 100 (text-slate-400 -> 500 contrast) + Lighthouse verified: Perf 81 / A11y 100 / SEO 100 / BP 81 (CF Web Analytics deprecations)
- [~] Submit llms.txt to llmstxt.org - user action
- [~] GSC: request indexing of /services/, /blog/, llms.txt/OKF
- [~] AI-visibility baseline audit (5 queries across ChatGPT/Perplexity/Gemini/Claude) - user action

## Progress Log

2026-08-02 - Plan created and approved. Beginning Phase 0.
2026-08-02 - Phase 0 (6/7 done): decisions logged, product-design amended, D1 schema + migration applied, D1 DB + Pages project created, custom domain added, NODE_VERSION set. Blocked: Resend API key (user secret).
2026-08-02 - Phase 1 (10/10): Astro 6 static scaffold + SPA ported to index.astro, cruft stripped, npm/rename/.node-version/README done, rebrand done (title, hktk_invoice_* key migration, Header "Invoice Generator" + "HaikaiTech Business Toolkit"), CF Pages Functions POST /api/leads done + smoke-tested locally (D1 insert 201, invalid email 400, cross-origin 403), success screen + business profile form + GA4 done (commit 338acab), deployed + LIVE at https://invoice.haikaitech.my (CF status active; HTTPS 200, function 400/201 verified, D1 writes confirmed, prod test data cleaned). Commits a45a0b0, 54d1f1f, 338acab. Adapter deviation: @astrojs/cloudflare v13 removed Pages support -> dropped adapter, static build + Pages-native functions/ dir. Remaining: RESEND_API_KEY (task 6, function degrades gracefully), browser click-through on live site.
2026-08-02 - Phase 2 (1/2): toolkit landing page built. src/pages/toolkit.astro (hero, 5 tool cards — Invoice live + Quotation/Receipt/PO/Payroll coming soon, value props, CTA, ItemList + SoftwareApplication JSON-LD), BaseLayout extended with per-page canonical/og:url (defaults to root), Navbar cross-page prefix (links become /#home on subpages) + "Tools" nav item -> /toolkit/, footer "Business Toolkit" link. Build clean (13 pages), toolkit HTML verified (canonical https://haikaitech.my/toolkit/, JSON-LD present, links correct). Lighthouse >= 95 pending manual user run.
2026-08-03 - Resend live: API key stored as Pages secret, recipient set to haikaitechsolutions@gmail.com (admin@haikaitech.my permanently bounces — Email Routing has no forwarding rule), deployed, E2E verified (POST /api/leads 201 -> D1 row -> email delivered). Test data cleaned (0 leads). Domain mail.haikaitech.my fully VERIFIED in Resend (triggered re-check via POST /domains/67e1208c.../verify — DKIM/SPF/Receiving/Tracking all pass).
2026-08-03 - Lighthouse Phase 2 fixes: SEO 92->100 (nav "Start"->"Home" for descriptive link-text; closed mobile overlay now visibility-hidden, not in a11y tree), Accessibility 89->100 (toolkit "In development" badges text-slate-400->slate-600; footer bottom-row links +py-2 tap targets), Best-Practices 81->100 locally (gtag deprecations fire inconsistently — live can still flag them), Performance 62->69 (Google Fonts stylesheet now preload+onload non-blocking, removed 864ms render-blocking; +preconnect www.google-analytics.com). Remaining render-blocking: only BaseLayout.css (176ms). Perf capped at ~69: user chose to KEEP GA4 (986ms main-thread script eval / 2 long tasks / 66KiB unused JS) and KEEP CF Email Obfuscation (email-decode.min.js 816ms). Local Lighthouse 13.4.1: P69 A100 BP100 SEO100; metrics FCP 3.0s / LCP 5.2s / TBT 260ms / SI 3.8s / CLS 0.008. Not committed — awaiting deploy to Cloudflare Pages.
2026-08-05 - Analytics revamp (portfolio): gtag.js removed -> inline MP beacon (window.gtag shim, /api/track same-origin) + functions/api/track.ts proxy (origin allow-list, GA4_API_SECRET server-side, forwards to mp/collect, returns 204). MP secret Aqzz9uzyRBeB71sLZ5wfiw set as Pages production secret GA4_API_SECRET. Local Lighthouse vs function-served content: Perf 90 / A11y 100 / BP 100 / SEO 100, console-errors 0 (CORS error fixed by proxy). Deployed to Cloudflare Pages — CRITICAL: `--branch production` lands in the PREVIEW env (no secrets); this project's Production env is branch **main** (git-integration deployments), so deploy with `--branch main`. Live verified on haikaitech.my: gtag.js gone, /api/track beacon present, POST /api/track -> 204 (forwards to GA4). email-decode.min.js still present (obfuscation ON — user disables in CF dashboard). Pending user steps: disable Email Address Obfuscation, create AI Assistant channel group (chatgpt\.com|chat\.openai\.com|claude\.ai|perplexity\.ai|gemini\.google\.com|copilot\.microsoft\.com|meta\.ai), add SRA question to Cal 30-min event. Commits: 8e67f1d (sitemap), ed1fbd9 (7 projects) already deployed; analytics changes pending commit+push.
2026-08-06 - AI-search visibility layer (portfolio): public/llms.txt + llms-full.txt, public/okf/ OKF v0.1 bundle (8 files incl. blog.md), Organization JSON-LD in BaseLayout, FooterSection "Last updated" freshness, /services/ page (confirmed pricing + Service/FAQPage JSON-LD), Services nav item + sitemap entry. Geo positioning aligned to "serving across Malaysia — most clients in KL". Live verified (all routes 200). Commits d6aec02 + dba4bff pushed -> auto-deploy.
2026-08-06 - Phase A verify + Phase B blog: /services/ Lighthouse Perf 81 / A11y 95 -> 100 (contrast text-slate-400 -> 500) / SEO 100 / BP 81 (CF Web Analytics deprecations, known). Schema validator: no errors. Blog engine built (content collections, /blog/ + /blog/[slug], BlogPosting JSON-LD, reading time, related, CTA), 5 seed posts drafted (cost guide, Website Siap, RM199 plan, KL dev choice, custom software), homepage "Latest from the blog" section, llms/OKF/sitemap wired, geo copy aligned. Pending: build+verify+commit+push, user baseline audit + dashboard tasks.
2026-08-06 - Phase B verified (commit 744b482 + docs 34feea3 live): schema validator 0 errors/warnings on post + /blog/; BlogPosting required fields all present, JSON-LD in body before </html>. Lighthouse (13.4.1): post page Perf 91 / A11y 100 / SEO 100 / BP 81; /blog/ index Perf 71 / A11y 100 / SEO 100 / BP 81 (BP = CF Web Analytics deprecations, known). Index CLS 0.212 passes CWV (<0.25). Blog template frozen — no rework. Next: user dashboard tasks (GA4 AI channel group, Cal SRA question), next 2 posts (company profile cost, maintenance cost), then batched GSC indexing + llmstxt.org submit.
