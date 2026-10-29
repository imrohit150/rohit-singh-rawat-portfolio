import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary';

const base =
  'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none [&>svg]:shrink-0';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-on-accent hover:bg-accent/85',
  secondary: 'border border-line text-ink hover:bg-surface',
};

interface CommonProps {
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
}

export function Button({
  type = 'button',
  variant = 'primary',
  icon,
  className,
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={cn(base, variants[variant], className)} {...rest}>
      {icon}
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = 'primary',
  icon,
  className,
  children,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(base, variants[variant], className)} {...rest}>
      {icon}
      {children}
    </a>
  );
}
