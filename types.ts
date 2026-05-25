export interface Project {
  id: string;
  name: string;
  purpose: string;
  tags: string[];
  skills: string[];
  link: string;
  image: string;
  accentColor: string; // Tailwind class for border/text
  theme: 'bear' | 'hijrah' | 'dentex' | 'crypto' | 'pizza' | 'murtajiz' | 'medin';
}

export interface SkillGroup {
  category: string;
  description: string;
  items: string[];
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  type: 'email' | 'github' | 'linkedin' | 'threads' | 'contribution';
  description: string;
}

export enum ViewMode {
  STANDARD = 'STANDARD',
  RECRUITER = 'RECRUITER'
}