import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';
import { Reveal } from '../ui/Reveal';
import { skills } from '@/data/skills';

export function Skills() {
  return (
    <Section id="skills" className="gradient-band">
      <div>
        <Reveal direction="up">
          <SectionHeading
            eyebrow="Expertise"
            title={
              <>
                What I <em className="text-accent">know.</em>
              </>
            }
          />
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-12">
          {skills.map((group, index) => (
            <Reveal
              key={group.title}
              direction={index % 2 === 0 ? 'left' : 'right'}
              compactDirection="zoom"
              delay={index * 0.08}
            >
              <TiltCard>
              <div className="h-full rounded-2xl border border-line bg-surface/45 p-5 transition-shadow duration-300 hover:shadow-lg hover:shadow-black/10">
                <h3 className="font-display text-lg font-semibold">{group.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-sm text-ink/85"
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
      </div>
    </Section>
  );
}
