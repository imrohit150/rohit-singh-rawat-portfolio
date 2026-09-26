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
    <section id={id} className={cn('scroll-mt-16 py-20 md:py-28', className)}>
      <Container>{children}</Container>
    </section>
  );
}
