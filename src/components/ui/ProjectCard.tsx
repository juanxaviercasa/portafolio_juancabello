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
      accentBorder={index === 0 ? 'purple' : false}
      className="flex flex-col justify-between h-full p-6 sm:p-8 backdrop-blur-xl bg-white/80 dark:bg-[#130E24]/60 border-purple-200/80 dark:border-purple-500/20 group hover:-translate-y-1 hover:border-purple-400/50 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] transition-all duration-300"
    >
      <div>
        {/* Header con Categoría y Concepto Matemático */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium uppercase tracking-wider bg-purple-500/10 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-500/20 dark:border-purple-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {project.category}
          </span>
          <span className="text-xs font-medium text-purple-900 dark:text-amber-200 bg-purple-50/80 dark:bg-[#1C1335] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-purple-200 dark:border-purple-500/30 max-w-full overflow-hidden text-ellipsis shadow-sm select-none">
            <Latex math={project.mathConcept} />
          </span>
        </div>

        {/* Título y Subtítulo */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-amber-300 transition-colors mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="text-sm sm:text-base font-medium text-slate-600 dark:text-slate-400 mb-5">
          {project.subtitle}
        </p>

        {/* Destacado de Impacto Educativo / Científico */}
        <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-purple-50/70 dark:bg-[#1C1335]/70 border border-purple-200/80 dark:border-purple-500/30 mb-5">
          <TrendingUp className="w-4 h-4 text-purple-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs sm:text-sm text-slate-800 dark:text-purple-100 font-medium leading-relaxed">
            <strong className="text-purple-700 dark:text-amber-400 font-semibold">Impacto Verificado:</strong> {project.impact}
          </p>
        </div>

        {/* Descripción refinada y gancho (2-3 líneas con excelente legibilidad) */}
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Métricas visuales convertidas en badges minimalistas translúcidos */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-purple-50/40 dark:bg-[#1A1230]/60 border border-purple-200/60 dark:border-purple-500/20 mb-6">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col text-center">
              <span className="text-base sm:text-xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-600 to-amber-500 dark:from-purple-400 dark:via-fuchsia-300 dark:to-amber-300">
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
        <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-purple-200/60 dark:border-purple-500/20">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-purple-50 dark:bg-[#1A1230] text-purple-800 dark:text-purple-300 border border-purple-200/80 dark:border-purple-500/30"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Botones de acción con micro-interacción y gradiente Fénix Púrpura-Ámbar */}
        <div className="flex items-center gap-3">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTick(1050)}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-amber-500 hover:from-purple-500 hover:via-fuchsia-500 hover:to-amber-400 text-white transition-all duration-200 shadow-md shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
          >
            <span>Ver Demo Interactiva</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTick(800)}
            className="flex items-center justify-center p-3 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-[#1A1230] dark:hover:bg-[#251842] text-purple-700 hover:text-purple-950 dark:text-purple-300 dark:hover:text-white border border-purple-200 dark:border-purple-500/30 hover:border-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
            aria-label={`Ver código de ${project.title} en GitHub`}
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </GlassCard>
  );
};
