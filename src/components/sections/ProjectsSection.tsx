import React, { useState } from 'react';
import { Layers, Filter } from 'lucide-react';
import { projectsData } from '../../data/projectsData';
import { ProjectCard } from '../ui/ProjectCard';
import { useAudioEngine } from '../../audio/useAudioEngine';

const CATEGORIES = ['Todos', 'Educación 3D', 'Matemáticas Puras', 'Herramienta Pedagógica'] as const;

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const { playTick } = useAudioEngine();

  const filteredProjects = selectedCategory === 'Todos'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    playTick(960);
  };

  return (
    <section id="proyectos" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Sección Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-cyan-500/10 border border-blue-500/20 dark:border-cyan-500/20 text-blue-700 dark:text-cyan-300 text-xs sm:text-sm font-mono mb-3">
            <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span>Portafolio de Producción</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Proyectos Científicos y Educativos
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
            Soluciones aplicadas donde el rigor matemático se traduce en interfaces interactivas fluidas, diseñadas para elevar la comprensión conceptual de miles de estudiantes.
          </p>
        </div>

        {/* Filtros de Categoría */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-md overflow-x-auto self-start md:self-auto shadow-sm">
          <Filter className="w-4 h-4 text-slate-500 dark:text-slate-400 ml-2 mr-1 flex-shrink-0" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-md shadow-blue-500/20 dark:shadow-cyan-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/80 dark:hover:bg-slate-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
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
