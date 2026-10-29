import type { SkillGroup } from '@/types';

export const skills: SkillGroup[] = [
  {
    title: 'Frontend development',
    primary: true,
    description: 'My core specialization across professional SaaS products and personal projects.',
    items: ['React.js', 'Next.js', 'Vue.js', 'React Native', 'Tailwind CSS', 'shadcn/ui'],
  },
  {
    title: 'Languages',
    items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'SCSS'],
  },
  {
    title: 'State management and data fetching',
    items: ['Redux Toolkit', 'Zustand', 'Context API', 'TanStack React Query', 'Axios'],
  },
  {
    title: 'Backend and database',
    description: 'Applied in SkillConnect, my independently built and deployed full-stack project.',
    items: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST APIs', 'Socket.IO', 'JWT Authentication'],
  },
  {
    title: 'Testing',
    items: ['Jest', 'React Testing Library'],
  },
  {
    title: 'Tools and platforms',
    items: ['Git', 'GitHub', 'Vite', 'Figma', 'Cloudinary', 'Vercel', 'Render', 'ESLint', 'Prettier'],
  },
  {
    title: 'Additional engineering skills',
    wide: true,
    items: ['Responsive Design', 'Performance Optimization', 'PDF Generation', 'API Integration', 'i18n', 'Cross-browser Compatibility', 'Agile / Scrum'],
  },
];

export const aiTools = ['Claude', 'ChatGPT', 'GitHub Copilot', 'Windsurf'];
