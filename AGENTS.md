# AGENTS.md — HaikaiTech Portfolio

## Quick start
- `npm install` (Node 22+, npm only — verified in `.node-version`)
- `npm run dev` — dev server on port 4321 (Astro default)
- `npm run build` — output to `dist/`
- `npm run preview` — preview production build

## Architecture
- **Astro 6 + React 19 SSG** (client islands, no Next.js, no SSR)
- Pages: `src/pages/index.astro` (home), `src/pages/projects/[slug].astro` (detail)
- React components in `components/` — loaded as `client:load` islands
- Shared types in `types.ts`, data in `constants.tsx`
- Path alias `@/*` maps to project root (configured in `tsconfig.json`)

## Styling
- **TailwindCSS v3 via PostCSS** (`postcss.config.mjs`, `tailwind.config.mjs`)
- Custom CSS in `index.css` (paper texture, grid pattern, scrollbar)
- SVG decorations in `components/Decorations.tsx`
- Custom fonts: Inter, JetBrains Mono, Patrick Hand, VT323
- Custom colors: paper, charcoal, blueprint

## Image pipeline (critical — Astro quirk)
- React islands (`ProjectCard`, `HeroSection`) CANNOT use `<Image />` or `getImage()` — they live in `.astro` only
- **Dual pipeline**: `getImage()` in `index.astro` frontmatter (single fixed width per image) passes `.src` string props to React islands; `<Image />` in `[slug].astro` handles responsive srcset (200/400 for thumbs, 400/800/1200 for hero)
- `getImage()` returns `{ src, attributes }` — always use `.src` to get the URL string; never pass raw `ImageMetadata` objects across the Astro↔React boundary (causes `[object Object]` in SSR)
- 3 image import locations: `constants.tsx` (`.src` for React data), `index.astro` (`getImage()` calls), `[slug].astro` (`<Image />`)

## Deployment (Cloudflare Pages)
- Build: `npm run build`, output dir: `dist/`
- SPA fallback: `public/_redirects` contains `/* /index.html 200`
- Node 22+ required (Astro 6 constraint, `.node-version`)
- No `wrangler.toml` — static Pages site, not a Worker
- Manual deploy via Cloudflare dashboard (no CI/CD configured)
- Live at: **haikaitech.my**

## External services
- Cal.com booking via `@calcom/embed-react` in `components/CalBooking.tsx`
- Skill icons from `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/` (mapped in `constants.tsx`)

## What's NOT here
- No tests, no test framework, no test files
- No linter, no formatter, no lint/format scripts
- No CI/CD workflows (`.github/` doesn't exist)

## OpenCode context
- Cloudflare skill references live in `.agents/skills/` (installed by OpenCode, not app code)
- No `opencode.json` config exists
