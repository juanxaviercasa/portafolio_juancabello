import React from 'react';
import { Compass, Sparkles, BookOpen, Music, Cpu } from 'lucide-react';
import { MathLabPanel } from '../ui/MathLabPanel';
import { GlassCard } from '../ui/GlassCard';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export const LabSection: React.FC = () => {
  const labParams = usePortfolioStore((state) => state.labParams);

  return (
    <section id="laboratorio" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-3">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>Laboratorio Matemático Interactivo</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Visualizador de Variedades y Armónicos
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-3">
          Experimenta la convergencia de la topología algebraica, los shaders GLSL en GPU y la síntesis aditiva de sonido mediante la Web Audio API.
        </p>
      </div>

      {/* Panel interactivo de control */}
      <div className="mb-12">
        <MathLabPanel />
      </div>

      {/* Tarjetas de Explicación Didáctica y Pedagógica */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-slate-100">Cómputo en GPU</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            La superficie evalúa analíticamente la suma armónica de Fourier directamente en el Vertex Shader mediante <code className="font-mono text-cyan-300">gl_Position</code>, garantizando 60 FPS estables sin sobrecargar la CPU ni el hilo principal de JavaScript.
          </p>
          <div className="pt-2 font-mono text-[11px] text-cyan-400/90 bg-slate-950/60 p-2.5 rounded-lg border border-white/5">
            {`z = \\sum_{k=1}^{${labParams.harmonics}} \\frac{${labParams.amplitude.toFixed(2)}}{k} \\cdot \\sin(kx + \\omega t)`}
          </div>
        </GlassCard>

        <GlassCard className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Music className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-slate-100">Sonificación Armónica</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Cada armónico $k$ corresponde a una frecuencia pitagórica generada proceduralmente mediante <code className="font-mono text-indigo-300">OscillatorNode</code> nativos. Al alterar los deslizadores, el oído percibe el cambio de timbre al mismo tiempo que el ojo ve la perturbación espacial.
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Afinación matemática en 432 Hz</span>
          </div>
        </GlassCard>

        <GlassCard className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <BookOpen className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-slate-100">Aplicación Pedagógica</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            En el aula universitaria, este artefacto reemplaza diagramas estáticos en 2D de libros impresos por una experiencia táctil intuitiva, acelerando la comprensión de conceptos como convergencia uniforme, ortogonalidad y transformaciones topológicas.
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span>Reducción de barrera cognitiva: ~40%</span>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
