import React from 'react';
import { ExternalLink, Sparkles, TrendingUp } from 'lucide-react';
import type { Project } from '../../data/projectsData';
import { GlassCard } from './GlassCard';
import { GithubIcon } from './BrandIcons';
import { useAudioEngine } from '../../audio/useAudioEngine';

import { Latex } from './Latex';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { playTick } = useAudioEngine();

  return (
    <GlassCard
      accentBorder={index === 0}
      className="flex flex-col justify-between h-full p-6 sm:p-8 group hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-cyan-500/10 hover:border-blue-500/40 dark:hover:border-cyan-500/40 transition-all duration-300"
    >
      <div>
        {/* Header con Categoría y Concepto Matemático */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium uppercase tracking-wider bg-blue-500/10 dark:bg-cyan-500/10 text-blue-700 dark:text-cyan-300 border border-blue-500/20 dark:border-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            {project.category}
          </span>
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 max-w-full overflow-x-auto shadow-sm">
            <Latex math={project.mathConcept} />
          </span>
        </div>

        {/* Título y Subtítulo */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-cyan-200 transition-colors mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="text-sm sm:text-base font-medium text-slate-600 dark:text-slate-400 mb-5">
          {project.subtitle}
        </p>

        {/* Destacado de Impacto Educativo / Científico */}
        <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-blue-50/80 dark:bg-gradient-to-r dark:from-cyan-950/40 dark:to-indigo-950/30 border border-blue-200/80 dark:border-cyan-500/20 mb-5">
          <TrendingUp className="w-4 h-4 text-blue-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs sm:text-sm text-slate-800 dark:text-cyan-100 font-medium leading-relaxed">
            <strong className="text-blue-700 dark:text-cyan-300 font-semibold">Impacto Verificado:</strong> {project.impact}
          </p>
        </div>

        {/* Descripción refinada y gancho (2-3 líneas con excelente legibilidad) */}
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Métricas visuales convertidas en badges minimalistas translúcidos */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200/70 dark:border-white/5 mb-6">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col text-center">
              <span className="text-base sm:text-xl font-bold font-mono text-blue-600 dark:text-cyan-300">
                {m.value}
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-0.5 truncate">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* Tecnologías */}
        <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-slate-200 dark:border-white/5">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Botones de acción (Demo y Código) */}
        <div className="flex items-center gap-3">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTick(1050)}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 transition-all duration-200 shadow-md shadow-blue-500/20 dark:shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-300"
          >
            <span>Ver Demo Interactiva</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTick(800)}
            className="flex items-center justify-center p-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label={`Ver código de ${project.title} en GitHub`}
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </GlassCard>
  );
};
