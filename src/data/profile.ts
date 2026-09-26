import type { Profile } from '@/types';

export const profile: Profile = {
  name: 'Rohit Singh Rawat',
  role: 'Software Development Engineer',
  headline: '',
  intro:
    'I build reliable web and mobile products using modern frontend technologies like React, TypeScript and React Native. I enjoy turning complex workflows and business logic into experiences that feel clear, fast and easy to use.',
  availability: 'Available immediately',
  location: 'Delhi, India',
  email: 'imrohit.150@gmail.com',
  // To update your resume, replace public/resume.pdf. Rename the download here if you like.
  resume: { href: '/resume.pdf', fileName: 'Rohit-Singh-Rawat-Resume.pdf' },
  about: [
    "I'm a frontend-focused Software Development Engineer with 4+ years of experience building production web and mobile products. I work comfortably where product requirements, user experience and technical implementation meet.",
    'My work goes beyond the surface of a screen. I build multi-step workflows, calculation-heavy features, stateful interfaces, PDF reports, REST integrations and React Native experiences, with a focus on clarity, performance and maintainable code.',
    'I started as an intern and grew into owning major product areas as an SDE. I am now looking for a product team where I can contribute thoughtfully, take features from idea to delivery and keep growing as an engineer.',
  ],
  stats: [
    { value: '4+', label: 'Years building products' },
    { value: 'Intern to SDE', label: 'Career progression' },
    { value: 'Web + mobile', label: 'Platforms shipped' },
  ],
};
