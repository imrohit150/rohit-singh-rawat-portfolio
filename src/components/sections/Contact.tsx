import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { Reveal } from '@/components/ui/Reveal';
import { profile } from '@/data/profile';
import { ContactForm } from './ContactForm';

export function Contact() {
  return (
    <Section id="contact" className="border-t border-line bg-surface/35">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-16">
        <Reveal direction="left">
          <div>
          <SectionHeading
            eyebrow="Let&apos;s talk"
            title={
              <>
                Let&apos;s build something <em className="text-accent">useful.</em>
              </>
            }
            description="Hiring for a React or frontend role? Send a message and I'll reply by email."
          />
          <p className="mt-8 text-muted">{profile.email}</p>
          <SocialLinks variant="labeled" className="mt-6" />
          </div>
        </Reveal>
        <Reveal direction="right" delay={0.12}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
