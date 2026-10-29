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

// Load the decorative Three.js scene only in the browser.
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
    <section id="top" tabIndex={-1} className="hero-atmosphere pt-[var(--header-height)]">
      <Container className="grid min-h-[calc(100svh-var(--header-height))] items-center gap-4 py-10 lg:grid-cols-[1fr_1.05fr] lg:gap-8">
        <div>
          <h1 className="font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            <RevealLine delay={0.1}>Rohit Singh</RevealLine>
            <RevealLine delay={0.2}>Rawat</RevealLine>
          </h1>

          <motion.div {...fade(0.55)} className="mt-4">
            <p className="font-display text-xl text-accent md:text-2xl">{profile.role}</p>
            <p className="mt-3 max-w-lg text-sm font-medium leading-relaxed text-ink/85">
              {profile.headline}
            </p>
          </motion.div>

          <motion.p {...fade(0.7)} className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            {profile.intro}
          </motion.p>

          <motion.div {...fade(0.85)} className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <ButtonLink href="#projects" className="col-span-2 sm:col-span-1">
              View My Work
            </ButtonLink>
            <ButtonLink
              href={profile.resume.href}
              download={profile.resume.fileName}
              variant="secondary"
              className="px-3 sm:px-6"
              icon={<LuDownload size={16} aria-hidden />}
            >
              Download Resume
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary" className="px-3 sm:px-6">
              Let&apos;s Connect
            </ButtonLink>
          </motion.div>

          <motion.p {...fade(1)} className="mt-6 flex items-start gap-2 text-sm leading-relaxed text-muted">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" aria-hidden />
            {profile.availability}. Based in {profile.location}.
          </motion.p>
        </div>

        <div className="relative h-[280px] sm:h-[360px] lg:h-[560px]" aria-hidden>
          <TechScene />
        </div>
      </Container>
    </section>
  );
}
