import React from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  HelpCircle,
  RotateCcw,
  Send,
  ShoppingBag,
  Workflow,
  X,
} from 'lucide-react';
import { track } from './track';

const WHATSAPP_NUMBER = '60147533499';
const HUBSPOT_SUBMIT_URL =
  'https://api-na2.hsforms.com/submissions/v3/integration/submit/248131052/942fe01d-5d7b-4ba5-a3bd-dea68738f586';

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

const getCookie = (cookieName: string): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${cookieName}=`));
  return match ? decodeURIComponent(match.split('=')[1]) : undefined;
};

type TopicId = 'starter' | 'business' | 'automation' | 'question';
type ChatStep = 'topic' | 'name' | 'email' | 'phone' | 'message' | 'submitting' | 'success' | 'error';

interface TopicOption {
  id: TopicId;
  label: string;
  hint: string;
  reply: string;
  whatsappMsg: string;
  icon: 'globe' | 'bag' | 'workflow' | 'help';
}

interface CroPopupAngle {
  id: string;
  topicId: TopicId;
  tag: string;
  question: string;
  cta: string;
}

const getCroPopupAngles = (bm: boolean): CroPopupAngle[] =>
  bm
    ? [
        {
          id: 'b2b',
          topicId: 'business',
          tag: 'B2B & Korporat',
          question: 'Perlukan laman web korporat yang lebih meyakinkan untuk tarik pelanggan WhatsApp?',
          cta: 'Semak skop B2B',
        },
        {
          id: 'ecom',
          topicId: 'business',
          tag: 'Kedai Online',
          question: 'Penat dengan caj platform? Bina kedai dalam talian sendiri dengan bayaran FPX.',
          cta: 'Rancang kedai saya',
        },
        {
          id: 'starter',
          topicId: 'starter',
          tag: 'Mula dari RM799',
          question: 'Mahu lancarkan laman web perniagaan yang kemas dalam 5 hingga 7 hari bekerja?',
          cta: 'Lihat pakej RM799',
        },
        {
          id: 'automation',
          topicId: 'automation',
          tag: 'Automasi & Sistem',
          question: 'Masih urus pertanyaan dan pesanan secara manual? Automasi aliran kerja pasukan anda.',
          cta: 'Teroka automasi',
        },
        {
          id: 'budget',
          topicId: 'question',
          tag: 'Anggaran Telus',
          question: 'Tidak pasti kos sebenar untuk bina laman web atau sistem di Malaysia?',
          cta: 'Tanya Iffat terus',
        },
      ]
    : [
        {
          id: 'b2b',
          topicId: 'business',
          tag: 'B2B & Corporate',
          question: 'Need a sharper corporate site that actually turns visitors into WhatsApp inquiries?',
          cta: 'Check B2B scope',
        },
        {
          id: 'ecom',
          topicId: 'business',
          tag: 'Online Store',
          question: 'Tired of marketplace fees? Launch your own ecommerce store with Malaysian FPX.',
          cta: 'Plan my store',
        },
        {
          id: 'starter',
          topicId: 'starter',
          tag: 'From RM799',
          question: 'Starting lean? Launch a fast, mobile-ready business website in 5 to 7 days.',
          cta: 'See RM799 starter',
        },
        {
          id: 'automation',
          topicId: 'automation',
          tag: 'Systems & AI',
          question: 'Still chasing leads or orders manually? Automate WhatsApp, CRM & workflows.',
          cta: 'Explore automation',
        },
        {
          id: 'budget',
          topicId: 'question',
          tag: 'Honest Quote',
          question: 'Not sure what your website should realistically cost in Malaysia?',
          cta: 'Ask Iffat directly',
        },
      ];

const getTopics = (bm: boolean): TopicOption[] =>
  bm
    ? [
        {
          id: 'starter',
          label: 'Laman Permulaan (dari RM799)',
          hint: 'Satu halaman pantas dengan aliran WhatsApp',
          reply:
            'Pakej permulaan bermula dari RM799 dan lazimnya siap dalam 5 hingga 7 hari bekerja. Jom ambil 4 maklumat ringkas supaya Iffat boleh beri anggaran tepat.',
          whatsappMsg:
            'Salam HaikaiTech! Saya berminat dengan Laman Permulaan (dari RM799) dan ingin tahu skop serta tempoh siap.',
          icon: 'globe',
        },
        {
          id: 'business',
          label: 'Laman Syarikat / Kedai Online',
          hint: 'Pelbagai halaman, Shopify, WooCommerce atau FPX',
          reply:
            'Kami membina laman perniagaan pelbagai halaman dan kedai dalam talian dengan FPX/kad. Kongsi 4 butiran ringkas di sini untuk sebut harga RM yang jelas.',
          whatsappMsg:
            'Salam HaikaiTech! Saya ingin berbincang tentang Laman Syarikat atau Kedai Dalam Talian untuk perniagaan saya.',
          icon: 'bag',
        },
        {
          id: 'automation',
          label: 'Sistem Tersuai / Automasi',
          hint: 'Papan pemuka, tempahan, n8n atau HubSpot',
          reply:
            'Kami mereka bentuk papan pemuka pasukan, sistem tempahan dan automasi WhatsApp/CRM. Jawab 4 soalan ringkas supaya kami dapat semak keperluan anda.',
          whatsappMsg:
            'Salam HaikaiTech! Saya ingin berbincang tentang Sistem Tersuai atau Automasi aliran kerja.',
          icon: 'workflow',
        },
        {
          id: 'question',
          label: 'Sekadar bertanya / Semak bajet',
          hint: 'Tempoh siap, kos atau cadangan skop',
          reply:
            'Tiada masalah, tiada paksaan. Isi 4 butiran ringkas di sini dan Iffat akan balas terus dalam 1 jam bekerja.',
          whatsappMsg:
            'Salam HaikaiTech! Saya ada beberapa soalan ringkas tentang laman web dan bajet untuk perniagaan saya.',
          icon: 'help',
        },
      ]
    : [
        {
          id: 'starter',
          label: 'Starter Website (from RM799)',
          hint: 'Focused one-page launch with WhatsApp leads',
          reply:
            'Starter builds begin at RM799 and typically launch in 5 to 7 working days. Answer 4 quick questions here so Iffat can send you a tailored RM quote.',
          whatsappMsg:
            "Hi HaikaiTech! I'm interested in a Starter Website (from RM799) and would like to check scope and timeline.",
          icon: 'globe',
        },
        {
          id: 'business',
          label: 'Business Site / Online Store',
          hint: 'Multi-page site, Shopify, WooCommerce or FPX',
          reply:
            'We build multi-page SME sites and ecommerce stores with FPX/card checkout. Share 4 quick details here and we will send a clear scope and RM quote.',
          whatsappMsg:
            "Hi HaikaiTech! I'd like to discuss a Business Website or Online Store for my company.",
          icon: 'bag',
        },
        {
          id: 'automation',
          label: 'Custom System / Automation',
          hint: 'Dashboards, booking flows, n8n or HubSpot',
          reply:
            'We engineer internal portals, booking systems, and WhatsApp/CRM workflows. Share 4 quick details here so we can map out the best setup.',
          whatsappMsg:
            "Hi HaikaiTech! I'm looking to build a Custom System or Workflow Automation for our team.",
          icon: 'workflow',
        },
        {
          id: 'question',
          label: 'Quick question / Scope advice',
          hint: 'Timelines, RM pricing or honest recommendations',
          reply:
            'Happy to help with zero hard sell. Leave 4 quick details here and Iffat will reply directly within 1 business hour.',
          whatsappMsg:
            'Hi HaikaiTech! I have a quick question about website pricing and scope for my business.',
          icon: 'help',
        },
      ];

const TopicIcon: React.FC<{ kind: TopicOption['icon'] }> = ({ kind }) => {
  if (kind === 'globe') return <Globe className="h-4 w-4" aria-hidden="true" />;
  if (kind === 'bag') return <ShoppingBag className="h-4 w-4" aria-hidden="true" />;
  if (kind === 'workflow') return <Workflow className="h-4 w-4" aria-hidden="true" />;
  return <HelpCircle className="h-4 w-4" aria-hidden="true" />;
};

const StickyBooking: React.FC<{ locale?: 'en' | 'bm'; readingMode?: boolean }> = ({
  locale = 'en',
  readingMode = false,
}) => {
  const bm = locale === 'bm';
  const topics = React.useMemo(() => getTopics(bm), [bm]);
  const croAngles = React.useMemo(() => getCroPopupAngles(bm), [bm]);

  const [popupPhase, setPopupPhase] = React.useState<'idle' | 'typing' | 'message'>('idle');
  const [angleIndex, setAngleIndex] = React.useState(0);
  const [popupHovered, setPopupHovered] = React.useState(false);
  const [popupDismissed, setPopupDismissed] = React.useState(false);
  const [inScrollZone, setInScrollZone] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [hiddenForReading, setHiddenForReading] = React.useState(false);

  // Step-by-step conversational HubSpot form state
  const [step, setStep] = React.useState<ChatStep>('topic');
  const [selectedTopicId, setSelectedTopicId] = React.useState<TopicId | null>(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [country, setCountry] = React.useState<CountryCode>('MY');
  const [phone, setPhone] = React.useState('');
  const [note, setNote] = React.useState('');
  const [draft, setDraft] = React.useState('');
  const [inputError, setInputError] = React.useState('');

  const launcherRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setCountry(detectCountryFromBrowser());
  }, []);

  const currentAngle = croAngles[angleIndex % croAngles.length];
  const selectedTopic = selectedTopicId
    ? topics.find((item) => item.id === selectedTopicId) ?? null
    : null;
  const selectedCountry = COUNTRY_CODES.find((c) => c.code === country) ?? COUNTRY_CODES[0];
  const fullPhone = formatFullPhone(selectedCountry.dial, phone);

  // Auto-scroll chat thread & focus composer on step change
  React.useEffect(() => {
    if (!open) return;
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    if (step === 'name' || step === 'email' || step === 'phone' || step === 'message') {
      const id = window.setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
      }, 120);
      return () => window.clearTimeout(id);
    }
  }, [open, step, selectedTopicId]);

  // Track whether user has scrolled down past hero (and is not directly on the full contact form)
  React.useEffect(() => {
    const checkZone = () => {
      const isMobileReading = readingMode && window.matchMedia('(max-width: 767px)').matches;
      if (isMobileReading) {
        setInScrollZone(false);
        return;
      }
      const contactEl = document.getElementById('contact') || document.getElementById('start');
      const contactVisible = contactEl
        ? contactEl.getBoundingClientRect().top < window.innerHeight * 0.72 &&
          contactEl.getBoundingClientRect().bottom > 120
        : false;
      setInScrollZone(window.scrollY >= 240 && !contactVisible);
    };

    checkZone();
    window.addEventListener('scroll', checkZone, { passive: true });
    window.addEventListener('resize', checkZone);
    return () => {
      window.removeEventListener('scroll', checkZone);
      window.removeEventListener('resize', checkZone);
    };
  }, [readingMode]);

  // Rotating CRO message cadence: pop in -> show 9s -> rest 14s -> next CRO angle
  React.useEffect(() => {
    if (!inScrollZone || popupDismissed || open) {
      setPopupPhase('idle');
      return;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timerId: number | undefined;

    if (popupPhase === 'idle') {
      const waitMs = angleIndex === 0 ? 450 : 14000;
      timerId = window.setTimeout(() => {
        setPopupPhase(reduced ? 'message' : 'typing');
      }, waitMs);
    } else if (popupPhase === 'typing') {
      timerId = window.setTimeout(() => {
        setPopupPhase('message');
      }, 800);
    } else if (popupPhase === 'message' && !popupHovered) {
      timerId = window.setTimeout(() => {
        setPopupPhase('idle');
        setAngleIndex((prev) => (prev + 1) % croAngles.length);
      }, 9000);
    }

    return () => {
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, [inScrollZone, popupDismissed, open, popupPhase, popupHovered, angleIndex, croAngles.length]);

  // Respect mobile blog reading sheet
  React.useEffect(() => {
    if (!readingMode) return;
    const onScroll = () => {
      const readingSheet = document.querySelector('.wa-paper');
      const mobileReading =
        Boolean(readingSheet) &&
        window.matchMedia('(max-width: 767px)').matches &&
        (readingSheet?.getBoundingClientRect().bottom ?? 0) > window.innerHeight * 0.7;
      setHiddenForReading(mobileReading);
      if (mobileReading) setOpen(false);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [readingMode]);

  // Close on outside pointer click or Escape
  React.useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!launcherRef.current?.contains(event.target as Node)) setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !open) return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const handleOpenChat = (source: string, preselectTopic?: TopicId) => {
    setOpen(true);
    setPopupDismissed(true);
    setPopupPhase('idle');
    if (preselectTopic && step === 'topic') {
      setSelectedTopicId(preselectTopic);
      setStep('name');
      setDraft(name);
      setInputError('');
    }
    track('cta_clicked', source);
  };

  const handleToggleOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      handleOpenChat('sticky_chat_open');
    }
  };

  const handleSelectTopic = (id: TopicId) => {
    setSelectedTopicId(id);
    setStep('name');
    setDraft(name);
    setInputError('');
    track('cta_clicked', `sticky_chat_topic_${id}`);
  };

  const submitToHubSpot = async (finalNote: string) => {
    setStep('submitting');
    setInputError('');

    const hutk = getCookie('hubspotutk');
    const context: Record<string, string> = {
      pageUri: window.location.href,
      pageName: document.title,
    };
    if (hutk) context.hutk = hutk;

    const topicLabel = selectedTopic?.label ?? 'Website Enquiry';
    const payload = {
      fields: [
        { name: 'firstname', value: name.trim() },
        { name: 'phone', value: fullPhone },
        { name: 'email', value: email.trim() },
        { name: 'message', value: `[Chat: ${topicLabel}]\n\n${finalNote.trim()}` },
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
        setStep('error');
        return;
      }

      setStep('success');
      track('contact_clicked', 'sticky_chat_hubspot');
    } catch {
      setStep('error');
    }
  };

  const handleComposerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = draft.trim();

    if (step === 'name') {
      if (value.length < 2) {
        setInputError(bm ? 'Sila masukkan nama anda.' : 'Please enter your name.');
        return;
      }
      setName(value);
      setDraft(email);
      setInputError('');
      setStep('email');
      return;
    }

    if (step === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setInputError(bm ? 'Sila masukkan e-mel yang sah.' : 'Please enter a valid email address.');
        return;
      }
      setEmail(value);
      setDraft(phone);
      setInputError('');
      setStep('phone');
      return;
    }

    if (step === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length < 7) {
        setInputError(
          bm ? 'Sila masukkan nombor telefon / WhatsApp yang sah.' : 'Please enter a valid phone / WhatsApp number.'
        );
        return;
      }
      setPhone(value);
      setDraft(note);
      setInputError('');
      setStep('message');
      return;
    }

    if (step === 'message') {
      if (value.length < 4) {
        setInputError(bm ? 'Ceritakan sedikit tentang projek anda.' : 'Please share a quick note about your project.');
        return;
      }
      setNote(value);
      setDraft('');
      setInputError('');
      void submitToHubSpot(value);
    }
  };

  const handleBackStep = () => {
    setInputError('');
    if (step === 'name') {
      setStep('topic');
      setSelectedTopicId(null);
      setDraft('');
    } else if (step === 'email') {
      setStep('name');
      setDraft(name);
    } else if (step === 'phone') {
      setStep('email');
      setDraft(email);
    } else if (step === 'message' || step === 'error') {
      setStep('phone');
      setDraft(phone);
    }
  };

  const handleResetAll = () => {
    setSelectedTopicId(null);
    setStep('topic');
    setName('');
    setEmail('');
    setPhone('');
    setNote('');
    setDraft('');
    setInputError('');
  };

  const buildWhatsappHandoverUrl = () => {
    if (!selectedTopic) {
      const fallback = bm
        ? 'Salam HaikaiTech! Saya ingin berbincang tentang projek untuk perniagaan saya.'
        : "Hi HaikaiTech! I'd like to discuss a project for my business.";
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fallback)}`;
    }
    const lines = [
      bm ? 'Salam HaikaiTech, ini butiran dari chat laman web:' : 'Hi HaikaiTech, here are my details from the site chat:',
      `${bm ? 'Topik' : 'Topic'}: ${selectedTopic.label}`,
      ...(name.trim() ? [`${bm ? 'Nama' : 'Name'}: ${name.trim()}`] : []),
      ...(email.trim() ? [`${bm ? 'E-mel' : 'Email'}: ${email.trim()}`] : []),
      ...(phone.trim() ? [`WhatsApp: ${fullPhone}`] : []),
      ...(note.trim() ? [`${bm ? 'Mesej' : 'Project'}: ${note.trim()}`] : []),
    ];
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const stepIndex =
    step === 'name' ? 1 : step === 'email' ? 2 : step === 'phone' ? 3 : step === 'message' ? 4 : 0;
  const showComposer = step === 'name' || step === 'email' || step === 'phone' || step === 'message';
  const showScrollPopup = popupPhase !== 'idle' && !popupDismissed && !open;

  return (
    <div
      ref={launcherRef}
      inert={hiddenForReading}
      className={`fixed bottom-5 right-5 z-50 transition-[opacity,transform] duration-200 ease-out sm:bottom-6 sm:right-6 motion-reduce:transition-none ${
        hiddenForReading ? 'pointer-events-none translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <style>{`
        @keyframes htChatPopIn {
          0% { opacity: 0; transform: translateY(12px) scale(0.9); }
          68% { opacity: 1; transform: translateY(-2px) scale(1.015); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes htChatDot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.45; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
        .ht-chat-pop {
          animation: htChatPopIn 380ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .ht-chat-dot {
          animation: htChatDot 1.1s infinite ease-in-out;
        }
        .ht-chat-dot:nth-child(2) { animation-delay: 0.16s; }
        .ht-chat-dot:nth-child(3) { animation-delay: 0.32s; }
        .ht-clay-card {
          background: linear-gradient(180deg, #FDFBF5 0%, #F7F2E7 100%);
          border: 1.25px solid #243B63;
          box-shadow:
            0 18px 40px rgba(19, 86, 196, 0.14),
            0 4px 12px rgba(24, 48, 88, 0.08),
            inset 0 3px 6px rgba(255, 255, 255, 0.96),
            inset 0 -5px 10px rgba(19, 104, 230, 0.09);
        }
        .ht-clay-sky {
          background: linear-gradient(180deg, #E8F2FE 0%, #CEE1FC 100%);
          border: 1.25px solid #1E3D7A;
          box-shadow:
            0 8px 18px rgba(19, 104, 230, 0.16),
            0 2px 5px rgba(24, 48, 88, 0.08),
            inset 0 2px 4px rgba(255, 255, 255, 0.9),
            inset 0 -3px 6px rgba(19, 104, 230, 0.16);
        }
        .ht-clay-cobalt {
          background: linear-gradient(180deg, #3A83F6 0%, #175FD4 100%);
          border: 1.25px solid #15346D;
          box-shadow:
            0 10px 22px rgba(19, 104, 230, 0.28),
            0 3px 6px rgba(13, 59, 142, 0.16),
            inset 0 2px 4px rgba(255, 255, 255, 0.42),
            inset 0 -4px 7px rgba(10, 44, 112, 0.34);
        }
        .ht-float-vector {
          filter: drop-shadow(0 12px 22px rgba(19, 94, 212, 0.28)) drop-shadow(0 3px 6px rgba(21, 52, 109, 0.14));
        }
        .ht-clay-option {
          background: linear-gradient(180deg, #FDFCF8 0%, #F4F7FC 100%);
          border: 1.2px solid #9CB6DF;
          box-shadow:
            0 4px 12px rgba(19, 104, 230, 0.06),
            inset 0 2px 3px rgba(255, 255, 255, 0.92),
            inset 0 -2px 5px rgba(19, 104, 230, 0.06);
        }
        .ht-clay-option:hover {
          border-color: #1E304F;
          background: linear-gradient(180deg, #FAFBFD 0%, #EBF2FC 100%);
          box-shadow:
            0 8px 18px rgba(19, 104, 230, 0.11),
            inset 0 2px 4px rgba(255, 255, 255, 0.96),
            inset 0 -3px 6px rgba(19, 104, 230, 0.09);
        }
        @media (prefers-reduced-motion: reduce) {
          .ht-chat-pop, .ht-chat-dot { animation: none; }
        }
      `}</style>

      {/* Scroll-Triggered Rotating CRO Message Bubble anchored directly above the floating chat icon */}
      {showScrollPopup && (
        <div
          key={`${currentAngle.id}-${popupPhase}`}
          className="ht-chat-pop absolute bottom-[calc(100%+14px)] right-0 z-10 flex flex-col items-end"
          role="status"
          aria-live="polite"
          onMouseEnter={() => setPopupHovered(true)}
          onMouseLeave={() => setPopupHovered(false)}
        >
          {popupPhase === 'typing' ? (
            <div className="ht-clay-cobalt relative flex items-center gap-1.5 rounded-[20px] rounded-br-[6px] px-4 py-3">
              <span className="ht-chat-dot h-2 w-2 rounded-full bg-[#FAF6EC]" />
              <span className="ht-chat-dot h-2 w-2 rounded-full bg-[#FAF6EC]" />
              <span className="ht-chat-dot h-2 w-2 rounded-full bg-[#FAF6EC]" />
            </div>
          ) : (
            <div className="ht-clay-card relative w-[min(312px,calc(100vw-32px))] rounded-[22px] rounded-br-[8px] p-4 pr-8 text-left text-[#1B2B45]">
              <button
                type="button"
                aria-label={bm ? 'Tutup mesej' : 'Dismiss message'}
                onClick={(e) => {
                  e.stopPropagation();
                  setPopupDismissed(true);
                  setPopupPhase('idle');
                }}
                className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full text-[#4D648A] transition-colors hover:bg-[#E7EEF9] hover:text-[#1E304F]"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => handleOpenChat(`sticky_chat_popup_${currentAngle.id}`, currentAngle.topicId)}
                className="block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D63DC]"
              >
                <span className="mb-1.5 flex items-center gap-2">
                  <span
                    className="ht-clay-cobalt inline-flex h-5 items-center justify-center rounded-md px-1.5 font-mono text-[9.5px] font-bold tracking-tight text-[#FAF6EC]"
                    aria-hidden="true"
                  >
                    HT
                  </span>
                  <span className="font-mono text-[10.5px] font-semibold text-[#2E528F]">
                    Iffat &middot; {currentAngle.tag}
                  </span>
                </span>

                <span className="block text-[13px] font-medium leading-snug text-[#1B2B45]">
                  {currentAngle.question}
                </span>

                <span className="ht-clay-sky mt-3 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11.5px] font-semibold text-[#0E398A] transition-transform hover:-translate-y-0.5">
                  <span>{currentAngle.cta}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </button>

              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-[7px] right-[20px] h-3.5 w-3.5 rotate-45 rounded-[2px] border-b-[1.25px] border-r-[1.25px] border-[#243B63] bg-[#F7F2E7]"
              />
            </div>
          )}
        </div>
      )}

      {/* Guided Conversational HubSpot Chat Panel */}
      <section
        id="ht-guided-chat-panel"
        role="dialog"
        aria-label={bm ? 'Pembantu projek HaikaiTech' : 'HaikaiTech project guide'}
        inert={!open}
        className={`ht-clay-card absolute bottom-[calc(100%+14px)] right-0 z-20 flex w-[min(368px,calc(100vw-28px))] origin-bottom-right flex-col overflow-hidden rounded-[24px] text-[#1B2B45] transition-[opacity,transform,visibility] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          open
            ? 'visible translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none invisible translate-y-3 scale-95 opacity-0'
        }`}
      >
        {/* Penang Peranakan Ligne Claire Illustrated Header */}
        <div
          className="relative shrink-0 overflow-hidden border-b-[1.25px] border-[#243B63] px-4 pb-3.5 pt-3.5"
          style={{
            backgroundColor: '#EBF1FA',
            backgroundImage: 'radial-gradient(rgba(45, 111, 232, 0.14) 1px, transparent 1px)',
            backgroundSize: '14px 14px',
          }}
        >
          <svg
            className="pointer-events-none absolute bottom-0 right-10 h-[56px] w-[142px]"
            viewBox="0 0 142 56"
            fill="none"
            aria-hidden="true"
          >
            <rect x="8" y="20" width="16" height="36" fill="#92C5FA" stroke="#1E304F" strokeWidth="1.2" />
            <path d="M8 20 C8 10, 24 10, 24 20 Z" fill="#2E73E8" stroke="#1E304F" strokeWidth="1.2" />
            <line x1="16" y1="6" x2="16" y2="12" stroke="#1E304F" strokeWidth="1.2" strokeLinecap="round" />
            <polygon points="24,28 40,18 56,28" fill="#E46B43" stroke="#1E304F" strokeWidth="1.2" strokeLinejoin="round" />
            <rect x="26" y="28" width="28" height="28" fill="#FAF6EC" stroke="#1E304F" strokeWidth="1.2" />
            <rect x="31" y="34" width="6" height="12" rx="3" fill="#2A8A68" stroke="#1E304F" strokeWidth="1" />
            <rect x="43" y="34" width="6" height="12" rx="3" fill="#2A8A68" stroke="#1E304F" strokeWidth="1" />
            <polygon points="58,42 74,35 88,43 72,50" fill="#3B82F6" stroke="#1E304F" strokeWidth="1.15" strokeLinejoin="round" />
            <polygon points="58,42 72,50 72,56 58,56" fill="#225CC7" stroke="#1E304F" strokeWidth="1.15" strokeLinejoin="round" />
            <path d="M90 56 C92 44, 102 38, 108 42 C104 49, 98 54, 90 56 Z" fill="#2D9B74" stroke="#1E304F" strokeWidth="1.05" />
            <g transform="translate(114 44)">
              <circle cx="0" cy="-6" r="4.5" fill="#F2634B" stroke="#1E304F" strokeWidth="1" />
              <circle cx="5.7" cy="-1.8" r="4.5" fill="#F2634B" stroke="#1E304F" strokeWidth="1" />
              <circle cx="3.5" cy="4.8" r="4.5" fill="#F2634B" stroke="#1E304F" strokeWidth="1" />
              <circle cx="-3.5" cy="4.8" r="4.5" fill="#F2634B" stroke="#1E304F" strokeWidth="1" />
              <circle cx="-5.7" cy="-1.8" r="4.5" fill="#F2634B" stroke="#1E304F" strokeWidth="1" />
              <circle cx="0" cy="0" r="2.6" fill="#F9B949" stroke="#1E304F" strokeWidth="0.9" />
            </g>
            <polygon points="118,22 138,16 126,30" fill="#FAF6EC" stroke="#1E304F" strokeWidth="1.1" strokeLinejoin="round" />
            <polygon points="122,25 138,16 126,30" fill="#2E73E8" stroke="#1E304F" strokeWidth="1" strokeLinejoin="round" />
          </svg>

          <div className="relative z-10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="ht-clay-cobalt relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-[13px] font-bold tracking-tight text-[#FAF6EC]">
                HT
                <span
                  className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-[#EBF1FA] bg-[#22C55E]"
                  aria-hidden="true"
                />
              </span>
              <div>
                <p className="text-[14px] font-bold leading-tight text-[#1B2B45]">
                  HaikaiTech Studio
                </p>
                <p className="mt-0.5 font-mono text-[10.5px] font-medium leading-tight text-[#33548E]">
                  {bm ? 'Penang · Terus ke Iffat (< 1 jam)' : 'Penang · Direct to Iffat (< 1 hr)'}
                </p>
              </div>
            </div>
            <button
              type="button"
              tabIndex={open ? 0 : -1}
              aria-label={bm ? 'Tutup sembang' : 'Close chat'}
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#B5CBEF] bg-[#FAF6EC]/90 text-[#1E304F] transition-colors hover:border-[#1E304F] hover:bg-[#FAF6EC]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Scrollable Chat Thread */}
        <div className="max-h-[min(360px,54vh)] space-y-2.5 overflow-y-auto p-4">
          {/* Initial Studio Message */}
          <div className="rounded-2xl rounded-tl-sm border-[1.2px] border-[#243B63] bg-[#FDFCF7] px-3.5 py-2.5 text-[13px] leading-relaxed text-[#1B2B45] shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_4px_10px_rgba(19,104,230,0.06)]">
            {bm
              ? 'Salam! Apa yang anda ingin bina? Pilih satu pilihan untuk anggaran RM & langkah seterusnya:'
              : 'Hi! What are you looking to build? Pick an option below for quick RM scope & next steps:'}
          </div>

          {step === 'topic' && (
            <div className="grid gap-2 pt-0.5" role="group" aria-label={bm ? 'Pilihan topik projek' : 'Project topics'}>
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  tabIndex={open ? 0 : -1}
                  onClick={() => handleSelectTopic(topic.id)}
                  className="ht-clay-option group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-[border-color,background-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D6FE8]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#1E3D7A]/20 bg-[#E8F1FD] text-[#1458CC] transition-colors group-hover:border-[#15346D] group-hover:bg-[#2D6FE8] group-hover:text-[#FAF6EC]">
                    <TopicIcon kind={topic.icon} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-semibold leading-snug text-[#1B2B45]">
                      {topic.label}
                    </span>
                    <span className="mt-0.5 block text-[11.5px] leading-snug text-[#4E6791]">
                      {topic.hint}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-[#5B7CB5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#1E304F]"
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Selected topic + tailored studio reply */}
          {selectedTopic && step !== 'topic' && (
            <>
              <div className="flex justify-end">
                <div className="ht-clay-cobalt max-w-[86%] rounded-2xl rounded-tr-sm px-3.5 py-2 text-[12.5px] font-semibold leading-snug text-[#FAF6EC]">
                  {selectedTopic.label}
                </div>
              </div>

              <div className="rounded-2xl rounded-tl-sm border-[1.2px] border-[#243B63] bg-[#FDFCF7] px-3.5 py-2.5 text-[13px] leading-relaxed text-[#1B2B45] shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_4px_10px_rgba(19,104,230,0.06)]">
                {selectedTopic.reply}
              </div>

              {/* Q1: Name */}
              <div className="rounded-2xl rounded-tl-sm border-[1.2px] border-[#9BB6DE] bg-[#F1F6FE] px-3.5 py-2 text-[12.5px] font-medium text-[#163876]">
                {bm ? '1/4 · Siapa nama anda?' : '1/4 · First, what is your name?'}
              </div>
            </>
          )}

          {/* A1: Name + Q2: Email */}
          {name && (step === 'email' || step === 'phone' || step === 'message' || step === 'submitting' || step === 'success' || step === 'error') && (
            <>
              <div className="flex justify-end">
                <div className="ht-clay-cobalt max-w-[86%] rounded-2xl rounded-tr-sm px-3.5 py-2 text-[12.5px] font-semibold text-[#FAF6EC]">
                  {name}
                </div>
              </div>
              <div className="rounded-2xl rounded-tl-sm border-[1.2px] border-[#9BB6DE] bg-[#F1F6FE] px-3.5 py-2 text-[12.5px] font-medium text-[#163876]">
                {bm
                  ? `2/4 · Salam kenal, ${name}! Apakah alamat e-mel anda?`
                  : `2/4 · Nice to meet you, ${name}! What is your email address?`}
              </div>
            </>
          )}

          {/* A2: Email + Q3: Phone */}
          {email && (step === 'phone' || step === 'message' || step === 'submitting' || step === 'success' || step === 'error') && (
            <>
              <div className="flex justify-end">
                <div className="ht-clay-cobalt max-w-[86%] break-all rounded-2xl rounded-tr-sm px-3.5 py-2 text-[12.5px] font-semibold text-[#FAF6EC]">
                  {email}
                </div>
              </div>
              <div className="rounded-2xl rounded-tl-sm border-[1.2px] border-[#9BB6DE] bg-[#F1F6FE] px-3.5 py-2 text-[12.5px] font-medium text-[#163876]">
                {bm
                  ? '3/4 · Nombor WhatsApp / telefon anda supaya Iffat dapat hubungi pantas?'
                  : '3/4 · Your WhatsApp or phone number so Iffat can reach you quickly?'}
              </div>
            </>
          )}

          {/* A3: Phone + Q4: Project Note */}
          {phone && (step === 'message' || step === 'submitting' || step === 'success' || step === 'error') && (
            <>
              <div className="flex justify-end">
                <div className="ht-clay-cobalt max-w-[86%] rounded-2xl rounded-tr-sm px-3.5 py-2 font-mono text-[12px] font-semibold text-[#FAF6EC]">
                  {fullPhone}
                </div>
              </div>
              <div className="rounded-2xl rounded-tl-sm border-[1.2px] border-[#9BB6DE] bg-[#F1F6FE] px-3.5 py-2 text-[12.5px] font-medium text-[#163876]">
                {bm
                  ? '4/4 · Akhir sekali: ceritakan serba ringkas tentang projek atau perniagaan anda.'
                  : '4/4 · Last one: tell us briefly about your business or what you want to build.'}
              </div>
            </>
          )}

          {/* A4: Project Note */}
          {note && (step === 'submitting' || step === 'success' || step === 'error') && (
            <div className="flex justify-end">
              <div className="ht-clay-cobalt max-w-[86%] rounded-2xl rounded-tr-sm px-3.5 py-2 text-[12.5px] font-medium leading-snug text-[#FAF6EC]">
                {note}
              </div>
            </div>
          )}

          {/* Submitting typing indicator */}
          {step === 'submitting' && (
            <div className="inline-flex items-center gap-1.5 rounded-2xl rounded-tl-sm border-[1.2px] border-[#243B63] bg-[#FDFCF7] px-3.5 py-2.5">
              <span className="ht-chat-dot h-2 w-2 rounded-full bg-[#175FD4]" />
              <span className="ht-chat-dot h-2 w-2 rounded-full bg-[#175FD4]" />
              <span className="ht-chat-dot h-2 w-2 rounded-full bg-[#175FD4]" />
            </div>
          )}

          {/* HubSpot Success Confirmation */}
          {step === 'success' && (
            <div className="space-y-2.5">
              <div className="rounded-2xl rounded-tl-sm border-[1.2px] border-[#156B50] bg-[#ECF9F3] px-3.5 py-2.5 text-[13px] leading-relaxed text-[#104736]">
                <p className="mb-1 flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0E8A68]" aria-hidden="true" />
                  <span>{bm ? 'Ringkasan projek diterima!' : 'Project brief received!'}</span>
                </p>
                <p className="text-[12.5px]">
                  {bm
                    ? `Terima kasih, ${name}. Butiran anda sudah masuk ke sistem kami dan Iffat akan balas dalam 1 jam bekerja.`
                    : `Thanks, ${name}. Your details are saved in our studio CRM and Iffat will reply within 1 business hour.`}
                </p>
              </div>

              <div className="grid gap-2">
                <a
                  href={buildWhatsappHandoverUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={open ? 0 : -1}
                  onClick={() => track('cta_clicked', 'sticky_chat_whatsapp_after_hs')}
                  className="ht-clay-cobalt flex min-h-[42px] items-center justify-center gap-2 rounded-full px-4 text-[12.5px] font-semibold text-[#FAF6EC] transition-transform hover:-translate-y-0.5"
                >
                  <Send className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{bm ? 'Juga buka di WhatsApp' : 'Also open in WhatsApp'}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  tabIndex={open ? 0 : -1}
                  onClick={handleResetAll}
                  className="inline-flex items-center justify-center gap-1.5 py-1 font-mono text-[11px] font-semibold text-[#33548E] hover:text-[#1E304F]"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{bm ? 'Mula sembang baharu' : 'Start a new chat'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Error Fallback */}
          {step === 'error' && (
            <div className="space-y-2.5">
              <div className="rounded-2xl rounded-tl-sm border-[1.2px] border-[#C2481A] bg-[#FDF1EC] px-3.5 py-2.5 text-[12.5px] leading-relaxed text-[#7D2B0D]">
                {bm
                  ? 'Tidak dapat menghantar buat masa ini. Anda boleh cuba lagi atau hantar ringkasan terus ke WhatsApp.'
                  : 'Could not send automatically right now. Retry below or send your brief straight to WhatsApp.'}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  tabIndex={open ? 0 : -1}
                  onClick={() => void submitToHubSpot(note)}
                  className="ht-clay-option flex min-h-[38px] items-center justify-center rounded-full px-3 text-[12px] font-semibold text-[#1B2B45]"
                >
                  {bm ? 'Cuba lagi' : 'Retry'}
                </button>
                <a
                  href={buildWhatsappHandoverUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={open ? 0 : -1}
                  onClick={() => track('cta_clicked', 'sticky_chat_whatsapp_fallback')}
                  className="ht-clay-cobalt flex min-h-[38px] items-center justify-center gap-1 rounded-full px-3 text-[12px] font-semibold text-[#FAF6EC]"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          )}

          <div ref={scrollEndRef} />
        </div>

        {/* Interactive Step Composer Footer */}
        {showComposer && (
          <div className="shrink-0 border-t-[1.2px] border-[#C5D7F2] bg-[#F2F6FD] px-3.5 py-3">
            <div className="mb-2 flex items-center justify-between gap-2 font-mono text-[10.5px] text-[#3B5B96]">
              <button
                type="button"
                tabIndex={open ? 0 : -1}
                onClick={handleBackStep}
                className="inline-flex items-center gap-1 font-semibold hover:text-[#0D3B8E]"
              >
                <ArrowLeft className="h-3 w-3" aria-hidden="true" />
                <span>{bm ? 'Kembali' : 'Back'}</span>
              </button>
              <span>{bm ? `Langkah ${stepIndex} / 4` : `Step ${stepIndex} of 4`}</span>
              <a
                href={buildWhatsappHandoverUrl()}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
                onClick={() => track('cta_clicked', 'sticky_chat_whatsapp_skip')}
                className="inline-flex items-center gap-0.5 font-semibold text-[#1458CC] hover:underline"
              >
                <span>WhatsApp</span>
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>

            <form onSubmit={handleComposerSubmit} className="flex items-center gap-1.5">
              {step === 'phone' && (
                <select
                  aria-label={bm ? 'Kod negara' : 'Country code'}
                  value={country}
                  tabIndex={open ? 0 : -1}
                  onChange={(e) => setCountry(e.target.value as CountryCode)}
                  className="h-10 shrink-0 rounded-full border-[1.2px] border-[#9BB6DE] bg-[#FDFCF7] px-2.5 font-mono text-[12px] font-semibold text-[#0D3B8E] focus:border-[#175FD4] focus:outline-none"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.dial ? `${c.code} ${c.dial}` : c.code}
                    </option>
                  ))}
                </select>
              )}

              <input
                ref={inputRef}
                type={step === 'email' ? 'email' : step === 'phone' ? 'tel' : 'text'}
                autoComplete={
                  step === 'name'
                    ? 'given-name'
                    : step === 'email'
                      ? 'email'
                      : step === 'phone'
                        ? 'tel-national'
                        : 'off'
                }
                tabIndex={open ? 0 : -1}
                value={draft}
                onChange={(e) => {
                  setDraft(e.target.value);
                  if (inputError) setInputError('');
                }}
                placeholder={
                  step === 'name'
                    ? bm
                      ? 'Nama anda...'
                      : 'Your name...'
                    : step === 'email'
                      ? 'you@company.my'
                      : step === 'phone'
                        ? selectedCountry.placeholder
                        : bm
                          ? 'Contoh: laman web syarikat / kedai...'
                          : 'e.g. company website, booking flow...'
                }
                className="h-10 min-w-0 flex-1 rounded-full border-[1.2px] border-[#9BB6DE] bg-[#FDFCF7] px-3.5 text-[16px] text-[#1B2B45] placeholder:text-[#6B85B4] focus:border-[#175FD4] focus:outline-none sm:text-[13px]"
              />

              <button
                type="submit"
                tabIndex={open ? 0 : -1}
                aria-label={step === 'message' ? (bm ? 'Hantar' : 'Send brief') : (bm ? 'Seterusnya' : 'Next')}
                className="ht-clay-cobalt flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#FAF6EC] transition-transform hover:-translate-y-0.5"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>

            {inputError && (
              <p role="alert" className="mt-1.5 text-[11.5px] font-medium text-[#B43D14]">
                {inputError}
              </p>
            )}

            {step === 'message' && (
              <p className="mt-1.5 text-[10.5px] text-[#5471A3]">
                {bm ? 'Dengan menghantar, anda bersetuju dengan ' : 'By sending, you agree to our '}
                <a href="/privacy-policy/" className="underline hover:text-[#1458CC]">
                  {bm ? 'dasar privasi' : 'privacy policy'}
                </a>
                .
              </p>
            )}
          </div>
        )}
      </section>

      {/* Vector-Like Blue Soft-Clay + Ligne Claire Floating Chat Button */}
      <button
        ref={triggerRef}
        type="button"
        aria-controls="ht-guided-chat-panel"
        aria-expanded={open}
        aria-label={
          open
            ? bm
              ? 'Tutup panduan projek'
              : 'Close project chat'
            : bm
              ? 'Buka panduan projek HaikaiTech'
              : 'Open HaikaiTech project chat'
        }
        onClick={handleToggleOpen}
        className={`group relative flex h-[64px] w-[64px] items-center justify-center transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2D6FE8] motion-reduce:transition-none ${
          open ? 'ht-clay-cobalt rounded-[22px] rounded-br-[8px] text-[#FAF6EC]' : 'bg-transparent p-0'
        }`}
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <svg
            className="ht-float-vector h-[64px] w-[64px]"
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="htBlueChatFill" x1="12" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#5CA2FA" />
                <stop offset="52%" stopColor="#2A74EC" />
                <stop offset="100%" stopColor="#1452BF" />
              </linearGradient>
            </defs>
            <path
              d="M11 29.5C11 17.5 20.5 9 33 9C45.5 9 55 17.5 55 29.5C55 41.5 45.5 50 33 50C29.4 50 26 49.2 23 47.9L12.5 53.5L15.4 42.4C12.6 38.8 11 34.4 11 29.5Z"
              fill="url(#htBlueChatFill)"
              stroke="#143269"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M17.5 24C19.6 17.4 25.7 13.5 33 13.5C39.2 13.5 44.5 16.2 47.6 20.8"
              stroke="#D8EAFF"
              strokeOpacity="0.65"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M21 43.2C24.5 45.4 28.6 46.5 33 46.5C41.8 46.5 48.8 41.6 50.8 34.5"
              stroke="#0D3682"
              strokeOpacity="0.45"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="24.5" cy="30" r="3" fill="#FAF6EC" stroke="#143269" strokeWidth="1.2" />
            <circle cx="33" cy="30" r="3" fill="#FAF6EC" stroke="#143269" strokeWidth="1.2" />
            <circle cx="41.5" cy="30" r="3" fill="#FAF6EC" stroke="#143269" strokeWidth="1.2" />
            <path
              d="M52 10L53.3 13.2L56.5 14.5L53.3 15.8L52 19L50.7 15.8L47.5 14.5L50.7 13.2L52 10Z"
              fill="#F9C767"
              stroke="#143269"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default StickyBooking;
