import React from 'react';
import { Sliders, RotateCcw, Eye, Sparkles, Volume2 } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import type { SurfaceMode } from '../../store/usePortfolioStore';
import { useAudioEngine } from '../../audio/useAudioEngine';
import { GlassCard } from './GlassCard';

const SURFACE_MODES: { id: SurfaceMode; label: string; formula: string }[] = [
  { id: 'clifford', label: 'Toro de Clifford', formula: 'S^1 \\times S^1 \\subset S^3' },
  { id: 'fourier', label: 'Onda Fourier', formula: '\\sum_{k=1}^n \\frac{1}{k}\\sin(kx)' },
  { id: 'spherical', label: 'Esfera Armónica', formula: 'Y_l^m(\\theta, \\phi)' },
  { id: 'klein', label: 'Botella de Klein', formula: '\\chi = 0 \\text{ (No orientable)}' },
];

const COLOR_THEMES: { id: 'cyan' | 'violet' | 'amber' | 'emerald'; label: string; color: string }[] = [
  { id: 'cyan', label: 'Cian Cuántico', color: '#38bdf8' },
  { id: 'violet', label: 'Violeta Espectral', color: '#a855f7' },
  { id: 'amber', label: 'Ámbar Resonante', color: '#f59e0b' },
  { id: 'emerald', label: 'Esmeralda Gaussiano', color: '#10b981' },
];

export const MathLabPanel: React.FC = () => {
  const labParams = usePortfolioStore((state) => state.labParams);
  const setLabParam = usePortfolioStore((state) => state.setLabParam);
  const resetLabParams = usePortfolioStore((state) => state.resetLabParams);
  const isAudioMuted = usePortfolioStore((state) => state.isAudioMuted);
  const { playTick, playLabModulation } = useAudioEngine();

  const handleHarmonicsChange = (value: number) => {
    setLabParam('harmonics', value);
    playLabModulation(value, 320);
  };

  const handleAmplitudeChange = (value: number) => {
    setLabParam('amplitude', value);
    playTick(600 + value * 800);
  };

  const handleSpeedChange = (value: number) => {
    setLabParam('speed', value);
    playTick(450 + value * 300);
  };

  const handleModeChange = (mode: SurfaceMode) => {
    setLabParam('surfaceMode', mode);
    playTick(1200);
  };

  const handleThemeChange = (theme: 'cyan' | 'violet' | 'amber' | 'emerald') => {
    setLabParam('colorTheme', theme);
    playTick(1000);
  };

  return (
    <GlassCard accentBorder className="relative overflow-hidden">
      {/* Header del Laboratorio */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span>Laboratorio de Variedades Matemáticas</span>
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                GPU Shader Live
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Modifica en tiempo real los coeficientes diferenciales y la topología de la escultura 3D.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            resetLabParams();
            playTick(700);
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-white/10 transition-colors focus:outline-none"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restablecer</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {/* Selector de Superficie */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center justify-between">
            <span>Variedad Topológica</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </label>
          <div className="grid grid-cols-2 gap-2">
            {SURFACE_MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => handleModeChange(mode.id)}
                className={`flex flex-col text-left p-2.5 rounded-xl border transition-all text-xs ${
                  labParams.surfaceMode === mode.id
                    ? 'bg-cyan-500/15 border-cyan-400/50 text-cyan-200 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/50 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span className="font-semibold text-[13px]">{mode.label}</span>
                <span className="font-mono text-[10px] text-slate-400 mt-1 truncate">
                  {mode.formula}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Deslizadores Numéricos */}
        <div className="space-y-4">
          {/* Armónicos de Fourier */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-300">Armónicos de Fourier ($k$)</span>
              <span className="text-cyan-400 font-bold">{labParams.harmonics} términos</span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              step="1"
              value={labParams.harmonics}
              onChange={(e) => handleHarmonicsChange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Amplitud de perturbación */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-300">Amplitud de Malla ($\alpha$)</span>
              <span className="text-cyan-400 font-bold">{labParams.amplitude.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.6"
              step="0.01"
              value={labParams.amplitude}
              onChange={(e) => handleAmplitudeChange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Frecuencia angular */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-300">Velocidad Angular ($\omega$)</span>
              <span className="text-cyan-400 font-bold">{labParams.speed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="2.0"
              step="0.1"
              value={labParams.speed}
              onChange={(e) => handleSpeedChange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>

        {/* Visualización y Paletas de Color */}
        <div className="space-y-4">
          {/* Wireframe toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-white/5">
            <div className="flex items-center gap-2.5">
              <Eye className="w-4 h-4 text-cyan-400" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-200">Malla Wireframe</span>
                <span className="text-[11px] text-slate-400">Ver topología poligonal</span>
              </div>
            </div>
            <button
              onClick={() => {
                setLabParam('wireframe', !labParams.wireframe);
                playTick(920);
              }}
              className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                labParams.wireframe ? 'bg-cyan-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  labParams.wireframe ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Paleta de Color */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-2">
              Espectro Cromático
            </span>
            <div className="grid grid-cols-4 gap-2">
              {COLOR_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  title={theme.label}
                  className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                    labParams.colorTheme === theme.id
                      ? 'border-cyan-400 bg-slate-800/80'
                      : 'border-transparent bg-slate-900/40 hover:bg-slate-800/40'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full shadow-inner"
                    style={{ backgroundColor: theme.color }}
                  />
                  <span className="text-[10px] text-slate-400 font-mono truncate max-w-full">
                    {theme.label.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Notificación de audio activo */}
          {!isAudioMuted && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-cyan-300 text-xs">
              <Volume2 className="w-4 h-4 flex-shrink-0 animate-pulse" />
              <span>Sonificación procedural activa: cada armónico modula un oscilador web nativo.</span>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
};
