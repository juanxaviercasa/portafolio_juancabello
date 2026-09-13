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
    <section id="proyectos" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Sección Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Portafolio de Producción</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Proyectos Científicos y Educativos
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
            Soluciones aplicadas donde el rigor matemático se traduce en interfaces interactivas fluidas, diseñadas para elevar la comprensión conceptual de miles de estudiantes.
          </p>
        </div>

        {/* Filtros de Categoría */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/70 border border-white/10 backdrop-blur-md overflow-x-auto self-start md:self-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1 flex-shrink-0" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all focus:outline-none ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Proyectos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};
