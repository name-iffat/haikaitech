
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
