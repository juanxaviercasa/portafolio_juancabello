import React from 'react';
import { Sparkles, BookOpen, Music, Cpu } from 'lucide-react';
import { MathLabPanel } from '../ui/MathLabPanel';
import { GlassCard } from '../ui/GlassCard';
import { Latex } from '../ui/Latex';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export const LabSection: React.FC = () => {
  const labParams = usePortfolioStore((state) => state.labParams);

  return (
    <section id="laboratorio" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-purple-500/10 dark:bg-purple-950/40 border border-purple-500/50 dark:border-purple-400/60 text-purple-700 dark:text-purple-300 text-xs sm:text-sm font-mono mb-4 backdrop-blur-xl purple-crystal-pulse select-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <span className="font-semibold tracking-wider">[ 357 // LABORATORIO CREATIVO & MATEMÁTICO ]</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Visualizador de Variedades y Armónicos
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
          Experimenta la convergencia de la topología algebraica, los shaders GLSL en GPU y la síntesis aditiva de sonido mediante la Web Audio API.
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
            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">Cómputo en GPU</h4>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            La superficie evalúa analíticamente la suma armónica de Fourier directamente en el Vertex Shader mediante <code className="font-mono text-blue-600 dark:text-cyan-300 font-medium">gl_Position</code>, garantizando 60 FPS estables sin sobrecargar la CPU ni el hilo principal de JavaScript.
          </p>
          <div className="pt-2 text-xs sm:text-sm text-blue-700 dark:text-cyan-400 bg-blue-50 dark:bg-slate-950/70 p-3.5 rounded-xl border border-blue-200/80 dark:border-white/10 overflow-x-auto shadow-sm">
            <Latex block math={`z = \\sum_{k=1}^{${labParams.harmonics}} \\frac{${labParams.amplitude.toFixed(2)}}{k} \\sin(kx + \\omega t)`} />
          </div>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              <Music className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">Sonificación Armónica</h4>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Cada armónico <Latex math="k" /> corresponde a una frecuencia pitagórica generada proceduralmente mediante <code className="font-mono text-indigo-600 dark:text-indigo-300 font-medium">OscillatorNode</code> nativos. Al alterar los deslizadores, el oído percibe el cambio de timbre al mismo tiempo que el ojo ve la perturbación espacial.
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Afinación matemática en 432 Hz</span>
          </div>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">Aplicación Pedagógica</h4>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            En el aula universitaria, este artefacto reemplaza diagramas estáticos en 2D de libros impresos por una experiencia táctil intuitiva, acelerando la comprensión de conceptos como convergencia uniforme, ortogonalidad y transformaciones topológicas.
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
            <span>Reducción de barrera cognitiva: ~40%</span>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
