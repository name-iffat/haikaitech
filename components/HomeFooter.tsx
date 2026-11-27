import React, { useId, useState } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { track } from './track';
import { bmHome } from '../src/data/locales/bm-home';
import { localizeHref, type SiteLocale } from '../src/utils/i18n';

interface Props {
  newsletterSource?: 'footer' | 'blog' | 'toolkit';
  locale?: SiteLocale;
}

const DRAWER_ITEMS = [
  'Setup Guide',
  'Website',
  'Pages',
  'WhatsApp CTA',
  'SEO & Schema',
  'Invoice Tool',
  'n8n Workflows',
  'Analytics',
];

export default function HomeFooter({ newsletterSource = 'footer', locale = 'en' }: Props) {
  const bm = locale === 'bm';
  const copy = bm ? bmHome.footer : null;
  const fieldId = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return;
    setStatus('sending');

    try {
      const res = await fetch('https://invoice.haikaitech.my/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source: newsletterSource }),
      });
      if (res.ok) {
        track('newsletter_subscribe', newsletterSource);
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const whatsappHref =
    'https://wa.me/60147533499?text=Hi%20HaikaiTech!%20I%20came%20from%20homepage%20footer%20and%20would%20like%20to%20discuss%20a%20project.';

  const statusText =
    status === 'success'
      ? bm
        ? 'Langganan berjaya. Terima kasih!'
        : 'Subscribed. Thank you!'
      : status === 'error'
        ? bm
          ? 'Tidak dapat melanggan. Sila cuba lagi; alamat e-mel anda masih di sini.'
          : 'Could not subscribe. Please try again; your email is still here.'
        : '';

  return (
    <footer className="ht-footer" aria-label="HaikaiTech footer">
      <section className="ht-footer__capture" aria-labelledby="ht-footer-newsletter-title">
        {/* Fine hairline retro-futuristic Ligne Claire sky trajectory & horizon */}
        <svg
          className="ht-footer__orbits"
          viewBox="0 0 1440 520"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M-60 402 C 310 264, 620 242, 980 296 C 1185 328, 1345 278, 1500 192"
            stroke="#8AA9E6"
            strokeOpacity="0.65"
            strokeWidth="1"
            strokeDasharray="5 6"
          />
          <path
            d="M-40 444 C 280 330, 560 308, 890 352 C 1140 386, 1310 330, 1490 228"
            stroke="#F4C5A3"
            strokeOpacity="0.85"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M-40 442 C 280 328, 560 306, 890 350 C 1140 384, 1310 328, 1490 226"
            stroke="#3B5B96"
            strokeOpacity="0.55"
            strokeWidth="0.85"
          />
          <path
            d="M-40 446 C 280 332, 560 310, 890 354 C 1140 388, 1310 332, 1490 230"
            stroke="#3B5B96"
            strokeOpacity="0.55"
            strokeWidth="0.85"
          />
          <path
            d="M204 128 Q212 120 220 126 Q228 119 236 127"
            stroke="#3B5B96"
            strokeOpacity="0.7"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M238 146 Q244 140 250 145 Q256 140 262 146"
            stroke="#3B5B96"
            strokeOpacity="0.55"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <circle
            cx="1226"
            cy="112"
            r="13"
            fill="#FADCC5"
            stroke="#3B5B96"
            strokeOpacity="0.7"
            strokeWidth="0.9"
          />
          <ellipse
            cx="1226"
            cy="112"
            rx="23"
            ry="6"
            transform="rotate(-22 1226 112)"
            stroke="#3B5B96"
            strokeOpacity="0.65"
            strokeWidth="0.9"
          />
        </svg>

        <div className="tines-container ht-footer__capture-inner">
          <div className="ht-footer__eyebrow">
            <span className="ht-footer__eyebrow-chip">
              <span className="ht-footer__eyebrow-dot" aria-hidden="true" />
              {bm ? 'Nota Percuma' : 'Free Field Notes'}
            </span>
            <span className="ht-footer__eyebrow-text">
              {bm
                ? 'Harga laman web, strategi pelanggan & alat percuma.'
                : 'Website pricing, lead-gen tactics & free SME tools.'}
            </span>
          </div>

          <h2 id="ht-footer-newsletter-title" className="ht-footer__headline">
            {copy ? `${copy.title[0]} ${copy.title[1]}` : 'Practical notes for Malaysian SMEs'}
          </h2>

          <p className="ht-footer__lead">
            {copy
              ? `${copy.description} ${copy.muted}`
              : 'Clear breakdowns of website pricing, WhatsApp lead-gen workflows, and free browser tools we build in Penang. No spam, unsubscribe anytime.'}
          </p>

          <form
            className="ht-footer__form"
            onSubmit={handleSubmit}
            aria-busy={status === 'sending'}
          >
            <label htmlFor={fieldId} className="sr-only">
              {bm ? 'Alamat e-mel (wajib)' : 'Email address (required)'}
            </label>
            <input
              id={fieldId}
              name="email"
              type="email"
              autoComplete="email"
              spellCheck={false}
              placeholder="you@company.my"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby={
                status === 'success' || status === 'error' ? `${fieldId}-status` : undefined
              }
            />
            <button type="submit" disabled={status === 'sending'}>
              {status === 'sending'
                ? bm
                  ? 'Menghantar...'
                  : 'Sending...'
                : bm
                  ? 'Langgan'
                  : 'Subscribe'}
            </button>
          </form>

          {statusText && (
            <p
              id={`${fieldId}-status`}
              role="status"
              className={`ht-footer__status ht-footer__status--${status}`}
            >
              {statusText}
            </p>
          )}

          <p className="ht-footer__privacy">
            {copy?.privacy ?? "We'll only send updates you asked for. See our"}{' '}
            <a href="/privacy-policy/">{copy?.privacyLink ?? 'privacy policy'}</a>.
          </p>

          {/* Composed 3-Panel Editorial Ligne Claire Triptych */}
          <div className="ht-footer__fan" aria-hidden="true">
            {/* Panel 1: Sage & Cream Penang Studio Desk Illustration */}
            <div className="ht-footer__plate-left">
              <div className="ht-footer__win-bar">
                <div className="ht-footer__win-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="ht-footer__win-label">STARTER / RM799</span>
              </div>
              <div className="ht-footer__left-body">
                <p className="ht-footer__left-kicker">PENANG STUDIO SPEC</p>
                <p className="ht-footer__left-title">
                  Sites built
                  <br />
                  for real work
                </p>
                <span className="ht-footer__left-pill">WhatsApp ↗</span>
              </div>
              <svg
                className="ht-footer__left-art"
                viewBox="0 0 280 156"
                fill="none"
              >
                {/* Warm sunlight diagonal across studio wall */}
                <polygon points="0,12 195,12 145,156 0,156" fill="#FBF3E8" />
                {/* Heritage Penang louvered window frame */}
                <rect x="18" y="8" width="96" height="82" rx="4" fill="#CBE5DA" stroke="#2D527A" strokeWidth="0.95" />
                <rect x="26" y="16" width="36" height="66" fill="#FAF8F3" stroke="#2D527A" strokeWidth="0.85" />
                <rect x="68" y="16" width="38" height="66" fill="#E3F1EC" stroke="#2D527A" strokeWidth="0.85" />
                <line x1="72" y1="26" x2="102" y2="26" stroke="#2D527A" strokeWidth="0.75" />
                <line x1="72" y1="36" x2="102" y2="36" stroke="#2D527A" strokeWidth="0.75" />
                <line x1="72" y1="46" x2="102" y2="46" stroke="#2D527A" strokeWidth="0.75" />
                <line x1="72" y1="56" x2="102" y2="56" stroke="#2D527A" strokeWidth="0.75" />
                <line x1="72" y1="66" x2="102" y2="66" stroke="#2D527A" strokeWidth="0.75" />
                {/* Sun circle visible through window */}
                <circle cx="44" cy="34" r="9" fill="#FAD6BC" stroke="#2D527A" strokeWidth="0.85" />
                {/* Studio desk plane */}
                <rect x="0" y="106" width="280" height="50" fill="#DFECE7" stroke="#2D527A" strokeWidth="0.95" />
                {/* Retro-futuristic drafting monitor on desk */}
                <rect x="78" y="42" width="112" height="68" rx="6" fill="#FAF8F3" stroke="#2D527A" strokeWidth="1" />
                <rect x="86" y="50" width="96" height="48" rx="3" fill="#E6EFFC" stroke="#2D527A" strokeWidth="0.85" />
                <rect x="93" y="57" width="44" height="12" rx="2" fill="#9BB6F0" stroke="#2D527A" strokeWidth="0.75" />
                <rect x="93" y="74" width="32" height="16" rx="2" fill="#FAD6BC" stroke="#2D527A" strokeWidth="0.75" />
                <rect x="131" y="74" width="44" height="16" rx="2" fill="#CBE5DA" stroke="#2D527A" strokeWidth="0.75" />
                <path d="M124 110 L144 110 L148 122 L120 122 Z" fill="#C4D8F8" stroke="#2D527A" strokeWidth="0.9" />
                {/* Potted studio plant on left */}
                <path d="M30 100 L52 100 L48 122 L34 122 Z" fill="#F2B491" stroke="#2D527A" strokeWidth="0.9" />
                <path d="M41 100 C33 88, 22 86, 24 76 C33 78, 39 88, 41 100 Z" fill="#89C7B0" stroke="#2D527A" strokeWidth="0.85" />
                <path d="M41 100 C49 86, 60 85, 58 74 C49 77, 43 87, 41 100 Z" fill="#A5D8C5" stroke="#2D527A" strokeWidth="0.85" />
                {/* Kopi cup on right of desk */}
                <rect x="198" y="102" width="18" height="18" rx="3" fill="#FAF8F3" stroke="#2D527A" strokeWidth="0.9" />
                <path d="M216 106 C222 106, 222 115, 216 115" stroke="#2D527A" strokeWidth="0.9" />
                <path d="M204 97 Q206 91 204 87" stroke="#2D527A" strokeWidth="0.8" strokeLinecap="round" />
                <path d="M210 97 Q212 91 210 87" stroke="#2D527A" strokeWidth="0.8" strokeLinecap="round" />
              </svg>
            </div>

            {/* Panel 2: Editorial Ivory Invoice & Ledger Sheet */}
            <div className="ht-footer__plate-mid">
              <div className="ht-footer__win-bar ht-footer__win-bar--ivory">
                <div className="ht-footer__win-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="ht-footer__win-url">invoice.haikaitech.my</span>
              </div>
              <div className="ht-footer__mid-body">
                <div className="ht-footer__mid-head">
                  <div>
                    <span className="ht-footer__mid-id">QUOTATION / INV-2026</span>
                    <p className="ht-footer__mid-issuer">HaikaiTech Workshop &middot; Penang</p>
                  </div>
                  <span className="ht-footer__mid-paid">PAID</span>
                </div>
                <div className="ht-footer__mid-card">
                  <div className="ht-footer__mid-rows">
                    <div>
                      <span>Starter Landing Build</span>
                      <strong>RM 799</strong>
                    </div>
                    <div>
                      <span>Business Website</span>
                      <strong>RM 2,400</strong>
                    </div>
                    <div>
                      <span>Free Invoice Tool</span>
                      <strong>RM 0</strong>
                    </div>
                  </div>
                  <div className="ht-footer__mid-total">
                    <span>Total due</span>
                    <strong>RM 3,199</strong>
                  </div>
                </div>
                {/* Editorial Ligne Claire illustrated summary strip */}
                <div className="ht-footer__mid-foot">
                  <svg viewBox="0 0 216 68" fill="none" className="ht-footer__mid-art">
                    <rect x="1" y="1" width="214" height="66" rx="8" fill="#EEF4FD" stroke="#7E9FD9" strokeWidth="0.9" />
                    {/* Mini bar cadence */}
                    <rect x="14" y="34" width="12" height="20" rx="2" fill="#C4D8F8" stroke="#3B5B96" strokeWidth="0.8" />
                    <rect x="31" y="24" width="12" height="30" rx="2" fill="#9AB6F0" stroke="#3B5B96" strokeWidth="0.8" />
                    <rect x="48" y="30" width="12" height="24" rx="2" fill="#FAD6BC" stroke="#3B5B96" strokeWidth="0.8" />
                    <rect x="65" y="16" width="12" height="38" rx="2" fill="#89C7B0" stroke="#3B5B96" strokeWidth="0.8" />
                    {/* Paper-plane export trajectory */}
                    <path d="M88 42 C108 26, 130 22, 154 28" stroke="#3B5B96" strokeWidth="0.9" strokeDasharray="3 3" />
                    <polygon points="154,28 142,22 145,32" fill="#FAD6BC" stroke="#3B5B96" strokeWidth="0.85" strokeLinejoin="round" />
                    {/* Stamp seal badge */}
                    <circle cx="184" cy="34" r="18" fill="#FAF8F3" stroke="#3B5B96" strokeWidth="0.9" />
                    <circle cx="184" cy="34" r="13" stroke="#7E9FD9" strokeWidth="0.8" strokeDasharray="2 2" />
                    <path d="M178 34 L182 38 L191 29" stroke="#116A54" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Subtle orbital seal badge perched on top seam */}
            <div className="ht-footer__float-badge ht-footer__float-badge--top">
              <svg viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="9.5" fill="#EEF4FD" stroke="#3B5B96" strokeWidth="1" />
                <ellipse
                  cx="18"
                  cy="18"
                  rx="14"
                  ry="5"
                  transform="rotate(-26 18 18)"
                  stroke="#1368E6"
                  strokeWidth="1"
                />
                <circle cx="18" cy="18" r="2.6" fill="#F4C5A3" stroke="#3B5B96" strokeWidth="0.9" />
              </svg>
            </div>

            {/* Panel 3: Full-Bleed Editorial Ligne Claire Coastal Skyline & Guide Poster */}
            <div className="ht-footer__plate-right">
              {/* Full-bleed retro-futuristic Ligne Claire illustration canvas */}
              <svg
                className="ht-footer__right-scene"
                viewBox="0 0 520 330"
                preserveAspectRatio="xMidYMax slice"
                fill="none"
              >
                {/* Layered pastel apricot sunset sky */}
                <rect width="520" height="330" fill="#FBE5D3" />
                <rect y="0" width="520" height="148" fill="#FDF1E6" />
                <circle cx="332" cy="86" r="34" fill="#F7C39F" stroke="#3B5B96" strokeWidth="0.9" />

                {/* Distant cable-stayed Penang bridge silhouette */}
                <path d="M22 246 L256 246" stroke="#3B5B96" strokeWidth="1" />
                <path d="M98 246 L98 164 M98 172 L54 246 M98 172 L72 246 M98 172 L124 246 M98 172 L144 246" stroke="#6E8ECF" strokeWidth="0.85" />

                {/* Periwinkle harbour water plane */}
                <rect y="246" width="520" height="84" fill="#C4D7F7" stroke="#3B5B96" strokeWidth="1" />
                <line x1="28" y1="268" x2="180" y2="268" stroke="#6E8ECF" strokeWidth="0.8" />
                <line x1="210" y1="284" x2="352" y2="284" stroke="#6E8ECF" strokeWidth="0.8" />
                <line x1="88" y1="302" x2="246" y2="302" stroke="#6E8ECF" strokeWidth="0.8" />

                {/* Iconic tall isometric Ligne Claire tower */}
                <polygon points="366,64 404,48 404,246 366,246" fill="#9CB8F0" stroke="#3B5B96" strokeWidth="1" strokeLinejoin="round" />
                <polygon points="404,48 434,60 434,246 404,246" fill="#F2AE8A" stroke="#3B5B96" strokeWidth="1" strokeLinejoin="round" />
                <line x1="378" y1="62" x2="378" y2="242" stroke="#3B5B96" strokeWidth="0.75" />
                <line x1="391" y1="56" x2="391" y2="242" stroke="#3B5B96" strokeWidth="0.75" />
                <line x1="419" y1="58" x2="419" y2="242" stroke="#3B5B96" strokeWidth="0.75" />

                {/* Curved domed retro-futuristic tower */}
                <path d="M298 246 L298 116 Q326 86 354 112 L354 246 Z" fill="#B5CBF5" stroke="#3B5B96" strokeWidth="1" />
                <line x1="312" y1="108" x2="312" y2="242" stroke="#3B5B96" strokeWidth="0.75" />
                <line x1="326" y1="102" x2="326" y2="242" stroke="#3B5B96" strokeWidth="0.75" />
                <line x1="340" y1="106" x2="340" y2="242" stroke="#3B5B96" strokeWidth="0.75" />

                {/* Warm mid-ground architectural block with lit studio windows */}
                <rect x="234" y="168" width="76" height="78" fill="#E3EEFC" stroke="#3B5B96" strokeWidth="1" />
                <rect x="244" y="180" width="22" height="11" fill="#FAD6BC" stroke="#3B5B96" strokeWidth="0.8" />
                <rect x="274" y="180" width="24" height="11" fill="#FAF8F3" stroke="#3B5B96" strokeWidth="0.8" />
                <rect x="244" y="199" width="22" height="11" fill="#FAF8F3" stroke="#3B5B96" strokeWidth="0.8" />
                <rect x="274" y="199" width="24" height="11" fill="#FAD6BC" stroke="#3B5B96" strokeWidth="0.8" />
                <rect x="244" y="218" width="54" height="12" fill="#CBE5DA" stroke="#3B5B96" strokeWidth="0.8" />

                {/* Sweeping retro-futuristic golden sky-ribbon */}
                <path d="M-10 232 C 138 186, 286 154, 530 108" stroke="#F7D694" strokeWidth="6" strokeLinecap="round" />
                <path d="M-10 229.4 C 138 183.4, 286 151.4, 530 105.4" stroke="#3B5B96" strokeWidth="0.9" />
                <path d="M-10 234.6 C 138 188.6, 286 156.6, 530 110.6" stroke="#3B5B96" strokeWidth="0.9" />

                {/* Harbour pier & ferry boat */}
                <path d="M168 274 L218 274 L212 286 L174 286 Z" fill="#FAF8F3" stroke="#3B5B96" strokeWidth="0.95" strokeLinejoin="round" />
                <rect x="184" y="264" width="20" height="10" rx="2" fill="#F2AE8A" stroke="#3B5B96" strokeWidth="0.85" />
                <path d="M276 266 L342 266 L336 274 L276 274 Z" fill="#E3EEFC" stroke="#3B5B96" strokeWidth="0.9" />

                {/* Minimalist Ligne Claire gulls */}
                <path d="M258 92 Q265 86 272 91 Q279 85 286 91" stroke="#3B5B96" strokeWidth="1" strokeLinecap="round" />
                <path d="M286 76 Q291 71 296 75 Q301 71 306 75" stroke="#3B5B96" strokeWidth="0.9" strokeLinecap="round" />
              </svg>

              <div className="ht-footer__right-bar">
                <span className="ht-footer__right-brand">HAIKAITECH / 2026 GUIDE</span>
                <span className="ht-footer__right-badge">FREE PDF</span>
              </div>

              <div className="ht-footer__right-overlay">
                <p className="ht-footer__right-title">
                  A website that
                  <br />
                  brings leads
                </p>
                <p className="ht-footer__right-sub">
                  Pricing, structure & WhatsApp conversion notes.
                </p>
                <span className="ht-footer__right-cta">Read the guide</span>
              </div>
            </div>

            {/* Refined vertical checklist drawer on far-right edge */}
            <div className="ht-footer__float-drawer">
              <div className="ht-footer__drawer-head">
                <span />
                <span>PROJECT MAP</span>
              </div>
              <ul className="ht-footer__drawer-list">
                {DRAWER_ITEMS.map((label, idx) => (
                  <li key={label} className={idx === 1 ? 'is-active' : undefined}>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="ht-footer__base">
        <div className="tines-container">
          <div className="ht-footer__top-row">
            <div className="ht-footer__cta-col">
              <h2 className="ht-footer__cta-title">
                {bm ? (
                  <>
                    Ada <span>projek dalam</span>
                    <br />
                    fikiran?
                  </>
                ) : (
                  <>
                    Got a <span>project in</span>
                    <br />
                    mind?
                  </>
                )}
              </h2>
              <a
                className="ht-footer__cta-pill"
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('contact_clicked', 'whatsapp')}
              >
                <span>{bm ? 'Bincang di WhatsApp' : 'Talk on WhatsApp'}</span>
                <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2} />
              </a>
            </div>

            <div className="ht-footer__cols">
              <nav aria-label="Footer explore" className="ht-footer__col">
                <h3>{copy?.explore ?? 'Explore'}</h3>
                <a href={localizeHref('/#projects', locale)}>{copy?.work ?? 'Work'}</a>
                <a href={localizeHref('/services/', locale)}>{copy?.services ?? 'Services'}</a>
                <a href={localizeHref('/#about', locale)}>{copy?.about ?? 'About'}</a>
                <a href="/blog/">{copy?.insights ?? 'Insights'}</a>
                {!bm && (
                  <>
                    <a href="/web-design-penang/">Web Design Penang</a>
                    <a href="/web-design-selangor/">Web Design Selangor</a>
                  </>
                )}
              </nav>

              <nav aria-label="Footer resources" className="ht-footer__col">
                <h3>{copy?.resources ?? 'Resources'}</h3>
                <a href="/toolkit/">{copy?.toolkit ?? 'Business Toolkit'}</a>
                <a href="https://invoice.haikaitech.my/">Free Invoice Generator</a>
                <a href="/guide/">{copy?.guide ?? '2026 Lead Generation Guide'}</a>
                {!bm && <a href="/hermes-guide/">Hermes Desktop Guide</a>}
                <a href="/privacy-policy/">{bm ? 'Dasar privasi (EN)' : 'Privacy Policy'}</a>
                <a href="/terms-of-service/">{bm ? 'Terma perkhidmatan (EN)' : 'Terms of Service'}</a>
                <a href="/refund-cancellation-policy/">
                  {bm ? 'Polisi bayaran balik (EN)' : 'Refund Policy'}
                </a>
              </nav>
            </div>
          </div>

          <div className="ht-footer__meta-row">
            <div className="ht-footer__meta-legal">
              <span>
                &copy; {new Date().getFullYear()} {copy?.company ?? 'HaikaiTech Solutions'}
              </span>
              <span className="ht-footer__meta-sep" aria-hidden="true">
                &middot;
              </span>
              <span>{copy?.city ?? 'Penang, Malaysia'}</span>
              <span className="ht-footer__meta-sep" aria-hidden="true">
                &middot;
              </span>
              <a href="https://www.ssm-einfo.my/" target="_blank" rel="noopener noreferrer">
                SSM 202603149868 (CA0422517-K)
              </a>
              <span className="ht-footer__meta-sep" aria-hidden="true">
                &middot;
              </span>
              <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">
                {copy?.stripe ?? 'Secure payments powered by Stripe'}
              </a>
              <span className="ht-footer__meta-sep" aria-hidden="true">
                &middot;
              </span>
              <span>{copy?.worldwide ?? 'Serving clients worldwide'}</span>
            </div>

            <nav aria-label="Footer social and contact" className="ht-footer__socials">
              <a
                href="https://github.com/name-iffat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github aria-hidden="true" size={17} strokeWidth={1.75} />
              </a>
              <a
                href="https://www.linkedin.com/in/iffathaikal/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin aria-hidden="true" size={17} strokeWidth={1.75} />
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                onClick={() => track('contact_clicked', 'whatsapp')}
              >
                <MessageCircle aria-hidden="true" size={17} strokeWidth={1.75} />
              </a>
              <a
                href="mailto:hq@haikaitech.my"
                aria-label="Email hq@haikaitech.my"
                onClick={() => track('contact_clicked', 'email')}
              >
                <Mail aria-hidden="true" size={17} strokeWidth={1.75} />
              </a>
            </nav>
          </div>

          <div className="ht-footer__brand-plate">
            <span className="ht-footer__cross ht-footer__cross--tl" aria-hidden="true" />
            <span className="ht-footer__cross ht-footer__cross--tr" aria-hidden="true" />
            <span className="ht-footer__cross ht-footer__cross--bl" aria-hidden="true" />
            <span className="ht-footer__cross ht-footer__cross--br" aria-hidden="true" />
            <a
              href={localizeHref('/#home', locale)}
              className="ht-footer__wordmark"
              aria-label={copy?.home ?? 'HaikaiTech home'}
            >
              <span className="ht-footer__emblem" aria-hidden="true">
                <img src="/haikaitech-mark.png" width="88" height="88" alt="" aria-hidden="true" />
              </span>
              <span className="ht-footer__wordmark-text">HAIKAITECH_</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
