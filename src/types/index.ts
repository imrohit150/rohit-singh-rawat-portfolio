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
  period: string;
  summary: string;
  highlights: string[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  category: string;
  image: string;
  title: string;
  tagline: string;
  details: string[];
  stack: string[];
  stackLabel?: string;
  links: ProjectLink[];
}

export interface SkillGroup {
  title: string;
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
