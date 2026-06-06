# Project Plan: Keystatic Integration (Static-First CMS)

## Objective
Integrate **Keystatic** to provide a visual dashboard for managing portfolio projects while maintaining a **100% Static (SSG)** architecture. Content will be stored as local files (YAML/Markdown) and synced via Git.

## Phase 1: Local Setup & Installation
- [x] Install Keystatic dependencies (`@keystatic/core`, `@keystatic/astro`)
- [x] Astro 6 Compatibility: Install `@astrojs/markdoc` and move config to `src/content.config.ts`
- [x] Initialize `keystatic.config.ts` with a "Projects" collection
- [x] Add `keystatic()` and `markdoc()` integrations to `astro.config.mjs`

## Phase 2: Content Migration & Performance
- [x] Define Astro Content Layer schema in `src/content.config.ts`
- [x] Migrate projects from `metadata.json` to individual `.mdoc` files in `src/content/projects/`
- [x] Update `ProjectsSection.tsx` to use `getCollection('projects')`
- [x] Optimize images: Add `lazy` loading for cards and `eager` loading for LCP images

## Phase 3: Production (GitHub) Setup
- [x] Configure `storage.kind: 'github'` in `keystatic.config.ts` (targeting `feat/keystatic-integration` branch)
- [ ] Manual: Register GitHub App and generate Client ID/Secret
- [ ] Manual: Add `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, and `KEYSTATIC_SECRET` to Cloudflare Pages

## Phase 4: Verification
- [x] Verify local dashboard at `/keystatic`
- [x] Verify site builds statically with new content layer
- [ ] Test online project editing and GitHub auto-commit workflow
