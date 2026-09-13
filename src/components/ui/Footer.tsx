import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { useAudioEngine } from '../../audio/useAudioEngine';

export const Footer: React.FC = () => {
  const { playTick } = useAudioEngine();

  const scrollToTop = () => {
    playTick(1200);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#06080d] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Identidad y Euler */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-display font-bold text-slate-200">
              {siteConfig.name}
            </span>
            <span className="text-slate-500">&middot;</span>
            <span className="font-mono text-xs text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
              e^{'{i\\pi}'} + 1 = 0
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Diseñado y construido con Three.js, Shaders GLSL, Web Audio API y React.
          </p>
        </div>

        {/* Créditos y Botón Arriba */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/30" />
            <span>para la educación matemática abierta</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 transition-colors focus:outline-none"
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
