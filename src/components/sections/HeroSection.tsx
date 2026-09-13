import React from 'react';
import { ArrowDown, Download, Compass, Sparkles, Binary, Award, Code2 } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { useAudioEngine } from '../../audio/useAudioEngine';

export const HeroSection: React.FC = () => {
  const { playTick } = useAudioEngine();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="max-w-3xl">
        {/* Badge conceptual de bienvenida */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6 backdrop-blur-md shadow-lg shadow-cyan-500/10">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Matemáticas Rigurosas &middot; Pedagogía Visual &middot; WebGL</span>
        </div>

        {/* Título Principal */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
          La belleza de la{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
            matemática
          </span>
          ,<br />
          al servicio del{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-cyan-300 to-emerald-300">
            aprendizaje
          </span>
          .
        </h1>

        {/* Manifiesto y Descripción */}
        <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
          Soy <strong className="text-white font-semibold">{siteConfig.name}</strong>, {siteConfig.role.toLowerCase()}. 
          Diseño y desarrollo interfaces de aprendizaje de nueva generación, combinando cálculo multivariable, shaders WebGL en tiempo real y arquitectura web sin barreras para humanizar conceptos abstractos.
        </p>

        {/* Botones de acción Two-Speed (Recruiter Track + Explorer Track) */}
        <div className="flex flex-wrap items-center gap-4 mb-14">
          <a
            href="#proyectos"
            onClick={() => playTick(1000)}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          >
            <span>Explorar Proyectos</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href="#laboratorio"
            onClick={() => playTick(1200)}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold text-sm border border-white/10 hover:border-cyan-400/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Laboratorio 3D</span>
          </a>

          <a
            href={siteConfig.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTick(1350)}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-900/50 to-purple-900/50 hover:from-indigo-900/70 hover:to-purple-900/70 text-indigo-200 font-semibold text-sm border border-indigo-500/30 hover:border-indigo-400/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <Download className="w-4 h-4" />
            <span>Descargar CV</span>
          </a>
        </div>

        {/* Métricas de Impacto Directo */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl">
          {siteConfig.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-mono text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300">
                {stat.value}
              </span>
              <span className="text-xs font-semibold text-slate-200 mt-0.5">
                {stat.label}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 leading-snug hidden sm:block">
                {stat.subtext}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Indicador de interactividad 3D */}
      <div className="mt-12 flex items-center gap-3 text-xs font-mono text-slate-400">
        <div className="flex -space-x-1">
          <span className="p-1 rounded-full bg-cyan-500/20 text-cyan-400"><Binary className="w-3 h-3" /></span>
          <span className="p-1 rounded-full bg-indigo-500/20 text-indigo-400"><Code2 className="w-3 h-3" /></span>
          <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400"><Award className="w-3 h-3" /></span>
        </div>
        <span>Interactúa con el fondo: mueve el cursor para deformar la malla o haz scroll para explorar.</span>
      </div>
    </section>
  );
};
