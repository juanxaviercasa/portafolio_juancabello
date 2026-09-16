import React from 'react';
import { ArrowDown, Download, Compass, Binary, Award, Code2 } from 'lucide-react';
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
          {/* Badge superior FÉNIX 357 con borde de cristal púrpura pulsante */}
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-purple-500/10 dark:bg-[#130E24]/80 border border-purple-500/50 dark:border-purple-400/60 text-purple-700 dark:text-purple-300 text-[11px] sm:text-xs md:text-sm font-mono mb-6 backdrop-blur-xl purple-crystal-pulse select-none max-w-full">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="font-semibold tracking-wider">
              [ FÉNIX 357 // <span className="hidden sm:inline">LABORATORIO CREATIVO &amp; MATEMÁTICO</span><span className="sm:hidden">LAB CREATIVO</span> ]
            </span>
          </div>

          {/* Título Principal H1 con gradiente de texto metálico-neón */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]">
            La belleza de la{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-fuchsia-600 to-amber-600 dark:from-purple-400 dark:via-fuchsia-300 dark:to-amber-300">
              matemática
            </span>
            ,<br />
            al servicio del{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-fuchsia-600 to-purple-700 dark:from-amber-300 dark:via-fuchsia-300 dark:to-purple-400">
              aprendizaje
            </span>
            .
          </h1>

          {/* Manifiesto y Narrativa Fénix 357 */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
            Soy <strong className="text-slate-900 dark:text-white font-semibold">{siteConfig.name}</strong> (<span className="font-mono font-semibold text-purple-600 dark:text-amber-300">{siteConfig.brandName}</span>), {siteConfig.role.toLowerCase()}. 
            Diseño y desarrollo interfaces de aprendizaje de nueva generación integrando <strong className="text-purple-700 dark:text-purple-300">3 Pilares</strong> (Educación, Matemáticas y WebGL), navegando por <strong className="text-purple-700 dark:text-purple-300">5 Frecuencias</strong> y evaluando <strong className="text-purple-700 dark:text-purple-300">7 Dimensiones</strong> analíticas en GPU para humanizar conceptos abstractos.
          </p>

          {/* Botones de acción Two-Speed con gradiente Púrpura-Ámbar */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-12">
            <a
              href="#proyectos"
              onClick={() => playTick(1000)}
              className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-amber-500 hover:from-purple-500 hover:via-fuchsia-500 hover:to-amber-400 text-white font-semibold text-sm sm:text-base shadow-lg shadow-purple-600/25 dark:shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer whitespace-nowrap text-center"
            >
              <span>Explorar Proyectos</span>
              <ArrowDown className="w-4 h-4 flex-shrink-0" />
            </a>

            <a
              href="#laboratorio"
              onClick={() => playTick(1200)}
              className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-white/80 dark:bg-[#130E24]/80 hover:bg-purple-50 dark:hover:bg-[#1C1335] text-slate-800 dark:text-white font-semibold text-sm sm:text-base border border-purple-200 dark:border-purple-500/30 hover:border-purple-400 dark:hover:border-purple-400/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 backdrop-blur-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer whitespace-nowrap text-center"
            >
              <Compass className="w-4 h-4 text-purple-600 dark:text-amber-400 flex-shrink-0" />
              <span>Laboratorio 357</span>
            </a>

            <a
              href={siteConfig.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTick(1350)}
              className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-purple-50 dark:bg-[#130E24] hover:bg-purple-100 dark:hover:bg-purple-900/30 text-purple-900 dark:text-purple-200 font-semibold text-sm sm:text-base border border-purple-200 dark:border-purple-500/30 hover:border-purple-400 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer whitespace-nowrap text-center"
            >
              <Download className="w-4 h-4 text-purple-600 dark:text-amber-300 flex-shrink-0" />
              <span>Descargar CV</span>
            </a>
          </div>

          {/* Métricas de Impacto Directo (Concepto 357) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-white/85 dark:bg-[#130E24]/80 backdrop-blur-xl border border-purple-200/80 dark:border-purple-500/20 shadow-lg shadow-purple-900/5 dark:shadow-2xl">
            {siteConfig.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="font-mono text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-600 to-amber-500 dark:from-purple-400 dark:via-fuchsia-300 dark:to-amber-300">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5 sm:mt-1">
                  {stat.label}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1 leading-snug hidden sm:block">
                  {stat.subtext}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Columna Derecha: Tarjeta / Portal de Interacción 3D (45% desktop) */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center lg:items-end">
          <div className="w-full max-w-md p-6 rounded-3xl bg-white/70 dark:bg-[#130E24]/75 backdrop-blur-2xl border border-purple-200/80 dark:border-purple-500/30 shadow-xl shadow-purple-900/10 dark:shadow-[0_0_35px_-5px_rgba(168,85,247,0.2)] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span className="text-xs font-mono font-semibold text-purple-900 dark:text-purple-200 uppercase tracking-wider">
                  Escultura Fénix 357
                </span>
              </div>
              <span className="text-xs font-mono text-purple-700 dark:text-amber-300 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded-full border border-purple-200 dark:border-amber-400/30">
                60 FPS GLSL
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Mueve el cursor o interactúa con la pantalla para modular la resonancia armónica de la escultura y los campos de Fourier en GPU.
            </p>

            <div className="pt-2 border-t border-purple-100 dark:border-purple-500/20 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="p-1 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-300"><Binary className="w-3.5 h-3.5" /></span>
                <span className="p-1 rounded-md bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-300"><Code2 className="w-3.5 h-3.5" /></span>
                <span className="p-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400"><Award className="w-3.5 h-3.5" /></span>
              </div>
              <span className="flex items-center gap-1.5 font-medium text-purple-700 dark:text-purple-300">
                <Latex math="S^1 \times S^1" /> Variedad 357
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
