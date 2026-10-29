import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { Reveal } from '@/components/ui/Reveal';
import { aiTools, skills } from '@/data/skills';
import { cn } from '@/lib/cn';

export function Skills() {
  return (
    <Section id="skills" className="gradient-band">
      <Reveal direction="up">
        <SectionHeading
          eyebrow="Expertise"
          title={
            <>
              What I <em className="text-accent">know.</em>
            </>
          }
          description="Professional frontend experience, with practical full-stack development through SkillConnect."
        />
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-10">
        {skills.map((group) => (
          <Reveal key={group.title} direction="up" className={cn('h-full', group.wide && 'sm:col-span-2')}>
            <TiltCard className="h-full">
              <div
                className={cn(
                  'h-full rounded-2xl border p-4 sm:p-5',
                  group.primary ? 'border-accent/40 bg-accent/5' : 'border-line bg-surface/45',
                )}
              >
                {group.primary ? (
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent">Core expertise</p>
                ) : null}
                <h3 className="font-display text-lg font-semibold leading-snug">{group.title}</h3>
                {group.description ? (
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">{group.description}</p>
                ) : null}
                <ul aria-label={group.title} className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        'rounded-full border px-2.5 py-1.5 text-xs leading-relaxed sm:text-sm',
                        group.primary
                          ? 'border-accent/25 bg-accent/10 font-medium text-ink'
                          : 'border-line bg-bg/30 text-ink/85',
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal direction="up" className="mt-5">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-line pt-4">
          <h3 className="text-xs font-medium text-muted">AI tools</h3>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
            {aiTools.map((tool) => <li key={tool}>{tool}</li>)}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
