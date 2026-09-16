import React, { useEffect, useRef, useState } from 'react';
import { Activity, BarChart3, Disc, Radio, Sparkles, Volume2, VolumeX, Maximize2, Zap } from 'lucide-react';
import { useAudioEngine } from '../../audio/useAudioEngine';

export type VisualizerMode = 'waveform' | 'spectrum' | 'lissajous' | 'polar';
export type PhosphorTheme = 'amber' | 'violet' | 'cyan' | 'emerald';

interface ThemeColorConfig {
  primary: string;
  glow: string;
  grid: string;
  bgRgba: string;
  badge: string;
}

const THEMES: Record<PhosphorTheme, ThemeColorConfig> = {
  amber: {
    primary: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.45)',
    grid: 'rgba(245, 158, 11, 0.08)',
    bgRgba: 'rgba(15, 10, 24, 0.28)',
    badge: 'border-amber-500/40 text-amber-600 dark:text-amber-300 bg-amber-500/10',
  },
  violet: {
    primary: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.45)',
    grid: 'rgba(168, 85, 247, 0.08)',
    bgRgba: 'rgba(15, 10, 24, 0.28)',
    badge: 'border-purple-500/40 text-purple-600 dark:text-purple-300 bg-purple-500/10',
  },
  cyan: {
    primary: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.45)',
    grid: 'rgba(56, 189, 248, 0.08)',
    bgRgba: 'rgba(10, 16, 28, 0.28)',
    badge: 'border-cyan-500/40 text-cyan-600 dark:text-cyan-300 bg-cyan-500/10',
  },
  emerald: {
    primary: '#10b981',
    glow: 'rgba(16, 185, 129, 0.45)',
    grid: 'rgba(16, 185, 129, 0.08)',
    bgRgba: 'rgba(8, 20, 15, 0.28)',
    badge: 'border-emerald-500/40 text-emerald-600 dark:text-emerald-300 bg-emerald-500/10',
  },
};

// --- Funciones puras de renderizado Canvas fuera del componente ---

const drawOscilloscopeGrid = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  gridColor: string
) => {
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;

  const divisionsX = 8;
  const divisionsY = 6;

  ctx.beginPath();
  for (let i = 1; i < divisionsX; i++) {
    const x = (width / divisionsX) * i;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let j = 1; j < divisionsY; j++) {
    const y = (height / divisionsY) * j;
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.stroke();

  // Cruz central más marcada
  ctx.strokeStyle = gridColor.replace('0.08', '0.18');
  ctx.beginPath();
  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();
};

const drawIdleTrace = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color: string,
  glow: string
) => {
  const centerY = height / 2;
  ctx.strokeStyle = color;
  ctx.shadowColor = glow;
  ctx.shadowBlur = 8;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(0, centerY);
  for (let x = 0; x < width; x += 12) {
    const noise = (Math.random() - 0.5) * 1.5;
    ctx.lineTo(x, centerY + noise);
  }
  ctx.stroke();
  ctx.shadowBlur = 0;
};

// 1. Osciloscopio con Zero-Crossing Trigger (estabilizador de fase)
const drawWaveform = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  timeData: Float32Array,
  color: string,
  glow: string,
  gain: number
) => {
  const centerY = height / 2;
  const halfHeight = height / 2;

  // Zero-crossing search para congelar la onda
  let startIndex = 0;
  for (let i = 0; i < timeData.length / 2; i++) {
    if (timeData[i] < 0 && timeData[i + 1] >= 0) {
      startIndex = i;
      break;
    }
  }

  const sampleCount = Math.min(width, timeData.length - startIndex);
  const step = width / sampleCount;

  // Glow de haz de electrones
  ctx.shadowColor = glow;
  ctx.shadowBlur = 12;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.4;
  ctx.beginPath();

  for (let i = 0; i < sampleCount; i++) {
    const sample = timeData[startIndex + i] * gain;
    const x = i * step;
    const y = centerY - sample * halfHeight * 0.85;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  // Línea interior brillante
  ctx.shadowBlur = 0;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.0;
  ctx.globalAlpha = 0.55;
  ctx.stroke();
  ctx.globalAlpha = 1.0;
};

// 2. Espectro FFT de Fourier con barras armónicas y marcador de fundamental f0
const drawSpectrum = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  freqData: Uint8Array,
  color: string,
  glow: string,
  gain: number,
  fundamentalHz: number = 432
) => {
  const barCount = 48;
  const barWidth = (width / barCount) * 0.75;
  const gap = (width / barCount) * 0.25;

  ctx.shadowColor = glow;
  ctx.shadowBlur = 8;

  let fundamentalBarX = -1;
  let fundamentalBarY = -1;

  for (let i = 0; i < barCount; i++) {
    // Escala semilogarítmica para representar frecuencias audibles
    const binIndex = Math.floor(Math.pow(i / barCount, 1.6) * (freqData.length * 0.45));
    const approxHz = (binIndex * 24000) / freqData.length;

    const rawVal = freqData[binIndex] || 0;
    const normalized = Math.min((rawVal / 255) * gain, 1.0);
    const barHeight = normalized * (height * 0.82);

    const x = i * (barWidth + gap) + gap / 2;
    const y = height - barHeight - 4;

    // Detectar si esta barra corresponde a la fundamental f0
    const isFundamentalBin = Math.abs(approxHz - fundamentalHz) < 35;
    if (isFundamentalBin && fundamentalBarX === -1) {
      fundamentalBarX = x + barWidth / 2;
      fundamentalBarY = y;
    }

    // Gradiente de barra
    const gradient = ctx.createLinearGradient(0, height, 0, y);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, isFundamentalBin ? '#ffd700' : '#ffffff');

    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, barWidth, barHeight);

    // Pico superior
    ctx.fillStyle = isFundamentalBin ? '#ffe066' : '#ffffff';
    ctx.fillRect(x, y - 2, barWidth, isFundamentalBin ? 2.5 : 1.5);
  }
  ctx.shadowBlur = 0;

  // Marcador visual de tónica fundamental f0 en el espectro
  if (fundamentalBarX > 0 && fundamentalBarY < height - 10) {
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`f₀ ${fundamentalHz}Hz`, fundamentalBarX, Math.max(fundamentalBarY - 6, 14));
  }
};

// 3. Figuras de Lissajous y coherencia de fase
const drawLissajous = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  timeData: Float32Array,
  color: string,
  glow: string,
  gain: number
) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) * 0.82;

  ctx.shadowColor = glow;
  ctx.shadowBlur = 10;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8;
  ctx.beginPath();

  const quarterLength = Math.floor(timeData.length / 4);
  const count = Math.min(500, quarterLength);

  for (let i = 0; i < count; i++) {
    const sampleX = timeData[i] * gain;
    const sampleY = timeData[i + 32] * gain; // Desfase temporal de fase estéreo

    const x = centerX + sampleX * radius;
    const y = centerY - sampleY * radius;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.stroke();
  ctx.shadowBlur = 0;
};

// 4. Resonancia Cuántica Polar / Radial
const drawPolar = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  freqData: Uint8Array,
  color: string,
  glow: string,
  gain: number,
  rotation: number
) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const baseRadius = Math.min(centerX, centerY) * 0.38;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(rotation);

  ctx.shadowColor = glow;
  ctx.shadowBlur = 12;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.0;
  ctx.beginPath();

  const points = 64;
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const bin = Math.floor((i % points) * 2);
    const val = (freqData[bin] / 255) * gain;
    const r = baseRadius + val * baseRadius * 1.3;

    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.stroke();

  // Círculo concéntrico interno
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, baseRadius * 0.4, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
  ctx.shadowBlur = 0;
};

export const AudioOscilloscope: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastHudUpdateRef = useRef<number>(0);

  const [mode, setMode] = useState<VisualizerMode>('waveform');
  const [sensitivity, setSensitivity] = useState<number>(1.0);
  const [theme, setTheme] = useState<PhosphorTheme>('amber');
  const [activeHarmonicLabel, setActiveHarmonicLabel] = useState<string>('Tónica Fundamental');
  const [rmsDb, setRmsDb] = useState<number>(-60);

  const {
    getAnalyser,
    isMuted,
    activateAudio,
    toggleAudio,
    triggerFibonacciCascade,
    playSpatialChord,
    audioSettings,
  } = useAudioEngine();

  // Bucle de renderizado Canvas a 60 FPS
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;
    let rotationAngle = 0;

    const render = () => {
      if (!isRunning) return;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const color = THEMES[theme];

      // Fondo persistente con decaimiento fosforescente
      ctx.fillStyle = color.bgRgba;
      ctx.fillRect(0, 0, width, height);

      // Rejilla de retícula analógica tipo osciloscopio
      drawOscilloscopeGrid(ctx, width, height, color.grid);

      const analyser = getAnalyser();

      if (!analyser || isMuted) {
        // Modo reposo / Línea base plana con micro-fluctuación cuántica
        drawIdleTrace(ctx, width, height, color.primary, color.glow);
        setRmsDb(-60);
        ctx.restore();
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      const bufferLength = analyser.fftSize;
      const timeData = new Float32Array(bufferLength);
      const freqData = new Uint8Array(analyser.frequencyBinCount);

      analyser.getFloatTimeDomainData(timeData);
      analyser.getByteFrequencyData(freqData);

      // Actualización de telemetría HUD amortiguada (cada 120ms para estabilidad visual)
      const now = performance.now();
      if (now - lastHudUpdateRef.current > 120) {
        lastHudUpdateRef.current = now;

        // 1. Calcular RMS en dB
        let sumSquares = 0;
        for (let i = 0; i < timeData.length; i++) {
          sumSquares += timeData[i] * timeData[i];
        }
        const rms = Math.sqrt(sumSquares / timeData.length);
        const db = rms > 0.0001 ? Math.round(20 * Math.log10(rms)) : -60;
        setRmsDb(Math.max(db, -60));

        // 2. Detección armónica con interpolación parabólica continua
        let maxBin = 0;
        let maxVal = 0;
        for (let i = 2; i < freqData.length / 2; i++) {
          if (freqData[i] > maxVal) {
            maxVal = freqData[i];
            maxBin = i;
          }
        }

        if (maxVal > 25 && maxBin > 1 && maxBin < freqData.length - 1) {
          // Sub-bin parabolic peak interpolation para eliminar error de discretización del FFT
          const alpha = freqData[maxBin - 1];
          const beta = freqData[maxBin];
          const gamma = freqData[maxBin + 1];
          const denom = alpha - 2 * beta + gamma;
          const delta = denom !== 0 ? (0.5 * (alpha - gamma)) / denom : 0;
          const interpBin = maxBin + delta;

          const nyquist = (analyser.context.sampleRate || 48000) / 2;
          const exactPeakHz = Math.round((interpBin * nyquist) / freqData.length);

          const targetF0 = audioSettings.fundamentalFreq;
          const ratio = exactPeakHz / targetF0;

          if (Math.abs(ratio - 1.0) < 0.12) {
            setActiveHarmonicLabel('Tónica Fundamental (1×)');
          } else if (Math.abs(ratio - 2.0) < 0.12) {
            setActiveHarmonicLabel(`Octava Superior (2× = ${Math.round(targetF0 * 2)} Hz)`);
          } else if (Math.abs(ratio - 1.5) < 0.12) {
            setActiveHarmonicLabel(`Quinta Justa (1.5× = ${Math.round(targetF0 * 1.5)} Hz)`);
          } else if (Math.abs(ratio - 2.5) < 0.12) {
            setActiveHarmonicLabel(`3ra Superior (2.5× = ${Math.round(targetF0 * 2.5)} Hz)`);
          } else if (Math.abs(ratio - 3.0) < 0.15) {
            setActiveHarmonicLabel(`3er Armónico (3× = ${Math.round(targetF0 * 3)} Hz)`);
          } else {
            setActiveHarmonicLabel(`Armónico Activo: ${exactPeakHz} Hz`);
          }
        } else {
          setActiveHarmonicLabel('Tónica Fundamental');
        }
      }

      // Renderizado según modo seleccionado
      switch (mode) {
        case 'waveform':
          drawWaveform(ctx, width, height, timeData, color.primary, color.glow, sensitivity);
          break;
        case 'spectrum':
          drawSpectrum(ctx, width, height, freqData, color.primary, color.glow, sensitivity, audioSettings.fundamentalFreq);
          break;
        case 'lissajous':
          drawLissajous(ctx, width, height, timeData, color.primary, color.glow, sensitivity);
          break;
        case 'polar':
          rotationAngle += 0.015;
          drawPolar(ctx, width, height, freqData, color.primary, color.glow, sensitivity, rotationAngle);
          break;
      }

      ctx.restore();
      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [getAnalyser, isMuted, mode, sensitivity, theme, audioSettings.fundamentalFreq]);

  const currentColor = THEMES[theme];

  return (
    <div className={`relative rounded-3xl overflow-hidden border border-purple-200/80 dark:border-purple-500/30 bg-[#0E091C]/90 backdrop-blur-xl shadow-2xl ${className}`}>
      {/* Barra de Control Superior */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-purple-500/20 bg-[#140D26]/70 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-purple-500/30 bg-purple-950/40 text-purple-200 font-bold">
            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>PANTALLA DE OSCILACIONES // 357</span>
          </div>

          {/* Sincronicidad estricta entre la Tónica Fundamental f0 y el armónico activo */}
          <div className={`flex items-center gap-2 px-2.5 py-1 rounded-md border text-[11px] font-semibold ${currentColor.badge}`}>
            <span className="font-bold text-slate-900 dark:text-white">
              f₀: {isMuted ? '---' : `${audioSettings.fundamentalFreq} Hz`}
            </span>
            {!isMuted && (
              <span className="text-[10px] opacity-80 border-l border-current/40 pl-2 font-normal truncate max-w-[200px] sm:max-w-none">
                {activeHarmonicLabel}
              </span>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-1 text-slate-400 text-[11px]">
            <span>RMS:</span>
            <span className={rmsDb > -20 ? 'text-amber-400 font-bold' : 'text-slate-300'}>
              {isMuted ? '-∞' : `${rmsDb} dB`}
            </span>
          </div>
        </div>

        {/* Selector de Modo de Visualización */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-purple-500/20">
          <button
            onClick={() => setMode('waveform')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer ${
              mode === 'waveform'
                ? 'bg-purple-600/80 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Osciloscopio Temporal V(t)"
          >
            <Activity className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Onda V(t)</span>
          </button>

          <button
            onClick={() => setMode('spectrum')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer ${
              mode === 'spectrum'
                ? 'bg-purple-600/80 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Espectro FFT de Fourier F(ω)"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fourier F(ω)</span>
          </button>

          <button
            onClick={() => setMode('lissajous')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer ${
              mode === 'lissajous'
                ? 'bg-purple-600/80 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Fase Estéreo & Lissajous Φ(x,y)"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lissajous</span>
          </button>

          <button
            onClick={() => setMode('polar')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer ${
              mode === 'polar'
                ? 'bg-purple-600/80 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Resonancia Armónica Cuántica Polar r(θ)"
          >
            <Disc className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Polar r(θ)</span>
          </button>
        </div>
      </div>

      {/* Pantalla del Osciloscopio (Canvas WebGL / 2D) */}
      <div className="relative w-full h-[220px] sm:h-[260px] bg-[#07040E]">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Overlay cuando el audio está silenciado */}
        {isMuted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs text-center p-4">
            <VolumeX className="w-8 h-8 text-purple-400 mb-2 opacity-80" />
            <p className="text-xs sm:text-sm font-mono text-purple-200 font-semibold mb-3">
              Pantalla Acústica en Reposo // Haz de Electrones en Standby
            </p>
            <button
              onClick={() => activateAudio()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white shadow-lg cursor-pointer transition-transform active:scale-95"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Activar Concierto & Oscilaciones</span>
            </button>
          </div>
        )}

        {/* Tag de escala y afinación en esquina */}
        {!isMuted && (
          <div className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded bg-black/60 border border-purple-500/20 text-[10px] font-mono text-slate-400 pointer-events-none">
            {audioSettings.fundamentalFreq}Hz Pitagórico // Sala Convolver 3.8s // Tonal Q
          </div>
        )}
      </div>

      {/* Barra de Ajustes Inferior (Sensibilidad, Fósforo y Disparadores Musicales) */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-purple-500/20 bg-[#140D26]/70 text-xs font-mono">
        {/* Controles de Sensibilidad de Entrada */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[11px]">Ganancia:</span>
          {[0.5, 1.0, 1.5, 2.0].map((gain) => (
            <button
              key={gain}
              onClick={() => setSensitivity(gain)}
              className={`px-2 py-0.5 rounded text-[11px] transition-all cursor-pointer ${
                sensitivity === gain
                  ? 'bg-purple-500/30 border border-purple-400 text-purple-200 font-bold'
                  : 'text-slate-400 hover:text-slate-200 bg-black/20'
              }`}
            >
              {gain}x
            </button>
          ))}
        </div>

        {/* Selector de Color de Fósforo */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[11px]">Fósforo:</span>
          {(['amber', 'violet', 'cyan', 'emerald'] as PhosphorTheme[]).map((col) => (
            <button
              key={col}
              onClick={() => setTheme(col)}
              className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                theme === col ? 'scale-125 ring-2 ring-white/60' : 'opacity-60 hover:opacity-100'
              }`}
              style={{
                backgroundColor:
                  col === 'amber'
                    ? '#f59e0b'
                    : col === 'violet'
                    ? '#a855f7'
                    : col === 'cyan'
                    ? '#38bdf8'
                    : '#10b981',
                borderColor: 'rgba(255,255,255,0.4)',
              }}
              title={`Fósforo ${col}`}
            />
          ))}
        </div>

        {/* Acciones de Prueba Sonora Inmediata */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (isMuted) activateAudio();
              triggerFibonacciCascade(8, 'lydian');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-[11px] font-semibold cursor-pointer transition-colors"
            title="Disparar Cascada Fibonacci y ver respuesta en el osciloscopio"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Fibonacci Fn</span>
          </button>

          <button
            onClick={() => {
              if (isMuted) activateAudio();
              playSpatialChord(3, { scale: 'lydian', duration: 2.0, velocity: 0.7 });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 text-purple-200 text-[11px] font-semibold cursor-pointer transition-colors"
            title="Disparar Acorde Espacial Lidio"
          >
            <Zap className="w-3 h-3 text-purple-300" />
            <span>Acorde Lidio</span>
          </button>

          <button
            onClick={() => toggleAudio()}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              !isMuted
                ? 'border-amber-500/40 bg-amber-500/20 text-amber-300'
                : 'border-purple-500/30 bg-purple-900/30 text-slate-400 hover:text-white'
            }`}
            title={!isMuted ? 'Silenciar audio' : 'Activar audio'}
          >
            {!isMuted ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
