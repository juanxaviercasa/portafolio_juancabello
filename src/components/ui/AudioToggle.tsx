import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { useAudioEngine } from '../../audio/useAudioEngine';

export const AudioToggle: React.FC<{ variant?: 'header' | 'floating' }> = ({ variant = 'header' }) => {
  const isAudioMuted = usePortfolioStore((state) => state.isAudioMuted);
  const audioSettings = usePortfolioStore((state) => state.audioSettings);
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
      aria-label={isAudioMuted ? `Activar concierto armónico en ${audioSettings.fundamentalFreq} Hz` : 'Silenciar concierto'}
      title={isAudioMuted ? `Activar concierto neoclásico en ${audioSettings.fundamentalFreq} Hz` : `Silenciar concierto (${audioSettings.fundamentalFreq} Hz)`}
      className={`
        group relative flex items-center flex-shrink-0 gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl cursor-pointer whitespace-nowrap
        transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400/50 dark:focus:ring-amber-400/50
        ${
          isFloating
            ? 'fixed bottom-6 right-6 z-40 bg-white/95 dark:bg-[#130E24]/90 backdrop-blur-md border border-purple-200/80 dark:border-purple-500/40 shadow-2xl hover:scale-105 hover:border-purple-400 dark:hover:border-amber-400'
            : 'bg-purple-50/70 hover:bg-purple-100/80 dark:bg-[#1A1230]/80 dark:hover:bg-[#251842] border border-purple-200/80 dark:border-purple-500/30 text-xs shadow-sm'
        }
      `}
    >
      <div className="relative flex items-center justify-center flex-shrink-0">
        {isAudioMuted ? (
          <VolumeX className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors" />
        ) : (
          <Volume2 className="w-4 h-4 text-purple-600 dark:text-amber-400 animate-pulse" />
        )}
      </div>

      {!isAudioMuted && (
        <div className="flex items-center gap-0.5 h-3 flex-shrink-0">
          <span className="w-0.5 h-2 bg-purple-600 dark:bg-amber-400 rounded-full animate-[bounce_0.8s_infinite_100ms]" />
          <span className="w-0.5 h-3 bg-fuchsia-600 dark:bg-amber-300 rounded-full animate-[bounce_0.8s_infinite_300ms]" />
          <span className="w-0.5 h-1.5 bg-amber-600 dark:bg-amber-400 rounded-full animate-[bounce_0.8s_infinite_200ms]" />
        </div>
      )}

      {isAudioMuted ? (
        <>
          <span className="hidden sm:inline-block text-xs font-mono text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 whitespace-nowrap">
            Audio OFF
          </span>
          <span className="hidden xl:inline-block text-[11px] font-mono text-slate-400 dark:text-slate-500 whitespace-nowrap">
            (Click para oír)
          </span>
        </>
      ) : (
        <>
          {/* En tablets y laptops intermedias: solo la frecuencia compacta */}
          <span className="hidden sm:inline-block xl:hidden text-xs font-mono font-bold text-purple-700 dark:text-amber-300 whitespace-nowrap">
            {audioSettings.fundamentalFreq}Hz
          </span>
          {/* En desktop amplio (xl): frecuencia y modo completo */}
          <span className="hidden xl:inline-block text-xs font-mono font-bold text-purple-700 dark:text-amber-300 whitespace-nowrap">
            {audioSettings.fundamentalFreq}Hz {audioSettings.isConcertMode ? 'Concierto' : 'Drone'}
          </span>
        </>
      )}
    </button>
  );
};
