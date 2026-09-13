import React, { useState } from 'react';
import { Sliders, RotateCcw, Eye, Sparkles, Volume2, ChevronDown, ChevronUp } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import type { SurfaceMode } from '../../store/usePortfolioStore';
import { useAudioEngine } from '../../audio/useAudioEngine';
import { GlassCard } from './GlassCard';
import { Latex } from './Latex';

const SURFACE_MODES: { id: SurfaceMode; label: string; formula: string }[] = [
  { id: 'clifford', label: 'Toro de Clifford', formula: 'S^1 \\times S^1 \\subset S^3' },
  { id: 'fourier', label: 'Onda Fourier', formula: '\\sum_{k=1}^n \\frac{1}{k}\\sin(kx)' },
  { id: 'spherical', label: 'Esfera Armónica', formula: 'Y_l^m(\\theta, \\phi)' },
  { id: 'klein', label: 'Botella de Klein', formula: '\\chi = 0 \\text{ (No orientable)}' },
];

const COLOR_THEMES: { id: 'cyan' | 'violet' | 'amber' | 'emerald'; label: string; color: string }[] = [
  { id: 'cyan', label: 'Cian Cuántico', color: '#06b6d4' },
  { id: 'violet', label: 'Violeta Espectral', color: '#a855f7' },
  { id: 'amber', label: 'Ámbar Resonante', color: '#f59e0b' },
  { id: 'emerald', label: 'Esmeralda Gaussiano', color: '#10b981' },
];

export const MathLabPanel: React.FC = () => {
  const [isMobileCollapsed, setIsMobileCollapsed] = useState(true);

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
    <GlassCard accentBorder className="relative overflow-hidden p-6 sm:p-8">
      {/* Header del Laboratorio */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-blue-500/10 dark:bg-cyan-500/10 border border-blue-500/20 dark:border-cyan-500/20 text-blue-600 dark:text-cyan-400">
            <Sliders className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex flex-wrap items-center gap-2">
              <span>Laboratorio de Variedades Matemáticas</span>
              <span className="text-xs font-mono text-blue-700 dark:text-cyan-400 bg-blue-50 dark:bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-cyan-500/30">
                GPU Shader Live
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              Modifica en tiempo real los coeficientes diferenciales y la topología de la escultura 3D.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Botón para colapsar en móviles */}
          <button
            onClick={() => {
              setIsMobileCollapsed(!isMobileCollapsed);
              playTick(850);
            }}
            className="md:hidden flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-semibold bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-md focus:outline-none"
          >
            <Sliders className="w-4 h-4" />
            <span>{isMobileCollapsed ? 'Ajustar Parámetros' : 'Ocultar Panel'}</span>
            {isMobileCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              resetLabParams();
              playTick(700);
            }}
            className="flex items-center gap-2 px-3.5 py-2.5 min-h-[44px] rounded-xl text-xs font-mono font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 border border-slate-200 dark:border-white/10 transition-colors focus:outline-none"
            title="Restablecer parámetros originales"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Restablecer</span>
          </button>
        </div>
      </div>

      {/* Contenido de Controles (Abierto en desktop, colapsable en móvil para no tapar el canvas 3D) */}
      <div className={`${isMobileCollapsed ? 'hidden md:grid' : 'grid'} grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 transition-all duration-300`}>
        {/* Selector de Superficie */}
        <div className="space-y-3">
          <label className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center justify-between font-semibold">
            <span>Variedad Topológica</span>
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SURFACE_MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => handleModeChange(mode.id)}
                className={`flex flex-col text-left p-3 min-h-[52px] rounded-xl border transition-all text-xs focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  labParams.surfaceMode === mode.id
                    ? 'bg-blue-50 dark:bg-cyan-500/15 border-blue-500/60 dark:border-cyan-400/50 text-blue-900 dark:text-cyan-200 shadow-sm'
                    : 'bg-slate-100/70 dark:bg-slate-900/50 border-slate-200/80 dark:border-white/5 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/70 dark:hover:bg-slate-800/50'
                }`}
              >
                <span className="font-bold text-xs sm:text-sm">{mode.label}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                  <Latex math={mode.formula} />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Deslizadores Numéricos con touch target amplio (min 44px) */}
        <div className="space-y-4">
          {/* Armónicos de Fourier */}
          <div className="min-h-[44px] flex flex-col justify-center">
            <div className="flex justify-between text-xs sm:text-sm font-mono mb-2">
              <span className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1">
                Armónicos de Fourier (<Latex math="k" />)
              </span>
              <span className="text-blue-600 dark:text-cyan-400 font-bold">{labParams.harmonics} términos</span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              step="1"
              value={labParams.harmonics}
              onChange={(e) => handleHarmonicsChange(Number(e.target.value))}
              aria-label="Armónicos de Fourier"
              className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-cyan-400"
            />
          </div>

          {/* Amplitud de perturbación */}
          <div className="min-h-[44px] flex flex-col justify-center">
            <div className="flex justify-between text-xs sm:text-sm font-mono mb-2">
              <span className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1">
                Amplitud de Malla (<Latex math="\alpha" />)
              </span>
              <span className="text-blue-600 dark:text-cyan-400 font-bold">{labParams.amplitude.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.6"
              step="0.01"
              value={labParams.amplitude}
              onChange={(e) => handleAmplitudeChange(Number(e.target.value))}
              aria-label="Amplitud de Malla"
              className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-cyan-400"
            />
          </div>

          {/* Frecuencia angular */}
          <div className="min-h-[44px] flex flex-col justify-center">
            <div className="flex justify-between text-xs sm:text-sm font-mono mb-2">
              <span className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1">
                Velocidad Angular (<Latex math="\omega" />)
              </span>
              <span className="text-blue-600 dark:text-cyan-400 font-bold">{labParams.speed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="2.0"
              step="0.1"
              value={labParams.speed}
              onChange={(e) => handleSpeedChange(Number(e.target.value))}
              aria-label="Velocidad Angular"
              className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-cyan-400"
            />
          </div>
        </div>

        {/* Visualización y Paletas de Color */}
        <div className="space-y-4">
          {/* Wireframe switch con touch target mínimo 44px */}
          <div className="flex items-center justify-between p-3.5 min-h-[48px] rounded-2xl bg-slate-100/80 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">Malla Wireframe</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Ver topología poligonal</span>
              </div>
            </div>
            <button
              onClick={() => {
                setLabParam('wireframe', !labParams.wireframe);
                playTick(920);
              }}
              aria-label="Alternar malla wireframe"
              className={`w-12 h-7 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                labParams.wireframe ? 'bg-blue-600 dark:bg-cyan-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  labParams.wireframe ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Paleta de Color con botones de 44px */}
          <div>
            <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-semibold block mb-2">
              Espectro Cromático
            </span>
            <div className="grid grid-cols-4 gap-2">
              {COLOR_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  title={theme.label}
                  className={`flex flex-col items-center justify-center gap-1.5 p-2 min-h-[44px] rounded-xl border transition-all ${
                    labParams.colorTheme === theme.id
                      ? 'border-blue-500 dark:border-cyan-400 bg-white dark:bg-slate-800/90 shadow-sm'
                      : 'border-transparent bg-slate-100/80 dark:bg-slate-900/40 hover:bg-slate-200/80 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full shadow-inner ring-1 ring-black/10"
                    style={{ backgroundColor: theme.color }}
                  />
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-mono truncate max-w-full">
                    {theme.label.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Notificación de audio activo */}
          {!isAudioMuted && (
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-blue-50 dark:bg-cyan-950/40 border border-blue-200 dark:border-cyan-500/20 text-blue-900 dark:text-cyan-300 text-xs leading-relaxed">
              <Volume2 className="w-4 h-4 flex-shrink-0 animate-pulse text-blue-600 dark:text-cyan-400" />
              <span>Sonificación procedural activa: cada armónico modula un oscilador web nativo.</span>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
};
