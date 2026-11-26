import React, { useEffect, useId, useState } from 'react';
import { CONTACTS, getIconForContact } from '../../constants';
import { track } from '../track';
import { bmHome } from '../../src/data/locales/bm-home';
import type { SiteLocale } from '../../src/utils/i18n';

const COUNTRY_CODES = [
  { code: 'MY', dial: '+60', placeholder: '12-345 6789' },
  { code: 'SG', dial: '+65', placeholder: '8123 4567' },
  { code: 'ID', dial: '+62', placeholder: '812-3456-7890' },
  { code: 'BN', dial: '+673', placeholder: '712 3456' },
  { code: 'TH', dial: '+66', placeholder: '81 234 5678' },
  { code: 'AU', dial: '+61', placeholder: '412 345 678' },
  { code: 'GB', dial: '+44', placeholder: '7700 900077' },
  { code: 'US', dial: '+1', placeholder: '555 019 2834' },
  { code: 'INTL', dial: '', placeholder: '+60 12-345 6789' },
] as const;

type CountryCode = (typeof COUNTRY_CODES)[number]['code'];

const detectCountryFromBrowser = (): CountryCode => {
  if (typeof Intl === 'undefined') return 'MY';
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  if (tz.includes('Singapore')) return 'SG';
  if (tz.includes('Jakarta') || tz.includes('Makassar') || tz.includes('Jayapura')) return 'ID';
  if (tz.includes('Brunei')) return 'BN';
  if (tz.includes('Bangkok')) return 'TH';
  if (tz.startsWith('Australia/')) return 'AU';
  if (tz.includes('London')) return 'GB';
  if (tz.startsWith('America/')) return 'US';
  return 'MY';
};

const formatFullPhone = (dial: string, raw: string): string => {
  const trimmed = raw.trim();
  if (!dial) return trimmed;
  const digits = trimmed.replace(/[^\d+]/g, '');
  if (digits.startsWith('+')) return digits;
  const dialDigits = dial.slice(1);
  const withoutDial = digits.startsWith(dialDigits) ? digits.slice(dialDigits.length) : digits;
  return `${dial}${withoutDial.replace(/^0+/, '')}`;
};

const HUBSPOT_SUBMIT_URL =
  'https://api-na2.hsforms.com/submissions/v3/integration/submit/248131052/942fe01d-5d7b-4ba5-a3bd-dea68738f586';

const getCookie = (cookieName: string): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${cookieName}=`));
  return match ? decodeURIComponent(match.split('=')[1]) : undefined;
};

const BACKDROP_CONNECTORS = [
  { name: 'WooCommerce', sub: 'Unlimited products & catalog', tone: 'blue' },
  { name: 'WhatsApp', sub: 'Instant enquiry handover', tone: 'mint' },
  { name: 'HubSpot CRM', sub: 'Contact capture & tracking', tone: 'coral' },
  { name: 'CHIP Payment', sub: 'Malaysian FPX & cards', tone: 'gold' },
  { name: 'EasyParcel', sub: 'Automated parcel rates', tone: 'cobalt' },
  { name: 'n8n Agents', sub: 'Workflows with human review', tone: 'ink' },
] as const;

const BACKDROP_STACK = [
  'Astro SSG',
  'Cloudflare Pages',
  'HubSpot Forms',
] as const;

export default function ContactWorkbench({ locale = 'en' }: { locale?: SiteLocale }) {
  const bm = locale === 'bm';
  const copy = bm ? bmHome.contact : null;
  const baseId = useId();

  const subjectOptions = bm
    ? ['Laman Web Perniagaan (Dari RM799)', 'Kedai WooCommerce (Dari RM3,500)', 'Sistem & Automasi (Sebut Harga)', 'Pertanyaan Umum']
    : ['Website Build (From RM799)', 'WooCommerce Store (From RM3,500)', 'Systems & Automation (Quotation)', 'General Enquiry'];

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState<CountryCode>('MY');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState(subjectOptions[0]);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submittedEmail, setSubmittedEmail] = useState('');

  useEffect(() => {
    setCountry(detectCountryFromBrowser());
  }, []);

  const selectedCountry = COUNTRY_CODES.find((c) => c.code === country) ?? COUNTRY_CODES[0];
  const fullPhone = formatFullPhone(selectedCountry.dial, phone);

  const buildHubSpotMessage = () => {
    const headerLines = [`[${subject}]`];
    if (company.trim()) headerLines.push(`Company: ${company.trim()}`);
    return `${headerLines.join('\n')}\n\n${message.trim()}`;
  };

  const buildBriefText = () => {
    const lines = [
      bm ? 'Salam HaikaiTech, ini ringkasan projek saya:' : 'Hi HaikaiTech, here is my project brief:',
      `${bm ? 'Nama' : 'Name'}: ${name.trim()}`,
      ...(company.trim() ? [`Company: ${company.trim()}`] : []),
      `${bm ? 'Telefon / WhatsApp' : 'Phone / WhatsApp'}: ${fullPhone}`,
      `${bm ? 'E-mel' : 'Email'}: ${email.trim()}`,
      `${bm ? 'Topik' : 'Subject'}: ${subject}`,
      `${bm ? 'Mesej' : 'Message'}: ${message.trim()}`,
    ];
    return lines.join('\n');
  };

  const whatsappBriefHref = `https://wa.me/60147533499?text=${encodeURIComponent(buildBriefText())}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');

    const hutk = getCookie('hubspotutk');
    const context: Record<string, string> = {
      pageUri: window.location.href,
      pageName: document.title,
    };
    if (hutk) context.hutk = hutk;

    const payload = {
      fields: [
        { name: 'firstname', value: name.trim() },
        { name: 'phone', value: fullPhone },
        { name: 'email', value: email.trim() },
        { name: 'message', value: buildHubSpotMessage() },
      ],
      context,
    };

    try {
      const res = await fetch(HUBSPOT_SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setStatus('error');
        return;
      }

      setSubmittedEmail(email.trim());
      setStatus('success');
      track('contact_clicked', 'hubspot_form');
    } catch {
      setStatus('error');
    }
  };

  const resetForm = () => {
    setEmail('');
    setName('');
    setCompany('');
    setPhone('');
    setSubject(subjectOptions[0]);
    setMessage('');
    setStatus('idle');
  };

  const directWhatsappHref = bm
    ? 'https://wa.me/60147533499?text=Salam%20HaikaiTech%2C%20saya%20ingin%20berbincang%20tentang%20projek.'
    : CONTACTS.find((c) => c.type === 'whatsapp')?.href ?? 'https://wa.me/60147533499';

  const expectations = bm
    ? [
        'Perbincangan santai tentang laman web atau sistem anda',
        'Skop jelas dan harga RM telus sebelum bermula',
        'Balasan terus daripada Iffat dalam 1 jam waktu bekerja',
        'Susulan melalui WhatsApp atau e-mel, tiada paksaan',
      ]
    : [
        'Zero-pressure chat about your website or system',
        'Clear scope and transparent RM pricing before we start',
        'Direct reply from Iffat within 1 business hour',
        'Handover via WhatsApp or email, no hard sell',
      ];

  return (
    <section id="contact" className="ht-contact" aria-labelledby="contact-title">
      <div className="ht-contact__stage">
        {/* Tines-style non-overlapping 2-flank Architecture & Dashboard Mock backdrop */}
        <div className="ht-contact__backdrop" aria-hidden="true">
          <svg className="ht-contact__ribbon" width="1440" height="360" viewBox="0 0 1440 360" fill="none">
            <path
              d="M-40 248C170 248 250 132 455 138C635 144 765 224 965 210C1150 198 1280 96 1480 86"
              stroke="#F4D35E"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M-40 248C170 248 250 132 455 138C635 144 765 224 965 210C1150 198 1280 96 1480 86"
              stroke="#16202A"
              strokeOpacity="0.4"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="6 8"
            />
            <path
              d="M-20 112C140 162 290 278 520 264C760 250 960 110 1460 236"
              stroke="#1368E6"
              strokeOpacity="0.22"
              strokeWidth="1.6"
              strokeDasharray="4 6"
            />
            <circle cx="195" cy="186" r="5" fill="#F28466" stroke="#16202A" strokeWidth="1.4" />
            <circle cx="1225" cy="144" r="5.5" fill="#9AB8FA" stroke="#16202A" strokeWidth="1.4" />
            <circle cx="1310" cy="116" r="4" fill="#22C58B" stroke="#16202A" strokeWidth="1.3" />
          </svg>

          <div className="ht-contact__flanks">
            {/* Left Flank: Workflow Architecture Mock + Studio Dashboard Mock */}
            <div className="ht-contact__flank ht-contact__flank--left">
              <div className="ht-contact__mock ht-contact__mock--arch">
                <div className="ht-contact__win-tabs">
                  <span className="is-on">Architecture</span>
                  <span>Workflows</span>
                  <span>Live</span>
                </div>
                <svg className="ht-contact__arch-svg" width="340" height="148" viewBox="0 0 340 148" fill="none">
                  {/* Top pipeline path: Website -> HubSpot CRM -> WhatsApp */}
                  <path d="M98 42H130M218 42H248" stroke="#16202A" strokeWidth="1.6" strokeLinecap="round" />
                  {/* Orthogonal drop branch: HubSpot CRM -> Invoice PDF */}
                  <path d="M174 62V104H202" stroke="#1368E6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Sweeping accent data thread */}
                  <path d="M16 112C54 112 72 62 114 42" stroke="#F4D35E" strokeWidth="3.2" strokeLinecap="round" />
                  <circle cx="16" cy="112" r="3.5" fill="#F4D35E" stroke="#16202A" strokeWidth="1.3" />

                  {/* Node 1: Website (cream with Ligne Claire step shadow) */}
                  <rect x="19" y="25" width="82" height="40" rx="6" fill="#C8D9F4" />
                  <rect x="16" y="22" width="82" height="40" rx="6" fill="#FAF8F3" stroke="#16202A" strokeWidth="1.5" />
                  <circle cx="28" cy="36" r="3.5" fill="#1368E6" stroke="#16202A" strokeWidth="1.1" />
                  <text x="36" y="40" fill="#16202A" fontSize="10.5" fontWeight="600" fontFamily="monospace">Website</text>
                  <path d="M25 51h56" stroke="#D6E2F6" strokeWidth="2" strokeLinecap="round" />

                  {/* Node 2: HubSpot CRM (soft cobalt) */}
                  <rect x="133" y="25" width="88" height="40" rx="6" fill="#B2C8F0" />
                  <rect x="130" y="22" width="88" height="40" rx="6" fill="#DCE8FA" stroke="#16202A" strokeWidth="1.5" />
                  <circle cx="142" cy="36" r="3.5" fill="#F28466" stroke="#16202A" strokeWidth="1.1" />
                  <text x="150" y="40" fill="#0D3B8E" fontSize="10" fontWeight="700" fontFamily="monospace">HubSpot</text>
                  <path d="M139 51h64" stroke="#9AB8FA" strokeWidth="2" strokeLinecap="round" />

                  {/* Node 3: WhatsApp (mint) */}
                  <rect x="251" y="25" width="76" height="40" rx="6" fill="#AEE0CE" />
                  <rect x="248" y="22" width="76" height="40" rx="6" fill="#DEF4EC" stroke="#16202A" strokeWidth="1.5" />
                  <circle cx="259" cy="36" r="3.5" fill="#0E8A68" stroke="#16202A" strokeWidth="1.1" />
                  <text x="267" y="40" fill="#0B6B50" fontSize="10" fontWeight="700" fontFamily="monospace">WhatsApp</text>
                  <path d="M257 51h52" stroke="#9ED8C3" strokeWidth="2" strokeLinecap="round" />

                  {/* Branch Node 4: Invoice PDF (warm coral) */}
                  <rect x="205" y="87" width="96" height="38" rx="6" fill="#F2B58F" />
                  <rect x="202" y="84" width="96" height="38" rx="6" fill="#FCE2CC" stroke="#16202A" strokeWidth="1.5" />
                  <circle cx="214" cy="98" r="3.5" fill="#F4D35E" stroke="#16202A" strokeWidth="1.1" />
                  <text x="223" y="102" fill="#9E3E10" fontSize="10" fontWeight="700" fontFamily="monospace">Invoice PDF</text>
                  <path d="M211 112h70" stroke="#F2B58F" strokeWidth="2" strokeLinecap="round" />

                  {/* Connector pins */}
                  <circle cx="98" cy="42" r="3.5" fill="#F4D35E" stroke="#16202A" strokeWidth="1.3" />
                  <circle cx="130" cy="42" r="3.5" fill="#F4D35E" stroke="#16202A" strokeWidth="1.3" />
                  <circle cx="218" cy="42" r="3.5" fill="#F4D35E" stroke="#16202A" strokeWidth="1.3" />
                  <circle cx="248" cy="42" r="3.5" fill="#F4D35E" stroke="#16202A" strokeWidth="1.3" />
                  <circle cx="174" cy="62" r="3.5" fill="#9AB8FA" stroke="#16202A" strokeWidth="1.3" />
                  <circle cx="202" cy="104" r="3.5" fill="#9AB8FA" stroke="#16202A" strokeWidth="1.3" />
                </svg>
              </div>

              <div className="ht-contact__mock ht-contact__mock--dash">
                <div className="ht-contact__win-split">
                  <div className="ht-contact__win-pane">
                    <p className="ht-contact__win-cap">Builds by track</p>
                    <svg className="ht-contact__ring-svg" width="112" height="112" viewBox="0 0 128 128" fill="none">
                      <circle cx="64" cy="64" r="48" stroke="#E1EAF8" strokeWidth="10" />
                      <circle
                        cx="64"
                        cy="64"
                        r="48"
                        stroke="#1368E6"
                        strokeWidth="10"
                        strokeDasharray="106 302"
                        strokeLinecap="round"
                        transform="rotate(-90 64 64)"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="48"
                        stroke="#0E8A68"
                        strokeWidth="10"
                        strokeDasharray="76 302"
                        strokeDashoffset="-114"
                        strokeLinecap="round"
                        transform="rotate(-90 64 64)"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="48"
                        stroke="#F4D35E"
                        strokeWidth="10"
                        strokeDasharray="54 302"
                        strokeDashoffset="-198"
                        strokeLinecap="round"
                        transform="rotate(-90 64 64)"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="48"
                        stroke="#E8744F"
                        strokeWidth="10"
                        strokeDasharray="36 302"
                        strokeDashoffset="-260"
                        strokeLinecap="round"
                        transform="rotate(-90 64 64)"
                      />
                    </svg>
                    <span className="ht-contact__ring-label">Studio</span>
                    <div className="ht-contact__win-legend">
                      <span><i style={{ background: '#1368E6' }} />Websites</span>
                      <span><i style={{ background: '#0E8A68' }} />Storefronts</span>
                      <span><i style={{ background: '#F4D35E' }} />Systems</span>
                      <span><i style={{ background: '#E8744F' }} />AI Agents</span>
                    </div>
                  </div>
                  <div className="ht-contact__win-blocks">
                    <div className="ht-contact__win-block ht-contact__win-block--cobalt">Penang</div>
                    <div className="ht-contact__win-block ht-contact__win-block--mint">Selangor</div>
                    <div className="ht-contact__win-block ht-contact__win-block--amber">WhatsApp</div>
                    <div className="ht-contact__win-block ht-contact__win-block--coral">Invoice PDF</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Flank: Connected Stack Matrix + Delivery & Uptime Dashboard Mock */}
            <div className="ht-contact__flank ht-contact__flank--right">
              <div className="ht-contact__mock ht-contact__mock--connectors">
                <div className="ht-contact__win-head">
                  <span>Connected stack</span>
                </div>
                <div className="ht-contact__win-conn-grid">
                  {BACKDROP_CONNECTORS.map((item) => (
                    <div key={item.name} className="ht-contact__win-conn">
                      <span className={`ht-contact__win-badge ht-contact__win-badge--${item.tone}`} />
                      <div>
                        <strong>{item.name}</strong>
                        <small>{item.sub}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ht-contact__mock ht-contact__mock--telemetry">
                <div className="ht-contact__win-head">
                  <span>Delivery &amp; uptime</span>
                </div>
                <svg className="ht-contact__wave-svg" width="340" height="82" viewBox="0 0 340 82" fill="none">
                  <defs>
                    <linearGradient id={`${baseId}-wave-fill`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1368E6" stopOpacity="0.16" />
                      <stop offset="100%" stopColor="#1368E6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M8 20H332M8 42H332M8 64H332" stroke="#D6E2F6" strokeWidth="1" strokeDasharray="3 4" />
                  <path
                    d="M8 54C48 54 68 26 112 30C156 34 176 58 220 48C264 38 286 16 332 20V68H8Z"
                    fill={`url(#${baseId}-wave-fill)`}
                  />
                  <path
                    d="M8 54C48 54 68 26 112 30C156 34 176 58 220 48C264 38 286 16 332 20"
                    stroke="#1368E6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 60C62 56 88 42 138 46C188 50 222 32 272 36C300 38 318 44 332 40"
                    stroke="#0E8A68"
                    strokeWidth="1.6"
                    strokeDasharray="3 3"
                    strokeLinecap="round"
                  />
                  <circle cx="112" cy="30" r="3.5" fill="#F4D35E" stroke="#16202A" strokeWidth="1.3" />
                  <circle cx="286" cy="21" r="3.5" fill="#F28466" stroke="#16202A" strokeWidth="1.3" />
                </svg>
                <div className="ht-contact__win-stack-list">
                  {BACKDROP_STACK.map((tool) => (
                    <div key={tool} className="ht-contact__win-stack-row">
                      <span className="ht-contact__win-dot" />
                      <strong>{tool}</strong>
                      <small>Ready</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tines-container ht-contact__wrap">
          <div className="ht-contact__card">
            {/* Left column: Roomy header + expectations + architectural workbench SVG */}
            <div className="ht-contact__left">
              <div className="ht-contact__left-head">
                <h2 id="contact-title" className="ht-contact__title">
                  {bm ? (
                    <>
                      Mulakan projek
                      <br />
                      seterusnya
                    </>
                  ) : (
                    <>
                      Start your
                      <br />
                      next build
                    </>
                  )}
                </h2>
              </div>

              <div className="ht-contact__left-body">
                <div className="ht-contact__expect">
                  <h3>{bm ? 'Apa yang dijangka:' : 'What to expect:'}</h3>
                  <ul>
                    {expectations.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>

                  <div className="ht-contact__direct">
                    <span>{bm ? 'Terus berhubung:' : 'Direct chat:'}</span>
                    <a
                      href={directWhatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track('contact_clicked', 'whatsapp')}
                    >
                      WhatsApp &#8599;
                    </a>
                    <a
                      href="mailto:hq@haikaitech.my?subject=Project%20enquiry"
                      onClick={() => track('contact_clicked', 'email')}
                    >
                      hq@haikaitech.my
                    </a>
                  </div>
                </div>

                {/* Ligne Claire Architectural Workbench / Server-Node Isometric Vignette */}
                <svg className="ht-contact__spot" width="96" height="84" viewBox="0 0 112 100" fill="none" aria-hidden="true">
                  <ellipse cx="56" cy="92" rx="40" ry="4.5" fill="#16202A" fillOpacity="0.12" />
                  {/* Architectural desk slab */}
                  <path d="M14 70L56 54L98 70L56 86L14 70Z" fill="#DCE8FA" stroke="#16202A" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M14 70V77L56 93V86L14 70Z" fill="#9AB8FA" stroke="#16202A" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M98 70V77L56 93V86L98 70Z" fill="#FAF8F3" stroke="#16202A" strokeWidth="1.6" strokeLinejoin="round" />

                  {/* Isometric server tower on left of slab */}
                  <path d="M28 64V30L46 23V57L28 64Z" fill="#FAF8F3" stroke="#16202A" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M46 23L62 29V63L46 57V23Z" fill="#DCE8FA" stroke="#16202A" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M28 30L44 24L62 29L46 36L28 30Z" fill="#F28466" stroke="#16202A" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M33 40l9-3.5M33 46l9-3.5M33 52l9-3.5" stroke="#1368E6" strokeWidth="1.5" strokeLinecap="round" />

                  {/* Browser display block on right of slab */}
                  <rect x="54" y="42" width="32" height="24" rx="4" fill="#FAF8F3" stroke="#16202A" strokeWidth="1.6" />
                  <rect x="58" y="47" width="24" height="12" rx="2" fill="#152238" />
                  <path d="M62 52h10M62 56h15" stroke="#F4D35E" strokeWidth="1.4" strokeLinecap="round" />

                  {/* Flowing golden Ligne Claire data ribbon */}
                  <path d="M20 50C32 42 42 54 68 38C78 32 86 24 94 20" stroke="#F4D35E" strokeWidth="4" strokeLinecap="round" />
                  <path d="M20 50C32 42 42 54 68 38C78 32 86 24 94 20" stroke="#16202A" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="3 4" />
                  <circle cx="95" cy="19" r="3.5" fill="#22C58B" stroke="#16202A" strokeWidth="1.4" />
                  <path d="M76 16l1.4 3.4 3.4 1.4-3.4 1.4L76 25.6l-1.4-3.4-3.4-1.4 3.4-1.4Z" fill="#F4D35E" stroke="#16202A" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Right column: Tines hairline-grid form */}
            {status === 'success' ? (
              <div className="ht-contact__done" role="status" aria-live="polite">
                <p className="ht-contact__done-badge">
                  <i aria-hidden="true" />
                  <span>{bm ? 'Ringkasan diterima' : 'Brief received'}</span>
                </p>
                <h3>
                  {bm
                    ? 'Terima kasih! Kami telah menerima ringkasan anda.'
                    : 'Thanks! We got your project brief.'}
                </h3>
                <p>
                  {bm
                    ? `Kami biasanya membalas dalam masa 1 jam waktu bekerja (9 pagi hingga 6 petang MYT) ke ${submittedEmail}. Ingin jawapan lebih pantas?`
                    : `We usually reply within 1 business hour (9am to 6pm MYT) to ${submittedEmail}. Want an even faster reply?`}
                </p>
                <div className="ht-contact__done-actions">
                  <a
                    className="ht-contact__submit"
                    href={whatsappBriefHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('contact_clicked', 'whatsapp_after_hubspot')}
                  >
                    <span>{bm ? 'Terus buka di WhatsApp' : 'Also open brief in WhatsApp'}</span>
                    <span aria-hidden="true">&#8599;</span>
                  </a>
                  <button type="button" className="ht-contact__reset" onClick={resetForm}>
                    {bm ? 'Hantar mesej lain' : 'Send another brief'}
                  </button>
                </div>
              </div>
            ) : (
              <form className="ht-contact__form" onSubmit={handleSubmit}>
                {/* Row 1: Business Email (full width) */}
                <div className="ht-contact__cell" data-filled={email.length > 0}>
                  <label className="ht-contact__label" htmlFor={`${baseId}-email`}>
                    {bm ? 'E-mel perniagaan' : 'Email'} <em aria-hidden="true">*</em>
                  </label>
                  <input
                    id={`${baseId}-email`}
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>

                {/* Row 2: Your name * | Business / Company */}
                <div className="ht-contact__row-2">
                  <div className="ht-contact__cell" data-filled={name.length > 0}>
                    <label className="ht-contact__label" htmlFor={`${baseId}-name`}>
                      {bm ? 'Nama anda' : 'Your name'} <em aria-hidden="true">*</em>
                    </label>
                    <input
                      id={`${baseId}-name`}
                      type="text"
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                    />
                  </div>

                  <div className="ht-contact__cell" data-filled={company.length > 0}>
                    <label className="ht-contact__label" htmlFor={`${baseId}-company`}>
                      {bm ? 'Syarikat / Perniagaan' : 'Business / Company'}
                    </label>
                    <input
                      id={`${baseId}-company`}
                      type="text"
                      name="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      autoComplete="organization"
                    />
                  </div>
                </div>

                {/* Row 3: Phone / WhatsApp * with country selector */}
                <div className="ht-contact__cell ht-contact__cell--static">
                  <label className="ht-contact__label" htmlFor={`${baseId}-phone`}>
                    {bm ? 'Telefon / WhatsApp' : 'Phone / WhatsApp'} <em aria-hidden="true">*</em>
                  </label>
                  <div className="ht-contact__phone">
                    <select
                      className="ht-contact__country"
                      aria-label={bm ? 'Kod negara' : 'Country code'}
                      value={country}
                      onChange={(e) => setCountry(e.target.value as CountryCode)}
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.code}
                        </option>
                      ))}
                    </select>
                    {selectedCountry.dial && (
                      <span className="ht-contact__dial" aria-hidden="true">
                        {selectedCountry.dial}
                      </span>
                    )}
                    <input
                      id={`${baseId}-phone`}
                      type="tel"
                      name="phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={selectedCountry.placeholder}
                      autoComplete="tel-national"
                    />
                  </div>
                </div>

                {/* Row 4: Project route select */}
                <div className="ht-contact__cell ht-contact__cell--static">
                  <label className="ht-contact__label" htmlFor={`${baseId}-subject`}>
                    {bm ? 'Skop projek' : 'Project route'}
                  </label>
                  <div className="ht-contact__select-wrap">
                    <select
                      id={`${baseId}-subject`}
                      name="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    >
                      {subjectOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <svg className="ht-contact__chevron" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 6l4 4 4-4" />
                    </svg>
                  </div>
                </div>

                {/* Row 5: Message * textarea */}
                <div className="ht-contact__cell ht-contact__cell--grow" data-filled={message.length > 0}>
                  <label className="ht-contact__label" htmlFor={`${baseId}-message`}>
                    {bm
                      ? 'Ceritakan tentang perniagaan dan projek anda'
                      : 'Tell us more about how we can help you'} <em aria-hidden="true">*</em>
                  </label>
                  <textarea
                    id={`${baseId}-message`}
                    name="message"
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <div className="ht-contact__submit-area">
                  {status === 'error' && (
                    <p className="ht-contact__error" role="alert">
                      {bm
                        ? 'Tidak dapat menghantar borang buat masa ini. '
                        : 'Could not submit right now. '}
                      <a
                        href={whatsappBriefHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track('contact_clicked', 'whatsapp_fallback')}
                      >
                        {bm ? 'Hantar terus melalui WhatsApp' : 'Send directly via WhatsApp'} &#8599;
                      </a>
                    </p>
                  )}

                  <p className="ht-contact__privacy">
                    {bm ? 'Dengan menghantar borang ini, anda bersetuju dengan ' : 'By submitting, you agree to our '}
                    <a href="/privacy-policy/">{bm ? 'notis privasi' : 'privacy notice'}</a>.
                  </p>

                  <button
                    type="submit"
                    className="ht-contact__submit"
                    disabled={status === 'submitting'}
                  >
                    <span>
                      {status === 'submitting'
                        ? bm
                          ? 'MENGHANTAR...'
                          : 'SENDING...'
                        : bm
                          ? 'HANTAR RINGKASAN PROJEK'
                          : 'SEND PROJECT BRIEF'}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Dedicated clean footer strip below stage (zero overlap with backdrop windows) */}
      <div className="ht-contact__foot">
        <div className="tines-container ht-contact__foot-inner">
          <nav className="ht-contact__elsewhere" aria-label={copy?.elsewhere ?? 'Find HaikaiTech elsewhere'}>
            <span>{copy?.elsewhere ?? 'Elsewhere on the web'}</span>
            <div className="ht-contact__socials">
              {CONTACTS.filter((c) => c.type !== 'whatsapp' && c.type !== 'email').map((contact) => (
                <a
                  key={contact.type}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('contact_clicked', contact.type)}
                >
                  <span className="ht-contact__social-icon" aria-hidden="true">
                    {getIconForContact(contact.type)}
                  </span>
                  <span>{contact.label}</span>
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}
