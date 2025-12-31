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
  Box
} from 'lucide-react';
import React from 'react';

export const PROJECTS: Project[] = [
  {
    id: 'murtajiz',
    name: 'Al Murtajiz Travel',
    purpose: 'Modern travel agency platform with CMS-driven content',
    tags: ['React', 'Cloudflare', 'Google Sheets CMS'],
    skills: ['React', 'TailwindCSS', 'Cloudflare Pages', 'Google Sheets API', 'UX Design'],
    link: 'https://al-murtajiz-travel.pages.dev/',
    image: 'assets/al-murtajiz-travel.png',
    accentColor: 'border-emerald-600 text-emerald-600',
    theme: 'murtajiz'
  },
  {
    id: 'bearsplit',
    name: 'BearSplit Waitlist',
    purpose: 'Waitlist app with playful UX & product thinking',
    tags: ['React Native', 'Expo', 'Product Design'],
    skills: ['React Native', 'Expo', 'UI/UX Design', 'Product Thinking', 'State Management', 'Hand-drawn Identity'],
    link: 'https://bear-split-waitlist.vercel.app/',
    image: 'assets/bear-split-waitlist.png',
    accentColor: 'border-orange-900 text-orange-900',
    theme: 'bear'
  },
  {
    id: 'hijrah',
    name: 'Hijrah Al Haramain HQ',
    purpose: 'Cultural HQ site focusing on client trust',
    tags: ['React', 'Tailwind', 'UX Sensitivity'],
    skills: ['React', 'TailwindCSS', 'UX Research', 'Content Structuring', 'Client-focused Design'],
    link: 'https://hijrahalharamainhq.netlify.app/',
    image: 'assets/hijrahalharamainhq.png',
    accentColor: 'border-stone-600 text-stone-600',
    theme: 'hijrah'
  },
  {
    id: 'dentex',
    name: 'Dentex Clinic',
    purpose: 'Clean, medical-grade corporate execution',
    tags: ['React', 'Clarity', 'Performance'],
    skills: ['React', 'Clean UI Systems', 'Medical Layouts', 'Performance', 'Clarity'],
    link: 'https://dentex-clinic.netlify.app/',
    image: 'assets/dentex-clinic.png',
    accentColor: 'border-blue-600 text-blue-600',
    theme: 'dentex'
  },
  {
    id: 'tahu',
    name: 'TahuKripto',
    purpose: 'Experimental blueprint visual systems',
    tags: ['React', 'Blueprint UI', 'Dark Mode'],
    skills: ['React', 'Blueprint Visuals', 'Technical Design', 'Dark-mode UI'],
    link: 'https://tahu-kripto.netlify.app/',
    image: 'assets/tahu-kripto.png',
    accentColor: 'border-cyan-600 text-cyan-600',
    theme: 'crypto'
  },
  {
    id: 'pizza',
    name: 'Rumah Pizza',
    purpose: 'Branding and casual web experience',
    tags: ['React', 'Fun UI', 'Branding'],
    skills: ['React', 'Branding', 'Playful UI', 'Marketing Layouts'],
    link: 'https://rumahpizza.netlify.app/',
    image: 'assets/rumahpizza.png',
    accentColor: 'border-red-600 text-red-600',
    theme: 'pizza'
  },
  {
    id: 'clarity-learncentre',
    name: 'Clarity Learn Centre',
    purpose: 'Web platform for learning Quran and ebooks',
    tags: ['React', 'Education', 'Quran Learning'],
    skills: ['React', 'Educational Platform', 'Content Management', 'UX Design'],
    link: 'https://clarity-learncentre.netlify.app/',
    image: 'assets/clarity-learncentre.png',
    accentColor: 'border-green-600 text-green-600',
    theme: 'hijrah'
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

export const CONTACTS: ContactLink[] = [
  {
    label: 'Email',
    value: 'iffathaikal7@gmail.com',
    href: 'mailto:iffathaikal7@gmail.com',
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