import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { track } from './track';

export interface ShowcaseImages {
  avsbina: string;
  fuzzfloor: string;
  fuzzfloorMobile: string;
  medin: string;
  adyumrah: string;
  mze: string;
  aaBurger: string;
  aaBurgerMobile: string;
  hawkerrewards: string;
  atone: string;
}

interface Props {
  locale?: 'en' | 'bm';
  images: ShowcaseImages;
}

type RouteId = 'site' | 'store' | 'system';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const CHAPTER_MS = 6500;
const CHAPTER_COUNT = 4;

const SHIPPED_PROJECTS = [
  { name: 'Fuzzfloor', badge: 'FF', tone: 'slate', href: 'https://fuzzfloor.com' },
  { name: 'AA Burger Kiosk', badge: 'AA', tone: 'gold', href: 'https://aaburger.haikaitech.my/' },
  { name: 'MZE Workforce System', badge: 'MZ', tone: 'cobalt', href: 'https://mzdemo.haikaitech.my/' },
  { name: 'AVS Bina 3D', badge: 'AV', tone: 'coral', href: 'https://avsbina.com.my' },
  { name: 'AT One', badge: 'A1', tone: 'emerald', href: 'https://atoneconstruction.com.my' },
  { name: 'Médin Fragrances', badge: 'MF', tone: 'slate', href: 'https://medin-frag.myshopify.com/' },
  { name: 'Ady Umrah', badge: 'AU', tone: 'cobalt', href: 'https://adyumrahajj.com' },
  { name: 'CityThree', badge: 'C3', tone: 'emerald', href: 'https://citythree.my/' },
] as const;

function SidebarIcon({ name }: { name: string }) {
  switch (name) {
    case 'browser':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="1.5" y="2.5" width="13" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M1.5 6H14.5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case 'store':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2.5 6.5L3.5 2.5H12.5L13.5 6.5H2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M3.5 6.5V13.5H12.5V6.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'grid':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="5" height="5" rx="1.2" fill="#1368E6" />
          <rect x="9" y="2" width="5" height="5" rx="1.2" fill="#F59E0B" />
          <rect x="2" y="9" width="5" height="5" rx="1.2" fill="#10B981" />
          <rect x="9" y="9" width="5" height="5" rx="1.2" fill="#EF5350" />
        </svg>
      );
    case 'chat':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 14A6 6 0 1 0 2.8 11L2 14l3-.8A6 6 0 0 0 8 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case 'bot':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="3" y="4.5" width="10" height="8.5" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 2V4.5M6 8.5V9M10 8.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M9 1.5L3.5 9H8L7 14.5L12.5 7H8L9 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
  }
}

export default function ToyboxShowcaseIsland({ locale = 'en', images }: Props) {
  const isBm = locale === 'bm';

  const copy = isBm
    ? {
        modeRealWork: 'Hasil Kerja',
        modeBrief: 'Ringkasan',
        composerHeading: 'Ceritakan bisnes anda, dapatkan pelan binaan',
        inputAriaLabel: 'Terangkan apa yang anda ingin bina untuk perniagaan anda',
        launchLabel: 'Hantar Ringkasan ↑',
        footerCount: 'Projek Aktif (15) · Demo Interaktif (6)',
        prevAria: 'Projek sebelumnya',
        nextAria: 'Projek seterusnya',
        playAria: 'Mainkan bab automatik',
        pauseAria: 'Jeda bab automatik',
        chapters: [
          {
            id: 'websites',
            badge: 'LAMAN WEB BISNES',
            pos: '16%',
            route: 'site' as RouteId,
            tone: 'blue',
            placeholder: 'cth. Kontraktor Pulau Pinang perlukan sebut harga 3D & aliran WhatsApp...',
          },
          {
            id: 'stores',
            badge: 'KEDAI DALAM TALIAN',
            pos: '37%',
            route: 'store' as RouteId,
            tone: 'gold',
            placeholder: 'cth. Jenama Malaysia beralih dari Shopee ke kedai WooCommerce + FPX...',
          },
          {
            id: 'systems',
            badge: 'SISTEM STAF & AI',
            pos: '59%',
            route: 'system' as RouteId,
            tone: 'emerald',
            placeholder: 'cth. Susun pertanyaan WhatsApp automatik, draf sebut harga & jadual staf...',
          },
          {
            id: 'toys',
            badge: 'DEMO & KIOSK',
            pos: '81%',
            route: 'system' as RouteId,
            tone: 'coral',
            placeholder: 'cth. Skrin kiosk pesanan atau demo produk interaktif untuk pelanggan...',
          },
        ],
        sidebar: [
          { id: 'websites', label: 'Laman Web', chapter: 0, route: 'site' as RouteId, icon: 'browser' },
          { id: 'stores', label: 'Kedai Online', chapter: 1, route: 'store' as RouteId, icon: 'store' },
          { id: 'systems', label: 'Sistem Staf', chapter: 2, route: 'system' as RouteId, icon: 'grid' },
          { id: 'whatsapp-ai', label: 'AI WhatsApp', chapter: 2, route: 'system' as RouteId, icon: 'chat' },
          { id: 'live-toys', label: 'Demo & Kiosk', chapter: 3, route: 'system' as RouteId, icon: 'bot' },
          { id: 'rm799', label: 'Pakej RM799', chapter: 0, route: 'site' as RouteId, icon: 'bolt' },
        ],
        routes: [
          { id: 'site' as RouteId, label: 'Laman RM799' },
          { id: 'store' as RouteId, label: 'Kedai RM3,500' },
          { id: 'system' as RouteId, label: 'Sistem Khas' },
        ],
        scene0: {
          tag: 'LAMAN BISNES',
          title: 'AVS Bina 3D & Fuzzfloor',
          chip1: 'Astro SSG · Muat Pantas',
          chip2: 'Bermula RM799',
          cta: 'Lawati Laman ↗',
        },
        scene1: {
          tag: 'KEDAI ONLINE',
          title: 'Médin Fragrances & Ady Umrah',
          flow: ['Katalog', 'FPX Chip', 'EasyParcel'],
          chip: 'Bermula RM3,500',
          cta: 'Buka Kedai ↗',
        },
        scene2: {
          tag: 'SISTEM STAF & AI',
          title: 'MZE Workforce & Aliran WhatsApp',
          steps: [
            '1. Pertanyaan WhatsApp Masuk',
            '2. Pembantu AI Susun & Draf',
            '3. Semakan Manusia ✓',
          ],
          cta: 'Cuba Demo Langsung ↗',
        },
        scene3: {
          tag: 'DEMO & KIOSK',
          title: 'AA Burger Kiosk & HawkerRewards',
          chip: 'UI Interaktif & Permainan',
          cta: 'Cuba Kiosk Langsung ↗',
        },
      }
    : {
        modeRealWork: 'Real Work',
        modeBrief: 'Quick Brief',
        composerHeading: 'Describe your business, get a build plan',
        inputAriaLabel: 'Describe what you want to build for your business',
        launchLabel: 'Launch Brief ↑',
        footerCount: 'Live Projects (15) · Interactive Demos (6)',
        prevAria: 'Previous projects',
        nextAria: 'Next projects',
        playAria: 'Play automatic scenes',
        pauseAria: 'Pause automatic scenes',
        chapters: [
          {
            id: 'websites',
            badge: 'BUSINESS WEBSITES',
            pos: '16%',
            route: 'site' as RouteId,
            tone: 'blue',
            placeholder: 'e.g. Penang renovation contractor needing a 3D quote & WhatsApp flow...',
          },
          {
            id: 'stores',
            badge: 'ONLINE STORES',
            pos: '37%',
            route: 'store' as RouteId,
            tone: 'gold',
            placeholder: 'e.g. Malaysian brand moving from Shopee to WooCommerce + FPX Pay...',
          },
          {
            id: 'systems',
            badge: 'STAFF SYSTEMS',
            pos: '59%',
            route: 'system' as RouteId,
            tone: 'emerald',
            placeholder: 'e.g. Auto-sort WhatsApp enquiries, draft quotes & track staff jobs...',
          },
          {
            id: 'toys',
            badge: 'LIVE TOYS & KIOSKS',
            pos: '81%',
            route: 'system' as RouteId,
            tone: 'coral',
            placeholder: 'e.g. Self-order kiosk screen or interactive product demo for customers...',
          },
        ],
        sidebar: [
          { id: 'websites', label: 'Websites', chapter: 0, route: 'site' as RouteId, icon: 'browser' },
          { id: 'stores', label: 'Online Stores', chapter: 1, route: 'store' as RouteId, icon: 'store' },
          { id: 'systems', label: 'Staff Systems', chapter: 2, route: 'system' as RouteId, icon: 'grid' },
          { id: 'whatsapp-ai', label: 'WhatsApp AI', chapter: 2, route: 'system' as RouteId, icon: 'chat' },
          { id: 'live-toys', label: 'Live Toys', chapter: 3, route: 'system' as RouteId, icon: 'bot' },
          { id: 'rm799', label: 'RM799 Starter', chapter: 0, route: 'site' as RouteId, icon: 'bolt' },
        ],
        routes: [
          { id: 'site' as RouteId, label: 'RM799 Site' },
          { id: 'store' as RouteId, label: 'RM3,500 Store' },
          { id: 'system' as RouteId, label: 'Custom System' },
        ],
        scene0: {
          tag: 'BUSINESS WEBSITES',
          title: 'AVS Bina 3D & Fuzzfloor',
          chip1: 'Astro SSG · Fast Load',
          chip2: 'From RM799',
          cta: 'Visit Live ↗',
        },
        scene1: {
          tag: 'ONLINE STORES',
          title: 'Médin Fragrances & Ady Umrah',
          flow: ['Catalogue', 'Chip FPX', 'EasyParcel'],
          chip: 'From RM3,500',
          cta: 'Open Store ↗',
        },
        scene2: {
          tag: 'STAFF SYSTEMS & AI',
          title: 'MZE Workforce & WhatsApp Flow',
          steps: [
            '1. Incoming WhatsApp Lead',
            '2. AI Helper Sorts & Drafts',
            '3. Human Approval ✓',
          ],
          cta: 'Try Live Demo ↗',
        },
        scene3: {
          tag: 'LIVE TOYS & KIOSKS',
          title: 'AA Burger Kiosk & HawkerRewards',
          chip: 'Interactive Ordering & Game UI',
          cta: 'Try Kiosk Live ↗',
        },
      };

  const [chapterIdx, setChapterIdx] = useState(0);
  const [progress, setProgress] = useState(0.18);
  const [mode, setMode] = useState<'showcase' | 'brief'>('showcase');
  const [activeSidebarId, setActiveSidebarId] = useState('websites');
  const [selectedRoute, setSelectedRoute] = useState<RouteId>('site');
  const [briefText, setBriefText] = useState('');
  const [userPaused, setUserPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [projOffset, setProjOffset] = useState(0);

  const chapterIdxRef = useRef(0);
  const progressRef = useRef(0.18);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const isPlaying = !userPaused && !isHovered && mode === 'showcase' && !reducedMotion;

  useEffect(() => {
    if (!isPlaying) return;
    let last = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      let nextP = progressRef.current + dt / CHAPTER_MS;
      if (nextP >= 1) {
        const nextIdx = (chapterIdxRef.current + 1) % CHAPTER_COUNT;
        chapterIdxRef.current = nextIdx;
        setChapterIdx(nextIdx);
        const matchingItem = copy.sidebar.find((s) => s.chapter === nextIdx);
        if (matchingItem) setActiveSidebarId(matchingItem.id);
        setSelectedRoute(copy.chapters[nextIdx].route);
        nextP = 0;
      }
      progressRef.current = nextP;
      setProgress(nextP);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying]);

  const jumpToChapter = (idx: number, sidebarId?: string, routeOverride?: RouteId) => {
    chapterIdxRef.current = idx;
    progressRef.current = 0.25;
    setChapterIdx(idx);
    setProgress(0.25);
    if (sidebarId) {
      setActiveSidebarId(sidebarId);
    } else {
      const match = copy.sidebar.find((s) => s.chapter === idx);
      if (match) setActiveSidebarId(match.id);
    }
    setSelectedRoute(routeOverride ?? copy.chapters[idx].route);
  };

  const activeChapter = copy.chapters[chapterIdx];
  const totalSec = Math.round((chapterIdx + progress) * (CHAPTER_MS / 1000));
  const totalLoopSec = (CHAPTER_COUNT * CHAPTER_MS) / 1000;
  const fmt = (sec: number) => `0:${String(Math.min(sec, totalLoopSec)).padStart(2, '0')}`;

  const activeRouteObj = copy.routes.find((r) => r.id === selectedRoute) || copy.routes[0];
  const briefPayload =
    briefText.trim() ||
    activeChapter.placeholder.replace(/^(e\.g\.|cth\.)\s*/i, '');
  const whatsappBriefHref =
    'https://wa.me/60147533499?text=' +
    encodeURIComponent(
      isBm
        ? `Salam HaikaiTech, saya berminat dengan ${activeRouteObj.label}: ${briefPayload}`
        : `Hi HaikaiTech! I am interested in ${activeRouteObj.label}: ${briefPayload}`
    );

  const visibleProjects = SHIPPED_PROJECTS.slice(projOffset, projOffset + 3);

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="tines-wb"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top Real-Time Scrubbable Soft-Clay Timeline Bar */}
        <div className="tines-wb__timeline">
          <div className="tines-wb__tooltip" data-wb-tooltip style={{ left: activeChapter.pos }}>
            <span data-wb-tooltip-text>{activeChapter.badge}</span>
          </div>

          <button
            type="button"
            className="tines-wb__play"
            aria-label={userPaused ? copy.playAria : copy.pauseAria}
            onClick={() => setUserPaused((p) => !p)}
            data-wb-play
          >
            <span data-wb-play-icon>{isPlaying ? '||' : '▶'}</span>
          </button>

          <div className="tines-wb__tracks" role="tablist" aria-label={isBm ? 'Peringkat studio' : 'Studio showcase chapters'}>
            {copy.chapters.map((ch, idx) => {
              const isCurrent = idx === chapterIdx;
              const isDone = idx < chapterIdx;
              const fillScale = isDone ? 1 : isCurrent ? Math.max(0.08, progress) : 0;
              return (
                <button
                  key={ch.id}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  className={`tines-wb__seg tines-wb__seg--${ch.tone}${isCurrent ? ' is-current' : ''}`}
                  onClick={() => {
                    setMode('showcase');
                    jumpToChapter(idx);
                  }}
                  title={ch.badge}
                  data-wb-chapter={idx}
                >
                  <span className="tines-wb__seg-bg">
                    <span
                      className="tines-wb__seg-fill"
                      style={{ transform: `scaleX(${fillScale})` }}
                    />
                  </span>
                  <i className="tines-wb__dot" aria-hidden="true" />
                </button>
              );
            })}
            <span className="tines-wb__seg-tail" aria-hidden="true" />
          </div>

          <span className="tines-wb__time" data-wb-time>
            {fmt(totalSec)} / {fmt(totalLoopSec)}
          </span>
        </div>

        {/* 2-Column Soft Clay Workbench Interior */}
        <div className="tines-wb__body">
          {/* Left Clay Sidebar */}
          <aside className="tines-wb__sidebar" aria-label={isBm ? 'Menu ruang bina' : 'Studio workbench navigation'}>
            <div className="tines-wb__modes" role="tablist" aria-label={isBm ? 'Mod paparan' : 'Workbench view'}>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'showcase'}
                className={`tines-wb__mode${mode === 'showcase' ? ' is-active' : ''}`}
                onClick={() => setMode('showcase')}
                data-wb-mode="showcase"
              >
                {copy.modeRealWork}
              </button>
              <span aria-hidden="true">|</span>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'brief'}
                className={`tines-wb__mode${mode === 'brief' ? ' is-active' : ''}`}
                onClick={() => setMode('brief')}
                data-wb-mode="brief"
              >
                {copy.modeBrief}
              </button>
            </div>

            <nav className="tines-wb__nav" data-lenis-prevent>
              {copy.sidebar.map((item) => {
                const active = activeSidebarId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`tines-wb__item${active ? ' is-active' : ''}`}
                    onClick={() => {
                      jumpToChapter(item.chapter, item.id, item.route);
                      if (mode !== 'showcase') setMode('showcase');
                    }}
                    data-wb-sidebar-item={item.id}
                  >
                    {active && (
                      <motion.span
                        layoutId="wb-active-pill"
                        className="tines-wb__active-bg"
                        transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
                      />
                    )}
                    <span className={`tines-wb__icon tines-wb__icon--${item.icon}`}>
                      <SidebarIcon name={item.icon} />
                    </span>
                    <span className="tines-wb__item-label">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Center Peranakan-Arch x Bauhaus Geometric Mural + Real-Work Stage */}
          <div className="tines-wb__canvas">
            <svg
              className="tines-wb__mural"
              viewBox="0 0 920 340"
              preserveAspectRatio="xMidYMid slice"
              fill="none"
              aria-hidden="true"
            >
              <rect width="920" height="340" fill="#EFF5FC" />
              <rect x="0" y="0" width="128" height="340" fill="#1368E6" />
              <path d="M24 340V144C24 88 68 48 116 48C164 48 208 88 208 144V340H24Z" fill="#7DD3FC" />
              <path d="M46 340V152C46 108 78 78 116 78C154 78 186 108 186 152V340H46Z" fill="#FBBF24" />
              <path d="M72 340V168C72 138 92 118 116 118C140 118 160 138 160 168V340H72Z" fill="#1368E6" />
              <rect x="98" y="182" width="36" height="158" rx="18" fill="#FAF8F3" />
              <circle cx="282" cy="48" r="118" fill="#10B981" />
              <path d="M208 340C208 258 274 192 356 192V340H208Z" fill="#1368E6" />
              <circle cx="356" cy="110" r="88" fill="#60A5FA" />
              <circle cx="490" cy="240" r="136" fill="#EF5350" />
              <circle cx="520" cy="70" r="96" fill="#FBBF24" />
              <path d="M420 120H560V280C480 280 420 212 420 120Z" fill="#93C5FD" />
              <rect x="610" y="0" width="150" height="185" rx="75" fill="#10B981" />
              <circle cx="678" cy="260" r="118" fill="#1368E6" />
              <circle cx="710" cy="84" r="64" fill="#EF5350" />
              <rect x="760" y="0" width="160" height="340" fill="#FBBF24" />
              <path d="M760 154C848 154 920 226 920 314V340H760V154Z" fill="#1368E6" />
              <circle cx="858" cy="86" r="56" fill="#10B981" />
              <circle cx="835" cy="274" r="46" fill="#7DD3FC" />
            </svg>

            <AnimatePresence mode="wait">
              {mode === 'showcase' ? (
                <motion.div
                  key={`scene-${chapterIdx}`}
                  className="toybox-scene"
                  data-wb-scene={chapterIdx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.34, ease: EASE_OUT_EXPO }}
                >
                  {/* SCENE 0: Business Websites (AVS Bina 3D + Fuzzfloor Mobile) */}
                  {chapterIdx === 0 && (
                    <div className="toybox-stage-grid toybox-stage-grid--websites">
                      <motion.a
                        href="https://avsbina.com.my"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="toybox-clay-browser"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.38, ease: EASE_OUT_EXPO }}
                      >
                        <div className="toybox-clay-chrome" aria-hidden="true">
                          <i /><i /><i />
                          <span>avsbina.com.my</span>
                        </div>
                        <div className="toybox-clay-viewport">
                          <motion.img
                            src={images.avsbina}
                            alt="AVS Design & Construction 3D consultation website"
                            animate={reducedMotion ? undefined : { y: ['0%', '-8%', '0%'] }}
                            transition={{ duration: 6.5, ease: 'easeInOut', repeat: Infinity }}
                          />
                        </div>
                      </motion.a>

                      <div className="toybox-stage-side">
                        <motion.a
                          href="https://fuzzfloor.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="toybox-clay-phone"
                          initial={{ opacity: 0, y: 18, rotate: -2 }}
                          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
                          whileHover={{ rotate: 0, y: -3 }}
                          transition={{ duration: 0.42, delay: 0.08, ease: EASE_OUT_EXPO }}
                        >
                          <span className="toybox-clay-speaker" aria-hidden="true" />
                          <img src={images.fuzzfloorMobile} alt="Fuzzfloor mobile SEO storefront" />
                        </motion.a>

                        <motion.div
                          className="toybox-clay-meta"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.36, delay: 0.14, ease: EASE_OUT_EXPO }}
                        >
                          <span className="toybox-clay-chip">{copy.scene0.chip1}</span>
                          <span className="toybox-clay-chip toybox-clay-chip--gold">{copy.scene0.chip2}</span>
                          <a
                            href="https://avsbina.com.my"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="toybox-clay-cta"
                            onClick={() => track('cta_clicked', 'toybox_scene_avs')}
                          >
                            {copy.scene0.cta}
                          </a>
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {/* SCENE 1: Online Stores (Médin Fragrances + Ady Umrah Catalogue) */}
                  {chapterIdx === 1 && (
                    <div className="toybox-stage-grid toybox-stage-grid--stores">
                      <motion.a
                        href="https://medin-frag.myshopify.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="toybox-clay-browser"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.38, ease: EASE_OUT_EXPO }}
                      >
                        <div className="toybox-clay-chrome" aria-hidden="true">
                          <i /><i /><i />
                          <span>medin-frag.myshopify.com</span>
                        </div>
                        <div className="toybox-clay-viewport">
                          <motion.img
                            src={images.medin}
                            alt="Médin Fragrances online store"
                            animate={reducedMotion ? undefined : { y: ['0%', '-9%', '0%'] }}
                            transition={{ duration: 6.5, ease: 'easeInOut', repeat: Infinity }}
                          />
                        </div>
                      </motion.a>

                      <div className="toybox-stage-side toybox-stage-side--col">
                        <motion.a
                          href="https://adyumrahajj.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="toybox-clay-mini"
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.38, delay: 0.08, ease: EASE_OUT_EXPO }}
                        >
                          <img src={images.adyumrah} alt="Ady Umrah package catalogue" />
                          <span>adyumrahajj.com</span>
                        </motion.a>

                        <motion.div
                          className="toybox-clay-flow"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.36, delay: 0.14, ease: EASE_OUT_EXPO }}
                        >
                          <div className="toybox-clay-flow__pills">
                            {copy.scene1.flow.map((step) => (
                              <span key={step} className="toybox-clay-chip">{step}</span>
                            ))}
                          </div>
                          <div className="toybox-clay-flow__bottom">
                            <span className="toybox-clay-chip toybox-clay-chip--gold">{copy.scene1.chip}</span>
                            <a
                              href="https://medin-frag.myshopify.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="toybox-clay-cta"
                              onClick={() => track('cta_clicked', 'toybox_scene_medin')}
                            >
                              {copy.scene1.cta}
                            </a>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {/* SCENE 2: Staff Systems & AI (MZE Workforce + 3-Step Approval Card) */}
                  {chapterIdx === 2 && (
                    <div className="toybox-stage-grid toybox-stage-grid--systems">
                      <motion.a
                        href="https://mzdemo.haikaitech.my/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="toybox-clay-browser"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.38, ease: EASE_OUT_EXPO }}
                      >
                        <div className="toybox-clay-chrome" aria-hidden="true">
                          <i /><i /><i />
                          <span>mzdemo.haikaitech.my</span>
                        </div>
                        <div className="toybox-clay-viewport">
                          <motion.img
                            src={images.mze}
                            alt="MZE Workforce System dashboard"
                            animate={reducedMotion ? undefined : { y: ['0%', '-7%', '0%'] }}
                            transition={{ duration: 6.5, ease: 'easeInOut', repeat: Infinity }}
                          />
                        </div>
                      </motion.a>

                      <div className="toybox-clay-workflow">
                        <p className="toybox-clay-workflow__head">{copy.scene2.title}</p>
                        <div className="toybox-clay-workflow__steps">
                          {copy.scene2.steps.map((step, sIdx) => (
                            <motion.div
                              key={step}
                              className="toybox-clay-step"
                              initial={{ opacity: 0, x: 14 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.22,
                                delay: 0.03 + sIdx * 0.055,
                                ease: EASE_OUT_EXPO,
                              }}
                            >
                              {step}
                            </motion.div>
                          ))}
                        </div>
                        <a
                          href="https://mzdemo.haikaitech.my/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="toybox-clay-cta"
                          onClick={() => track('cta_clicked', 'toybox_scene_mze')}
                        >
                          {copy.scene2.cta}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* SCENE 3: Live Toys & Kiosks (AA Burger Kiosk + Mobile + HawkerRewards) */}
                  {chapterIdx === 3 && (
                    <div className="toybox-stage-grid toybox-stage-grid--toys">
                      <motion.a
                        href="https://aaburger.haikaitech.my/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="toybox-clay-browser toybox-clay-browser--kiosk"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.38, ease: EASE_OUT_EXPO }}
                      >
                        <div className="toybox-clay-chrome" aria-hidden="true">
                          <i /><i /><i />
                          <span>aaburger.haikaitech.my</span>
                        </div>
                        <div className="toybox-clay-viewport">
                          <img src={images.aaBurger} alt="AA Burger Ordering Kiosk desktop screen" />
                        </div>
                      </motion.a>

                      <div className="toybox-stage-side toybox-stage-side--toys">
                        <div className="toybox-toys-pair">
                          <motion.a
                            href="https://aaburger.haikaitech.my/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="toybox-clay-phone toybox-clay-phone--kiosk"
                            initial={{ opacity: 0, y: 16, rotate: -2 }}
                            animate={{ opacity: 1, y: 0, rotate: -1.5 }}
                            whileHover={{ rotate: 0, y: -3 }}
                            transition={{ duration: 0.4, delay: 0.06, ease: EASE_OUT_EXPO }}
                          >
                            <span className="toybox-clay-speaker" aria-hidden="true" />
                            <img src={images.aaBurgerMobile} alt="AA Burger Kiosk mobile ordering screen" />
                          </motion.a>

                          <motion.a
                            href="https://hawkerrewards.pages.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="toybox-clay-mini"
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.38, delay: 0.12, ease: EASE_OUT_EXPO }}
                          >
                            <img src={images.hawkerrewards} alt="HawkerRewards interactive loyalty game demo" />
                            <span>hawkerrewards.pages.dev</span>
                          </motion.a>
                        </div>

                        <div className="toybox-clay-meta">
                          <span className="toybox-clay-chip toybox-clay-chip--emerald">{copy.scene3.chip}</span>
                          <a
                            href="https://aaburger.haikaitech.my/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="toybox-clay-cta"
                            onClick={() => track('cta_clicked', 'toybox_scene_kiosk')}
                          >
                            {copy.scene3.cta}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="brief-composer"
                  className="tines-composer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
                >
                  <h2 className="tines-composer__title">{copy.composerHeading}</h2>
                  <input
                    type="text"
                    className="tines-composer__input"
                    aria-label={copy.inputAriaLabel}
                    placeholder={activeChapter.placeholder}
                    value={briefText}
                    onChange={(e) => setBriefText(e.target.value)}
                    data-wb-input
                  />
                  <div className="tines-composer__controls">
                    <div className="tines-composer__routes" role="radiogroup" aria-label={isBm ? 'Pilih laluan binaan' : 'Choose build route'}>
                      {copy.routes.map((route) => {
                        const selected = selectedRoute === route.id;
                        return (
                          <button
                            key={route.id}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            className={`tines-route-pill${selected ? ' is-selected' : ''}`}
                            onClick={() => setSelectedRoute(route.id)}
                            data-wb-route={route.id}
                          >
                            <i aria-hidden="true" />
                            <span>{route.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    <a
                      className="tines-composer__launch"
                      href={whatsappBriefHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track('cta_clicked', 'workbench_launch_brief')}
                      data-wb-launch
                    >
                      {copy.launchLabel}
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Shipped Projects Clay Pill Strip */}
        <div className="tines-wb__footer" data-wb-projects>
          <span className="tines-wb__count">{copy.footerCount}</span>

          <div className="tines-wb__pills-wrap">
            <div className="tines-wb__pills">
              {visibleProjects.map((proj) => (
                <a
                  key={proj.name}
                  className="tines-proj-pill"
                  href={proj.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={`tines-proj-pill__dot tines-proj-pill__dot--${proj.tone}`} aria-hidden="true">
                    {proj.badge}
                  </span>
                  <span>{proj.name}</span>
                </a>
              ))}
            </div>

            <div className="tines-wb__pager">
              <button
                type="button"
                aria-label={copy.prevAria}
                disabled={projOffset <= 0}
                onClick={() => setProjOffset((o) => Math.max(0, o - 3))}
                data-wb-prev
              >
                ‹
              </button>
              <button
                type="button"
                aria-label={copy.nextAria}
                disabled={projOffset + 3 >= SHIPPED_PROJECTS.length}
                onClick={() => setProjOffset((o) => (o + 3 < SHIPPED_PROJECTS.length ? o + 3 : 0))}
                data-wb-next
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
