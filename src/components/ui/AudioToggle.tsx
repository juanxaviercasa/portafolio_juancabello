import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { useAudioEngine } from '../../audio/useAudioEngine';

export const AudioToggle: React.FC<{ variant?: 'header' | 'floating' }> = ({ variant = 'header' }) => {
  const isAudioMuted = usePortfolioStore((state) => state.isAudioMuted);
  const toggleAudio = usePortfolioStore((state) => state.toggleAudio);
  const { activateAudio, deactivateAudio } = useAudioEngine();

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAudioMuted) {
      // Activar AudioContext directamente en el gesto de usuario
      activateAudio();
      toggleAudio();
    } else {
      deactivateAudio();
      toggleAudio();
    }
  };

  const isFloating = variant === 'floating';

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isAudioMuted ? 'Activar audio procedural interactivo' : 'Silenciar audio procedural'}
      title={isAudioMuted ? 'Activar audio procedural en 432 Hz' : 'Silenciar audio procedural'}
      className={`
        group relative flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer
        transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-cyan-400/50
        ${
          isFloating
            ? 'fixed bottom-6 right-6 z-40 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-slate-300/80 dark:border-slate-700/80 shadow-2xl hover:scale-105 hover:border-blue-500 dark:hover:border-cyan-400'
            : 'bg-slate-100/90 hover:bg-slate-200/90 dark:bg-slate-800/80 dark:hover:bg-slate-700 border border-slate-200 dark:border-white/10 text-xs shadow-sm'
        }
      `}
    >
      <div className="relative flex items-center justify-center">
        {isAudioMuted ? (
          <VolumeX className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors" />
        ) : (
          <Volume2 className="w-4 h-4 text-blue-600 dark:text-cyan-400 animate-pulse" />
        )}
      </div>

      <div className="flex items-center gap-0.5 h-3">
        {!isAudioMuted ? (
          <>
            <span className="w-0.5 h-2 bg-blue-600 dark:bg-cyan-400 rounded-full animate-[bounce_0.8s_infinite_100ms]" />
            <span className="w-0.5 h-3 bg-blue-600 dark:bg-cyan-400 rounded-full animate-[bounce_0.8s_infinite_300ms]" />
            <span className="w-0.5 h-1.5 bg-blue-600 dark:bg-cyan-400 rounded-full animate-[bounce_0.8s_infinite_200ms]" />
          </>
        ) : (
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300">
            Audio OFF
          </span>
        )}
      </div>

      {!isAudioMuted ? (
        <span className="text-xs font-mono font-bold text-blue-700 dark:text-cyan-300">
          En Vivo (432Hz)
        </span>
      ) : (
        <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400 dark:text-slate-500">
          (Click para oír)
        </span>
      )}
    </button>
  );
};
