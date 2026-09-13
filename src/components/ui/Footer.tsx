import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { useAudioEngine } from '../../audio/useAudioEngine';
import { Latex } from './Latex';

export const Footer: React.FC = () => {
  const { playTick } = useAudioEngine();

  const scrollToTop = () => {
    playTick(1200);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-purple-200/80 dark:border-purple-500/20 bg-white dark:bg-[#0B0813] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Identidad FÉNIX 357 y Euler */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-2">
            <span className="font-mono font-bold text-slate-900 dark:text-white text-base sm:text-lg tracking-wider">
              {siteConfig.name.toUpperCase()}
            </span>
            <span className="text-purple-500 font-mono font-bold">//</span>
            <span className="font-mono font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-500 to-amber-500 dark:from-purple-400 dark:via-fuchsia-300 dark:to-amber-400 text-base sm:text-lg">
              {siteConfig.brandName}
            </span>
            <span className="text-purple-400 dark:text-purple-500">&middot;</span>
            <span className="text-xs text-purple-700 dark:text-amber-300 bg-purple-50 dark:bg-purple-950/60 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-500/30 shadow-sm font-mono">
              <Latex math="e^{i\pi} + 1 = 0" />
            </span>
          </div>
          <p className="text-xs sm:text-sm text-purple-900/70 dark:text-purple-300/70 font-mono tracking-wide">
            3 Pilares (Educación &middot; Math &middot; WebGL) &middot; 5 Frecuencias &middot; 7 Dimensiones
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Diseñado y construido con Three.js, Shaders GLSL, Web Audio API y React.
          </p>
        </div>

        {/* Créditos y Botón Arriba */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-fuchsia-500 dark:text-amber-400 fill-fuchsia-500/30 dark:fill-amber-400/30" />
            <span>para la educación matemática abierta</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-[#130E24] dark:hover:bg-[#1C1335] text-purple-700 dark:text-purple-300 hover:text-purple-950 dark:hover:text-white border border-purple-200 dark:border-purple-500/30 hover:border-purple-400 dark:hover:border-purple-400/60 transition-all focus:outline-none cursor-pointer shadow-sm hover:shadow-purple-500/20"
            aria-label="Volver arriba"
            title="Volver arriba"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
