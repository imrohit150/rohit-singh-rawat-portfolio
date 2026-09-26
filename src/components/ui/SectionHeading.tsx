import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
      ) : null}
      <h2 className="max-w-xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
        {title}
      </h2>
      {description ? <p className={cn('mt-3 max-w-md text-muted')}>{description}</p> : null}
    </div>
  );
}
