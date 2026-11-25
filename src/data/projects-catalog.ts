import type { ImageMetadata } from 'astro';
import { PROJECTS } from '../../constants';
import { bmHome } from './locales/bm-home';
import type { SiteLocale } from '../utils/i18n';

import avsbinaShowcase from '../assets/projects/showcase/avsbina-showcase.webp';
import hssShowcase from '../assets/projects/showcase/hss-showcase.webp';
import adyumrahShowcase from '../assets/projects/showcase/adyumrah-showcase.webp';
import aaburgerShowcase from '../assets/projects/showcase/aaburger-showcase.webp';
import mzeShowcase from '../assets/projects/showcase/mze-showcase.webp';
import dentexShowcase from '../assets/projects/showcase/dentex-showcase.webp';

import hssDesktopImg from '../assets/projects/hss-wireless-cctv-desktop.png';
import workforceDemoImg from '../assets/projects/mze-workforce-demo.png';
import aaBurgerImg from '../assets/projects/aaburger-kiosk-desktop.png';
import cityThreeImg from '../assets/projects/citythree-desktop.png';
import kopiTebuImg from '../assets/projects/kopitebu-desktop.png';
import fuzzfloorMobileImg from '../assets/projects/fuzzfloor-mobile.png';

export type IndustryId =
  | 'construction'
  | 'travel'
  | 'fnb-retail'
  | 'b2b'
  | 'clinics-edu'
  | 'systems-apps';

export interface IndustryMeta {
  id: IndustryId;
  title: string;
  short: string;
  desc: string;
  color: string;
  tint: string;
}

export interface IndustryWithCount extends IndustryMeta {
  count: number;
}

export interface WorkItem {
  id: string;
  name: string;
  industry: IndustryId;
  status: 'live' | 'demo';
  flagship: boolean;
  purpose: string;
  href: string;
  caseStudyHref?: string;
  skills: string[];
  image: ImageMetadata | string;
  showcaseImage?: ImageMetadata;
  mobileImage?: ImageMetadata;
  stageBg: string;
  alt: string;
  host: string;
}

const cleanCopy = (text: string): string => text.replace(/\s*\u2014\s*|\s*--\s*/g, ': ');

const extractHost = (href: string): string => {
  try {
    return new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return href;
  }
};

const archiveImages = Object.values(
  import.meta.glob<ImageMetadata>('../assets/projects/*.{png,webp}', { eager: true, import: 'default' })
);

const projectIndustryMap: Record<string, IndustryId> = {
  avsbina: 'construction',
  fuzzfloor: 'construction',
  atone: 'construction',
  binamaju: 'construction',
  binapro: 'construction',
  adyumrah: 'travel',
  murtajiz: 'travel',
  hijrah: 'travel',
  medin: 'fnb-retail',
  pizza: 'fnb-retail',
  dentex: 'clinics-edu',
  'clarity-learncentre': 'clinics-edu',
  bearsplit: 'systems-apps',
  hawkerrewards: 'systems-apps',
  tahu: 'systems-apps',
};

const showcaseMap: Record<string, ImageMetadata> = {
  avsbina: avsbinaShowcase,
  hss: hssShowcase,
  adyumrah: adyumrahShowcase,
  aaburger: aaburgerShowcase,
  mze: mzeShowcase,
  dentex: dentexShowcase,
};

const stageBgMap: Record<string, string> = {
  avsbina: 'linear-gradient(155deg, #1b2925 0%, #0e1613 100%)',
  hss: 'linear-gradient(155deg, #dce8f8 0%, #b5d0f4 100%)',
  adyumrah: 'linear-gradient(155deg, #113d32 0%, #08241d 100%)',
  aaburger: 'linear-gradient(155deg, #382214 0%, #180e08 100%)',
  mze: 'linear-gradient(155deg, #dbe7fb 0%, #b9d2fa 100%)',
  dentex: 'linear-gradient(155deg, #d2e3fc 0%, #aac7fa 100%)',
  fuzzfloor: 'linear-gradient(155deg, #27221d 0%, #120f0c 100%)',
  atone: 'linear-gradient(155deg, #e2e8f0 0%, #cbd5e1 100%)',
  binamaju: 'linear-gradient(155deg, #d1fae5 0%, #a7f3d0 100%)',
  binapro: 'linear-gradient(155deg, #dbeafe 0%, #bfdbfe 100%)',
  murtajiz: 'linear-gradient(155deg, #dcfce7 0%, #bbf7d0 100%)',
  hijrah: 'linear-gradient(155deg, #ede9e2 0%, #dbd4c8 100%)',
  medin: 'linear-gradient(155deg, #f5e6d3 0%, #e6cfb3 100%)',
  kopitebu: 'linear-gradient(155deg, #134e4a 0%, #0a2e2c 100%)',
  citythree: 'linear-gradient(155deg, #dce8fa 0%, #bfd6f6 100%)',
  'clarity-learncentre': 'linear-gradient(155deg, #d1fae5 0%, #99f6e4 100%)',
  bearsplit: 'linear-gradient(155deg, #ffedd5 0%, #fed7aa 100%)',
  hawkerrewards: 'linear-gradient(155deg, #fef3c7 0%, #fde68a 100%)',
  pizza: 'linear-gradient(155deg, #fee2e2 0%, #fecaca 100%)',
  tahu: 'linear-gradient(155deg, #0f172a 0%, #1e293b 100%)',
};

const mobileOverlayMap: Record<string, ImageMetadata> = {
  fuzzfloor: fuzzfloorMobileImg,
};

const flagshipIds = new Set(['avsbina', 'hss', 'adyumrah', 'aaburger', 'mze', 'dentex']);

const displayOrder = [
  'avsbina',
  'hss',
  'adyumrah',
  'aaburger',
  'mze',
  'dentex',
  'fuzzfloor',
  'atone',
  'murtajiz',
  'hijrah',
  'medin',
  'kopitebu',
  'citythree',
  'clarity-learncentre',
  'binamaju',
  'binapro',
  'bearsplit',
  'hawkerrewards',
  'pizza',
  'tahu',
];

export function getWorkCatalog(locale: SiteLocale = 'en') {
  const isBm = locale === 'bm';

  const industryMetaList: IndustryMeta[] = isBm
    ? [
        {
          id: 'construction',
          title: 'Kontraktor',
          short: 'Kontraktor',
          desc: 'Laman sebut harga dan bukti projek untuk kontraktor Malaysia.',
          color: '#B45309',
          tint: '#FFFBEB',
        },
        {
          id: 'travel',
          title: 'Umrah',
          short: 'Umrah',
          desc: 'Katalog pakej, kemas kini CMS dan aliran tempahan meyakinkan.',
          color: '#047857',
          tint: '#ECFDF5',
        },
        {
          id: 'fnb-retail',
          title: 'F&B & Runcit',
          short: 'F&B & Runcit',
          desc: 'Kiosk pesanan sendiri, laman kafe dan kedai Shopify.',
          color: '#BE123C',
          tint: '#FFF1F2',
        },
        {
          id: 'b2b',
          title: 'Servis B2B',
          short: 'Servis B2B',
          desc: 'Katalog komersial, bukti TV3 dan pertanyaan WhatsApp.',
          color: '#1D4ED8',
          tint: '#EFF6FF',
        },
        {
          id: 'clinics-edu',
          title: 'Klinik & Ilmu',
          short: 'Klinik & Ilmu',
          desc: 'Susun atur klinik jelas dan portal pembelajaran digital.',
          color: '#0F766E',
          tint: '#F0FDFA',
        },
        {
          id: 'systems-apps',
          title: 'Sistem & App',
          short: 'Sistem & App',
          desc: 'Papan pemuka staf, POS/ERP dan produk digital tersuai.',
          color: '#334155',
          tint: '#F1F5F9',
        },
      ]
    : [
        {
          id: 'construction',
          title: 'Contractors',
          short: 'Contractors',
          desc: 'Quote-ready sites and 3D proof for Malaysian builders.',
          color: '#B45309',
          tint: '#FFFBEB',
        },
        {
          id: 'travel',
          title: 'Umrah',
          short: 'Umrah',
          desc: 'Package catalogues, easy CMS updates and trust-first booking.',
          color: '#047857',
          tint: '#ECFDF5',
        },
        {
          id: 'fnb-retail',
          title: 'F&B & Retail',
          short: 'F&B & Retail',
          desc: 'Self-order kiosks, cafe websites and Shopify stores.',
          color: '#BE123C',
          tint: '#FFF1F2',
        },
        {
          id: 'b2b',
          title: 'B2B',
          short: 'B2B',
          desc: 'Commercial catalogues, TV3 proof and WhatsApp leads.',
          color: '#1D4ED8',
          tint: '#EFF6FF',
        },
        {
          id: 'clinics-edu',
          title: 'Clinics & Edu',
          short: 'Clinics & Edu',
          desc: 'Clear clinic layouts and online learning portals.',
          color: '#0F766E',
          tint: '#F0FDFA',
        },
        {
          id: 'systems-apps',
          title: 'Ops & Apps',
          short: 'Ops & Apps',
          desc: 'Workforce dashboards, POS/ERP and custom products.',
          color: '#334155',
          tint: '#F1F5F9',
        },
      ];

  const industryById = Object.fromEntries(
    industryMetaList.map((ind) => [ind.id, ind])
  ) as Record<IndustryId, IndustryMeta>;

  const standaloneBuilds: WorkItem[] = [
    {
      id: 'mze',
      name: 'MZE Worker System',
      industry: 'systems-apps',
      status: 'demo',
      flagship: true,
      purpose: isBm
        ? 'Papan pemuka pengurusan tenaga kerja untuk rekod staf, jadual dan operasi harian.'
        : 'Workforce management dashboard for tracking staff, schedules and daily operations.',
      href: 'https://mzdemo.haikaitech.my/',
      skills: ['Staff Dashboard', 'Operations UI', 'Role Workflows'],
      image: workforceDemoImg,
      showcaseImage: showcaseMap.mze,
      stageBg: stageBgMap.mze,
      alt: isBm
        ? 'Papan pemuka pengurusan tenaga kerja MZE Worker System dalam mod demo'
        : 'MZE Worker System workforce management dashboard in demo mode',
      host: 'mzdemo.haikaitech.my',
    },
    {
      id: 'hss',
      name: 'HSS Wireless CCTV',
      industry: 'b2b',
      status: 'live',
      flagship: true,
      purpose: isBm
        ? 'Laman web B2B CCTV wireless dengan bukti slot TV3 Borak Kopitiam dan aliran sebut harga.'
        : 'B2B wireless CCTV website with TV3 Borak Kopitiam feature proof and quote flows.',
      href: 'https://wirelesscctv.com.my/',
      skills: ['B2B Catalog', 'TV3 Slot Proof', 'WhatsApp Quote'],
      image: hssDesktopImg,
      showcaseImage: showcaseMap.hss,
      stageBg: stageBgMap.hss,
      alt: isBm ? 'Laman utama desktop HSS Wireless CCTV' : 'HSS Wireless CCTV desktop website homepage',
      host: 'wirelesscctv.com.my',
    },
    {
      id: 'aaburger',
      name: 'AA Burger Kiosk',
      industry: 'fnb-retail',
      status: 'live',
      flagship: true,
      purpose: isBm
        ? 'Antara muka kiosk pesanan makanan layan diri dengan aliran menu mudah alih.'
        : 'Self-ordering burger kiosk interface with a fast mobile-first menu flow.',
      href: 'https://aaburger.haikaitech.my/',
      skills: ['Ordering Kiosk', 'Mobile Flow', 'F&B UX'],
      image: aaBurgerImg,
      showcaseImage: showcaseMap.aaburger,
      stageBg: stageBgMap.aaburger,
      alt: isBm ? 'Antara muka pesanan AA Burger Kiosk' : 'AA Burger Kiosk ordering interface',
      host: 'aaburger.haikaitech.my',
    },
    {
      id: 'citythree',
      name: 'CityThree',
      industry: 'b2b',
      status: 'live',
      flagship: false,
      purpose: isBm
        ? 'Laman web perniagaan kredit komuniti dengan info jelas dan pertanyaan terus.'
        : 'Community credit business website built for clear eligibility info and direct enquiries.',
      href: 'https://citythree.my/',
      skills: ['Corporate Web', 'Lead Flow', 'Local SEO'],
      image: cityThreeImg,
      stageBg: stageBgMap.citythree,
      alt: isBm ? 'Laman utama desktop CityThree' : 'CityThree desktop website homepage',
      host: 'citythree.my',
    },
    {
      id: 'kopitebu',
      name: 'Kopi Tebu',
      industry: 'fnb-retail',
      status: 'live',
      flagship: false,
      purpose: isBm
        ? 'Laman web kafe tepi pantai dengan identiti jenama santai dan mesra telefon.'
        : 'Beachside cafe website crafted for relaxed brand storytelling and mobile browsing.',
      href: 'https://kopitebu-website.pages.dev/',
      skills: ['Astro', 'Cafe Brand', 'Mobile UI'],
      image: kopiTebuImg,
      stageBg: stageBgMap.kopitebu,
      alt: isBm ? 'Laman utama desktop Kopi Tebu' : 'Kopi Tebu desktop website homepage',
      host: 'kopitebu-website.pages.dev',
    },
  ];

  const archiveWorkItems: WorkItem[] = PROJECTS.map((project) => {
    const matchedImg = archiveImages.find((image) => image.src === project.image);
    const rawPurpose = isBm ? (bmHome.projects.archivePurpose[project.id] ?? project.purpose) : project.purpose;
    return {
      id: project.id,
      name: cleanCopy(project.name),
      industry: projectIndustryMap[project.id] ?? 'systems-apps',
      status: project.status,
      flagship: flagshipIds.has(project.id),
      purpose: cleanCopy(rawPurpose),
      href: project.link,
      caseStudyHref: `/projects/${project.id}/`,
      skills: project.skills.slice(0, 3),
      image: matchedImg ?? project.image,
      showcaseImage: showcaseMap[project.id],
      mobileImage: mobileOverlayMap[project.id],
      stageBg: stageBgMap[project.id] ?? 'linear-gradient(155deg, #dce8f8 0%, #bfd4f3 100%)',
      alt: isBm ? `Pratonton projek ${cleanCopy(project.name)}` : `${cleanCopy(project.name)} project preview`,
      host: extractHost(project.link),
    };
  });

  const combinedMap = new Map<string, WorkItem>([
    ...standaloneBuilds.map((item) => [item.id, item] as const),
    ...archiveWorkItems.map((item) => [item.id, item] as const),
  ]);

  const allProjects: WorkItem[] = displayOrder
    .map((id) => combinedMap.get(id))
    .filter((item): item is WorkItem => Boolean(item));

  const industries: IndustryWithCount[] = industryMetaList.map((ind) => ({
    ...ind,
    count: allProjects.filter((p) => p.industry === ind.id).length,
  }));

  const flagshipProjects = allProjects.filter((p) => p.flagship);

  return {
    industries,
    industryById,
    allProjects,
    flagshipProjects,
    totalCount: allProjects.length,
    liveCount: allProjects.filter((p) => p.status === 'live').length,
    flagshipCount: flagshipProjects.length,
  };
}
