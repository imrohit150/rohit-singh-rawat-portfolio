'use client';

import { LuMoon, LuSun } from 'react-icons/lu';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-accent motion-reduce:transition-none"
    >
      {dark ? <LuSun size={18} aria-hidden /> : <LuMoon size={18} aria-hidden />}
    </button>
  );
}
