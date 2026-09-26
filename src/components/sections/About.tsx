import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { profile } from '@/data/profile';

export function About() {
  return (
    <Section id="about" className="gradient-band border-y border-line bg-surface/35">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-16">
        <Reveal direction="left">
          <SectionHeading
            eyebrow="About me"
            title={
              <>
                I turn complex product problems into{' '}
                <em className="text-accent">reliable software.</em>
              </>
            }
          />
        </Reveal>
        <Reveal direction="right" delay={0.12}>
          <div>
          <div className="max-w-prose space-y-5 text-lg leading-relaxed text-ink/90">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-8 sm:grid-cols-3">
            {profile.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-sm text-muted">{stat.label}</dt>
                <dd className="mt-1 font-display text-2xl font-semibold">{stat.value}</dd>
              </div>
            ))}
          </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
