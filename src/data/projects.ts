import type { Project } from '@/types';
export const projects: Project[] = [
  {
    id: 'insurance-review-workbench',
    category: 'Data-driven UI',
    image: 'insurance_review_workbench',
    title: 'Insurance Review Workbench',
    tagline: 'An operations dashboard for reviewing insurance enrollment submissions.',
    details: [
      'Searchable and filterable review queues with prioritization.',
      'Detailed submission drawers with approval and correction workflows.',
      'Responsive layout with loading and error states throughout.',
    ],
    stack: ['React', 'TypeScript', 'TanStack Query', 'Axios', 'Node.js mock API', 'Vercel', 'Render'],
    links: [
      { label: 'Live demo', href: 'https://insurance-review-dashboard.vercel.app/' },
      { label: 'Source code', href: 'https://github.com/imrohit150/insurance-review-dashboard' },
    ],
  },
  {
    id: 'arka360-solar-calculator',
    category: 'Product engineering',
    image: 'solar_calculator',
    title: 'Solar Calculator',
    tagline: 'Estimate rooftop solar requirements, system size and potential savings in minutes.',
    details: [
      'Estimates rooftop solar requirements based on location, power supply phase and electricity bill.',
      'Calculates recommended system size and potential savings through guided input workflows.',
      "Built Arka360's calculation engine with real-time energy logic and automated results.",
    ],
    stack: ['Rooftop solar estimation', 'System sizing', 'Savings projections'],
    stackLabel: 'Focus areas',
    links: [{ label: 'Live calculator', href: 'https://solarcalculator.arka360.com/' }],
  },
  {
    id: 'arkago',
    category: 'React Native · Mobile',
    image: 'arkago',
    title: 'ArkaGo',
    tagline: 'A mobile app for solar installers to manage leads, size systems and create proposals on-site, with 5K+ Google Play downloads.',
    details: [
      'Lead management with customer contacts, deal statuses, calls, notes, voice memos and site photos.',
      'On-site solar calculator for system size, rooftop area, savings, ROI, payback period and pricing.',
      'Generated shareable proposals with financing details and provided access to solar training content.',
    ],
    stack: ['React Native', 'REST APIs', 'i18n'],
    links: [
      { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.arka.go&hl=en_IN' },
      { label: 'App Store', href: 'https://apps.apple.com/in/app/arkago/id6756788389' },
    ],
  },
];
