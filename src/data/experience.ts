import type { ExperienceEntry } from '@/types';

// Newest first.
// TODO: add measurable results (bugs fixed, load-time gains, API calls removed)
// once you have real numbers. Do not estimate without marking it with "~".
export const experience: ExperienceEntry[] = [
  {
    id: 'sde',
    role: 'Software Development Engineer',
    company: 'Indarka Energy Private Limited',
    product: 'Arka360',
    period: 'Aug 2022 – Apr 2026',
    summary:
      'Core frontend engineer on Arka360, a global solar platform used by 4,000+ installers in 27 countries.',
    highlights: [
      'Built the Proposal Workflow, a validated multi-step flow that generates 20–25 page PDF proposals with pricing and financial projections.',
      'Architected the Solar Calculator with real-time energy calculations, complex business logic and automated reports.',
      'Owned pricing, financing, design defaults, organization, inventory and consumption modules with React, Redux Toolkit and Zustand.',
      'Led a UI/UX revamp across major modules with responsive, cross-browser interfaces using Tailwind CSS and Shadcn/UI.',
      'Contributed React Native workflows for ArkaGo, including organization management, lead management, REST integrations and i18n.',
      'Improved performance through lazy loading, code splitting, memoization and API-call reduction.',
      'Built resilient data flows with Axios and React Query, including loading states, error boundaries and optimistic updates.',
      'Wrote Jest and React Testing Library tests while collaborating in Agile teams of 4–6 frontend engineers.',
    ],
  },
  {
    id: 'intern',
    role: 'Frontend Developer Intern',
    company: 'Indarka Energy Private Limited',
    product: 'Arka360',
    period: 'Feb 2022 – Aug 2022',
    summary:
      'Joined the Arka360 frontend team and earned a promotion to Software Development Engineer within six months.',
    highlights: [],
  },
];
