import type { ExperienceEntry } from '@/types';

export const experienceCompany = {
  name: 'Indarka Energy Private Limited',
  product: 'Arka360',
  description: 'Global B2B solar SaaS platform',
  period: 'Feb 2022 – Apr 2026',
  reach: ['4,000+ installers', '27 countries'],
};

// Newest first. Use only confirmed contributions and metrics.
export const experience: ExperienceEntry[] = [
  {
    id: 'sde',
    role: 'Software Development Engineer',
    company: experienceCompany.name,
    product: experienceCompany.product,
    employmentType: 'Full-time',
    period: 'Aug 2022 – Apr 2026',
    summary:
      'Core frontend engineer delivering complex workflows across the Arka360 platform, with ownership of major features and contributions to its React Native application.',
    highlights: [
      {
        title: 'Dynamic PDF proposal workflows',
        description:
          'Owned the frontend of an API-driven proposal workflow generating 20–25-page PDFs. Built conditional page rendering and custom DOM pagination using element heights, cloneNode and overflow handling, with export through html2canvas and html2pdf-ts.',
      },
      {
        title: 'Solar Calculator',
        description:
          'Built interactive estimation workflows with real-time energy calculations, system sizing, complex business logic and API integrations, including automated report generation.',
      },
      {
        title: 'Business-critical product modules',
        description:
          'Developed pricing and financing, design defaults, project configuration, organization, inventory and consumption workflows using React, TypeScript, Redux Toolkit and Zustand.',
      },
      {
        title: 'Progressive UI modernization',
        description:
          'Led a UI migration with feature flags supporting legacy and redesigned interfaces. Reworked prop-based data flows into API-driven screens with centralized state, eliminating redundant API requests across the hybrid UI.',
      },
      {
        title: 'ArkaGo mobile contributions',
        description:
          'Contributed organization management, lead management, REST API integrations and localization workflows in React Native. ArkaGo has 5K+ Google Play downloads.',
      },
      {
        title: 'Performance, data flows and testing',
        description:
          'Applied lazy loading, code splitting and memoization; integrated APIs with Axios and React Query; and wrote Jest and React Testing Library component tests in an Agile team of 4–6 engineers.',
      },
    ],
  },
  {
    id: 'intern',
    role: 'Frontend Developer Intern',
    company: experienceCompany.name,
    product: experienceCompany.product,
    employmentType: 'Internship',
    period: 'Feb 2022 – Aug 2022',
    summary:
      'Joined the Arka360 frontend team and progressed to Software Development Engineer within six months.',
    highlights: [],
  },
];
