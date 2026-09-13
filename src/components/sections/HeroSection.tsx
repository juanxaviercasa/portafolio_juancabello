import React from 'react';
import { ArrowDown, Download, Compass, Sparkles, Binary, Award, Code2 } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { useAudioEngine } from '../../audio/useAudioEngine';
import { Latex } from '../ui/Latex';

export const HeroSection: React.FC = () => {
  const { playTick } = useAudioEngine();

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Columna Izquierda: Mensaje Central & Jerarquía Visual (55% desktop) */}
        <div className="lg:col-span-7 z-10">
          {/* Badge conceptual de bienvenida */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-slate-900/80 border border-blue-500/20 dark:border-cyan-500/30 text-blue-700 dark:text-cyan-300 text-xs sm:text-sm font-mono mb-6 backdrop-blur-md shadow-sm dark:shadow-lg dark:shadow-cyan-500/10">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400 animate-ping" />
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            <span>Matemáticas Rigurosas &middot; Pedagogía Visual &middot; WebGL</span>
          </div>

          {/* Título Principal H1 con tipografía fluida y alto contraste */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]">
            La belleza de la{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-cyan-400 dark:via-indigo-300 dark:to-purple-400">
              matemática
            </span>
            ,<br />
            al servicio del{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 dark:from-indigo-300 dark:via-cyan-300 dark:to-emerald-300">
              aprendizaje
            </span>
            .
          </h1>

          {/* Manifiesto y Descripción espaciosa */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
            Soy <strong className="text-slate-900 dark:text-white font-semibold">{siteConfig.name}</strong>, {siteConfig.role.toLowerCase()}. 
            Diseño y desarrollo interfaces de aprendizaje de nueva generación, combinando cálculo multivariable, shaders WebGL en tiempo real y arquitectura web sin barreras para humanizar conceptos abstractos.
          </p>

          {/* Botones de acción Two-Speed (Recruiter Track + Explorer Track) */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-12">
            <a
              href="#proyectos"
              onClick={() => playTick(1000)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-semibold text-sm sm:text-base shadow-lg shadow-blue-600/25 dark:shadow-cyan-500/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-300"
            >
              <span>Explorar Proyectos</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href="#laboratorio"
              onClick={() => playTick(1200)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-800 dark:text-white font-semibold text-sm sm:text-base border border-slate-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-cyan-400/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 backdrop-blur-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <Compass className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              <span>Laboratorio 3D</span>
            </a>

            <a
              href={siteConfig.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTick(1350)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-50 dark:bg-gradient-to-r dark:from-indigo-900/50 dark:to-purple-900/50 hover:bg-indigo-100 dark:hover:from-indigo-900/70 dark:hover:to-purple-900/70 text-indigo-900 dark:text-indigo-200 font-semibold text-sm sm:text-base border border-indigo-200 dark:border-indigo-500/30 hover:border-indigo-400 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-300" />
              <span>Descargar CV</span>
            </a>
          </div>

          {/* Métricas de Impacto Directo */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-5 sm:p-6 rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-lg shadow-slate-200/40 dark:shadow-2xl">
            {siteConfig.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-400 dark:to-indigo-300">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
                  {stat.label}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug hidden sm:block">
                  {stat.subtext}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Columna Derecha: Tarjeta / Portal de Interacción 3D (45% desktop) */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center lg:items-end">
          <div className="w-full max-w-md p-6 rounded-3xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl shadow-slate-200/30 dark:shadow-cyan-500/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Escultura Dinámica 3D
                </span>
              </div>
              <span className="text-xs font-mono text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-cyan-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-cyan-500/20">
                60 FPS GLSL
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Mueve el cursor o toca la pantalla para perturbar las ondas armónicas de Fourier en tiempo real mediante campos vectoriales en GPU.
            </p>

            <div className="pt-2 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="p-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-cyan-400"><Binary className="w-3.5 h-3.5" /></span>
                <span className="p-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"><Code2 className="w-3.5 h-3.5" /></span>
                <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"><Award className="w-3.5 h-3.5" /></span>
              </div>
              <span className="flex items-center gap-1.5 font-medium">
                <Latex math="S^1 \times S^1" /> Clifford Torus
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
