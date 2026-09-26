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
    <ul className={cn(variant === 'icons' ? 'flex gap-2' : 'space-y-3', className)}>
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
                  ? 'grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink'
                  : 'inline-flex items-center gap-3 text-muted transition-colors hover:text-ink'
              }
            >
              <Icon size={variant === 'icons' ? 18 : 20} aria-hidden />
              {variant === 'labeled' ? <span>{social.label}</span> : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
