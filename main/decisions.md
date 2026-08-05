
## 2026-08-02 -- Business Toolkit: Astro tools, CF Functions API, Cloudflare D1
**Context**: Product design (main/product-design.md) defines a Business Toolkit ecosystem (invoice/quotation/receipt/PO/payroll) for Malaysian SMEs. Each tool is an independent repo. The invoice tool (haikaitech-invoice) exists as a Vite 6 React SPA but the design doc specified AstroJS, a shared backend, and lead collection. Existing docs referenced Supabase, but the API layer was chosen as Cloudflare Pages Functions, making a third-party DB redundant.
**Decision**:
- Migrate every toolkit tool to Astro 6 + React 19 client islands (matching the portfolio stack)
- API layer = Cloudflare Pages Functions (src/functions/api/*.ts)
- Database = Cloudflare D1 (tables: businesses, leads, tool_usage), bound server-side only — never exposed to the client
- Email = Resend admin notification on new lead
- Analytics = reuse GA4 property G-82BQD8BX9G already in the portfolio
- Tailwind v4 kept for tools, v3 for portfolio; unified later via a haikaitech-ui shared package (created only when a 2nd tool starts)
- Future admin dashboard = D1 reads gated by Cloudflare Access (no separate auth service)
**Rationale**:
- Single provider (Cloudflare) for hosting, API, DB, and dashboard auth — one dashboard, free tier, no third-party account
- D1 binding lives inside Functions, so the DB is hidden server-side with no anon key shipped to browsers
- D1/SQLite is ample for low-write lead collection and tool analytics; SQL stays available
- Astro SSG + React islands matches portfolio conventions and keeps tools static-friendly
**Rejected alternatives**:
- Supabase (Postgres + RLS): requires external account, anon key exposure in client; swap-in still possible later behind the same Functions API if Postgres/realtime is needed
- Keeping the Vite SPA: diverges from doc spec and portfolio stack
- AI Studio express server (@google/genai): incompatible with static Cloudflare Pages; AI features, if wanted later, belong in a Function
**Consequences**: haikaitech-invoice migrates to Astro; express/dotenv/genai and fix scripts removed; invoice.haikaitech.my subdomain; lead form posts to /api/leads which writes D1 and emails via Resend.

## 2026-08-05 -- GA4 server-side beacon via Pages Function proxy (portfolio)
**Context**: Client-side gtag.js was the only render-blocking script left on the portfolio (986ms main-thread eval / 2 long tasks / 66KiB unused JS), capping Lighthouse Performance at ~69 and letting deprecated gtag warnings leak into Best-Practices. User's research framed this as the "traditional" path in a zero-click world — server-side tracking + Self-Reported Attribution (SRA) are the modern answer for the AI-search era.
**Decision**:
- Remove gtag.js entirely from `src/layouts/BaseLayout.astro`; replace with a tiny inline Measurement Protocol beacon that keeps the existing `window.gtag` shim (all 5 call sites in App.tsx / track.ts / ProjectCard.tsx / CalBooking.tsx unchanged)
- Beacon posts same-origin to `functions/api/track.ts` (Pages Function) which validates origin/JSON and forwards to `https://www.google-analytics.com/mp/collect?measurement_id=G-82BQD8BX9G&api_secret=…` server-side
- GA4 API secret (`GA4_API_SECRET`) lives only as a Pages production secret — never in client JS
- `client_id` from `_ga` cookie else `localStorage 'hktk_cid'` UUID; `session_id` from `sessionStorage 'hktk_sid'`
- Keep GA4 property G-82BQD8BX9G (zero re-setup); add Self-Reported Attribution via a "How did you hear about us?" custom question on the Cal.com 30-min event (no code, answer joins booking record)
**Rationale**:
- MP `mp/collect` is CORS-blocked from the browser (preflight fails, `errors-in-console`, BP 96) — the same-origin proxy function is the confirmed fix
- Removes the only render-blocking script and the deprecated gtag.js surface: local Lighthouse Perf 69 -> 90, Best-Practices -> 100, zero console errors
- Server-side + SRA surfaces which AI assistant referred a visitor, closing the "zero-click / AI search" visibility gap
**Rejected alternatives**:
- Keep gtag.js (Perf ~69 forever, deprecated API surface)
- Cloudflare Web Analytics (user chose the proxy fix over backtracking)
- Client-side `mp/collect` direct (CORS-blocked)
**Consequences**: static architecture stays except the one proxy function; MP event-level only (no Enhanced Measurement / auto-session / cross-domain); deployed to Cloudflare Pages Production env (branch **main** — `--branch production` lands in Preview and silently lacks env secrets). User dashboard steps remain: disable Email Address Obfuscation (drops email-decode.min.js ~816ms), create AI Assistant channel group regex.

## 2026-05-30 -- Dual image optimization: <Image /> + getImage()
**Context**: React island images (ProjectCards, HeroSection) could only get Vite content-hashing, bypassing Astro's Sharp pipeline. [slug].astro pages already used <Image /> for responsive optimization.
**Decision**: Use <Image /> with responsive widths in [slug].astro for detail pages, and getImage() at fixed width in index.astro to feed Sharp-optimized URLs as props to React islands.
**Rationale**:
- Sharp gives 30-83% size reduction on WebP images beyond what Vite content-hashing provides
- <Image /> not available in React components (client:load islands), so getImage() bridges the gap
- 600px single width covers retina 2x for card grid (h-48); responsive srcset not needed for fixed-size cards
- The ~9 extra KB per variant from separate pipeline calls is negligible vs the ~40% median size reduction
- Rejected: using only Vite imports (no Sharp optimization for 8/9 pages), rejected: converting React islands to .astro (would lose interactivity)
**Rejected alternatives**:
- Vite-only (no optimization for 8 of 9 pages)
- Convert all React islands to .astro (would lose client interactivity)
- Pass raw ImageMetadata through serialized props (would trigger [object Object] bug again)
