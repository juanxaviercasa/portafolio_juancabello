import React, { useState } from 'react';
import { FolderKanban } from 'lucide-react';
import { projectsData, type ProjectCategory } from '../../data/projectsData';
import { ProjectCard } from '../ui/ProjectCard';
import { useAudioEngine } from '../../audio/useAudioEngine';

type Filter = 'Todos' | ProjectCategory;
const FILTERS: Filter[] = ['Todos', 'Educación STEM', 'Matemáticas', 'Producto Web', 'Inteligencia Artificial'];

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('Todos');
  const { playTick } = useAudioEngine();
  const projects = filter === 'Todos' ? projectsData : projectsData.filter((project) => project.category === filter);

  return (
    <section id="proyectos" className="section-shell" data-od-id="projects">
      <header>
        <p className="section-kicker"><FolderKanban className="h-4 w-4" aria-hidden="true" /> Trabajo verificable</p>
        <h2 className="section-heading">Proyectos publicados, con código y propósito.</h2>
        <p className="section-intro">
          Selección de productos reales. Cada ficha enlaza a su repositorio público y, cuando existe, a la aplicación en producción.
        </p>
      </header>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-2 no-scrollbar" role="group" aria-label="Filtrar proyectos por categoría">
        {FILTERS.map((item) => {
          const selected = filter === item;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={selected}
              onClick={() => { setFilter(item); playTick(900); }}
              className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-bold transition-colors ${selected ? 'border-[var(--accent-strong)] bg-[var(--accent-strong)] text-white dark:border-[var(--accent)] dark:bg-[var(--accent)] dark:text-slate-950' : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--text)]'}`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-sm text-[var(--text-muted)]" aria-live="polite">
        {projects.length} {projects.length === 1 ? 'proyecto' : 'proyectos'} en esta vista.
      </p>

      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </section>
  );
};
