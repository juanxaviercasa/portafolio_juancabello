import React from 'react';
import { Lightbulb, GraduationCap } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { useAudioEngine } from '../../audio/useAudioEngine';

interface DidacticToggleProps {
  variant?: 'header' | 'pill' | 'badge';
  showLabel?: boolean;
  className?: string;
}

export const DidacticToggle: React.FC<DidacticToggleProps> = ({
  variant = 'header',
  showLabel = true,
  className = '',
}) => {
  const pedagogicalMode = usePortfolioStore((state) => state.pedagogicalMode);
  const togglePedagogicalMode = usePortfolioStore((state) => state.togglePedagogicalMode);
  const { playTick } = useAudioEngine();

  const isIntuitive = pedagogicalMode === 'intuitive';

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    playTick(isIntuitive ? 880 : 1100);
    togglePedagogicalMode();
  };

  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={handleClick}
        title={isIntuitive ? 'Cambiar a Modo Académico (Rigor formal y LaTeX)' : 'Cambiar a Modo Fácil (Analogías y didáctica)'}
        aria-label={isIntuitive ? 'Cambiar a Modo Académico' : 'Cambiar a Modo Fácil'}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer border ${
          isIntuitive
            ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30 hover:bg-amber-500/25 shadow-sm'
            : 'bg-purple-500/15 text-purple-800 dark:text-purple-300 border-purple-500/30 hover:bg-purple-500/25 shadow-sm'
        } ${className}`}
      >
        {isIntuitive ? (
          <>
            <Lightbulb className="w-3.5 h-3.5 text-amber-500 animate-pulse flex-shrink-0" />
            <span>Modo Fácil (Estudiantes)</span>
          </>
        ) : (
          <>
            <GraduationCap className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
            <span>Modo Académico (Formal)</span>
          </>
        )}
      </button>
    );
  }

  // Variant 'header'
  return (
    <button
      type="button"
      onClick={handleClick}
      title={
        isIntuitive
          ? 'Activo: Modo Fácil (Analogías y juego). Clic para cambiar a Modo Académico.'
          : 'Activo: Modo Académico (Rigor y LaTeX). Clic para cambiar a Modo Fácil.'
      }
      aria-label={isIntuitive ? 'Cambiar a Modo Académico' : 'Cambiar a Modo Fácil'}
      className={`
        group relative flex items-center justify-center flex-shrink-0 gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl cursor-pointer whitespace-nowrap
        transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 dark:focus:ring-purple-400/50 h-8 sm:h-9 text-xs font-semibold
        ${
          isIntuitive
            ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 shadow-sm'
            : 'bg-purple-50/70 hover:bg-purple-100/80 dark:bg-[#1A1230]/80 dark:hover:bg-[#251842] text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-500/30 shadow-sm'
        }
        ${className}
      `}
    >
      <div className="flex items-center gap-1.5">
        {isIntuitive ? (
          <Lightbulb className="w-4 h-4 text-amber-500 animate-pulse flex-shrink-0" />
        ) : (
          <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
        )}
      </div>

      {showLabel && (
        <span className="hidden md:inline font-mono">
          {isIntuitive ? 'Modo Fácil 💡' : 'Modo Pro 🎓'}
        </span>
      )}
    </button>
  );
};
