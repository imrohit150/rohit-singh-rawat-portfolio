import type { IconType } from 'react-icons';
import { FaGithub, FaLinkedinIn, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { LuMail } from 'react-icons/lu';
import { socials } from '@/data/socials';
import type { SocialId } from '@/types';
import { cn } from '@/lib/cn';

const icons: Record<SocialId, IconType> = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
  x: FaXTwitter,
  email: LuMail,
  whatsapp: FaWhatsapp,
};

export function SocialLinks({
  variant = 'icons',
  className,
}: {
  variant?: 'icons' | 'labeled';
  className?: string;
}) {
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {socials.map((social) => {
        const Icon = icons[social.id];
        const external = !social.href.startsWith('mailto:');
        return (
          <li key={social.id}>
            <a
              href={social.href}
              aria-label={variant === 'icons' ? social.label : undefined}
              {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
              className={
                variant === 'icons'
                  ? 'grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/40 hover:bg-surface hover:text-ink motion-reduce:transition-none'
                  : 'inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-3 py-2 text-sm text-muted transition-colors hover:border-accent/40 hover:bg-surface hover:text-ink motion-reduce:transition-none'
              }
            >
              <Icon size={18} className="shrink-0" aria-hidden />
              {variant === 'labeled' ? <span>{social.label}</span> : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
