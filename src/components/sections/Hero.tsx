'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { LuDownload } from 'react-icons/lu';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { profile } from '@/data/profile';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { easeOutExpo } from '@/lib/animations';

// three.js only loads in the browser, so it never slows down the first paint.
const TechScene = dynamic(() => import('@/components/three/TechScene').then((m) => m.TechScene), {
  ssr: false,
  loading: () => <div className="h-full w-full" aria-hidden />,
});

/** One line of text that rises out of a mask. */
function RevealLine({ children, delay }: { children: ReactNode; delay: number }) {
  const reduced = usePrefersReducedMotion();
  return (
    <span className="block overflow-hidden pb-2">
      <motion.span
        className="block"
        initial={reduced ? false : { y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: easeOutExpo, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const fade = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: easeOutExpo, delay },
  });

  return (
    <section id="top" className="hero-atmosphere pt-16">
      <Container className="grid min-h-[calc(100svh-4rem)] items-center gap-4 py-10 lg:grid-cols-[1fr_1.05fr] lg:gap-8">
        <div>
          <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            <RevealLine delay={0.1}>Rohit Singh</RevealLine>
            <RevealLine delay={0.2}>Rawat</RevealLine>
          </h1>

          <motion.p {...fade(0.55)} className="mt-4 font-display text-xl text-accent md:text-2xl">
            {profile.role}. {profile.headline}
          </motion.p>

          <motion.p {...fade(0.7)} className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            {profile.intro}
          </motion.p>

          <motion.div {...fade(0.85)} className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#projects">View projects</ButtonLink>
            <ButtonLink
              href={profile.resume.href}
              download={profile.resume.fileName}
              variant="secondary"
              icon={<LuDownload size={16} aria-hidden />}
            >
              Download resume
            </ButtonLink>
          </motion.div>

          <motion.p {...fade(1)} className="mt-8 flex items-center gap-2 text-sm text-muted">
            <span className="size-2 rounded-full bg-accent" aria-hidden />
            {profile.availability}. Based in {profile.location}.
          </motion.p>
        </div>

        <div className="relative h-[360px] sm:h-[440px] lg:h-[640px]" aria-hidden>
          <TechScene />
        </div>
      </Container>
    </section>
  );
}
