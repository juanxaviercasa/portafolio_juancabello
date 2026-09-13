import React, { useState } from 'react';
import { Layers, Sparkles, Box, Binary, BookOpen } from 'lucide-react';
import { projectsData } from '../../data/projectsData';
import { ProjectCard } from '../ui/ProjectCard';
import { useAudioEngine } from '../../audio/useAudioEngine';

interface CategoryConfig {
  id: string;
  label: string;
  fullLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES_CONFIG: CategoryConfig[] = [
  { id: 'Todos', label: 'Todos', fullLabel: 'Todos los Proyectos', icon: Sparkles },
  { id: 'Educación 3D', label: 'Educación 3D', fullLabel: 'Educación 3D', icon: Box },
  { id: 'Matemáticas Puras', label: 'Matemáticas', fullLabel: 'Matemáticas Puras', icon: Binary },
  { id: 'Herramienta Pedagógica', label: 'Pedagogía', fullLabel: 'Herramientas Pedagógicas', icon: BookOpen },
];

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const { playTick } = useAudioEngine();

  const filteredProjects =
    selectedCategory === 'Todos'
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    playTick(960);
  };

  return (
    <section id="proyectos" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Sección Header */}
      <div className="mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 dark:bg-[#130E24] border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs sm:text-sm font-mono mb-3 shadow-sm">
          <Layers className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
          <span>Portafolio de Producción</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Proyectos Científicos y Educativos
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-3 leading-relaxed max-w-3xl">
          Soluciones aplicadas donde el rigor matemático se traduce en interfaces interactivas fluidas, diseñadas para elevar la comprensión conceptual de miles de estudiantes.
        </p>
      </div>

      {/* Menú de Filtros por Categoría: 100% Responsivo, Sin Scroll Horizontal */}
      <div className="mb-10 sm:mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 p-2 sm:p-2.5 rounded-2xl bg-white/75 dark:bg-[#130E24]/75 backdrop-blur-xl border border-purple-200/80 dark:border-purple-500/20 shadow-md shadow-purple-900/5">
          {/* Deck de botones: Grid 2x2 en móvil, flex-wrap en tablet y desktop */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto">
            {CATEGORIES_CONFIG.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              const count =
                cat.id === 'Todos'
                  ? projectsData.length
                  : projectsData.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`
                    group relative flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold
                    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 cursor-pointer
                    ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-amber-500 text-white shadow-md shadow-purple-500/25 scale-[1.01]'
                        : 'bg-purple-50/60 dark:bg-[#1A1230]/60 text-slate-700 dark:text-slate-300 hover:text-purple-700 dark:hover:text-amber-300 hover:bg-white dark:hover:bg-purple-900/30 border border-purple-200/60 dark:border-purple-500/20'
                    }
                  `}
                >
                  <Icon
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${
                      isSelected ? 'text-white' : 'text-purple-600 dark:text-amber-400'
                    }`}
                  />
                  <span className="inline lg:hidden">{cat.label}</span>
                  <span className="hidden lg:inline">{cat.fullLabel}</span>
                  <span
                    className={`
                      ml-0.5 sm:ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold leading-none
                      ${
                        isSelected
                          ? 'bg-white/25 text-white'
                          : 'bg-purple-200/80 dark:bg-purple-950 text-purple-800 dark:text-purple-300'
                      }
                    `}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Estado de proyectos activos */}
          <div className="hidden sm:flex items-center justify-end gap-1.5 px-3 py-1 text-xs font-mono text-purple-900/70 dark:text-purple-300/70">
            <span>Mostrando</span>
            <span className="font-bold text-purple-700 dark:text-amber-300">{filteredProjects.length}</span>
            <span>de {projectsData.length} proyectos</span>
          </div>
        </div>
      </div>

      {/* Grid de Proyectos: 1 col en móvil, 2 cols en desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};
