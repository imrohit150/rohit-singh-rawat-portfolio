import type { SkillGroup } from '@/types';

export const skills: SkillGroup[] = [
  {
    title: 'React ecosystem',
    items: ['React 18/19', 'React Native', 'React Hooks', 'Custom Hooks', 'React Router', 'Redux Toolkit', 'Zustand', 'React Query'],
  },
  { title: 'Languages', items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'SASS/SCSS'] },
  {
    title: 'UI engineering',
    items: ['Tailwind CSS', 'Shadcn/UI', 'Responsive design', 'Cross-browser compatibility', 'i18n / localization'],
  },
  { title: 'Data and product engineering', items: ['REST APIs', 'Axios', 'Fetch API', 'PDF report generation', 'Business logic'] },
  { title: 'Frameworks', items: ['Next.js', 'Vue.js'] },
  { title: 'Testing and tooling', items: ['Jest', 'React Testing Library', 'Vite', 'ESLint', 'Prettier', 'Git and GitHub', 'Figma', 'Agile / Scrum'] },
  { title: 'AI tools', items: ['Claude', 'ChatGPT', 'GitHub Copilot', 'Windsurf'] },
];
