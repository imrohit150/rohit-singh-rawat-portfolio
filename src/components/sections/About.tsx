import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { profile } from '@/data/profile';

export function About() {
  return (
    <Section id="about" className="gradient-band border-y border-line bg-surface/35">
      <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-16">
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
            <div className="max-w-prose space-y-4 text-base leading-relaxed text-ink/90 sm:space-y-5 sm:text-lg">
              {profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 sm:mt-10 sm:grid-cols-3 sm:gap-x-8 sm:pt-8">
              {profile.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-sm text-muted">{stat.label}</dt>
                  <dd className="mt-1 font-display text-xl font-semibold sm:text-2xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
