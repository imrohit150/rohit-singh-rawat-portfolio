'use client';

import { useEffect, useState } from 'react';

export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join('|');

  useEffect(() => {
    const elements = key.split('|').map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;
    let frame: number | null = null;
    const update = () => {
      frame = null;
      const headerHeight = document.getElementById('site-header')?.firstElementChild?.getBoundingClientRect().height ?? 68;
      const threshold = headerHeight + Math.min(window.innerHeight * 0.2, 120);
      let next = elements[0].id;
      for (const element of elements) {
        if (element.getBoundingClientRect().top <= threshold) next = element.id;
      }
      if (window.scrollY > 0 && Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 2) {
        next = elements[elements.length - 1].id;
      }
      setActive((current) => current === next ? current : next);
    };
    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [key]);

  return active;
}
