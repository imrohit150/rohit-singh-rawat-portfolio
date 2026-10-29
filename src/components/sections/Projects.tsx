'use client';

import Image, { type StaticImageData } from 'next/image';
import { LuArrowUpRight } from 'react-icons/lu';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';
import { Reveal } from '../ui/Reveal';
import { projects } from '@/data/projects';
import type { Project } from '@/types';
import arkaGoImage from '@/assets/arkago.png';
import insuranceImage from '@/assets/insurance_review_workbench.png';
import solarCalculatorImage from '@/assets/solar_calculator.png';
import skillConnectImage from '@/assets/skillConnect.png';

const projectImages: Record<string, StaticImageData> = {
  skillconnect: skillConnectImage,
  arkago: arkaGoImage,
  insurance_review_workbench: insuranceImage,
  solar_calculator: solarCalculatorImage,
};

function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <article
      aria-labelledby={`project-${project.id}`}
      className="rounded-2xl border border-accent/35 bg-surface/70 p-4 sm:p-6 lg:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Featured project</p>
          <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            {project.category}
          </span>
        </div>
        <p className="text-xs leading-relaxed text-muted">{project.ownership}</p>
      </div>

      <div className="mt-5 grid items-center gap-6 lg:mt-6 lg:grid-cols-[1.2fr_1fr] lg:gap-8">
        <figure className="min-w-0 overflow-hidden rounded-xl border border-line bg-bg">
          <Image
            src={projectImages[project.image]}
            alt={project.imageAlt ?? `${project.title} project preview`}
            sizes="(min-width: 1200px) 540px, (min-width: 1024px) 48vw, 90vw"
            className="h-auto w-full"
          />
          {project.imageCaption ? (
            <figcaption className="border-t border-line px-4 py-3 text-xs leading-relaxed text-muted">
              {project.imageCaption}
            </figcaption>
          ) : null}
        </figure>

        <div className="min-w-0">
          <h3 id={`project-${project.id}`} className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{project.tagline}</p>
          <ul aria-label={`${project.title} technologies`} className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li key={item} className="rounded-full border border-line bg-bg/40 px-2.5 py-1 text-xs text-ink/85">
                {item}
              </li>
            ))}
          </ul>
          <ul aria-label={`${project.title} links`} className="mt-6 flex flex-wrap gap-2">
            {project.links.map((link, index) => (
              <li key={link.href} className="w-full sm:w-auto">
                <ButtonLink
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant={index === 0 ? 'primary' : 'secondary'}
                  className="w-full px-4"
                >
                  {link.label}
                  <LuArrowUpRight size={15} aria-hidden />
                </ButtonLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul aria-label={`${project.title} feature highlights`} className="mt-6 grid gap-3 sm:grid-cols-2 lg:mt-8">
        {project.details.map((detail, index) => (
          <li key={detail} className="flex items-start gap-3 rounded-xl border border-line bg-bg/30 p-4">
            <span aria-hidden className="mt-0.5 shrink-0 font-display text-sm font-semibold text-accent">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="text-sm leading-relaxed text-ink/85">{detail}</p>
          </li>
        ))}
      </ul>
      {project.note ? (
        <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-muted">{project.note}</p>
      ) : null}
    </article>
  );
}

function ProjectCard({ project, number }: { project: Project; number: number }) {
  return (
    <TiltCard className="h-full">
      <article
        aria-labelledby={`project-${project.id}`}
        className="group flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-4 transition-colors duration-200 hover:border-accent/35 focus-within:border-accent/35 sm:p-5"
      >
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-line bg-white">
          <Image
            src={projectImages[project.image]}
            alt={project.imageAlt ?? `${project.title} project preview`}
            fill
            sizes="(min-width: 1280px) 350px, (min-width: 768px) 45vw, 90vw"
            className="object-contain"
          />
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            {project.category}
          </span>
          <span aria-hidden className="font-display text-2xl font-semibold leading-none text-muted/60">
            {String(number).padStart(2, '0')}
          </span>
        </div>

        <h3 id={`project-${project.id}`} className="mt-4 font-display text-xl font-semibold leading-tight sm:text-2xl">
          {project.title}
        </h3>
        {project.ownership ? (
          <p className="mt-2 text-xs font-medium leading-relaxed text-accent">{project.ownership}</p>
        ) : null}
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.tagline}</p>

        <ul aria-label={`${project.title} contributions`} className="mt-4 space-y-2 text-sm leading-relaxed text-ink/85">
          {project.details.map((detail) => (
            <li key={detail} className="flex gap-2">
              <span className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              <span>{detail}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 border-t border-line pt-4">
          <p className="text-xs uppercase tracking-[0.12em] text-muted">{project.stackLabel ?? 'Built with'}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li key={item} className="rounded-full border border-line px-2.5 py-1 text-xs text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ul aria-label={`${project.title} links`} className="mt-auto flex flex-wrap gap-2 pt-5">
          {project.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${link.label}: ${project.title}`}
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-line px-3 py-2 text-xs font-medium text-accent transition-colors hover:border-accent/35 hover:bg-accent/10"
              >
                {link.label}
                <LuArrowUpRight size={15} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </article>
    </TiltCard>
  );
}

export function Projects() {
  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

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

      {featuredProjects.map((project) => (
        <Reveal key={project.id} direction="up" className="mt-10 md:mt-12">
          <FeaturedProjectCard project={project} />
        </Reveal>
      ))}

      <div className="mt-6 grid gap-5 md:mt-8 md:grid-cols-2 xl:grid-cols-3">
        {otherProjects.map((project, index) => (
          <Reveal key={project.id} direction="up" delay={index * 0.1} className="h-full">
            <ProjectCard project={project} number={index + featuredProjects.length + 1} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
