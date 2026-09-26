import { Container } from '@/components/ui/Container';
import { profile } from '@/data/profile';

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, TypeScript and Three.js.
        </p>
      </Container>
    </footer>
  );
}
