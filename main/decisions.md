
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
