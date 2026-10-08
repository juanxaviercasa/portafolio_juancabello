import { create } from 'zustand';

export type SurfaceMode = 'clifford' | 'fourier' | 'spherical' | 'klein';
export type ThemeMode = 'dark' | 'light';
export type ColorTheme = 'cyan' | 'violet' | 'amber' | 'emerald';
export type PedagogicalMode = 'intuitive' | 'academic';

export interface MathLabParams {
  surfaceMode: SurfaceMode;
  harmonics: number;
  amplitude: number;
  speed: number;
  wireframe: boolean;
  colorTheme: ColorTheme;
  soundModulation: boolean;
}

export type ConcertFrequency = 432 | 528 | 396 | 639;

export interface AudioSettings {
  fundamentalFreq: ConcertFrequency;
  isConcertMode: boolean; // Modo concierto con orquestación melódica neoclásica
}

interface PortfolioState {
  // Theme state
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;

  // Pedagogical Lens / Modo Didáctico ('intuitive' para explicaciones simples o 'academic' para rigor técnico)
  pedagogicalMode: PedagogicalMode;
  togglePedagogicalMode: () => void;
  setPedagogicalMode: (mode: PedagogicalMode) => void;

  // Navigation & Scroll
  activeSection: string;
  scrollProgress: number; // 0 to 1
  setActiveSection: (section: string) => void;
  setScrollProgress: (progress: number) => void;

  // Audio state
  isAudioMuted: boolean;
  toggleAudio: () => void;
  setAudioMuted: (muted: boolean) => void;
  audioSettings: AudioSettings;
  setFundamentalFreq: (freq: ConcertFrequency) => void;
  toggleConcertMode: () => void;

  // 3D Math Lab Parameters
  labParams: MathLabParams;
  setLabParam: <K extends keyof MathLabParams>(key: K, value: MathLabParams[K]) => void;
  resetLabParams: () => void;

}

const getInitialColorTheme = (): ColorTheme => {
  if (typeof window === 'undefined') return 'cyan';
  const saved = localStorage.getItem('portfolio_brand_theme');
  return saved === 'violet' || saved === 'amber' || saved === 'emerald' || saved === 'cyan' ? saved : 'cyan';
};

const defaultLabParams: MathLabParams = {
  surfaceMode: 'clifford',
  harmonics: 3,
  amplitude: 0.28,
  speed: 0.8,
  wireframe: false,
  colorTheme: getInitialColorTheme(),
  soundModulation: false,
};

const getInitialTheme = (): ThemeMode => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('portfolio_theme');
    if (saved === 'light' || saved === 'dark') {
      if (saved === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return saved;
    }
    // Check system preference fallback if needed, default to dark
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const initial = prefersLight ? 'light' : 'dark';
    if (initial === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return initial;
  }
  return 'dark';
};

const getInitialPedagogicalMode = (): PedagogicalMode => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('portfolio_pedagogical_mode');
    if (saved === 'intuitive' || saved === 'academic') {
      return saved;
    }
  }
  // Por defecto 'intuitive' tal como confirmó el usuario: amigable para estudiantes y niños
  return 'intuitive';
};

export const usePortfolioStore = create<PortfolioState>((set) => ({
  theme: getInitialTheme(),
  toggleTheme: () =>
    set((state) => {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolio_theme', nextTheme);
        if (nextTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return { theme: nextTheme };
    }),
  setTheme: (theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    set({ theme });
  },

  pedagogicalMode: getInitialPedagogicalMode(),
  togglePedagogicalMode: () =>
    set((state) => {
      const nextMode = state.pedagogicalMode === 'intuitive' ? 'academic' : 'intuitive';
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolio_pedagogical_mode', nextMode);
      }
      return { pedagogicalMode: nextMode };
    }),
  setPedagogicalMode: (mode) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_pedagogical_mode', mode);
    }
    set({ pedagogicalMode: mode });
  },

  activeSection: 'hero',
  scrollProgress: 0,
  setActiveSection: (section) => set({ activeSection: section }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),

  isAudioMuted: typeof window !== 'undefined' ? localStorage.getItem('portfolio_audio_muted') !== 'false' : true,
  toggleAudio: () =>
    set((state) => {
      const nextState = !state.isAudioMuted;
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolio_audio_muted', String(nextState));
      }
      return { isAudioMuted: nextState };
    }),
  setAudioMuted: (muted) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_audio_muted', String(muted));
    }
    set({ isAudioMuted: muted });
  },
  audioSettings: {
    fundamentalFreq: 432,
    isConcertMode: true,
  },
  setFundamentalFreq: (freq) =>
    set((state) => ({
      audioSettings: { ...state.audioSettings, fundamentalFreq: freq },
    })),
  toggleConcertMode: () =>
    set((state) => ({
      audioSettings: { ...state.audioSettings, isConcertMode: !state.audioSettings.isConcertMode },
    })),

  labParams: { ...defaultLabParams },
  setLabParam: (key, value) => {
    if (key === 'colorTheme' && typeof window !== 'undefined') {
      localStorage.setItem('portfolio_brand_theme', String(value));
    }
    set((state) => ({
      labParams: {
        ...state.labParams,
        [key]: value,
      },
    }));
  },
  resetLabParams: () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_brand_theme', 'cyan');
    }
    set({ labParams: { ...defaultLabParams, colorTheme: 'cyan' } });
  },
}));
