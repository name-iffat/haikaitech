---
name: HaikaiTech Solutions V2
description: A founder-led digital engineering workshop for Malaysian businesses.
colors:
  paper: "#FDFBF7"
  ink: "#16202A"
  blueprint: "#1E3A8A"
  tape: "#F4D35E"
  mint: "#0F9F75"
  grid: "#CBD5E1"
  line: "#D7DCE2"
  white: "#FFFFFF"
typography:
  display:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "clamp(3.5rem, 8vw, 8rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.06em"
  headline:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 5rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.045em"
  body:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.12em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "16px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "14px 20px"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "14px 20px"
  status-live:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "7px 10px"
---

# Design System: HaikaiTech Solutions V2

Article reading refinement — 2026-10-03: mobile article mastheads use 38–46px titles, one metadata row, and no duplicate workshop docket. The generated contents list uses a native disclosure: open on desktop, initially collapsed on mobile, with all links available without JavaScript. Heading anchors clear the sticky navigation. On article pages the floating contact launcher stays hidden during mobile reading and returns after the reading sheet; the closing project actions remain in the document. For the marketplace-readiness article, use the polished three-role illustration on desktop with descriptive alt text; switch to the live-text three-role diagram on mobile so labels stay legible. Keep the planning note explicit that stock/order syncing requires separate planning. Preserve cream paper, blueprint icons, fine rules and quiet notebook lines. Article language is declared in frontmatter and drives page language, structured data and surrounding reader controls; published article URLs remain stable.

Bilingual rollout — 2026-10-03: English remains at the existing routes; Bahasa Malaysia uses `/bm/` equivalents. Localized pages reuse the approved V2 workbench system, project evidence and illustrations. The EN / BM selector is a quiet text control in the desktop navigation and mobile Workshop Index, with a clear current-language state and visible keyboard focus; do not style it as a prominent pill or add a new accent color. Switch to the equivalent page when translated content exists. Until translated, Insights and Solutions destinations are explicitly marked `(EN)` and remain on their English routes. Do not redirect based on browser language. Begin with the homepage, services/pricing, Automation and Ecommerce; keep published English article titles intact and identify their language rather than implying the articles have been translated.

Client strip motion — 2026-10-03: the verified client logos travel slowly right to left in one seamless CSS loop. Repeat the same list visually once, with the repeated list hidden from assistive technology and without duplicate links. Pause on hover, keyboard focus, or the visible Pause/Play control. Reduced-motion users receive the original manually scrollable strip without animation or a duplicate list. Preserve the heading, verified assets, logo proportions and project destinations; no new client claims or decorative effects.

Homepage service extensions refinement — 2026-10-03: “Extend the build” uses two open illustrated service columns, with a generated enquiry-to-AI-helper-to-human-review assembly and the existing ecommerce storefront, parcel and receipt illustration. This extends the service character language to these two homepage previews. Show the entire illustration without cropping or framing, using responsive, lazy-loaded WebP derivatives. Keep explanations, workflow labels, platform names and service links as live HTML; conceptual artwork does not constitute client proof. Use the existing cream, ink, blueprint and yellow palette, fine dividing rules, and no decorative hover motion. Desktop pairs the services; mobile stacks the complete image and explanation for each service. Preserve the existing service routes and the Tech, tools & toys disclosure.

Service-detail clay assembly refinement — 2026-09-21: the Automation and Ecommerce service-detail heroes use static, aria-hidden painted-clay workshop assemblies. Automation depicts a conceptual switchboard, cables and human checkpoint; Ecommerce depicts a conceptual storefront, parcel and handoff papers. Paper, ink, blueprint and yellow remain the only material colors, with mint reserved for the automation status marks. These illustrations are not product interfaces, client proof or outcome claims. Keep live HTML copy, the existing conversion structure and the flat shared button system; do not spread this clay treatment into navigation, client proof or unrelated page sections.

Service-detail character refinement — 2026-09-21: replace the flat CSS service assemblies with two contained, smooth painted-clay hero illustrations: a workflow helper and connected modules for Automation; a shop-floor helper, storefront, parcel and receipt for Ecommerce. Their characters are decorative and restricted to these two service hero panels. Keep the typography, all copy, actions, semantic heading structure and project proof live in the page. n8n, Hermes, Shopify and WooCommerce appear only as small technical identifiers within the conceptual illustrations, never as customer logos, claims of partnership or primary brand elements.

Renewed monogram rollout — 2026-09-21: use the renewed dimensional HT monogram as a compact brand stamp, paired with rather than replacing the readable `HAIKAITECH_` wordmark. Place it at 32px in the shared navigation, once beside the oversized footer sign-off, and across the favicon, Apple touch icon and web-app icon set. Treat the monogram's built-in blue shading as finished brand artwork: do not add glass, clay, shadows, tape or animation to it, and do not repeat it in section headings, client proof or decorative scenes. Retain the 565px transparent source in `assets/logo/logo.png` as the master; serve the prepared 192px export for interface use.

Insights archive implementation — 2026-09-20: carry the approved notebook concept into `/blog/` with “Notes worth keeping.” as live HTML, a latest-article ruled sheet, a closed navy notebook and cream/blue pen behind it, binding marks and one yellow bookmark. Keep the generated artwork decorative and every article title, date, description, reading-time estimate and destination sourced from the existing collection. Below it, use an open ruled article index with all posts, not repeated cards or numbered bullets. Topic filters are text buttons with visible selected/focus states, live result counts and shareable `?topic=` URLs; all articles remain available without JavaScript. New posts update the latest sheet and archive at build time. Mobile stacks the headline and paper scene, wraps topic controls and shows metadata above each article. Reuse the shared V2 navigation/footer and painted-blue project CTA; preserve the archive footer subscription source. No repeated status dots, decorative CTA arrows, hovering paper, new colors or changes to individual blog pages or the homepage notebook.

Insights article implementation — 2026-09-22: individual `/blog/[slug]/` pages now use the shared V2 navigation and footer, a field-note masthead, an immediate generated contents panel, a full-width ruled reading sheet, compact workshop metadata, an editorial project CTA and an open related-notes index. Keep all Markdown content, collection-driven metadata, JSON-LD, newsletter source, contact destinations and canonical URLs unchanged. Use paper, ink, blueprint and line tokens; do not add generic card grids, gradients, bright platform-green CTAs, repeated status dots, a competing sidebar note or invented article imagery. The reading sheet is a responsive editorial surface with tables remaining horizontally readable. New posts inherit the same shell automatically.

Insights article structure refinement — 2026-09-22: follow the useful information sequence observed in strong long-form service articles: masthead context, author/date/read metadata, an immediate “In this article” table of contents, readable long-form content, related notes and a clear project close. The table of contents is generated from each post’s real level-two Markdown headings, uses sequence numbers because they communicate navigation position, and links to the rendered heading IDs. Keep the HaikaiTech paper/workbench language and do not borrow reference-site gradients, logos, color systems or promotional claims.

Solutions / Business Toolkit approval — 2026-09-20: use the approved playful stationery concept at `/toolkit/`, retaining its canonical route and live tool destinations. “Less paperwork. More doing.” is live HTML beside a large painted-clay calculator, document tray and curling receipt assembly. Three separate stationery objects identify Invoice Generator, Quotation Builder and Receipt Maker in open columns with fine rules; their names, descriptions and links remain HTML. Purchase Order and Payroll remain non-clickable “In development” entries. Use existing cream, ink, blueprint, yellow, dots, mono labels and restrained handwritten notes. Reuse the painted blue CTA, shared V2 navigation and footer; keep one newsletter signup with `source: toolkit`. On tablet, pair each tool image with its text; on mobile, stack the hero and each tool, preserving all actions. Illustrations are conceptual stationery, not real client documents. Navigation must link back to homepage anchors from inner pages. No new live dots, glass, gradients, hover-only functionality or repeatable decorative animations.

Footer approval — 2026-09-19: the homepage closes with a cream workshop sign-off: one newsletter form, Explore and Resources/Elsewhere link groups, oversized live HAIKAITECH_ wordmark, one blue handwritten annotation, and company/SSM/payment/legal metadata. Reuse the painted-blue button treatment for Subscribe. Consolidate the duplicate homepage signup and redundant Start Project block; preserve the old #start anchor at Contact, subscription endpoint/source/analytics, contact destinations and resource/legal links. Remove the nonfunctional Resume label and stale static Last updated date from this homepage variant. Other pages retain the legacy footer. Mobile places newsletter first, compact link columns next, then fluid wordmark and stacked company/legal details. No new mascot, pins, tape or status dots.

About composition approval — 2026-09-19: implement the approved compact studio introduction on the left with the full connected Systems Operator assembly on the right. Consolidate the former secondary heading and paragraph into the existing studio introduction; retain the three live capability rows and project CTA. Remove the Systems map sticker. Mobile order is heading/introduction, illustration, capabilities, CTA. The About CTA uses blueprint blue with subtle static painted grain and restrained clay edge shading, matching the approved concept; keep the real text above the texture and the button arrow-free, keyboard accessible and high-contrast. This localized button exception does not change other sections.

Arrow hierarchy — 2026-09-15: use arrows for actual paging/carousel controls or one handwritten annotation that points to specific evidence. Keep homepage CTA buttons text-only; remove trailing decorative arrows from buttons, project and article lists, and icon-plus-label social links.

Homepage section labels — 2026-09-15: remove the sequential `NN /` prefixes from section eyebrows. Keep the plain-language labels and preserve numbering used for service rows, capability metadata, projects and notebook pages.

Selective icon language — 2026-09-18: replace repetitive service, capability, contact-brief, project-process and mobile-navigation bullets with a restrained set of single-stroke Lucide-style icons. Use blueprint ink at 18–22px beside the existing labels, with no decorative icon badges or mixed icon libraries. Keep numbers when they communicate sequence or page position, including notebook pages and project position metadata.

Status signal refinement — 2026-09-16: use `LIVE` and `DEMO` as textual project metadata rather than repeating green/blue dots on every work sheet. Mint remains reserved for semantic current-state feedback, including the Hero's single “Accepting projects” marker; decorative footer presence dots are removed.

Material vocabulary refinement — 2026-09-16: do not attach every work object with yellow tape. Keep one tape anchor in the Hero and one on a flagship work sheet; use flat ink pins sparingly to secure selected sheets, a single blueprint paper sticker only when it labels a real project function, and no attachment treatment on the archive rail. Pins use an oblique top-down push-pin silhouette—elliptical cap, tapered stem, paper highlight and short cast shadow—rather than a flat circle. Pins and stickers use existing paper, ink, blueprint and line tokens—never glossy, animated or piled together. The About illustration uses one “Systems map” blueprint sticker; the notebook keeps its existing bookmark.

Pin clay refinement — 2026-09-16: user approved stronger clay depth for the existing pins, superseding the flat ink pin treatment above. Use the blueprint token for a rounded elliptical cap, short neck and broad foot, with soft paper-toned upper-left inset lighting, ink shading and a local contact shadow. Keep the oblique view static, preserve current attachment locations and scale the whole silhouette down on mobile. This material exception applies to pins and the approved contact cloud; buttons and paper stickers remain flat.

Hero collage refinement — 2026-09-16: remove the drafting board from the Hero because it competes with the full-scale project collage. Preserve the warm cream canvas and quiet dot grid; let the real HSS, workforce and Fuzzfloor prints form the Hero’s visual mass. On desktop, the Hero fills the viewport beneath navigation and the collage fits without compressing its layered proportions. The handwritten “built for real work” note overlays the collage as a small paper annotation in blueprint-blue ink with its single arrow visible. Hero CTAs use restrained clay depth: “Start a project” is blueprint-blue with a brighter upper-left hover highlight; “Explore work” is paper-white with blueprint-blue type and border. Neither uses gradients or ambient gloss. The drafting board, ruler, pen and coffee assets remain unused Hero concept references. On mobile, retain only tape and pin at reduced scale; hide the handwritten note.

Contact material refinement — 2026-09-15: user approved a matte clay treatment specifically for the yellow idea cloud: softly inset edge shading, a top-left paper-toned highlight, fine static grain and a short contact shadow. Navy receives quiet grain; the contact sheet retains warm paper texture. Text stays live and unfiltered. This localized material treatment does not introduce glossy surfaces or alter the flat button system.

Floating contact launcher exception — 2026-09-17: the single “Start a project” launcher may use a translucent, frosted paper surface to remain legible over changing project imagery. Keep its blue icon and ink text high-contrast, use no gradients or ambient glow, and restrict this glass treatment to the floating launcher and its two contact actions.

Mobile navigation refinement — 2026-09-17: retain the desktop workbench bar, but make the mobile menu a full-screen “Workshop index.” Use oversized ink destination names, blueprint mono row numbers, a quiet dotted-paper ground, one yellow handwritten prompt and one clear project CTA. The menu button remains in the header as a compact blueprint control that turns into a close mark. This borrows confidence and playfulness from the old site’s navigation behavior without copying another studio’s visual system.

Desktop navigation frosted capsule — 2026-09-21: retain the HaikaiTech wordmark on the paper header, but group the five desktop destinations inside one centered, translucent paper capsule with a restrained background blur, white hairline and one soft shadow. Keep link text in ink, use blueprint for hover, focus and the current destination, and keep the single Start a project action as a separate translucent blueprint capsule aligned right. This is a navigation-only glass exception inspired by the reference's confident grouping, not a copy of its dark atmospheric background, dropdown structure or typography. Use only existing paper, ink, blueprint and shadow tokens; no gradients, ambient glow, inset clay ridges or decorative motion. The approved mobile Workshop Index remains unchanged.

Contact variant — 2026-09-15: headline reads “Got a big idea? Let’s build it.” with “big idea?” rendered as live text inside a rounded, scalloped yellow cloud. The slightly tilted cloud supplies the expressive scale requested by the user; use the existing ink and tape tokens, with “Rough sketches welcome” as the handwritten annotation. Keep the contact sheet, destinations and tracking.

Contact implementation — 2026-09-14: the next section uses an ink background, oversized “Good ideas. Let’s make them work.” invitation, and a taped cream project-brief sheet. Three prompts help visitors describe their business, proposed improvement, timeline and budget. WhatsApp is primary, email secondary, and all existing social destinations and contact tracking are retained. Mobile stacks the invitation and sheet. This is the current review implementation; the following Start Project and footer sections remain separate pending their redesign.

Latest Selected Work approval: retain the current five recent project sheets. Replace only the remaining-project disclosure with a native horizontal screenshot rail containing all 15 previous live/demo projects. Include existing skills under “Tech, tools & toys”, case-study links and live-site links. Show a partial next sheet, keyboard-accessible previous/next controls, touch scrolling and no autoplay or vertical-scroll interception. This supersedes the closed archive disclosure below.

Latest Services approval: replace the legacy skills-card grid with the approved editorial service menu. It is four numbered service rows—business websites, business systems, digital products & experiences, and website care—each with outcome-led copy, a real project object where available, a clear destination, and one controlled handwritten note. The full existing skills catalogue is retained in the native “Tech, tools & toys” disclosure. “Serious builds. A little character.” is the section headline; the word “character” receives the one yellow highlight. Preserve the existing `/services/` page as the complete services and pricing destination. This section extends the approved Workbench direction and does not authorize changes to following homepage sections.

Latest About approval: position HaikaiTech as a capable digital engineering studio, not a one-person agency. The section headline is “Business thinking. Engineering depth.” Its visual proof is one original painted 3D workshop-systems illustration—website, dashboard and data infrastructure connected by cables—used as a decorative explanation of the scope, not a client screenshot or performance claim. Pair it with three live HTML capability rows: Experience, Operations and Engineering. Use the approved ink, paper, yellow, mint, grid and blueprint tokens; keep the composition compact, tactile and commercially clear.

Workshop Crew / About implementation — 2026-09-18: the approved Systems Operator is the first and only character implementation in this phase. It lives inside the About systems illustration as an `aria-hidden` painted-clay assembly that connects a website, dashboard and data store by cable; it never sits beside or obscures the headline. Use ink and paper as the dominant surfaces, blueprint for the system connection and exactly one yellow tape mark. Do not add mint, robot accessories, animation, gradients, glass or interface text. Preserve all existing live About copy, capability rows and CTA. On mobile, keep the same full illustration plate at a contained scale. Hero, Trust and Contact remain character-free.

Workshop Crew / Services implementation — 2026-09-18: add one `aria-hidden` Browser Builder to the Business websites row only. It is a small painted-clay helper, visually emerging from behind the lower edge of the existing real Fuzzfloor screenshot and holding a blueprint-blue cable; it never covers the service title, outcome copy or link. The one supporting handwritten annotation reads “built to earn its keep”; remove the repeated decorative service scribbles and the arrowed header note. Every service row receives one restrained physical workshop assembly: data/cable pieces behind the real MZE dashboard, a blueprint product workbench behind the real AA Burger surface, and a care toolkit behind the live care checklist. These contextualize rather than replace the real project proof. Preserve the four live service rows, verified project surfaces, destinations and Tech, tools & toys disclosure. This section uses paper and ink as its dominant surfaces, blueprint for the cable/note/icons and the existing single yellow headline highlight—no mint, new tape, pins, robot accessories, animation, gradients, glass or invented client proof. On mobile, keep the same character and physical objects attached to their service surfaces at a contained scale. Hero, Trust and Contact remain character-free.

Workshop Crew / Services scale refinement — 2026-09-18: desktop proof screenshots and foreground objects may grow modestly when their service row remains readable as a four-column editorial composition. Keep background assemblies within the object column so outcome copy and destination links never sit beneath decoration. Preserve the contained mobile scale and the same real-proof-first hierarchy.

Services editorial grid refinement — 2026-09-18: keep the desktop service title track intentionally narrow so the heading and physical proof read as one composition rather than a title floating in an empty column. Reallocate the reclaimed width to the object and outcome columns; below the desktop breakpoint, retain the stacked mobile service layout.

Latest Insights approval: replace the homepage blog card grid with an open notebook. The left page is a contents list of the three latest existing articles; the right page opens the newest entry, with ruled lines, binding marks, small page numbers and one yellow bookmark. Keep all titles, dates, descriptions, tags and routes sourced from the existing blog collection. The notebook is an editorial surface, with one readable link per entry and a clear route to all field notes.

Insights interaction update: the notebook contains four newest articles. On desktop it is a real two-page spread: a page turns from the right across the binding and settles into the left-hand stack while the next note is revealed on the right. Previous/Next controls sit at the vertical midpoint of the spread edges. Horizontal touchpad scrolling and horizontal finger swipes advance one page at a time; vertical scrolling remains page scrolling. On mobile the notebook becomes a single-page sequence: the contents page is the first state, then each reading page replaces it one at a time. The final page is an “Open all field notes” route to `/blog/`. Controls are real buttons with page position, visible focus states, touch-sized targets and reduced-motion support.

Motion system approval — 2026-09-21: keep motion sparse, functional and initiated by the user. Hero and painted buttons use 100ms tactile feedback. The mobile Workshop Index uses a 200ms opacity-and-translate entrance while its menu icon morph remains 100–150ms. The project rail retains user-invoked smooth scrolling and the notebook retains its 380ms signature page turn. The contact launcher appears in 200ms and reveals its actions in 150ms using only opacity and transform; it never auto-expands and never animates width, padding or layout. Decorative workshop objects remain static. Disable nonessential transitions and animation under `prefers-reduced-motion`. Do not add scroll reveals, parallax, autoplay, wobble or staggered decorative motion.

## 1. Overview

### Approval status

The user selected **A — Editorial Workbench** ("go A"). Approved direction: left-aligned commercial headline with an overlapping, taped composition of real project screenshots, preserving HaikaiTech's workshop identity. B and C are not the implementation direction.

The user approved the refined desktop and mobile pair ("approve"). `design-concepts/hero-a-desktop-refined.png` and `design-concepts/hero-a-mobile-refined.png` are the visual targets for **navigation and hero implementation only**. Other component proposals below do not authorize full-site implementation.

Refinement proposal: raise desktop copy, use Inter for body copy, stack copy/actions before project imagery on mobile, and retain a compact wordmark/menu header. Target review viewports are 1440px desktop and 390px mobile; generated raster dimensions are not browser viewport measurements. Original repository screenshots must replace generated approximations during implementation. Keep dots quieter than text and verify 48px mobile action targets, source image proportions, and overflow in the browser. Do not infer current availability from decorative status marks.

Current phase: navigation, hero and **02 / Trust** are approved for implementation. Trust is a compact proof rail directly below the hero, not a testimonial or logo-card section: it uses the live heading “Our amazing clients” above one continuous horizontal strip of supplied client-logo files, following the clean logo-strip rhythm of the reference while remaining HaikaiTech-specific. It uses only logos paired with an existing published case-study route or a verified live project destination, including the Zakrul web-design engagement at `https://zakrul.com/`. Do not infer future client entries from additional logo assets; add them only when their corresponding project content is approved. The SSM identifier remains available in the footer rather than competing with the logo proof. On narrow screens, the strip stays one row and can be swiped horizontally. Selected work remains a later phase. Homepage navigation is isolated from legacy inner-page navigation; Solutions links to the existing toolkit until its own IA is approved. The approved oversized headline uses tightly tracked Inter 700; project images retain their original aspect ratio rather than reproducing generated image distortions.

**Creative North Star: "The Digital Workshop Wall"**

### Approved hero dashboard addition — 2026-09-13

Latest hero selection: HSS Wireless CCTV replaces AVS in the dominant desktop screenshot position, using a real 1280 × 960 capture of `https://wirelesscctv.com.my/` and linking there. This supersedes the AVS hero selection below, but does not remove AVS from existing projects or Trust. The workforce dashboard and Fuzzfloor phone retain their composition.

Mobile metadata correction: "Accepting projects" belongs in the mint status row with founder-led and Penang proof, matching the reference hierarchy. The handwritten hero annotation reads "built for real work" on larger screens and is suppressed on mobile to avoid colliding with the project captions.

Selected Work approval — 2026-09-14: implement the approved `selected-work-desktop-v1.png` / `selected-work-mobile-v1.png` direction as a featured-work editorial section. Use HSS Wireless CCTV as the first live project with its real capture, a mint `Website / Live` signal and a link to the supplied site. Keep MZE Worker System marked `Demo`; preserve the existing project catalogue through a compact work index rather than removing access or returning to the legacy card grid. The section uses the existing paper, line, blue, mint, tape and pinned-sheet tokens.

Implementation refinement: the full work index is a native closed-by-default disclosure. Its summary previews MZE Worker System / Demo and Fuzzfloor / Live, while opening it exposes every existing project link. This keeps the approved section compact on mobile and preserves catalogue access.

Selected Work visual revision — 2026-09-14: supersedes the single HSS feature composition. The five explicitly supplied newest builds—MZE Worker System (Demo), HSS Wireless CCTV, AA Burger Kiosk, CityThree and Kopi Tebu—are all visible as distinct real screenshot sheets. MZE and HSS anchor the desktop work wall; the three remaining sites form a deliberately uneven lower row. On mobile, the same five sheets stack in that order. Each capture keeps its natural source proportion; existing catalogue entries remain available in the closed-by-default workshop archive. This revision uses only the approved paper, line, ink, mint, tape and blueprint tokens.

Follow-up: Fuzzfloor uses its real 430 × 860 mobile homepage capture, displayed in a slim paper-colored phone frame beside the wide workforce dashboard. Keep both visible side by side at desktop and mobile widths, preserve the 1:2 screenshot ratio and label it "Fuzzfloor / Mobile". The phone silhouette is a device presentation, not a new card style. Existing project/case-study imagery elsewhere remains unchanged.

Use an actual capture of `https://mzdemo.haikaitech.my/` as a smaller foreground sheet, with AVS remaining dominant and Fuzzfloor retained as supporting website evidence. Label the linked capture "Workforce management / Demo"; its sample metrics are not client outcomes, and it does not authorize a new Trust logo. Preserve the screenshot's real interface colors and Demo Mode marker within the existing paper/tape framing. On mobile, enlarge the dashboard relative to the collage and reserve enough vertical space for all three project links. Navigation, copy, Trust and Selected Work are unchanged by this addition.

HaikaiTech V2 is a disciplined engineering notebook made for the web. Warm paper, a quiet dotted grid, real project screenshots and small physical cues make the site feel assembled at a workbench. The visual identity stays recognisable, but the company is now the protagonist: services, work and business value lead; the founder provides the human proof behind them.

The register is confident, practical and founder-led. Use large sans-serif hierarchy for commercial clarity, monospace labels for system metadata, and handwriting only as a short annotation. Yellow tape, arrows, status marks and project IDs are controlled irregularity on top of a precise grid. The site must feel like a mature Malaysian software studio, not a solo résumé, a generic corporate agency, or an AI-generated SaaS template.

**Key Characteristics:**

- Warm engineering paper with a quiet dotted blueprint grid.
- Real work presented as pinned evidence, not a gallery of equal cards.
- Business outcomes before frameworks; technology as supporting proof.
- Founder visibility without making the founder the product.
- Flat, tactile surfaces with restrained shadows and intentional tape accents.

## 2. Colors

The palette is a full but restrained workshop palette: paper and ink carry most of the page, blueprint blue explains structure, yellow marks attention, and mint signals a live system.

### Primary

- **Workshop Ink** (#16202A): Headlines, primary actions, terminal surfaces and the dark final CTA.
- **Blueprint Blue** (#1E3A8A): Links, technical annotations, section rules and selected interactive emphasis.

### Secondary

- **Masking Tape Yellow** (#F4D35E): Tape, underlines and one focal highlight at a time. It is never used as body text on paper.
- **Build Mint** (#0F9F75): Live status and success feedback only. It is not a general decorative accent.

### Neutral

- **Drafting Paper** (#FDFBF7): Page background and the default canvas.
- **Paper White** (#FFFFFF): Pinned sheets, image frames and form surfaces.
- **Quiet Grid** (#CBD5E1): Dotted grid substrate and low-emphasis metadata.
- **Draft Line** (#D7DCE2): Borders, dividers and field strokes.

### Named Rules

**The One Mark Rule.** A section may use yellow, mint or blueprint as an emphasis, but never all three as competing decoration. Accent color must explain hierarchy.

## 3. Typography

**Display Font:** Inter (with Arial, sans-serif fallback)

**Body Font:** Inter (with Arial, sans-serif fallback)

**Label/Mono Font:** JetBrains Mono (with monospace fallback)

**Annotation Font:** Patrick Hand for short human notes only.

**Character:** Inter remains part of the existing HaikaiTech identity, but gains stronger scale contrast and tighter display tracking for studio confidence. JetBrains Mono turns project IDs, status labels and terminal cues into useful metadata. Patrick Hand is a physical note in the margin, never a paragraph font.

### Hierarchy

- **Display** (700, `clamp(3.5rem, 8vw, 8rem)`, `0.92`): Hero statement and one-off brand moments.
- **Headline** (700, `clamp(2.25rem, 5vw, 5rem)`, `0.98`): Section statements and case-study titles.
- **Title** (700, `clamp(1.35rem, 2vw, 2rem)`, `1.1`): Project, service and field-note names.
- **Body** (400, `1rem`, `1.65`): Client-facing explanation, capped at roughly 65–75ch.
- **Label** (500, `0.6875rem`, `0.12em`, uppercase): Project metadata, status and navigation utility labels only.

### Named Rules

**The Client-First Rule.** Headlines explain the business problem or useful outcome before a framework or tool appears.

## 4. Elevation

HaikaiTech is flat by default. Depth comes from paper layered over the grid, image frames, clipped tape and small structural shadows. Shadows are soft and local, never a glowing halo. Dark ink sections provide tonal contrast instead of gradient effects. Interactive elements may lift by 2–4px, but no animation should move layout or obscure reading.

### Shadow Vocabulary

- **Pinned sheet:** `0 10px 30px rgba(22, 32, 42, 0.08)` for a paper object or hero screenshot.
- **Raised action:** `0 6px 16px rgba(22, 32, 42, 0.12)` on hover for primary buttons and featured work.
- **No ambient glow:** blurred color blobs and glassy halos are prohibited.

### Named Rules

**The Workbench Rule.** If an element looks like it is floating without being pinned to a composition or a user action, remove the shadow and give it a clearer structural role.

## 5. Components

The component language is editorial and tactile. Every primitive should work as a real information surface before decoration is added.

### Buttons

- **Shape:** Square-tactile corners with a small radius (4px), never a pill by default.
- **Primary:** Workshop Ink background, Paper text, 14px × 20px padding, monospace label. Keep CTA labels text-only; use concise action wording instead of decorative trailing arrows.
- **Hover / Focus:** Background shifts to Blueprint Blue or a 2px translateY lift. Focus uses a visible 2px Blueprint Blue outline with 3px offset.
- **Secondary:** Paper background with a Draft Line border. It can carry a yellow tape tab, but does not become a competing primary button.

### Chips

- **Style:** Compact monospace metadata with a Draft Line border or a status color wash. Use only for project tags, sectors and status, not for every piece of copy.
- **State:** Live is mint, demo is quiet gray, selected navigation is ink with a paper underline.

### Cards / Containers

- **Corner Style:** 4px for workbench sheets, 8px for utility surfaces, 16px only for existing form or editorial shells that benefit from softer grouping.
- **Background:** Paper White over Drafting Paper; dark containers use Workshop Ink.
- **Shadow Strategy:** Refer to Elevation. One meaningful layer, never nested card stacks.
- **Border:** 1px Draft Line for structure; avoid decorative border grids around every section.
- **Internal Padding:** 24px standard, 32–48px for feature work and CTAs.

### Inputs / Fields

- **Style:** White or Paper surface, 1px Draft Line, 4px radius, 12px–14px padding.
- **Focus:** Blueprint border plus a visible outline; do not rely on color change alone.
- **Error / Disabled:** Plain-language error below the field; disabled state uses muted text and reduced contrast without removing the label.

### Navigation

- **Style:** A compact paper workbench bar with a wordmark, six destinations (Home, Work, Services, Solutions, Insights, About) and one clear Start a project action.
- **Default / Hover:** Ink text, Blueprint hover, a 1px underline or label shift instead of icon-heavy pills.
- **Mobile:** One wordmark and one menu button. The overlay contains the six destinations plus the single CTA, with no secondary utility clutter.

Navigation clarity update — 2026-09-22: expose `Home` as an explicit first destination in desktop navigation and the mobile Workshop Index. Keep the wordmark linked to the homepage as a secondary familiar shortcut for users who recognise it as home.

Desktop sticky navigation refinement — 2026-10-03: keep only the centered desktop destination menu sticky at the top while scrolling. The wordmark, language switcher and header `Start a project` action remain in the normal top row and scroll away; the existing floating contact launcher remains available. Preserve the existing translucent paper menu and dropdown behavior. Hover/focus on service rows uses blueprint fill, paper text and yellow technical metadata; the all-services action uses tape yellow with ink text. Use existing tokens only and keep keyboard focus visible. Mobile keeps its current sticky wordmark and Workshop Index menu; do not add a second sticky navigation treatment.

### Signature Components

- **Project Showcase:** A large real screenshot, project ID, client/sector/service metadata, a one-sentence business value statement and a case-study link. Three flagship projects receive visual weight; the rest stay in Work.
- **Service Row:** A numbered editorial row with outcome-led copy, examples and a disclosure-style detail panel. It must remain readable without hover.
- **Workshop Note:** A small handwritten annotation or yellow tape strip that points to evidence. Decorative SVGs use `aria-hidden="true"`.

## 7. Service expansion approval — 2026-09-21

Keep the four approved editorial rows on the homepage as the core service story. Add a compact `Extend the build` register beneath them with two entries: **AI agents & workflow automation** and **Ecommerce storefronts**. The register is a directional bridge, not a generic card grid; use connected blueprint marks for automation and a restrained storefront/receipt assembly for ecommerce.

Create two dedicated, crawlable pages using the same workbench system:

- `/services/automation/` — Hermes agent setup, n8n workflow orchestration and custom scripting, explained through useful business jobs, human checkpoints and handover.
- `/services/ecommerce/` — Shopify and WooCommerce builds, explained through storefront choice, catalogue/customer journey, payments/fulfilment and ongoing ownership.

The desktop Services navigation may open one cream, translucent workbench dropdown containing the existing four services plus these two additions and an `All services & pricing` link. The mobile Workshop Index remains the approved full-screen menu. The dropdown uses real `details`/`summary` semantics, Escape/outside close, visible focus and `aria-expanded`/`aria-controls`; it must not become a mega-menu or add a second navigation style.

Both detail pages use live HTML copy and compact editorial rows, not generic SaaS cards. Use only existing paper, ink, blueprint, tape and mint semantic tokens. Automation visuals may show conceptual trigger/agent/workflow connections; ecommerce visuals may show a conceptual storefront, product sheet and receipt. Existing project screenshots are the only client proof and must retain their verified/demo labels. Do not invent outcomes, client names, pricing or adoption statistics. Keep gradients, glow, excessive glass and decorative motion out of the new pages. Preserve the existing `/services/` pricing route and all current homepage functionality.

Mobile usability refinement — 2026-10-03: keep the approved mobile Workshop Index and homepage compositions. At narrow widths, keep the footer monogram and wordmark together without creating page-level horizontal scrolling; contain the pricing worksheet/ruler inside its illustration area; allow service-detail section headings and descriptions to shrink within their grid; and give breadcrumbs and footer policy/navigation links comfortable touch targets. Preserve all desktop layouts, content, existing palette and destinations.

Mobile navigation refinement — 2026-10-03: keep the sticky wordmark and full-screen Workshop Index. Make Services a native nested disclosure containing a Services overview, all six existing service destinations, and the existing Services & pricing route. Mobile navigation rows use existing blueprint fill, paper ink and tape metadata on hover, keyboard focus and pressed states so feedback works consistently on touch; preserve visible focus, large labels and 44px+ touch targets. Escape closes the nested disclosure first, then the Workshop Index. Desktop navigation is unchanged.

Mobile navigation readability refinement — 2026-10-03: make the Workshop Index easier for older readers with sentence-case destination labels at 24–30px, 15px explanations, and service names/descriptions at 18px/14px. Use familiar house, website, toolbox, checklist, notebook and company icons in the existing single-stroke blueprint style; identify automation with a small helper and ecommerce with a shopping bag. Keep icons unboxed. The cream paper receives quiet grain and a lower-contrast dot grid; a single yellow underline and the existing handwritten prompt retain the workshop character. Use explicit Menu/Close and Show/Hide labels with proper SVG controls. Keep Close visible above scrolling content, lock the page behind the overlay, contain keyboard focus and restore the page when dismissed. Language choices use readable English/Bahasa Malaysia labels. Maintain localized routes, all six service links, overview/pricing access and keyboard/reduced-motion behavior.

## 6. Do's and Don'ts

### Do:

- **Do** preserve the warm cream paper, subtle blue dotted grid, deep ink, masking tape yellow and mint status language.
- **Do** lead with websites, business systems, dashboards, automation and digital products before mentioning React, .NET, Astro or Unity.
- **Do** show real project screenshots and verified client names from the repository; use qualitative value statements when measured outcomes are unavailable.
- **Do** make founder-led, Malaysia-based and direct communication visible as advantages of a small studio.
- **Do** use semantic headings, keyboard-visible focus, meaningful alt text, reduced-motion support and links that are clear without hover.
- **Do** keep mobile layouts deliberately composed: one strong image, one clear action, then supporting evidence.

### Don't:

- **Don't** make HaikaiTech feel like a solo developer looking for employment or a résumé with a company wrapper.
- **Don't** fake scale with employees, departments, statistics, testimonials, logos or project outcomes that are not in the repository.
- **Don't** use random purple/blue gradients, excessive glassmorphism, glowing blobs, generic Bento grids, abstract 3D spheres, gradient text or meaningless dashboard charts.
- **Don't** use identical card grids, endless rounded cards, excessive pills, badges, shadows or centered sections as the default composition.
- **Don't** put frameworks in the hero before the business problem, and don't turn technical jokes into the entire copy voice.
- **Don't** make essential information hover-only, hide forms behind unlabeled controls, or let decoration pollute the accessibility tree.
