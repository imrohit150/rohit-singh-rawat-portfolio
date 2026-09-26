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
      aria-pressed={dark}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      className="relative h-6 w-11 shrink-0 rounded-full border border-line bg-surface transition-colors hover:border-accent focus-visible:outline-offset-2"
    >
      <span
        className={`absolute top-0.5 grid size-[18px] place-items-center rounded-full transition-all duration-300 ${
          dark ? 'left-[1.35rem] bg-accent text-on-accent' : 'left-0.5 bg-ink text-bg'
        }`}
      >
        {dark ? <LuMoon size={10} aria-hidden /> : <LuSun size={10} aria-hidden />}
      </span>
    </button>
  );
}
