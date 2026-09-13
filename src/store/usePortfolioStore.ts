import { create } from 'zustand';

export type SurfaceMode = 'clifford' | 'fourier' | 'spherical' | 'klein';
export type ThemeMode = 'dark' | 'light';

export interface MathLabParams {
  surfaceMode: SurfaceMode;
  harmonics: number;
  amplitude: number;
  speed: number;
  wireframe: boolean;
  colorTheme: 'cyan' | 'violet' | 'amber' | 'emerald';
  soundModulation: boolean;
}

interface PortfolioState {
  // Theme state
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;

  // Navigation & Scroll
  activeSection: string;
  scrollProgress: number; // 0 to 1
  setActiveSection: (section: string) => void;
  setScrollProgress: (progress: number) => void;

  // Audio state
  isAudioMuted: boolean;
  toggleAudio: () => void;
  setAudioMuted: (muted: boolean) => void;

  // 3D Math Lab Parameters
  labParams: MathLabParams;
  setLabParam: <K extends keyof MathLabParams>(key: K, value: MathLabParams[K]) => void;
  resetLabParams: () => void;

  // Mobile navigation
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const defaultLabParams: MathLabParams = {
  surfaceMode: 'clifford',
  harmonics: 3,
  amplitude: 0.28,
  speed: 0.8,
  wireframe: false,
  colorTheme: 'cyan',
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

  labParams: { ...defaultLabParams },
  setLabParam: (key, value) =>
    set((state) => ({
      labParams: {
        ...state.labParams,
        [key]: value,
      },
    })),
  resetLabParams: () => set({ labParams: { ...defaultLabParams } }),

  isMobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
}));
