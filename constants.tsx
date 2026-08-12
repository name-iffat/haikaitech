import { Project, SkillGroup, ContactLink } from './types';
import {
  Code2,
  Terminal,
  Smartphone,
  Database,
  Cpu,
  PenTool,
  Github,
  Linkedin,
  Mail,
  AtSign,
  GitPullRequest,
  Layout,
  Box,
  MessageCircle
} from 'lucide-react';
import React from 'react';

import murtajizImg from './src/assets/projects/al-murtajiz-travel.webp';
import bearsplitImg from './src/assets/projects/bear-split-waitlist.webp';
import hijrahImg from './src/assets/projects/hijrahalharamainhq.webp';
import dentexImg from './src/assets/projects/dentex-clinic.webp';
import tahuImg from './src/assets/projects/tahu-kripto.webp';
import pizzaImg from './src/assets/projects/rumahpizza.webp';
import clarityImg from './src/assets/projects/clarity-learncentre.webp';
import medinImg from './src/assets/projects/medin-fragrances.webp';
import avsbinaImg from './src/assets/projects/avsbina.webp';
import adyumrahImg from './src/assets/projects/adyumrah.webp';
import fuzzfloorImg from './src/assets/projects/fuzzfloor.webp';
import atoneImg from './src/assets/projects/atone.webp';
import binamajuImg from './src/assets/projects/binamaju.webp';
import binaproImg from './src/assets/projects/binapro.webp';
import hawkerrewardsImg from './src/assets/projects/hawkerrewards.webp';

export const PROJECTS: Project[] = [
  {
    id: 'avsbina',
    name: 'AVS Design & Construction',
    purpose: 'Premium design & build contractor platform with a 3D-first consultation flow',
    tags: ['Astro', 'Premium UI', 'Design & Build'],
    skills: ['Astro', 'TailwindCSS', 'UX Storytelling', 'Motion Design', 'Quote Forms', 'Content Strategy'],
    link: 'https://avsbina.com.my',
    image: avsbinaImg.src,
    accentColor: 'border-amber-700 text-amber-700',
    status: 'live',
    theme: 'avsbina'
  },
  {
    id: 'adyumrah',
    name: 'Ady Umrah Hajj',
    purpose: 'Umrah travel agency platform with package catalogue & admin dashboard',
    tags: ['React', 'Package Catalogue', 'Admin Dashboard'],
    skills: ['React', 'Admin Dashboard', 'SEO', 'CRO', 'Content Management'],
    link: 'https://adyumrahajj.com',
    image: adyumrahImg.src,
    accentColor: 'border-purple-600 text-purple-600',
    status: 'live',
    theme: 'adyumrah'
  },
  {
    id: 'fuzzfloor',
    name: 'Fuzzfloor',
    purpose: 'Flooring specialist site with service-led UX & project proof',
    tags: ['Astro', 'Local SEO', 'Service Site'],
    skills: ['Astro', 'TailwindCSS', 'Local SEO', 'Content Strategy', 'Premium Editorial UI'],
    link: 'https://fuzzfloor.com',
    image: fuzzfloorImg.src,
    accentColor: 'border-teal-600 text-teal-600',
    status: 'live',
    theme: 'fuzzfloor'
  },
  {
    id: 'atone',
    name: 'AT One Construction',
    purpose: 'Bilingual lead-gen site for a pagar, awning & grill contractor in KL',
    tags: ['Lead Generation', 'Bilingual MS/EN', 'Local SEO'],
    skills: ['Landing Page', 'Local SEO', 'Bilingual Content', 'Quote Forms', 'Mobile-first UI'],
    link: 'https://atoneconstruction.com.my',
    image: atoneImg.src,
    accentColor: 'border-slate-700 text-slate-700',
    status: 'live',
    theme: 'atone'
  },
  {
    id: 'murtajiz',
    name: 'Murtajiz Travel',
    purpose: 'Modern travel agency platform with CMS-driven content',
    tags: ['React', 'Cloudflare', 'Google Sheets CMS'],
    skills: ['React', 'TailwindCSS', 'Cloudflare Pages', 'Google Sheets API', 'UX Design'],
    link: 'https://murtazjiumrah.haikaitech.my/',
    image: murtajizImg.src,
    accentColor: 'border-emerald-600 text-emerald-600',
    status: 'live',
    theme: 'murtajiz'
  },
  {
    id: 'hijrah',
    name: 'Hijrah Umrah',
    purpose: 'Cultural HQ site focusing on client trust',
    tags: ['React', 'Tailwind', 'UX Sensitivity'],
    skills: ['React', 'TailwindCSS', 'UX Research', 'Content Structuring', 'Client-focused Design'],
    link: 'https://hijrahumrah.haikaitech.my/',
    image: hijrahImg.src,
    accentColor: 'border-stone-600 text-stone-600',
    status: 'live',
    theme: 'hijrah'
  },
  {
    id: 'dentex',
    name: 'Dentex Clinic',
    purpose: 'Clean, medical-grade corporate execution',
    tags: ['React', 'Clarity', 'Performance'],
    skills: ['React', 'Clean UI Systems', 'Medical Layouts', 'Performance', 'Clarity'],
    link: 'https://dentex-clinic.netlify.app/',
    image: dentexImg.src,
    accentColor: 'border-blue-600 text-blue-600',
    status: 'demo',
    theme: 'dentex'
  },
  {
    id: 'medin',
    name: 'Médin Fragrances',
    purpose: 'Shopify e-commerce store for premium fragrance brand',
    tags: ['Shopify', 'E-commerce', 'Brand Design'],
    skills: ['Shopify', 'E-commerce Strategy', 'Brand Design', 'Product Showcase', 'UX Design'],
    link: 'https://medin-frag.myshopify.com/',
    image: medinImg.src,
    accentColor: 'border-amber-700 text-amber-700',
    status: 'live',
    theme: 'medin'
  },
  {
    id: 'clarity-learncentre',
    name: 'Clarity Learn Centre',
    purpose: 'Web platform for learning Quran and ebooks',
    tags: ['React', 'Education', 'Quran Learning'],
    skills: ['React', 'Educational Platform', 'Content Management', 'UX Design'],
    link: 'https://clarity-learncentre.netlify.app/',
    image: clarityImg.src,
    accentColor: 'border-green-600 text-green-600',
    status: 'demo',
    theme: 'hijrah'
  },
  {
    id: 'binamaju',
    name: 'Binamaju Construction',
    purpose: 'Digital presence demo for a CIDB G3 contractor — Malay-first with WhatsApp lead flow',
    tags: ['Demo', 'Malay', 'WhatsApp Lead Flow'],
    skills: ['Landing Page', 'Malay Content', 'WhatsApp Integration', 'Reviews', 'Local SEO'],
    link: 'https://binamaju-demoweb.pages.dev/ms',
    image: binamajuImg.src,
    accentColor: 'border-emerald-700 text-emerald-700',
    status: 'demo',
    theme: 'binamaju'
  },
  {
    id: 'binapro',
    name: 'BinaPro — Contractor Blueprint',
    purpose: 'Blueprint concept page for a corporate engineering & construction contractor',
    tags: ['Blueprint', 'Concept', 'Contractor'],
    skills: ['UI Design', 'Brand Concept', 'Landing Page'],
    link: 'https://binapro-contractor-blueprint.pages.dev/',
    image: binaproImg.src,
    accentColor: 'border-blue-700 text-blue-700',
    status: 'demo',
    theme: 'binapro'
  },
  {
    id: 'hawkerrewards',
    name: 'HawkerRewards',
    purpose: 'Solana-powered loyalty demo for hawker stalls with a playable match-3 game',
    tags: ['Web3', 'Solana', 'Gamified Demo'],
    skills: ['Product Design', 'Web3 Landing', 'Interactive Game', 'Token UX'],
    link: 'https://hawkerrewards.pages.dev/',
    image: hawkerrewardsImg.src,
    accentColor: 'border-yellow-600 text-yellow-600',
    status: 'demo',
    theme: 'hawkerrewards'
  },
  {
    id: 'bearsplit',
    name: 'BearSplit Waitlist',
    purpose: 'Waitlist app with playful UX & product thinking',
    tags: ['React Native', 'Expo', 'Product Design'],
    skills: ['React Native', 'Expo', 'UI/UX Design', 'Product Thinking', 'State Management', 'Hand-drawn Identity'],
    link: 'https://bear-split-waitlist.vercel.app/',
    image: bearsplitImg.src,
    accentColor: 'border-orange-900 text-orange-900',
    status: 'demo',
    theme: 'bear'
  },
  {
    id: 'pizza',
    name: 'Rumah Pizza',
    purpose: 'Branding and casual web experience',
    tags: ['React', 'Fun UI', 'Branding'],
    skills: ['React', 'Branding', 'Playful UI', 'Marketing Layouts'],
    link: 'https://rumahpizza.netlify.app/',
    image: pizzaImg.src,
    accentColor: 'border-red-600 text-red-600',
    status: 'demo',
    theme: 'pizza'
  },
  {
    id: 'tahu',
    name: 'TahuKripto',
    purpose: 'Experimental blueprint visual systems',
    tags: ['React', 'Blueprint UI', 'Dark Mode'],
    skills: ['React', 'Blueprint Visuals', 'Technical Design', 'Dark-mode UI'],
    link: 'https://tahu-kripto.netlify.app/',
    image: tahuImg.src,
    accentColor: 'border-cyan-600 text-cyan-600',
    status: 'demo',
    theme: 'crypto'
  }
];

export const SKILLS: SkillGroup[] = [
  {
    category: 'Languages',
    description: 'Fluency in the core technologies that drive modern software engineering and logic.',
    items: ['TypeScript', 'JavaScript', 'C#', 'Python', 'C++', 'Java', 'PHP', 'Dart', 'SQL', 'HTML/CSS']
  },
  {
    category: 'Frameworks & Frontend',
    description: 'Structural components for building responsive, accessible, and performant user interfaces.',
    items: ['React', 'Next.js', 'React Native', 'Expo', 'TailwindCSS', '.NET (Blazor/WPF)', 'Playwright']
  },
  {
    category: 'Backend & Data',
    description: 'Systems design for reliability, data integrity, and scalable server-side architecture.',
    items: ['Supabase', 'Firebase', 'SQL Server', 'MySQL', 'CodeIgniter', 'Apache Superset']
  },
  {
    category: 'Interactive & Creative',
    description: 'Bridging the gap between functional code and engaging visual experiences.',
    items: ['Unity 3D', 'UI Systems', 'Figma', 'Prototyping', 'Aseprite', 'Adobe Photoshop']
  },
  {
    category: 'Tools & Capabilities',
    description: 'The specialized utility belt for automation, prototyping, hardware integration, and deployment.',
    items: ['Visual Studio', 'Git', 'Excel Automation (VBA)', 'IoT Fundamentals', 'AR (Vuforia)']
  }
];

const WHATSAPP_NUMBER = '60147533499';
const WHATSAPP_TEXT = encodeURIComponent(
  'Hi HaikaiTech! I came across your portfolio (haikaitech.my) and would love to discuss a project.'
);

export const CONTACTS: ContactLink[] = [
  {
    label: 'WhatsApp',
    value: '+60 14-753 3499',
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`,
    type: 'whatsapp',
    description: 'Reply within the hour during business hours (9am–6pm MYT).'
  },
  {
    label: 'Email',
    value: 'hq@haikaitech.my',
    href: 'mailto:hq@haikaitech.my?subject=Project%20enquiry',
    type: 'email',
    description: 'Drop me a line directly.'
  },
  {
    label: 'GitHub',
    value: 'github.com/name-iffat',
    href: 'https://github.com/name-iffat',
    type: 'github',
    description: 'Explore my code and repositories.'
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/iffathaikal',
    href: 'https://www.linkedin.com/in/iffathaikal/',
    type: 'linkedin',
    description: 'Connect professionally.'
  },
  {
    label: 'Threads',
    value: '@iffat_haikal',
    href: 'https://www.threads.com/@iffat_haikal',
    type: 'threads',
    description: 'Follow my latest updates and thoughts.'
  },
  {
    label: 'Open Source',
    value: 'KrackedDevs Contributions',
    href: 'https://krackeddevs.com/',
    type: 'contribution',
    description: 'View my PR submissions and open source work.'
  }
];

export const getIconForCategory = (category: string) => {
  if (category.includes('Languages')) return <Terminal className="w-5 h-5" />;
  if (category.includes('Frontend')) return <Smartphone className="w-5 h-5" />;
  if (category.includes('Backend')) return <Database className="w-5 h-5" />;
  if (category.includes('Interactive')) return <Cpu className="w-5 h-5" />;
  return <PenTool className="w-5 h-5" />;
};

export const getIconForContact = (type: string) => {
  switch (type) {
    case 'whatsapp': return <MessageCircle className="w-5 h-5" />;
    case 'github': return <Github className="w-5 h-5" />;
    case 'linkedin': return <Linkedin className="w-5 h-5" />;
    case 'threads': return <AtSign className="w-5 h-5" />;
    case 'contribution': return <GitPullRequest className="w-5 h-5" />;
    default: return <Mail className="w-5 h-5" />;
  }
};

// Skill Icon Mapping
const SKILL_ICONS: Record<string, string> = {
  'TypeScript': 'typescript',
  'JavaScript': 'javascript',
  'C#': 'csharp',
  'Python': 'python',
  'C++': 'cplusplus',
  'Java': 'openjdk',
  'PHP': 'php',
  'Dart': 'dart',
  'HTML/CSS': 'html5',
  'React': 'react',
  'Next.js': 'nextdotjs',
  'React Native': 'react',
  'Expo': 'expo',
  'TailwindCSS': 'tailwindcss',
  '.NET (Blazor/WPF)': 'dotnet',
  'Playwright': 'playwright',
  'Supabase': 'supabase',
  'Firebase': 'firebase',
  'SQL Server': 'microsoftsqlserver',
  'MySQL': 'mysql',
  'CodeIgniter': 'codeigniter',
  'Apache Superset': 'apache',
  'Unity 3D': 'unity',
  'Figma': 'figma',
  'Aseprite': 'aseprite',
  'Adobe Photoshop': 'adobephotoshop',
  'Visual Studio': 'visualstudio',
  'Git': 'git',
  'Excel Automation (VBA)': 'microsoftexcel',
  'Shopify': 'shopify',
  'Cloudflare Pages': 'cloudflarepages',
  'Google Sheets API': 'googlesheets',
  'UX Research': 'uxpin', // Fallback or related
  'UX Design': 'figma',
  'Client-focused Design': 'figma',
  'UX Sensitivity': 'figma'
};

// Helper to get skill icon
export const getSkillIcon = (skill: string) => {
  const slug = SKILL_ICONS[skill];
  const iconColor = "475569"; // Slate-600

  if (slug) {
    // Using a more robust simple icons provider
    return <img src={`https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${slug}.svg`}
      alt=""
      className="w-3.5 h-3.5 opacity-60 group-hover/skill:opacity-100 transition-opacity"
      style={{ filter: 'invert(36%) sepia(18%) saturate(795%) hue-rotate(180deg) brightness(92%) contrast(88%)' }} />;
  }

  // Lucide Fallbacks for skills without Simple Icons or generic concepts
  if (skill.includes('SQL') || skill.includes('Data')) return <Database className="w-3.5 h-3.5" />;
  if (skill.includes('UI') || skill.includes('UX') || skill.includes('Layout') || skill.includes('Design')) return <Layout className="w-3.5 h-3.5" />;
  if (skill.includes('IoT') || skill.includes('Hardware')) return <Cpu className="w-3.5 h-3.5" />;
  if (skill.includes('AR') || skill.includes('Vuforia')) return <Box className="w-3.5 h-3.5" />;
  if (skill.includes('Prototyping')) return <PenTool className="w-3.5 h-3.5" />;

  return <Terminal className="w-3.5 h-3.5" />;
};