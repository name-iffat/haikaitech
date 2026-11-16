# Insights archive artwork

Implementation target: `insights-approved-v2.png`. Scope: `/blog/`, not individual articles.

Production asset: `src/assets/concept-decorations/refined/insights-notebook.png`.
Generated source: `exec-e61b5331-28ee-461f-bdcf-0410d6ea8bff.png`.
Reference: `exec-bc231cf7-e41c-423c-8534-4708c34ae8ab.png`.

The notebook and pen are conceptual decoration with empty alt text. The ruled sheet, article text, date, bookmark and binding marks are implemented in HTML/CSS. Astro supplies responsive WebP versions of the source PNG.

## Asset prompt

Use case: compositing / background-extraction. Extract/recreate ONLY the closed navy notebook and cream/blue pen from the TOP RIGHT of this approved HaikaiTech Insights page mockup as one isolated production decorative raster asset with genuinely transparent alpha background. Remove the ENTIRE large foreground cream article sheet so the full closed navy notebook is revealed. Remove ALL page UI text, headings, ruled sheets, yellow bookmark, borders, background, grid dots, handwritten notes. The notebook is dark navy painted leather/clay with fine dry tactile texture, rounded corners, a slim elastic band, subtle page edges, leaning about 8 degrees clockwise; the separate cream pen with blueprint blue clip/tip lies along the right edge at the same viewpoint. Retain exact proportions and soft local contact shadows. Book angled top-down three-quarter view matching mockup, no additional objects, no faces, no gradients, no glowing effects. No text anywhere on the notebook or pen; its eventual label can be real HTML elsewhere. Book and pen fully visible with modest even transparent padding on all sides, no clipped parts, no checkerboard or white background. Palette navy #16202A, blueprint #1E3A8A, cream #FDFBF7. Asset is background decoration behind a real HTML featured article, not a screenshot.

## Implementation interpretation

- Preserve the concept's hierarchy and materials, with readable live text sourced from real posts.
- Keep all eight current posts in the archive, including the featured post.
- No numbered row bullets, margin slogans, extra arrows, or decorative motion.
- Filters include preferred subjects and primary article tags, so future content can join the index.
- The shared archive footer retains `source: footer` for its subscription form.
