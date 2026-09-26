'use client';

import { motion, type Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/cn';

type Direction = 'left' | 'right' | 'up' | 'zoom';

const variants: Record<Direction, Variants> = {
  left: { hidden: { opacity: 0, x: -48 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 48 }, visible: { opacity: 1, x: 0 } },
  up: { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } },
  zoom: { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
};

export function Reveal({
  children,
  direction = 'up',
  compactDirection,
  delay = 0,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  compactDirection?: Direction;
  delay?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [compactScreen, setCompactScreen] = useState(false);
  const [screenSizeReady, setScreenSizeReady] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 1023px)');
    const update = () => setCompactScreen(query.matches);
    update();
    setScreenSizeReady(true);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const horizontalDirection = direction === 'left' || direction === 'right';
  const activeDirection =
    horizontalDirection && (!screenSizeReady || compactScreen)
      ? compactDirection ?? 'zoom'
      : direction;

  return (
    <motion.div
      className={cn(className)}
      initial={reduced ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={variants[activeDirection]}
      transition={{ duration: 0.75, delay: delay + 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}