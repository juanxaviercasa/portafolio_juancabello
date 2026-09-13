import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { useAudioEngine } from '../../audio/useAudioEngine';

export const AudioToggle: React.FC<{ variant?: 'header' | 'floating' }> = ({ variant = 'header' }) => {
  const isAudioMuted = usePortfolioStore((state) => state.isAudioMuted);
  const toggleAudio = usePortfolioStore((state) => state.toggleAudio);
  const { playTick } = useAudioEngine();

  const handleToggle = () => {
    toggleAudio();
    // Si se acaba de activar el audio, emitir un tono de bienvenida
    if (isAudioMuted) {
      setTimeout(() => playTick(880), 50);
    }
  };

  const isFloating = variant === 'floating';

  return (
    <button
      onClick={handleToggle}
      aria-label={isAudioMuted ? 'Activar micro-audio procedural' : 'Silenciar micro-audio procedural'}
      title={isAudioMuted ? 'Activar micro-audio procedural' : 'Silenciar micro-audio procedural'}
      className={`
        group relative flex items-center gap-2.5 px-3 py-1.5 rounded-full
        transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50
        ${
          isFloating
            ? 'fixed bottom-6 right-6 z-40 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-xl hover:border-cyan-400/40'
            : 'bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 text-xs'
        }
      `}
    >
      <div className="relative flex items-center justify-center">
        {isAudioMuted ? (
          <VolumeX className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors" />
        ) : (
          <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
        )}
      </div>

      <div className="flex items-center gap-0.5 h-3">
        {!isAudioMuted ? (
          <>
            <span className="w-0.5 h-2 bg-cyan-400 rounded-full animate-[bounce_0.8s_infinite_100ms]" />
            <span className="w-0.5 h-3 bg-cyan-400 rounded-full animate-[bounce_0.8s_infinite_300ms]" />
            <span className="w-0.5 h-1.5 bg-cyan-400 rounded-full animate-[bounce_0.8s_infinite_200ms]" />
          </>
        ) : (
          <span className="text-[11px] font-mono text-slate-400 group-hover:text-slate-300">
            Audio OFF
          </span>
        )}
      </div>

      {!isAudioMuted && (
        <span className="text-[11px] font-mono text-cyan-300">
          Procedural
        </span>
      )}
    </button>
  );
};
