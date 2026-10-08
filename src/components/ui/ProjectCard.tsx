import React from 'react';
import { ArrowUpRight, Check, Code2 } from 'lucide-react';
import type { Project } from '../../data/projectsData';
import { GithubIcon } from './BrandIcons';
import { useAudioEngine } from '../../audio/useAudioEngine';
import { Latex } from './Latex';

export const ProjectCard: React.FC<{ project: Project; index?: number }> = ({ project }) => {
  const { playTick } = useAudioEngine();

  return (
    <article className="glass-panel-interactive flex h-full flex-col p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-bold text-[var(--accent-strong)]">{project.category}</span>
        {project.mathConcept && (
          <span className="max-w-full overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-xs text-[var(--text-muted)]">
            <Latex math={project.mathConcept} />
          </span>
        )}
      </div>
      <h3 className="mt-5 text-2xl font-extrabold sm:text-3xl">{project.title}</h3>
      <p className="mt-1 text-sm font-semibold text-[var(--accent-strong)]">{project.subtitle}</p>
      <p className="mt-4 leading-relaxed text-[var(--text-muted)]">{project.description}</p>
      <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{project.context}</p>

      <ul className="mt-5 grid gap-2 text-sm text-[var(--text)] sm:grid-cols-3">
        {project.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--success)]" aria-hidden="true" /> {feature}
          </li>
        ))}
      </ul>

      <dl className="mt-6 grid grid-cols-3 gap-2 rounded-xl bg-[var(--surface-soft)] p-3">
        {project.facts.map((fact) => (
          <div key={fact.label} className="min-w-0 text-center">
            <dt className="truncate text-[0.68rem] font-bold uppercase tracking-wide text-[var(--text-muted)]">{fact.label}</dt>
            <dd className="mt-1 break-words text-sm font-extrabold text-[var(--text)]">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        {project.technologies.map((technology) => (
          <span key={technology} className="rounded-md border border-[var(--border)] px-2.5 py-1 text-xs font-medium text-[var(--text-muted)]">{technology}</span>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-[var(--border)] pt-5 sm:flex-row">
        {project.demoUrl && (
          <a className="btn-primary flex-1" href={project.demoUrl} target="_blank" rel="noopener noreferrer" onClick={() => playTick(1050)}>
            Abrir proyecto <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
        <a className="btn-secondary flex-1" href={project.repoUrl} target="_blank" rel="noopener noreferrer" onClick={() => playTick(820)}>
          <GithubIcon className="h-4 w-4" aria-hidden="true" /> Ver código <Code2 className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
};
