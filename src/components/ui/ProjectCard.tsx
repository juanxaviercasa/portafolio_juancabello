import React from 'react';
import { ExternalLink, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';
import type { Project } from '../../data/projectsData';
import { GlassCard } from './GlassCard';
import { GithubIcon } from './BrandIcons';
import { useAudioEngine } from '../../audio/useAudioEngine';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { playTick } = useAudioEngine();

  return (
    <GlassCard
      accentBorder={index === 0}
      className="flex flex-col justify-between h-full group hover:border-cyan-500/40 transition-all duration-300"
    >
      <div>
        {/* Header con Categoría y Concepto Matemático */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            {project.category}
          </span>
          <span className="text-[11px] font-mono text-slate-400 bg-slate-900/60 px-2.5 py-1 rounded-md border border-white/5">
            {project.mathConcept}
          </span>
        </div>

        {/* Título y Subtítulo */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-cyan-200 transition-colors mb-2">
          {project.title}
        </h3>
        <p className="text-sm font-medium text-slate-400 mb-4">
          {project.subtitle}
        </p>

        {/* Destacado de Impacto Educativo / Científico */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gradient-to-r from-cyan-950/40 to-indigo-950/30 border border-cyan-500/20 mb-5">
          <TrendingUp className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-cyan-100 font-medium leading-relaxed">
            <strong className="text-cyan-300">Impacto Verificado:</strong> {project.impact}
          </p>
        </div>

        {/* Descripción */}
        <p className="text-sm text-slate-300 leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Métricas clave */}
        <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-900/50 border border-white/5 mb-5">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col text-center">
              <span className="text-base sm:text-lg font-bold font-mono text-cyan-300">
                {m.value}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* Lista de características */}
        <ul className="space-y-1.5 mb-6">
          {project.features.map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        {/* Tecnologías */}
        <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-white/5">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-800/70 text-slate-300 border border-white/5"
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
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-md shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          >
            <span>Ver Demo Interactiva</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTick(800)}
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
            aria-label={`Ver código de ${project.title} en GitHub`}
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </GlassCard>
  );
};
