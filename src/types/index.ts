export interface StatItem {
  value: string;
  label: string;
}

export interface Profile {
  name: string;
  role: string;
  headline: string;
  intro: string;
  availability: string;
  location: string;
  email: string;
  resume: { href: string; fileName: string };
  about: string[];
  stats: StatItem[];
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  product: string;
  employmentType: 'Full-time' | 'Internship';
  period: string;
  summary: string;
  highlights: { title: string; description: string }[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  featured?: boolean;
  ownership?: string;
  category: string;
  image: string;
  imageAlt?: string;
  imageCaption?: string;
  note?: string;
  title: string;
  tagline: string;
  details: string[];
  stack: string[];
  stackLabel?: string;
  links: ProjectLink[];
}

export interface SkillGroup {
  title: string;
  description?: string;
  primary?: boolean;
  wide?: boolean;
  items: string[];
}

export type SocialId = 'linkedin' | 'github' | 'x' | 'email' | 'whatsapp';

export interface Social {
  id: SocialId;
  label: string;
  href: string;
}

export interface NavItem {
  id: string;
  label: string;
}

/** `color` is a hex value, or 'ink' to use the current theme's text color. */
export interface TechItem {
  name: string;
  color: string;
  icon: string;
}
