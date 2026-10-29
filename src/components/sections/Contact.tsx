import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { Reveal } from '@/components/ui/Reveal';
import { profile } from '@/data/profile';
import { ContactForm } from './ContactForm';

export function Contact() {
  return (
    <Section id="contact" className="border-t border-line bg-surface/35">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-12">
        <Reveal direction="left">
          <div>
            <SectionHeading
              eyebrow="Let's talk"
              title={
                <>
                  Let&apos;s build something <em className="text-accent">meaningful.</em>
                </>
              }
              description="I'm open to Software Development Engineer, Frontend Engineer and frontend-focused Full-Stack roles. Building a product that values thoughtful UI and maintainable code? Let's connect."
            />
            <p className="mt-6 text-sm text-muted">{profile.availability}. Based in {profile.location}.</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-3 inline-block break-all text-ink underline-offset-4 hover:text-accent hover:underline"
            >
              {profile.email}
            </a>
            <SocialLinks variant="labeled" className="mt-5" />
          </div>
        </Reveal>
        <Reveal direction="right" delay={0.12}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
