import type { Profile } from '@/types';

export const profile: Profile = {
  name: 'Rohit Singh Rawat',
  role: 'Software Development Engineer',
  headline: 'Frontend Engineering · React / Next.js · Full-Stack Development',
  intro:
    'I bring 4+ years of professional frontend experience building SaaS web and mobile products. I specialize in React and TypeScript, and build full-stack applications with Next.js, Node.js, Express and MongoDB.',
  availability: 'Available immediately',
  location: 'Delhi, India',
  email: 'imrohit.150@gmail.com',
  // Keep this URL and filename aligned with the latest PDF in public/.
  resume: { href: '/Rohit_Rawat_Resume.pdf', fileName: 'Rohit_Rawat_Resume.pdf' },
  about: [
    "I'm a frontend-focused Software Development Engineer with over four years of professional experience building SaaS applications and mobile experiences. I care about interfaces that make complex workflows feel clear and easy to use.",
    'At Arka360, I worked on business-critical features including dynamic PDF proposal workflows, solar calculators, pricing and financing systems, and React Native workflows for ArkaGo.',
    'I expanded into full-stack development by independently building and deploying SkillConnect, a developer networking platform powered by Next.js, Node.js, Express, MongoDB and Socket.IO. I owned the frontend, backend and deployment, from email verification to private real-time messaging.',
    'My journey from intern to SDE taught me to take ownership, work closely with a product team and see features through to delivery. I am now looking for frontend and frontend-focused full-stack opportunities where I can bring that experience to a new product.',
  ],
  stats: [
    { value: '4+', label: 'Years in professional frontend' },
    { value: 'Intern to SDE', label: 'Career progression' },
    { value: 'Web + mobile', label: 'Platforms shipped' },
  ],
};
