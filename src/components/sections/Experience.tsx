'use client';

import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';
import { Reveal } from '../ui/Reveal';
import { experience } from '@/data/experience';

export function Experience() {
  return (
    <Section id="experience" className="border-y border-line hero-atmosphere">
      <div>
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

        <Reveal direction="zoom" delay={0.12} className="mt-10 md:mt-12">
          <TiltCard className="overflow-hidden rounded-2xl border border-line bg-surface/60">
          <div className="border-b border-line p-6 md:p-8">
            <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-8">
              <div>
                <p className="text-xs tracking-[0.08em] text-muted">Feb 2022 – Apr 2026 · Full journey</p>
                <h3 className="mt-2 font-display text-2xl font-semibold md:text-3xl">
                  Indarka Energy Pvt. Ltd.
                </h3>
                <p className="mt-1 text-sm text-muted">Arka360 Platform · Global B2B Solar SaaS</p>
              </div>
              <div className="flex flex-wrap gap-2 md:max-w-xs md:justify-end">
                <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  4,000+ installers
                </span>
                <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  27 countries
                </span>
              </div>
            </div>
          </div>

          <div>
            {experience.map((entry, index) => (
              <article
                key={entry.id}
                className={
                  index === 0
                    ? 'p-6 md:p-8'
                    : 'grid gap-4 border-t border-line bg-bg/25 p-6 md:grid-cols-[9rem_1fr] md:gap-8 md:p-6'
                }
              >
                {index === 0 ? (
                  <>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-xl font-semibold">{entry.role}</h3>
                        <p className="mt-1 text-sm text-muted">{entry.period}</p>
                      </div>
                      <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                        Full-time
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed">{entry.summary}</p>
                    <ul className="mt-5 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink/85 marker:text-accent">
                      {entry.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="font-display text-sm font-semibold text-muted">{entry.period}</p>
                      <span className="mt-2 inline-flex rounded-full border border-line px-3 py-1 text-xs text-muted">
                        Internship
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{entry.role}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{entry.summary}</p>
                    </div>
                  </>
                )}
              </article>
            ))}
          </div>
          </TiltCard>
        </Reveal>
      </div>
    </Section>
  );
}
