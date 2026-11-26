import React, { useId, useState } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { track } from './track';
import { bmHome } from '../src/data/locales/bm-home';
import { localizeHref, type SiteLocale } from '../src/utils/i18n';

interface Props {
  newsletterSource?: 'footer' | 'blog' | 'toolkit';
  locale?: SiteLocale;
}

const INSPECTOR_ITEMS = ['Astro 6', 'Cloudflare', 'SEO Schema', 'WhatsApp CTA'];

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

const SWATCH_COLORS = ['#1368E6', '#7FA4EC', '#F4B998', '#68B8A2'];

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
        {/* Fine hairline retro-futuristic Ligne Claire sky trajectory & architectural horizon */}
        <svg
          className="ht-footer__orbits"
          viewBox="0 0 1440 520"
          fill="none"
          aria-hidden="true"
        >
          {/* Delicate orbital arcs */}
          <path
            d="M-60 390 C 310 250, 620 228, 980 284 C 1185 316, 1345 268, 1500 182"
            stroke="#8AA9E6"
            strokeWidth="1"
            strokeDasharray="5 6"
          />
          {/* Ligne Claire sweeping apricot/periwinkle sky-ribbon */}
          <path
            d="M-40 432 C 280 318, 560 296, 890 340 C 1140 374, 1310 318, 1490 216"
            stroke="#F4BE99"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M-40 430 C 280 316, 560 294, 890 338 C 1140 372, 1310 316, 1490 214"
            stroke="#3B5B96"
            strokeWidth="0.9"
          />
          <path
            d="M-40 434.5 C 280 320.5, 560 298.5, 890 342.5 C 1140 376.5, 1310 320.5, 1490 218.5"
            stroke="#3B5B96"
            strokeWidth="0.9"
          />
          {/* Minimalist Ligne Claire sky gliders / gulls & geometric moons */}
          <path
            d="M214 134 Q222 126 230 132 Q238 125 246 133"
            stroke="#3B5B96"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <path
            d="M248 152 Q254 146 260 151 Q266 146 272 152"
            stroke="#3B5B96"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <circle cx="1218" cy="118" r="14" fill="#FAD7BE" stroke="#3B5B96" strokeWidth="1" />
          <ellipse
            cx="1218"
            cy="118"
            rx="24"
            ry="6.5"
            transform="rotate(-22 1218 118)"
            stroke="#3B5B96"
            strokeWidth="1"
          />
          <polygon
            points="168,238 174,234 180,238 180,245 174,249 168,245"
            fill="#DCE8FA"
            stroke="#3B5B96"
            strokeWidth="1"
          />
          <polygon
            points="1282,232 1287,229 1292,232 1292,238 1287,241 1282,238"
            fill="#FAD7BE"
            stroke="#3B5B96"
            strokeWidth="1"
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

          {/* Fanned 3-Panel Pastel Retro-Futuristic Ligne Claire Showcase */}
          <div className="ht-footer__fan" aria-hidden="true">
            {/* Back-left architectural blueprint window */}
            <div className="ht-footer__plate-left">
              <div className="ht-footer__win-bar">
                <div className="ht-footer__win-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="ht-footer__win-label">STARTER BUILD / RM799</span>
              </div>
              <div className="ht-footer__left-body">
                <p className="ht-footer__left-kicker">PENANG STUDIO SPEC</p>
                <p className="ht-footer__left-title">
                  Sites built
                  <br />
                  for real work
                </p>
                <span className="ht-footer__left-pill">WhatsApp ↗</span>
                <div className="ht-footer__left-wire">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>

            <div className="ht-footer__float-badge ht-footer__float-badge--left">
              <svg viewBox="0 0 32 32" fill="none">
                <path
                  d="M11.5 10.5L6.5 16L11.5 21.5M20.5 10.5L25.5 16L20.5 21.5M17.5 8.5L14.5 23.5"
                  stroke="#174494"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="ht-footer__float-inspector">
              <div className="ht-footer__inspector-head">
                <span />
                <span>BUILD STACK</span>
              </div>
              <div className="ht-footer__inspector-rows">
                {INSPECTOR_ITEMS.map((item) => (
                  <div key={item} className="ht-footer__inspector-row">
                    <i />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Middle ivory paper invoice & quotation window */}
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
                  <span className="ht-footer__mid-id">QUOTATION / INV-2026</span>
                  <span className="ht-footer__mid-paid">PAID</span>
                </div>
                <div className="ht-footer__mid-card">
                  <div className="ht-footer__mid-line ht-footer__mid-line--wide" />
                  <div className="ht-footer__mid-line ht-footer__mid-line--short" />
                  <div className="ht-footer__mid-rows">
                    <div>
                      <span />
                      <strong>RM 799</strong>
                    </div>
                    <div>
                      <span />
                      <strong>RM 2,400</strong>
                    </div>
                    <div>
                      <span />
                      <strong>RM 0 FEE</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ht-footer__float-swatch">
              <span className="ht-footer__swatch-title">Mineral Palette</span>
              <div className="ht-footer__swatch-bar" />
              <div className="ht-footer__swatch-dots">
                {SWATCH_COLORS.map((hex) => (
                  <span key={hex} style={{ backgroundColor: hex }} />
                ))}
              </div>
              <span className="ht-footer__swatch-note">PDF Ready</span>
            </div>

            <div className="ht-footer__float-badge ht-footer__float-badge--top">
              <svg viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="9.5" fill="#EEF4FD" stroke="#355592" strokeWidth="1.1" />
                <ellipse
                  cx="18"
                  cy="18"
                  rx="14"
                  ry="5.2"
                  transform="rotate(-26 18 18)"
                  stroke="#1368E6"
                  strokeWidth="1.1"
                />
                <circle cx="18" cy="18" r="2.8" fill="#F4B998" stroke="#355592" strokeWidth="1" />
              </svg>
            </div>

            {/* Front-right isometric retro-futuristic Ligne Claire skyline & guide window */}
            <div className="ht-footer__plate-right">
              <div className="ht-footer__right-bar">
                <span className="ht-footer__right-brand">HAIKAITECH / 2026 GUIDE</span>
                <span className="ht-footer__right-badge">FREE PDF</span>
              </div>
              <div className="ht-footer__right-split">
                <div className="ht-footer__right-copy">
                  <p className="ht-footer__right-title">
                    A website that
                    <br />
                    brings leads
                  </p>
                  <span className="ht-footer__right-cta">Read the guide</span>
                </div>
                {/* Fine 1px indigo-inked isometric Ligne Claire skyline + sky monorail */}
                <svg
                  className="ht-footer__right-art"
                  viewBox="0 0 196 164"
                  fill="none"
                >
                  {/* Warm apricot sky plane */}
                  <rect
                    x="8"
                    y="6"
                    width="180"
                    height="150"
                    rx="8"
                    fill="#FAD6BE"
                    stroke="#355592"
                    strokeWidth="1"
                  />
                  {/* Harbor water / lower horizon */}
                  <path
                    d="M8 122 L188 122 L188 148 Q188 156 180 156 L16 156 Q8 156 8 148 Z"
                    fill="#B8CEF5"
                    stroke="#355592"
                    strokeWidth="1"
                  />
                  {/* Tall isometric Ligne Claire tower */}
                  <polygon
                    points="114,22 138,12 138,122 114,122"
                    fill="#95B2EE"
                    stroke="#355592"
                    strokeWidth="1"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="138,12 156,20 156,122 138,122"
                    fill="#F3A683"
                    stroke="#355592"
                    strokeWidth="1"
                    strokeLinejoin="round"
                  />
                  {/* Vertical fine window lines on tall tower */}
                  <line x1="122" y1="22" x2="122" y2="118" stroke="#355592" strokeWidth="0.8" />
                  <line x1="130" y1="18" x2="130" y2="118" stroke="#355592" strokeWidth="0.8" />
                  <line x1="147" y1="20" x2="147" y2="118" stroke="#355592" strokeWidth="0.8" />

                  {/* Mid curved-arch architectural building */}
                  <path
                    d="M68 122 L68 52 Q86 34 104 48 L104 122 Z"
                    fill="#B0C6F4"
                    stroke="#355592"
                    strokeWidth="1"
                  />
                  <line x1="77" y1="48" x2="77" y2="118" stroke="#355592" strokeWidth="0.8" />
                  <line x1="86" y1="44" x2="86" y2="118" stroke="#355592" strokeWidth="0.8" />
                  <line x1="95" y1="46" x2="95" y2="118" stroke="#355592" strokeWidth="0.8" />

                  {/* Foreground studio shophouse / low block */}
                  <rect
                    x="24"
                    y="72"
                    width="52"
                    height="50"
                    fill="#DCE8FA"
                    stroke="#355592"
                    strokeWidth="1"
                  />
                  {/* Lit warm apricot studio windows */}
                  <rect x="31" y="81" width="16" height="8" fill="#FAD6BE" stroke="#355592" strokeWidth="0.8" />
                  <rect x="53" y="81" width="16" height="8" fill="#FAF8F3" stroke="#355592" strokeWidth="0.8" />
                  <rect x="31" y="95" width="16" height="8" fill="#FAF8F3" stroke="#355592" strokeWidth="0.8" />
                  <rect x="53" y="95" width="16" height="8" fill="#FAD6BE" stroke="#355592" strokeWidth="0.8" />

                  {/* Sweeping retro-futuristic golden sky ribbon */}
                  <path
                    d="M12 108 C 58 82, 114 68, 184 44"
                    stroke="#F7D488"
                    strokeWidth="4.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 106.2 C 58 80.2, 114 66.2, 184 42.2"
                    stroke="#355592"
                    strokeWidth="0.9"
                  />
                  <path
                    d="M12 109.8 C 58 83.8, 114 69.8, 184 45.8"
                    stroke="#355592"
                    strokeWidth="0.9"
                  />

                  {/* Tiny Ligne Claire sky gull & harbour pier */}
                  <path
                    d="M44 38 Q49 33 54 37 Q59 32 64 37"
                    stroke="#355592"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <line x1="34" y1="136" x2="148" y2="136" stroke="#355592" strokeWidth="0.9" />
                  <rect x="116" y="139" width="22" height="6" rx="2" fill="#FAF8F3" stroke="#355592" strokeWidth="0.8" />
                </svg>
              </div>
            </div>

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
                <ArrowUpRight aria-hidden="true" size={17} strokeWidth={2} />
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
                &copy; {new Date().getFullYear()} {copy?.company ?? 'HaikaiTech Solutions'} &middot;{' '}
                {copy?.city ?? 'Penang, Malaysia'}
              </span>
              <a href="https://www.ssm-einfo.my/" target="_blank" rel="noopener noreferrer">
                SSM 202603149868 (CA0422517-K)
              </a>
              <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">
                {copy?.stripe ?? 'Secure payments powered by Stripe'}
              </a>
              <span>{copy?.worldwide ?? 'Serving clients worldwide'}</span>
            </div>

            <nav aria-label="Footer social and contact" className="ht-footer__socials">
              <a
                href="https://github.com/name-iffat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github aria-hidden="true" size={18} strokeWidth={1.75} />
              </a>
              <a
                href="https://www.linkedin.com/in/iffathaikal/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin aria-hidden="true" size={18} strokeWidth={1.75} />
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                onClick={() => track('contact_clicked', 'whatsapp')}
              >
                <MessageCircle aria-hidden="true" size={18} strokeWidth={1.75} />
              </a>
              <a
                href="mailto:hq@haikaitech.my"
                aria-label="Email hq@haikaitech.my"
                onClick={() => track('contact_clicked', 'email')}
              >
                <Mail aria-hidden="true" size={18} strokeWidth={1.75} />
              </a>
            </nav>
          </div>

          <div className="ht-footer__brand-plate">
            <span className="ht-footer__cross ht-footer__cross--tl" aria-hidden="true" />
            <span className="ht-footer__cross ht-footer__cross--tr" aria-hidden="true" />
            <span className="ht-footer__cross ht-footer__cross--bl" aria-hidden="true" />
            <span className="ht-footer__cross ht-footer__cross--br" aria-hidden="true" />
            <p className="ht-footer__plate-stamp">
              {copy?.note ?? 'Built for real work.'} / PENANG, MY
            </p>
            <a
              href={localizeHref('/#home', locale)}
              className="ht-footer__wordmark"
              aria-label={copy?.home ?? 'HaikaiTech home'}
            >
              <span className="ht-footer__emblem" aria-hidden="true">
                <img src="/haikaitech-mark.png" width="58" height="58" alt="" aria-hidden="true" />
              </span>
              <span className="ht-footer__wordmark-text">
                <span className="ht-footer__word-a">HAIKAI</span>
                <span className="ht-footer__word-b">TECH</span>
                <span className="ht-footer__word-c">_</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
