import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';

export function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} tabIndex={-1} className={cn('scroll-mt-6 py-14 sm:py-20 lg:py-24', className)}>
      <Container>{children}</Container>
    </section>
  );
}
