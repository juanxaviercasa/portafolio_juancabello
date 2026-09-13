import { create } from 'zustand';

export type SurfaceMode = 'clifford' | 'fourier' | 'spherical' | 'klein';

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

export const usePortfolioStore = create<PortfolioState>((set) => ({
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
