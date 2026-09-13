import * as THREE from 'three';

export type ColorThemeId = 'cyan' | 'violet' | 'amber' | 'emerald';

export interface ThemePalette {
  primary: THREE.Color;
  secondary: THREE.Color;
  accent: THREE.Color;
}

// Espectro cromático complementario para Modo Oscuro (sobre lienzo obsidiana Fénix #0B0813)
export const THEME_COLORS_DARK: Record<ColorThemeId, ThemePalette> = {
  cyan: {
    primary: new THREE.Color('#38bdf8'), // Cian Cuántico Eléctrico
    secondary: new THREE.Color('#4f46e5'), // Índigo Cuántico Profundo
    accent: new THREE.Color('#e0f2fe'), // Destello Hielo Cristalino
  },
  violet: {
    primary: new THREE.Color('#a855f7'), // Amatista Espectral Vívido
    secondary: new THREE.Color('#ec4899'), // Magenta / Fucsia Neón
    accent: new THREE.Color('#fae8ff'), // Halo Lavanda Cristalino
  },
  amber: {
    primary: new THREE.Color('#f59e0b'), // Ámbar Resonante Incandescente
    secondary: new THREE.Color('#ef4444'), // Fuego Fénix Carmesí
    accent: new THREE.Color('#fef3c7'), // Corona Oro Blanco Caliente
  },
  emerald: {
    primary: new THREE.Color('#10b981'), // Esmeralda Gaussiano Aurora
    secondary: new THREE.Color('#06b6d4'), // Turquesa Oceánico Cuántico
    accent: new THREE.Color('#d1fae5'), // Menta Fosforescente Bioluminiscente
  },
};

// Espectro cromático de alto contraste para Modo Claro (sobre alabastro #F8F7FA)
export const THEME_COLORS_LIGHT: Record<ColorThemeId, ThemePalette> = {
  cyan: {
    primary: new THREE.Color('#0284c7'), // Azul Zafiro Puro
    secondary: new THREE.Color('#1d4ed8'), // Azul Real Cobalto
    accent: new THREE.Color('#0369a1'), // Marino Profundo
  },
  violet: {
    primary: new THREE.Color('#7c3aed'), // Violeta Real
    secondary: new THREE.Color('#c026d3'), // Orquídea Magenta
    accent: new THREE.Color('#4c1d95'), // Amatista Púrpura Profundo
  },
  amber: {
    primary: new THREE.Color('#d97706'), // Ámbar Tostado Solar
    secondary: new THREE.Color('#dc2626'), // Bermellón Cálido
    accent: new THREE.Color('#78350f'), // Sepia Dorado
  },
  emerald: {
    primary: new THREE.Color('#059669'), // Jade Forestal Nítido
    secondary: new THREE.Color('#0891b2'), // Teal Profundo
    accent: new THREE.Color('#064e3b'), // Pino Botánico
  },
};
