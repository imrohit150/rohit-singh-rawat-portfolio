'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { LuMenu, LuX } from 'react-icons/lu';
import { Container } from '@/components/ui/Container';
import { navigation } from '@/data/navigation';
import { profile } from '@/data/profile';
import { useActiveSection } from '@/hooks/useActiveSection';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/cn';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const active = useActiveSection(navigation.map((item) => item.id));
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const update = () => {
      if (!query.matches) return;
      if (mobileNavRef.current?.contains(document.activeElement)) brandRef.current?.focus();
      setOpen(false);
    };
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onOutside = (event: Event) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside);
    document.addEventListener('focusin', onOutside);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onOutside);
      document.removeEventListener('focusin', onOutside);
    };
  }, [open]);

  function visitSection(id: string) {
    setOpen(false);
    document.getElementById(id)?.focus({ preventScroll: true });
  }

  return (
    <header
      id="site-header"
      ref={headerRef}
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/95 backdrop-blur-md',
        scrolled || open ? 'shadow-sm shadow-black/5' : 'shadow-none',
      )}
    >
      <Container className="flex h-[var(--header-height)] items-center justify-between gap-3">
        <a
          ref={brandRef}
          href="#top"
          onClick={() => visitSection('top')}
          className="min-w-0 truncate rounded-sm font-display text-base font-semibold tracking-tight sm:text-xl"
        >
          {profile.name}
        </a>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={() => visitSection(item.id)}
                    className={cn(
                      'relative flex min-h-11 items-center rounded-full px-3 text-sm transition-colors motion-reduce:transition-none',
                      isActive ? 'text-ink' : 'text-muted hover:bg-surface/60 hover:text-ink',
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        aria-hidden
                        layoutId={reduced ? undefined : 'nav-pill'}
                        className="absolute inset-0 rounded-full bg-surface ring-1 ring-line"
                        transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:bg-surface hover:text-ink motion-reduce:transition-none lg:hidden"
          >
            {open ? <LuX size={20} aria-hidden /> : <LuMenu size={20} aria-hidden />}
          </button>
        </div>
      </Container>
      <nav
        ref={mobileNavRef}
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!open}
        className="max-h-[calc(100dvh-var(--header-height))] overflow-y-auto overscroll-contain border-t border-line bg-bg lg:hidden"
      >
        <Container>
          <ul className="space-y-1 py-3">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'location' : undefined}
                  onClick={() => visitSection(item.id)}
                  className={cn(
                    'flex min-h-11 items-center rounded-xl px-3 py-2 text-sm font-medium transition-colors motion-reduce:transition-none',
                    active === item.id ? 'bg-accent/10 text-accent' : 'text-muted hover:bg-surface hover:text-ink',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </header>
  );
}
