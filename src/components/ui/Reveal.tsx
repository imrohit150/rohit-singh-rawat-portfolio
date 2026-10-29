'use client';

import { motion, type Variants } from 'framer-motion';
import { useEffect, useLayoutEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/cn';

type Direction = 'left' | 'right' | 'up' | 'zoom';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// Reset every transform when variants change across responsive breakpoints.
// Otherwise a mobile zoom reveal can retain the desktop's horizontal offset.
const visible = { opacity: 1, x: 0, y: 0, scale: 1 };
const hidden = { opacity: 0, x: 0, y: 0, scale: 1 };
const variants: Record<Direction, Variants> = {
  left: { hidden: { ...hidden, x: -24 }, visible },
  right: { hidden: { ...hidden, x: 24 }, visible },
  up: { hidden: { ...hidden, y: 20 }, visible },
  zoom: { hidden: { ...hidden, scale: 0.98 }, visible },
};

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [compactScreen, setCompactScreen] = useState(false);
  const [screenSizeReady, setScreenSizeReady] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const query = window.matchMedia('(max-width: 1023px)');
    const update = () => setCompactScreen(query.matches);
    update();
    setScreenSizeReady(true);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const horizontalDirection = direction === 'left' || direction === 'right';
  const activeDirection = compactScreen && horizontalDirection ? 'zoom' : direction;

  return (
    <motion.div
      className={cn('min-w-0', className)}
      initial={reduced ? false : 'hidden'}
      whileInView={screenSizeReady ? 'visible' : undefined}
      viewport={{ once: true, amount: 0.18 }}
      variants={variants[activeDirection]}
      transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}