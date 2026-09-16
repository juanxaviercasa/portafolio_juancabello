import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { useAudioEngine } from '../../audio/useAudioEngine';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
  variant?: 'pill' | 'button' | 'floating' | 'icon';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = true,
  variant = 'pill',
}) => {
  const theme = usePortfolioStore((state) => state.theme);
  const toggleTheme = usePortfolioStore((state) => state.toggleTheme);
  const setTheme = usePortfolioStore((state) => state.setTheme);
  const { playTick } = useAudioEngine();

  const isDark = theme === 'dark';

  const handleToggle = () => {
    toggleTheme();
    playTick(isDark ? 1150 : 750);
  };

  const handleSelect = (mode: 'light' | 'dark') => {
    if (theme !== mode) {
      setTheme(mode);
      playTick(mode === 'light' ? 1150 : 750);
    }
  };

  // Compact Icon variant para Navbar responsivo (desktop, tablet y móvil)
  if (variant === 'icon' || (variant === 'button' && !showLabel)) {
    return (
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
        title={isDark ? 'Activar Modo Claro' : 'Activar Modo Oscuro'}
        className={`
          relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl cursor-pointer flex-shrink-0
          bg-purple-50/80 hover:bg-purple-100/90 dark:bg-[#1A1230]/80 dark:hover:bg-[#251842]
          border border-purple-200/80 dark:border-purple-500/30
          text-slate-700 dark:text-slate-200
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400/50 shadow-sm
          ${className}
        `}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-cyan-400 transition-transform hover:scale-110" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500 transition-transform hover:rotate-45" />
        )}
      </button>
    );
  }

  // Segmented Pill Switch: 100% obvio e interactivo
  if (variant === 'pill') {
    return (
      <div
        className={`
          flex items-center p-1 rounded-full border shadow-sm
          bg-slate-200/80 dark:bg-slate-900/80
          border-slate-300/80 dark:border-white/10
          ${className}
        `}
        role="group"
        aria-label="Selector de tema claro u oscuro"
      >
        <button
          type="button"
          onClick={() => handleSelect('light')}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer
            ${
              !isDark
                ? 'bg-white text-slate-950 shadow-md ring-1 ring-black/5 font-bold'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }
          `}
          title="Activar Modo Claro"
          aria-pressed={!isDark}
        >
          <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-amber-500 fill-amber-500/20' : 'text-slate-400'}`} />
          {showLabel && <span>Claro</span>}
        </button>

        <button
          type="button"
          onClick={() => handleSelect('dark')}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer
            ${
              isDark
                ? 'bg-slate-800 text-cyan-300 shadow-md ring-1 ring-white/10 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }
          `}
          title="Activar Modo Oscuro"
          aria-pressed={isDark}
        >
          <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400 fill-cyan-400/20' : 'text-slate-400'}`} />
          {showLabel && <span>Oscuro</span>}
        </button>
      </div>
    );
  }

  // Floating variant para acceso inmediato
  if (variant === 'floating') {
    return (
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
        title={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
        className={`
          flex items-center gap-2 px-3.5 py-2 rounded-xl cursor-pointer
          bg-white/95 dark:bg-slate-900/90 backdrop-blur-md
          border border-slate-300/80 dark:border-slate-700/80
          text-slate-800 dark:text-slate-200
          shadow-2xl hover:scale-105 hover:border-blue-500 dark:hover:border-cyan-400
          transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40
          ${className}
        `}
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          {isDark ? (
            <Moon className="w-4 h-4 text-cyan-400" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500" />
          )}
        </div>
        <span className="text-xs font-mono font-medium">
          {isDark ? 'Modo Oscuro' : 'Modo Claro'}
        </span>
      </button>
    );
  }

  // Single button fallback with label
  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
      title={isDark ? 'Activar Modo Claro' : 'Activar Modo Oscuro'}
      className={`
        group relative flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer
        border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/40 dark:focus:ring-cyan-400/50
        bg-white/90 dark:bg-slate-800/80
        border-slate-200 dark:border-white/10
        text-slate-800 dark:text-slate-200
        hover:bg-slate-100 dark:hover:bg-slate-700
        shadow-sm hover:shadow-md
        ${className}
      `}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-4 h-4 text-cyan-400" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-semibold font-mono">
          {isDark ? 'Oscuro' : 'Claro'}
        </span>
      )}
    </button>
  );
};
