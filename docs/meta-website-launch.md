# RM1,700 website campaign — launch draft

Status: prepared locally; no campaign created and no advertising spend authorized. User prefers Pixel setup before handing ads to a manager. RM300 covers both management and media spend; the split and duration need confirmation. No Pixel/dataset exists yet. Meta Events Manager currently requires login in the in-app browser.

## Offer

Public RM1,700 starter: a custom one-page business website with up to five main content sections, responsive mobile/desktop design, WhatsApp or enquiry integration, basic SEO and AEO, speed optimisation, SSL and deployment setup, one year of hosting and a standard domain, and five minor content updates after launch. Extra pages, content updates, online payments, booking, ecommerce, dashboards, automation and custom features are scoped and quoted separately. Prospects can discuss their needs on WhatsApp; HaikaiTech can then recommend three tailored options. Beekaboo prices are client-specific examples, not a public menu.

Regenerate the existing guide PDF before distribution.

## Starter test (proposal, not a performance forecast)

- RM300 total including management. Obtain the manager’s fee and time period first; the remaining balance is the media budget. The earlier RM30–50/day proposal is superseded. Do not promise meaningful sales evidence from a small media allocation.
- One campaign, one initial audience and three distinct ads. Start with Malaysian local service businesses; select the geography actually served.
- Initial route: ads that open WhatsApp, with the offer page as supporting proof. Confirm the messaging objective and optimization options available in the actual account.
- Alternative website route: match BM ads to `/bm/website/`, English ads to `/website/`. Verify website event tracking in Meta Events Manager before optimizing for website conversions.
- Record spend, actual conversations, qualified enquiries, quotations, deposits and acquisition cost. A qualified enquiry has a real business, a relevant need, a feasible budget and timeline.
- Do not select winners on clicks alone. Review quality and sales before extending spend. A small two-week test may be inconclusive.

## Three BM creative drafts

### 1. Clear price and scope

Visual: real mobile and desktop website screenshot. Overlay: “Website bisnes dari RM1,700”.

Copy: “Pelanggan nak tahu servis anda sebelum WhatsApp? Beri mereka satu tempat untuk lihat servis, hasil kerja dan cara hubungi bisnes anda. Website bisnes satu halaman bermula RM1,700, dengan sehingga lima bahagian, paparan telefon dan desktop, serta integrasi WhatsApp. Hosting dan domain standard setahun pun termasuk. Kongsi keperluan melalui WhatsApp; kami cadangkan pilihan yang sesuai dengan skop dan bajet anda.”

Headline: “Website bisnes dari RM1,700”

### 2. Real project walkthrough

Visual: short screen recording of an approved client website, mobile layout, services and contact route. Use client work only with permission for paid promotion.

Copy: “Ini contoh bagaimana kami susun servis, hasil kerja dan maklumat hubungan dalam website bisnes. HaikaiTech membina website untuk bisnes di Malaysia. Website bermula RM1,700. Contoh projek mempunyai skop tersendiri; ciri tambahan disebut harga berasingan. WhatsApp untuk semak keperluan anda.”

Headline: “Lihat hasil kerja. Bincang website anda.”

### 3. Service business angle

Visual: a real contractor or service-business project, with service details visible. Overlay: “Servis jelas. Mudah dihubungi.”

Copy: “Untuk kontraktor dan bisnes servis: mudahkan pelanggan lihat apa yang anda buat, contoh hasil kerja dan cara meminta sebut harga. Website bisnes satu halaman bermula RM1,700, siap sehingga lima bahagian, paparan mudah alih dan integrasi WhatsApp. Hosting dan domain standard tahun pertama termasuk. Beritahu kami servis anda untuk semak kesesuaian skop.”

Headline: “Website untuk bisnes servis anda”

CTA: Send WhatsApp message. Confirm the supported label in Ads Manager.

## Website tracking URLs

BM: `https://haikaitech.my/bm/website/?utm_source=facebook&utm_medium=paid_social&utm_campaign=website_1700_test&utm_content=price_scope`

EN: `https://haikaitech.my/website/?utm_source=facebook&utm_medium=paid_social&utm_campaign=website_1700_test&utm_content=price_scope`

Use `project_walkthrough` and `service_business` for the other creative identifiers. The website forwards the sanitized campaign name into the WhatsApp message; the visitor must actually send the message. `whatsapp_click` is an intent event, not a confirmed lead or purchase. GA4 receipt and attribution need verification; a successful static build does not establish either.

## Required before paid launch

- Confirm scope, margin, available delivery capacity and recurring-cost quotation approach.
- Approve the total test budget, target location and customer group.
- Connect Facebook Page, ad account and WhatsApp Business number; confirm access and billing.
- Test links, mobile layout and an actual inbound WhatsApp message manually.
- Website campaigns: provide the Meta dataset/Pixel ID and verify events in Events Manager. Never put access tokens in browser code. CAPI requires a separate authorized integration; it is not implemented here.
- Track lead progression in a simple sheet or CRM: date, source/ad, business, requirement, budget, stage, quotation, deposit, revenue and spend.
- Reply promptly during advertised business hours; use a saved greeting asking business type, required scope, budget and target launch date.

## Acquisition economics

Maximum acquisition cost = RM1,700 minus delivery labour, third-party costs covered by you, transaction costs and the profit you want to retain. Set an initial ceiling from actual costs before spending. Example only: RM30 per qualified enquiry × 10 enquiries per paying client = RM300 acquisition cost. These are assumptions, not market benchmarks.

## Pixel activation and handover

The site supports `PUBLIC_META_PIXEL_ID` as a build-time public environment variable. It is disabled when empty or invalid. Set the actual numeric ID in Cloudflare Pages Production build variables, then rebuild/deploy. For local verification use `.env.local` (ignored by Git). No CAPI token is needed for browser Pixel setup.

The implementation loads Meta's script after Allow, sends `PageView`, sends custom `WhatsAppClick` for WhatsApp links, and maps each WhatsApp click to a standard `Lead` (`content_name: WhatsApp chat`) so campaigns can optimize on it. It deliberately does not send `Purchase` for button clicks. A click is lead intent, not a confirmed conversation. Advertising preferences can be reopened; Decline revokes future events. The privacy policy explains this separately from GA4.

Before handover, verify with the real ID in Events Manager Test Events and Meta Pixel Helper: no Meta script/request before consent or after initial Decline; one PageView after Allow; one WhatsAppClick plus one Lead per WhatsApp click; no Purchase; revocation stops future events. Test both locales and a reload with stored preference. Browser blocking may prevent events and should be checked explicitly. Test on an owned device before ad spend.

Keep the business portfolio, Page, dataset and ad account owned by HaikaiTech. Give the manager appropriate partner access rather than transferring ownership or sharing personal login credentials. Confirm how much of the RM300 is the management fee, how much reaches Meta as media spend, and what time period it covers. Agree on reporting of qualified leads and deposits.
