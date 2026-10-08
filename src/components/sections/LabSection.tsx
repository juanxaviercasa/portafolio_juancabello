import React from 'react';
import { Sparkles, BookOpen, Music, Cpu, Lightbulb } from 'lucide-react';
import { MathLabPanel } from '../ui/MathLabPanel';
import { GlassCard } from '../ui/GlassCard';
import { Latex } from '../ui/Latex';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { DIDACTIC_CARDS } from '../../data/didacticContent';

export const LabSection: React.FC = () => {
  const labParams = usePortfolioStore((state) => state.labParams);
  const pedagogicalMode = usePortfolioStore((state) => state.pedagogicalMode);

  const isIntuitive = pedagogicalMode === 'intuitive';
  const cards = DIDACTIC_CARDS[pedagogicalMode];

  return (
    <section id="laboratorio" className="section-shell" data-od-id="lab">
      {/* Header Adaptativo */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-purple-500/10 dark:bg-purple-950/40 border border-purple-500/50 dark:border-purple-400/60 text-purple-700 dark:text-purple-300 text-xs sm:text-sm font-mono mb-4 backdrop-blur-xl purple-crystal-pulse select-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <span className="font-semibold tracking-wider">
            {isIntuitive ? '✨ EXPERIMENTACIÓN EN VIVO // FÉNIX 357' : '[ 357 // LABORATORIO CREATIVO & MATEMÁTICO ]'}
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isIntuitive ? '¿Cómo Cobran Vida las Figuras y la Música?' : 'Visualizador de Variedades y Armónicos'}
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
          {isIntuitive
            ? 'Una experiencia donde no necesitas saber fórmulas difíciles para entender la ciencia: mira, toca y escucha cómo se comporta la geometría.'
            : 'Experimenta la convergencia de la topología algebraica, los shaders GLSL en GPU y la síntesis aditiva de sonido mediante la Web Audio API.'}
        </p>
      </div>

      {/* Panel interactivo de control */}
      <div className="mb-12">
        <MathLabPanel />
      </div>

      {/* Tarjetas de Explicación Didáctica y Pedagógica */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <GlassCard className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-500/10 dark:bg-cyan-500/10 text-blue-600 dark:text-cyan-400 border border-blue-500/20 dark:border-cyan-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {cards[0].title}
            </h4>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {cards[0].desc}
          </p>
          {isIntuitive ? (
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/40 p-2.5 rounded-xl border border-cyan-200 dark:border-cyan-500/20">
              <Sparkles className="w-4 h-4 text-cyan-500 flex-shrink-0" />
              <span>{cards[0].badge}</span>
            </div>
          ) : (
            <div className="pt-2 text-xs sm:text-sm text-blue-700 dark:text-cyan-400 bg-blue-50 dark:bg-slate-950/70 p-3.5 rounded-xl border border-blue-200/80 dark:border-white/10 overflow-x-auto shadow-sm">
              <Latex block math={`z = \\sum_{k=1}^{${labParams.harmonics}} \\frac{${labParams.amplitude.toFixed(2)}}{k} \\sin(kx + \\omega t)`} />
            </div>
          )}
        </GlassCard>

        <GlassCard className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              <Music className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {cards[1].title}
            </h4>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {cards[1].desc}
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>{cards[1].badge}</span>
          </div>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {isIntuitive ? <Lightbulb className="w-5 h-5 text-emerald-500" /> : <BookOpen className="w-5 h-5" />}
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {cards[2].title}
            </h4>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {cards[2].desc}
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
            <span>{cards[2].badge}</span>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
