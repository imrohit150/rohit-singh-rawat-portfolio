'use client';

import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { Reveal } from '@/components/ui/Reveal';
import { experience, experienceCompany } from '@/data/experience';

export function Experience() {
  return (
    <Section id="experience" className="border-y border-line hero-atmosphere">
      <Reveal direction="up">
        <SectionHeading
          eyebrow="Career"
          title={
            <>
              Where I&apos;ve <em className="text-accent">worked.</em>
            </>
          }
        />
      </Reveal>

      <Reveal direction="up" delay={0.12} className="mt-10 md:mt-12">
        <TiltCard className="overflow-hidden rounded-2xl border border-line bg-surface/60">
          <div className="border-b border-line p-5 sm:p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
              <div>
                <p className="text-xs tracking-wide text-muted">{experienceCompany.period}</p>
                <h3 className="mt-2 font-display text-xl font-semibold sm:text-2xl md:text-3xl">
                  {experienceCompany.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  <span className="font-medium text-ink">{experienceCompany.product}</span>
                  {' · '}
                  {experienceCompany.description}
                </p>
              </div>
              <ul aria-label="Arka360 platform reach" className="flex shrink-0 flex-wrap gap-2">
                {experienceCompany.reach.map((metric) => (
                  <li
                    key={metric}
                    className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                  >
                    {metric}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ol className="m-5 space-y-8 border-l border-line sm:m-6 md:m-8">
            {experience.map((entry) => (
              <li key={entry.id} className="relative pl-5 sm:pl-7">
                <span
                  aria-hidden
                  className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-accent ring-4 ring-surface"
                />
                <article aria-labelledby={`experience-${entry.id}`}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h4 id={`experience-${entry.id}`} className="font-display text-lg font-semibold sm:text-xl">
                        {entry.role}
                      </h4>
                      <p className="mt-1 text-xs text-muted sm:text-sm">{entry.period}</p>
                    </div>
                    <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                      {entry.employmentType}
                    </span>
                  </div>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/85">{entry.summary}</p>

                  {entry.highlights.length > 0 ? (
                    <ul className="mt-5 grid gap-3 lg:grid-cols-2">
                      {entry.highlights.map((highlight) => (
                        <li key={highlight.title} className="rounded-xl border border-line bg-bg/30 p-4 sm:p-5">
                          <h5 className="text-sm font-semibold text-ink">{highlight.title}</h5>
                          <p className="mt-2 text-sm leading-relaxed text-muted">{highlight.description}</p>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </li>
            ))}
          </ol>
        </TiltCard>
      </Reveal>
    </Section>
  );
}
