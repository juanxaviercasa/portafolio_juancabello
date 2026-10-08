import React, { useState, useEffect, useRef } from 'react';
import {
  Sliders,
  RotateCcw,
  Eye,
  Sparkles,
  Volume2,
  ChevronDown,
  ChevronUp,
  Music,
  CheckCircle2,
  Trophy,
  Wand2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import type { SurfaceMode, ConcertFrequency, MathLabParams } from '../../store/usePortfolioStore';
import { useAudioEngine } from '../../audio/useAudioEngine';
import { SACRED_FREQUENCIES } from '../../audio/AudioSynthesizer';
import {
  LAB_PRESETS,
  LAB_CHALLENGES,
  DIDACTIC_SURFACES,
} from '../../data/didacticContent';
import type { LabPreset } from '../../data/didacticContent';
import { GlassCard } from './GlassCard';
import { Latex } from './Latex';
import { AudioOscilloscope } from './AudioOscilloscope';
import { DidacticToggle } from './DidacticToggle';

const FREQUENCIES_LIST: {
  freq: ConcertFrequency;
  name: string;
  note: string;
  tag: string;
  description: string;
}[] = [
  { freq: 432, name: '432 Hz', note: 'La (A4)', tag: 'Pitagórica', description: 'Armonía Áurea & Verdi' },
  { freq: 528, name: '528 Hz', note: 'Do (C5)', tag: 'Milagro', description: 'Geometría del ADN' },
  { freq: 396, name: '396 Hz', note: 'Sol (G4)', tag: 'Telúrica', description: 'Liberación & Calma' },
  { freq: 639, name: '639 Hz', note: 'Mi (E5)', tag: 'Cuántica', description: 'Resonancia & Conexión' },
];

const COLOR_THEMES: {
  id: 'cyan' | 'violet' | 'amber' | 'emerald';
  label: string;
  name: string;
  color: string;
  ringClass: string;
  activeBg: string;
}[] = [
  {
    id: 'cyan',
    label: 'Cian Cuántico',
    name: 'Cian',
    color: '#38bdf8',
    ringClass: 'border-cyan-500 dark:border-cyan-400 shadow-[0_0_14px_-2px_rgba(56,189,248,0.45)] ring-1 ring-cyan-400/50',
    activeBg: 'bg-cyan-50/80 dark:bg-cyan-950/30',
  },
  {
    id: 'violet',
    label: 'Violeta Espectral',
    name: 'Violeta',
    color: '#a855f7',
    ringClass: 'border-purple-500 dark:border-purple-400 shadow-[0_0_14px_-2px_rgba(168,85,247,0.45)] ring-1 ring-purple-400/50',
    activeBg: 'bg-purple-50/80 dark:bg-purple-950/30',
  },
  {
    id: 'amber',
    label: 'Ámbar Resonante',
    name: 'Ámbar',
    color: '#f59e0b',
    ringClass: 'border-amber-500 dark:border-amber-400 shadow-[0_0_14px_-2px_rgba(245,158,11,0.45)] ring-1 ring-amber-400/50',
    activeBg: 'bg-amber-50/80 dark:bg-amber-950/30',
  },
  {
    id: 'emerald',
    label: 'Esmeralda Gaussiano',
    name: 'Esmeralda',
    color: '#10b981',
    ringClass: 'border-emerald-500 dark:border-emerald-400 shadow-[0_0_14px_-2px_rgba(16,185,129,0.45)] ring-1 ring-emerald-400/50',
    activeBg: 'bg-emerald-50/80 dark:bg-emerald-950/30',
  },
];

export const MathLabPanel: React.FC = () => {
  const [isMobileCollapsed, setIsMobileCollapsed] = useState(true);
  const [showChallenges, setShowChallenges] = useState(true);

  const labParams = usePortfolioStore((state) => state.labParams);
  const setLabParam = usePortfolioStore((state) => state.setLabParam);
  const resetLabParams = usePortfolioStore((state) => state.resetLabParams);
  const isAudioMuted = usePortfolioStore((state) => state.isAudioMuted);
  const pedagogicalMode = usePortfolioStore((state) => state.pedagogicalMode);

  const isIntuitive = pedagogicalMode === 'intuitive';

  const {
    playTick,
    playLabModulation,
    changeFrequency,
    toggleConcertMode,
    activateAudio,
    toggleAudio,
    triggerFibonacciCascade,
    audioSettings,
  } = useAudioEngine();

  // Registro de retos completados previamente para no repetir confetti infinitamente
  const prevCompletedRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    LAB_CHALLENGES.forEach((challenge) => {
      const isNowCompleted = challenge.isCompleted(labParams);
      const wasCompleted = prevCompletedRef.current[challenge.id];

      if (isNowCompleted && !wasCompleted) {
        // Nuevo reto completado: disparar mini-confetti
        try {
          confetti({
            particleCount: 45,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#a855f7', '#f59e0b', '#38bdf8', '#10b981', '#ec4899'],
          });
          playTick(1320);
        } catch {
          // Fallback silencioso
        }
      }
      prevCompletedRef.current[challenge.id] = isNowCompleted;
    });
  }, [labParams, playTick]);

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
    playTick(950);
  };

  const handleThemeChange = (theme: 'cyan' | 'violet' | 'amber' | 'emerald') => {
    setLabParam('colorTheme', theme);
    playTick(1100);
  };

  const applyPreset = (preset: LabPreset) => {
    // Aplicar los parámetros del preset
    (Object.keys(preset.params) as (keyof MathLabParams)[]).forEach((key) => {
      const val = preset.params[key];
      if (val !== undefined) {
        setLabParam(key, val as any);
      }
    });

    // Cambiar la frecuencia de audio armonizada
    changeFrequency(preset.frequency);
    playTick(1200);

    // Mini confetti al activar un preset didáctico
    try {
      confetti({
        particleCount: 30,
        spread: 45,
        origin: { y: 0.75 },
      });
    } catch {
      // Ignorar fallback
    }
  };

  return (
    <GlassCard accentBorder="purple" className="relative overflow-hidden p-3 sm:p-6 lg:p-8 backdrop-blur-2xl bg-white/80 dark:bg-[#130E24]/80 border-purple-200/80 dark:border-purple-500/25">
      {/* Header del Laboratorio */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-purple-200/70 dark:border-purple-500/20">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-amber-500/20 border border-purple-500/30 text-amber-500 shadow-sm">
            <Sliders className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                {isIntuitive ? 'Laboratorio de Figuras y Música 3D' : 'Laboratorio de Variedades Matemáticas'}
              </h3>
              <span className="text-xs font-mono text-purple-700 dark:text-amber-300 bg-purple-50 dark:bg-[#1C1335] px-2.5 py-0.5 rounded-full border border-purple-300 dark:border-amber-400/40 font-semibold">
                {isIntuitive ? '¡Experimenta en Vivo!' : 'GPU Shader Live // 357'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
              {isIntuitive
                ? 'Toca cualquier botón o mueve las barras: observa cómo la figura cambia de forma y escucha cómo canta.'
                : 'Modifica en tiempo real los coeficientes diferenciales y la topología alada del Fénix 3D.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Selector de lente didáctica */}
          <DidacticToggle variant="pill" />

          {/* Botón para colapsar en móviles */}
          <button
            onClick={() => {
              setIsMobileCollapsed(!isMobileCollapsed);
              playTick(850);
            }}
            className="md:hidden flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-md focus:outline-none cursor-pointer"
            aria-label={isMobileCollapsed ? 'Expandir controles del laboratorio' : 'Colapsar controles'}
          >
            <span>{isMobileCollapsed ? 'Ajustar Parámetros' : 'Ocultar Panel'}</span>
            {isMobileCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>

          {/* Indicador y Switch de Concierto Armónico */}
          <button
            onClick={() => toggleAudio()}
            title={!isAudioMuted ? 'Hacer clic para pausar el sonido' : 'Hacer clic para activar el sonido'}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
              !isAudioMuted
                ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300 shadow-sm'
                : 'bg-purple-50 dark:bg-[#1A1230] border-purple-200 dark:border-purple-500/20 text-slate-400 hover:text-purple-600 dark:hover:text-purple-300'
            }`}
          >
            <Volume2 className={`w-3.5 h-3.5 ${!isAudioMuted ? 'animate-pulse text-amber-500' : ''}`} />
            <span>
              {!isAudioMuted
                ? `Música ${audioSettings.fundamentalFreq}Hz ${audioSettings.isConcertMode ? 'Armónica' : 'Drone'}`
                : 'Música en Pausa'}
            </span>
          </button>

          {/* Botón Reset */}
          <button
            onClick={() => {
              resetLabParams();
              playTick(700);
            }}
            title="Restablecer valores predeterminados"
            aria-label="Restablecer valores predeterminados"
            className="flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl text-xs font-medium text-purple-700 dark:text-purple-300 hover:text-amber-500 dark:hover:text-amber-300 bg-purple-50 dark:bg-[#1A1230] hover:bg-purple-100 dark:hover:bg-[#251842] border border-purple-200 dark:border-purple-500/30 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Restablecer</span>
          </button>
        </div>
      </div>

      {/* BANDA DE PRESETS RÁPIDOS (1 Clic para deleitar a estudiantes y niños) */}
      <div className="py-4 border-b border-purple-200/50 dark:border-purple-500/15">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-900 dark:text-amber-300 flex items-center gap-1.5">
            <Wand2 className="w-3.5 h-3.5 text-amber-500" />
            <span>{isIntuitive ? 'Efectos Divertidos con 1 Clic (Presets)' : 'Configuraciones Paramétricas Rápidas'}</span>
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
            Toca cualquiera para ver la transformación inmediata
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {LAB_PRESETS.map((preset) => {
            const isCurrentMode = labParams.surfaceMode === preset.params.surfaceMode;
            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset)}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer group hover:scale-[1.02] active:scale-[0.98] ${
                  isCurrentMode
                    ? 'bg-purple-100/80 dark:bg-purple-950/70 border-purple-400 dark:border-amber-400/50 shadow-md shadow-purple-500/15'
                    : 'bg-white/60 dark:bg-[#1A1230]/60 border-purple-200/70 dark:border-purple-500/20 hover:border-purple-300 dark:hover:border-purple-400/40'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <span>{preset.emoji}</span>
                    <span>{preset.name}</span>
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-200/50 dark:bg-purple-900/40 text-purple-700 dark:text-amber-300 font-semibold">
                    {preset.badge}
                  </span>
                </div>
                <span className="text-xs text-slate-600 dark:text-slate-400 leading-snug line-clamp-2">
                  {preset.shortDesc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MINI-MISIONES / RETOS DE EXPLORACIÓN DIDÁCTICA (Gamificación para Estudiantes) */}
      {isIntuitive && (
        <div className="py-4 border-b border-purple-200/50 dark:border-purple-500/15">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-amber-500/10 border border-amber-500/30 dark:border-amber-400/20">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500 animate-bounce" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  Misiones del Explorador // ¡Prueba y Gana!
                </span>
              </div>
              <button
                onClick={() => setShowChallenges(!showChallenges)}
                className="text-[11px] font-mono text-purple-700 dark:text-amber-300 hover:underline cursor-pointer"
              >
                {showChallenges ? 'Ocultar Retos' : 'Ver Retos'}
              </button>
            </div>

            {showChallenges && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-2">
                {LAB_CHALLENGES.map((ch) => {
                  const done = ch.isCompleted(labParams);
                  return (
                    <div
                      key={ch.id}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        done
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-900 dark:text-emerald-200 shadow-sm'
                          : 'bg-white/70 dark:bg-[#130E24]/70 border-purple-200/60 dark:border-purple-500/20 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold flex items-center gap-1.5">
                          <span>{ch.emoji}</span>
                          <span>{ch.title}</span>
                        </span>
                        {done ? (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>¡Logrado!</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                            Por hacer
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] leading-tight text-slate-600 dark:text-slate-400">
                        {done ? ch.rewardText : ch.task}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contenido de Controles */}
      <div className={`${isMobileCollapsed ? 'hidden md:grid' : 'grid'} grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 transition-all duration-300`}>
        {/* Selector de Superficie / Criatura Geométrica */}
        <div className="space-y-3">
          <label className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center justify-between font-semibold">
            <span>{isIntuitive ? 'Forma Geométrica 3D' : 'Variedad Topológica'}</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {(['clifford', 'fourier', 'spherical', 'klein'] as SurfaceMode[]).map((modeKey) => {
              const info = DIDACTIC_SURFACES[modeKey][isIntuitive ? 'intuitive' : 'academic'];
              const isSelected = labParams.surfaceMode === modeKey;
              return (
                <button
                  key={modeKey}
                  onClick={() => handleModeChange(modeKey)}
                  className={`flex flex-col text-left p-3 min-h-[60px] rounded-xl border transition-all text-xs focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer ${
                    isSelected
                      ? 'bg-purple-100/90 dark:bg-purple-950/70 border-purple-500 dark:border-amber-400/60 text-purple-950 dark:text-amber-200 shadow-md shadow-purple-500/20'
                      : 'bg-purple-50/40 dark:bg-[#1A1230]/60 border-purple-200/60 dark:border-purple-500/20 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-purple-400 dark:hover:border-purple-400/50'
                  }`}
                >
                  <span className="font-bold text-xs sm:text-sm">{info.title}</span>
                  <span className="text-xs text-purple-900/70 dark:text-amber-300/80 mt-1 truncate">
                    {info.subtitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Caja con la metáfora cotidiana de la figura seleccionada */}
          <div className="p-3 rounded-xl bg-purple-50/70 dark:bg-[#1A1230]/70 border border-purple-200/60 dark:border-purple-500/20 text-xs">
            <span className="font-semibold text-purple-700 dark:text-amber-300 block mb-0.5">
              💡 {isIntuitive ? '¿Cómo imaginar esta figura?' : 'Propiedad Topológica:'}
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-snug">
              {DIDACTIC_SURFACES[labParams.surfaceMode][isIntuitive ? 'intuitive' : 'academic'].metaphor}
            </p>
          </div>
        </div>

        {/* Deslizadores Numéricos con Explicaciones Didácticas */}
        <div className="space-y-4">
          {/* Armónicos / Cantidad de Olas */}
          <div className="min-h-[44px] flex flex-col justify-center">
            <div className="flex justify-between text-xs sm:text-sm font-mono mb-1.5">
              <label htmlFor="lab-harmonics" className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1">
                <span>{isIntuitive ? 'Ondas en la Superficie' : 'Armónicos de Fourier'}</span>
                {!isIntuitive && (
                  <span>(<Latex math="k" />)</span>
                )}
              </label>
              <span className="text-purple-700 dark:text-amber-400 font-bold">
                {labParams.harmonics} {isIntuitive ? (labParams.harmonics === 1 ? 'onda' : 'ondas') : 'términos'}
              </span>
            </div>
            {isIntuitive && (
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mb-1 block">
                {labParams.harmonics <= 2 ? '🌊 Suave como la calma' : labParams.harmonics <= 5 ? '🌊 Olas marcadas y definidas' : '🌊 Mar rugoso con muchas crestas'}
              </span>
            )}
            <input
              id="lab-harmonics"
              name="harmonics"
              type="range"
              min="1"
              max="8"
              step="1"
              value={labParams.harmonics}
              onChange={(e) => handleHarmonicsChange(Number(e.target.value))}
              aria-label="Armónicos u ondas"
              className="w-full h-11 cursor-pointer accent-[var(--accent)]"
            />
          </div>

          {/* Amplitud / Tamaño de las olas */}
          <div className="min-h-[44px] flex flex-col justify-center">
            <div className="flex justify-between text-xs sm:text-sm font-mono mb-1.5">
              <label htmlFor="lab-amplitude" className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1">
                <span>{isIntuitive ? 'Altura de las Olas' : 'Amplitud de Malla'}</span>
                {!isIntuitive && (
                  <span>(<Latex math="\alpha" />)</span>
                )}
              </label>
              <span className="text-purple-700 dark:text-amber-400 font-bold">
                {labParams.amplitude.toFixed(2)}
              </span>
            </div>
            {isIntuitive && (
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mb-1 block">
                {labParams.amplitude < 0.2 ? '📏 Olas bajitas y tranquilas' : labParams.amplitude < 0.4 ? '📏 Altura media' : '📏 Olas gigantescas'}
              </span>
            )}
            <input
              id="lab-amplitude"
              name="amplitude"
              type="range"
              min="0.05"
              max="0.6"
              step="0.01"
              value={labParams.amplitude}
              onChange={(e) => handleAmplitudeChange(Number(e.target.value))}
              aria-label="Amplitud de olas"
              className="w-full h-11 cursor-pointer accent-[var(--accent)]"
            />
          </div>

          {/* Velocidad / Ritmo del Baile */}
          <div className="min-h-[44px] flex flex-col justify-center">
            <div className="flex justify-between text-xs sm:text-sm font-mono mb-1.5">
              <label htmlFor="lab-speed" className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1">
                <span>{isIntuitive ? 'Ritmo del Baile' : 'Velocidad Angular'}</span>
                {!isIntuitive && (
                  <span>(<Latex math="\omega" />)</span>
                )}
              </label>
              <span className="text-purple-700 dark:text-amber-400 font-bold">
                {labParams.speed.toFixed(1)}x
              </span>
            </div>
            {isIntuitive && (
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mb-1 block">
                {labParams.speed < 0.6 ? '⏳ Baile lento y relajante' : labParams.speed < 1.2 ? '⏳ Ritmo natural' : '⏳ Movimiento súper veloz'}
              </span>
            )}
            <input
              id="lab-speed"
              name="speed"
              type="range"
              min="0.2"
              max="2.0"
              step="0.1"
              value={labParams.speed}
              onChange={(e) => handleSpeedChange(Number(e.target.value))}
              aria-label="Velocidad del baile"
              className="w-full h-11 cursor-pointer accent-[var(--accent)]"
            />
          </div>
        </div>

        {/* Visualización y Paletas de Color */}
        <div className="space-y-4">
          {/* Wireframe switch con perilla en gradiente púrpura/ámbar */}
          <div className="flex items-center justify-between p-3.5 min-h-[48px] rounded-2xl bg-purple-50/60 dark:bg-[#1A1230]/60 border border-purple-200/80 dark:border-purple-500/20">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-purple-600 dark:text-amber-400" />
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {isIntuitive ? 'Visión de Rayos X' : 'Malla Wireframe'}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {isIntuitive ? 'Muestra el esqueleto secreto' : 'Topología de filamentos'}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setLabParam('wireframe', !labParams.wireframe);
                playTick(920);
              }}
              aria-label="Alternar malla wireframe"
              className={`w-12 min-w-12 h-11 shrink-0 rounded-full transition-colors relative focus:ring-2 focus:ring-purple-400 cursor-pointer ${
                labParams.wireframe ? 'bg-gradient-to-r from-purple-600 to-amber-500 shadow-md shadow-purple-500/30' : 'bg-purple-200 dark:bg-[#251842]'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  labParams.wireframe ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Paleta de Color */}
          <div>
            <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-semibold block mb-2">
              {isIntuitive ? 'Elige el Color de la Energía' : 'Espectro Cromático'}
            </span>
            <div className="grid grid-cols-4 gap-2">
              {COLOR_THEMES.map((theme) => {
                const isActive = labParams.colorTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    title={theme.label}
                    aria-label={`Usar paleta ${theme.name}`}
                    className={`flex min-w-11 flex-col items-center justify-center gap-1.5 p-2 min-h-[44px] rounded-xl border transition-[background-color,border-color,transform,opacity] duration-200 cursor-pointer ${
                      isActive
                        ? `${theme.ringClass} ${theme.activeBg} scale-[1.03]`
                        : 'border-transparent bg-purple-50/50 dark:bg-[#1A1230]/40 hover:bg-purple-100/60 dark:hover:bg-[#251842]/50 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full ring-2 ring-black/10 dark:ring-white/20 transition-all duration-200"
                      style={{
                        backgroundColor: theme.color,
                        boxShadow: isActive ? `0 0 10px ${theme.color}` : 'none',
                        transform: isActive ? 'scale(1.15)' : 'scale(1.0)',
                      }}
                    />
                    <span
                      className={`text-xs font-mono truncate max-w-full transition-colors ${
                        isActive
                          ? 'text-slate-900 dark:text-white font-bold'
                          : 'text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {theme.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sección de Orquestación Armónica & Frecuencias */}
        <div data-od-id="music-panel" className="col-span-1 md:col-span-2 lg:col-span-3 pt-4 border-t border-purple-200/70 dark:border-purple-500/20 min-w-0">
          <div className="lab-brand-panel space-y-4 rounded-2xl border p-3 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-purple-500/20 border border-amber-500/30 text-amber-500 shadow-sm flex-shrink-0">
                  <Music className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 flex flex-wrap items-center gap-2">
                    <span>{isIntuitive ? 'Música de las Ecuaciones en Vivo' : 'Orquestación Armónica // Concierto Nueva Era'}</span>
                    {!isAudioMuted && (
                      <span className="flex h-2 w-2 relative flex-shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    {isIntuitive
                      ? 'Cada forma geométrica vibra y canta una nota. Toca las notas abajo para cambiar su tono musical.'
                      : 'Sinfonía procedural en tiempo real: frecuencias sagradas, arpegios de piano de cristal y cuerdas etéreas.'}
                  </p>
                </div>
              </div>

              {/* Botón Melodía Neoclásica ON/OFF & Cascada Fibonacci */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    if (isAudioMuted) {
                      activateAudio();
                    }
                    triggerFibonacciCascade(8, 'lydian');
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl text-xs font-mono font-semibold transition-all border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 cursor-pointer shadow-sm"
                  title="Disparar cascada orquestal polifónica con secuencia de Fibonacci y escala Lidia"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isIntuitive ? '✨ Cascada Musical' : 'Cascada Fibonacci'}</span>
                </button>

                <button
                  onClick={() => toggleConcertMode()}
                  className={`flex items-center gap-2 px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-mono font-semibold transition-all border cursor-pointer ${
                    !isAudioMuted && audioSettings.isConcertMode
                      ? 'bg-gradient-to-r from-purple-600/20 to-amber-500/20 border-amber-500/50 text-amber-600 dark:text-amber-300 shadow-sm ring-1 ring-amber-400/40'
                      : 'bg-white/60 dark:bg-[#251842]/50 border-purple-200/60 dark:border-purple-500/30 text-slate-500 dark:text-slate-400 hover:text-purple-700 dark:hover:text-purple-300'
                  }`}
                  title={audioSettings.isConcertMode ? 'Modo Melódico activo' : 'Modo Contemplativo'}
                >
                  <Sparkles className={`w-3.5 h-3.5 ${!isAudioMuted && audioSettings.isConcertMode ? 'text-amber-500 animate-spin' : ''}`} />
                  <span>{audioSettings.isConcertMode ? 'Melodía: ON' : 'Melodía: OFF'}</span>
                </button>
              </div>
            </div>

            {/* Pantalla Interactiva de Oscilaciones y Visualizador Espectral Cuántico */}
            <AudioOscilloscope className="w-full my-1 shadow-lg" />

            {/* Grid de 4 Frecuencias */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {FREQUENCIES_LIST.map((item) => {
                const isActive = audioSettings.fundamentalFreq === item.freq;
                return (
                  <button
                    key={item.freq}
                    onClick={() => {
                      changeFrequency(item.freq);
                      if (isAudioMuted) {
                        activateAudio();
                      }
                    }}
                    title={`${item.name} (${item.note}) — ${item.description}`}
                    className={`flex flex-col items-start p-3 min-h-[64px] rounded-xl border transition-all text-left cursor-pointer relative overflow-hidden ${
                      isActive
                        ? 'border-amber-500 dark:border-amber-400 bg-white dark:bg-[#251842] shadow-md shadow-amber-500/20 ring-1 ring-amber-400/50'
                        : 'border-purple-200/60 dark:border-purple-500/20 bg-white/50 dark:bg-[#1E1538]/50 hover:bg-white dark:hover:bg-[#251842] text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className={`text-sm font-mono font-bold ${isActive ? 'text-amber-600 dark:text-amber-300' : 'text-slate-900 dark:text-slate-100'}`}>
                        {item.name}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold ${
                        isActive
                          ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40'
                          : 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300'
                      }`}>
                        {item.tag}
                      </span>
                    </div>
                    <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {item.note}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-full">
                      {item.description}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Barra informativa inferior */}
            <div className="flex flex-wrap items-center justify-between text-xs font-mono pt-2 border-t border-purple-200/50 dark:border-purple-500/20 gap-2">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-purple-700 dark:text-amber-300">
                  {SACRED_FREQUENCIES[audioSettings.fundamentalFreq]?.name} ({SACRED_FREQUENCIES[audioSettings.fundamentalFreq]?.subtitle}):
                </span>
                <span className="hidden md:inline text-slate-500 dark:text-slate-400">
                  {SACRED_FREQUENCIES[audioSettings.fundamentalFreq]?.scaleDescription}
                </span>
              </div>

              <div>
                {!isAudioMuted ? (
                  <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                    <span>{isIntuitive ? 'Sonando en Vivo 🎵' : 'Sonando en Vivo (Concierto Nueva Era)'}</span>
                  </span>
                ) : (
                  <button
                    onClick={() => activateAudio()}
                    className="text-purple-700 dark:text-amber-300 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isIntuitive ? 'Toca para Encender el Sonido 🔊' : 'Iniciar Concierto en Vivo'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
