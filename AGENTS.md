# AGENTS.md — HaikaiTech Portfolio

## Quick start
- `npm install` (Node 20, npm only)
- `npm run dev` — dev server on port 3000
- `npm run build` — output to `dist/`
- `npm run preview` — preview production build

## Architecture
- **Vite 6 + React 19 SPA** (no SSR, no Next.js, no monorepo)
- Entry: `index.html` -> `index.tsx` -> `App.tsx`
- Types in `types.ts`, data in `constants.tsx`, components in `components/`
- Path alias `@/*` maps to project root (configured in both `tsconfig.json` and `vite.config.ts`)

## Styling quirks
- **TailwindCSS via CDN** (`index.html`), not PostCSS — inline tailwind config lives in `index.html` (custom fonts: Inter, JetBrains Mono, Patrick Hand, VT323; custom colors: paper, charcoal, blueprint)
- Custom CSS in `index.css` (paper texture, grid pattern, scrollbar)
- SVG decorations in `components/Decorations.tsx`
- To add or change Tailwind classes, you may need to update the inline config in `index.html`

## Dual resolution (React deps)
- npm-installed `react`/`react-dom`/`lucide-react` in `package.json` are used by Vite for bundling and TS types
- Browser runtime loads them from **esm.sh CDN** via importmap in `index.html`
- `@calcom/embed-react` is npm-only (no CDN importmap entry)

## Deployment (Cloudflare Pages)
- Build: `npm run build`, output dir: `dist/`
- SPA routing: `public/_redirects` contains `/* /index.html 200`
- Node 20 required (`.node-version`)
- No `wrangler.toml` — this is a static Pages site, not a Worker
- Manual deploy via Cloudflare dashboard (no CI/CD configured)

## Env vars
- `GEMINI_API_KEY` in `.env.local` — injected into `process.env` by Vite `define` but **not referenced in app source** (vestigial / for future use)

## What's NOT here
- No tests, no test framework, no test files
- No linter, no formatter, no lint/format scripts
- No CI/CD workflows (`.github/` doesn't exist)

## External services
- Cal.com booking via `@calcom/embed-react` in `components/CalBooking.tsx`
- Skill icons from `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/` (mapped in `constants.tsx`)

## OpenCode context
- Cloudflare skill references live in `.agents/skills/` (installed by OpenCode, not app code)
- No `opencode.json` config exists
