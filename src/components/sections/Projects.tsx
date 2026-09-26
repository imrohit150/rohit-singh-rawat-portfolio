'use client';

import Image, { type StaticImageData } from 'next/image';
import { LuArrowUpRight } from 'react-icons/lu';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';
import { Reveal } from '../ui/Reveal';
import { projects } from '@/data/projects';
import arkaGoImage from '@/assets/arkago.png';
import insuranceImage from '@/assets/insurance_review_workbench.png';
import solarCalculatorImage from '@/assets/solar_calculator.png';

const projectImages: Record<string, StaticImageData> = {
  arkago: arkaGoImage,
  insurance_review_workbench: insuranceImage,
  solar_calculator: solarCalculatorImage,
};

export function Projects() {
  return (
    <Section id="projects" className="gradient-band border-y border-line bg-surface/35">
      <Reveal direction="up">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Things I&apos;ve <em className="text-accent">built.</em>
            </>
          }
        />
      </Reveal>

      <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.id} direction="up" delay={index * 0.1} className="h-full">
            <TiltCard className="h-full">
            <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-black/10 md:p-7">
              <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-xl border border-line bg-bg">
                <Image
                  src={projectImages[project.image]}
                  alt={`${project.title} project preview`}
                  fill
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  {project.category}
                </span>
                <span className="font-display text-3xl font-semibold leading-none text-line">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-semibold leading-tight">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{project.tagline}</p>

              <ul className="mt-5 space-y-2 text-sm leading-relaxed text-ink/85">
                {project.details.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <span className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-line pt-5">
                <p className="text-xs uppercase tracking-[0.14em] text-muted">
                  {project.stackLabel ?? 'Built with'}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <li key={item} className="rounded-full border border-line px-2.5 py-1 text-xs text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <ul className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-7">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 text-sm font-medium text-accent underline-offset-4 hover:underline"
                    >
                      {link.label}
                      <LuArrowUpRight size={15} aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
