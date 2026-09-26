import { techStack } from '@/data/techstack';

/** Shown when WebGL is unavailable. */
export function TechFallback() {
  return (
    <ul className="flex h-full flex-wrap content-center gap-3">
      {techStack.map((tech) => (
        <li key={tech.name} className="rounded-xl border border-line bg-surface px-4 py-2 text-sm">
          {tech.name}
        </li>
      ))}
    </ul>
  );
}
