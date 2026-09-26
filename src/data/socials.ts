import type { Social } from '@/types';
import { profile } from './profile';

// TODO: replace the X link with your real handle.
export const socials: Social[] = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/imrohit150' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/imrohit150' },
  { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/918700065727' },
  { id: 'email', label: 'Email', href: `mailto:${profile.email}` },
];
