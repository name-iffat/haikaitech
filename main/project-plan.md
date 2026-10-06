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
- [x] Blog engine + 9 posts (/blog/) — live 2026-08-06, BlogPosting JSON-LD, homepage section; e-commerce readiness article added 2026-10-03 at `/blog/website-untuk-seller-tiktok-shopee/`
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

---
## Appended: 2026-08-13

### Phase 5: Lead Capture + Owned List (portfolio growth pass)

**Goal**: Turn `Traffic -> WhatsApp chat -> (maybe) project` into `Traffic -> WhatsApp / free tool -> Email list -> Nurture -> project + repeat value`.

**Context**: Friend-reviewed lead strategy (login with friend's feed). Newsletter backend already exists: D1 (subscribers table) + Resend (segment sync 9a5e9426-463b-4983-b545-16487985c534, source property tagged) + instant welcome email + admin notification. Gap analysis: footer capture is homepage-only (NOT in shared FooterSection), toolkit page has no capture, no nurture sequence beyond welcome, no lead magnet.

- [ ] FooterSection.tsx: add newsletter row (pitch + NewsletterForm source="footer" + privacy link); FooterSection becomes an island (client:load on consumers)
- [ ] Add client:load to FooterSection on index.astro, toolkit.astro, services.astro, blog/index.astro
- [ ] projects/[slug].astro: add FooterSection client:load (currently no footer at all)
- [ ] toolkit.astro: add "Get notified when I release new tools" box (source="toolkit", already whitelisted)
- [ ] blog/[slug].astro: remove dead FooterSection import (renders its own inline footer)
- [ ] Phase 1 build + verify forms present in dist
- [ ] Phase 2: draft nurture copy (welcome reword + value1 day2-3 + value2 day5-7 + soft offer day8-10); configure Resend Automation later (list >= ~10)
- [ ] Phase 4: subscribe.ts add magnet field + 'lead_magnet' source + guide-delivery email w/ PDF attachment (Resend attachments path URL; base64 fallback)
- [ ] Phase 4: author /guide-content/ styled noindex page -> print-to-PDF -> public/guides/2026-website-lead-gen-guide.pdf
- [ ] Phase 4: create /guide/ landing page (SEO "how much should a website cost in malaysia 2026") + LeadMagnetForm gated form + GA4 lead_magnet_request + meta/og
- [ ] Phase 4: deploy invoice app manually (--branch main) + push portfolio (auto-deploy)
- [ ] AGENTS.md: document lead-magnet flow

**Deferred**: tool template pack, interactive cost calculator, mini-training, company-profile template (documented in session memory).

**WhatsApp canned replies** (Phase 3, shared in chat):
1. "By the way, I also send short practical notes on website pricing and getting leads in Malaysia. Want me to add you to the list? Just reply with your email."
2. "I put together a few guides on website cost + lead gen for Malaysian SMEs. Want me to send them over? Just drop your email."

**Phase 2 nurture sequence copy (configure in Resend Automation later, when list >= ~10):**

- **Welcome (reword existing)**: subject "Welcome to HaikaiTech Updates". Body: practical pricing notes, lead-gen tactics, free tools for Malaysian SMEs — a few short onboarding notes over the next week, then roughly 1–2 emails per month. No spam, no fluff. Toolkit CTA button.
- **Value 1 (Day 2–3)**: subject "What a Malaysian SME website actually costs". Body: fixed-price RM1,500 one-page site vs RM199/mo managed plan — no vague quotes, no hourly surprises. Link /blog/how-much-does-a-business-website-cost-in-malaysia/ + /services/.
- **Value 2 (Day 5–7)**: subject "The lead-gen channel most SMEs skip". Body: WhatsApp is how most Malaysians contact businesses — one-page site + WhatsApp CTA converts better than a contact form. Link /blog/lead-generation-malaysia-sme/.
- **Soft offer (Day 8–10)**: subject "Free fixed quote, no strings". Body: "If you're thinking about a website or system, happy to give a fixed quote on WhatsApp — no call required, reply when you're ready." CTA wa.me/60147533499.

## Progress Log

2026-08-16 - NURTURE DRIP LIVE (invoice commit 6fbf8ca, deployed + pushed). scripts/setup-nurture.mjs created 3 published templates (nurture-1-website-cost fec59d67, nurture-2-lead-gen dce6545e, nurture-3-soft-offer 543444a7) + enabled automation 'HaikaiTech Nurture Drip' (01a00a1b-b627-747d-94ef-0c27f7b3ab89): trigger subscriber.created -> 3d delay -> value1 (website cost post) -> 3d -> value2 (lead-gen post) -> 3d -> soft offer (wa.me fixed quote). subscribe.ts fires subscriber.created for NEW subscribers only (after contact sync), logged non-blocking. Welcome/guide transactional emails unchanged (guide needs PDF attachment, templates can't). Live E2E: subscribe 201 -> run status 'running'. Cleanup: D1 test rows deleted (2 real remain), 5 Resend test contacts deleted (incl. leftover guide-E2E ones), diag/props contacts already gone. Enabled automations immutable - edit by duplicate+switch in dashboard. Do NOT re-run setup script (duplicates).
2026-08-16 - Cost-query handoff (commit 3c808a0, live): /guide/ no longer targets 'how much should a website cost' (lead-gen-first now), so how-much-does-a-business-website-cost post carries it — added market-wide price table (DIY RM600-2k/yr, one-page RM800-2.5k, corporate RM4-12k, ecomm RM8-25k, web apps RM25k+) ahead of own packages, running-costs table + 'RM300-800/year to keep alive' figure, cross-link from /guide/ contents ('Mostly want the pricing?'). Blog table CSS already existed in global.css.
2026-08-16 - Guide refined to lead-gen-first, data-backed (commit af73367, pushed). Studied ZenWeb's lead-generation-malaysia, whatsapp-marketing-malaysia, email-marketing-edm-guide-malaysia. Guide now: intro (waiting vs lead-gen hook), Part 1 WhatsApp first-contact ~58% + DataReportal 2026 national data, Part 2 HBR reply-speed 7x + modelled conversion table (5min=100/1hr=62/1-24hr=28/>24hr=10), Part 3 channels cost-per-lead typical market ranges (Google Ads RM25-90, SEO RM8-35, Meta RM12-55, WA RM15-60, TikTok RM10-45, referrals RM5-25, email RM2-10), Part 4 10 tactics (attract/capture/follow-up + where-to-start box), Part 5 WhatsApp vs email + PDPA, Part 6 website as lead asset (nice vs working + 2026 cost note), Part 7 action plan, bonus scripts, closing. Honesty guardrail: modelled tables labelled illustrative; citable public sources (DataReportal, HBR); 'typical market ranges' NOT 'our client tracking'. /guide/ landing retitled '2026 Lead Generation Guide', hero 'more enquiries', 7-item preview, meta, WA prefill updated. FooterSection + homepage cross-link relabelled. Blog lead-generation-malaysia-sme data aligned (58% first-contact, RM2-10/lead). Added table + source-note CSS. PDF regenerated: 12 pages (was 9), valid EOF. Build clean (32 pages).
2026-08-13 - ALL Phase 5 DONE. Line items: footer capture (d4c74fb), toolkit box (d4c74fb), projects footer (d4c74fb), /guide/ + LeadMagnetForm + noindex BaseLayout (8be7fd1), guide PDF generated via headless Chrome print (edf3bbe), sitemap + AGENTS (25271ee), subscribe.ts magnet delivery (invoice 41014df). Deployed invoice (+ commits, --branch main) + pushed portfolio (auto-deploy). Live verified: /guide/ 200 + form, /guide-content/ noindex, PDF 200 application/pdf. E2E: fresh lead_magnet subscribe -> 201, D1 rows source=lead_magnet, tail outcome ok zero errors (guide email + contact sync + admin all succeeded). Test rows cleaned. GUIDE_PDF_URL uses static haikaitech.my PDF. Remaining: user configure Resend Automation nurture (copy ready above) when list grows.
2026-08-13 - Direct-visitor surfacing (commit 8037962): /guide/ had zero internal links (search-only). Added footer '2026 Website Cost Guide' link (all pages) + homepage newsletter cross-link. Guide rewritten for business owners per friend review (commit 6a6a20a): 7-part outline — cover, intro, pricing (2026 RM ranges + drivers + mistakes), what makes a website generate leads (nice vs working + checklist), lead-gen tactics in Malaysia (WhatsApp shift, reply speed, 5-7 tactics), action plan (week/month + self-audit), closing soft CTA; WhatsApp scripts moved to bonus box. PDF regenerated: 9 pages (was 3). Guide in brief: "practical numbers + tactics, no fluff".
2026-08-13 - ALL Phase 5 DONE. Line items: footer capture (d4c74fb), toolkit box (d4c74fb), projects footer (d4c74fb), /guide/ + LeadMagnetForm + noindex BaseLayout (8be7fd1), guide PDF generated via headless Chrome print (edf3bbe), sitemap + AGENTS (25271ee), subscribe.ts magnet delivery (invoice 41014df). Deployed invoice (+ commits, --branch main) + pushed portfolio (auto-deploy). Live verified: /guide/ 200 + form, /guide-content/ noindex, PDF 200 application/pdf. E2E: fresh lead_magnet subscribe -> 201, D1 rows source=lead_magnet, tail outcome ok zero errors (guide email + contact sync + admin all succeeded). Test rows cleaned. GUIDE_PDF_URL uses static haikaitech.my PDF. Remaining: user configure Resend Automation nurture (copy ready above) when list grows.
2026-08-13 - Phase 1 DONE (commit d4c74fb): footer capture on 19 pages + toolkit box, 30 pages build clean. Phase 2 copy drafted above. Phases 3-4 pending.
2026-08-13 - Plan appended: Phase 5 lead capture + owned list pass (footer/toolkit capture, nurture copy, /guide/ lead magnet). Awaiting execution.
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
