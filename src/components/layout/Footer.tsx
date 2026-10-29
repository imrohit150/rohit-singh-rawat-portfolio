import { Container } from '@/components/ui/Container';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { profile } from '@/data/profile';

export function Footer() {
  return (
    <footer className="border-t border-line py-7 sm:py-8">
      <Container className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div>
          <p className="text-sm text-ink">© {new Date().getFullYear()} {profile.name}.</p>
          <p className="mt-2 text-xs leading-relaxed text-muted">Built with Next.js, TypeScript and Three.js.</p>
        </div>
        <nav aria-label="Footer social links">
          <SocialLinks />
        </nav>
      </Container>
    </footer>
  );
}
