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
    <footer className="relative border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#06080d] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Identidad y Euler */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-display font-bold text-slate-900 dark:text-slate-200 text-base sm:text-lg">
              {siteConfig.name}
            </span>
            <span className="text-slate-400 dark:text-slate-500">&middot;</span>
            <span className="text-xs text-blue-700 dark:text-cyan-400 bg-blue-50 dark:bg-cyan-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-cyan-500/20 shadow-sm">
              <Latex math="e^{i\pi} + 1 = 0" />
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Diseñado y construido con Three.js, Shaders GLSL, Web Audio API y React.
          </p>
        </div>

        {/* Créditos y Botón Arriba */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-blue-600 dark:text-cyan-400 fill-blue-600/20 dark:fill-cyan-400/30" />
            <span>para la educación matemática abierta</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-white/10 transition-colors focus:outline-none"
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
