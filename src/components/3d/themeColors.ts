import * as THREE from 'three';

export type ColorThemeId = 'cyan' | 'violet' | 'amber' | 'emerald';

export interface ThemePalette {
  shadow: THREE.Color;    // Tono profundo / sombra del color elegido
  primary: THREE.Color;   // Tono medio vibrante del color elegido
  highlight: THREE.Color; // Tono luminoso / cresta del color elegido
  accent: THREE.Color;    // Tono destello / fresnel más claro del color elegido
}

// Espectro monocromático degradado para Modo Oscuro (sobre fondo obsidiana #0B0813)
// Cada paleta utiliza exclusivamente tonos degradados del color seleccionado sin superposiciones
export const THEME_COLORS_DARK: Record<ColorThemeId, ThemePalette> = {
  cyan: {
    shadow: new THREE.Color('#083344'),    // Cian abisal profundo (Cyan 950)
    primary: new THREE.Color('#06b6d4'),   // Cian eléctrico puro (Cyan 500)
    highlight: new THREE.Color('#38bdf8'), // Cian luminoso brillante (Sky/Cyan 400)
    accent: new THREE.Color('#a5f3fc'),    // Destello de hielo cian cristalino (Cyan 200)
  },
  violet: {
    shadow: new THREE.Color('#3b0764'),    // Violeta abisal profundo (Purple 950)
    primary: new THREE.Color('#8b5cf6'),   // Violeta puro espectral (Violet 500)
    highlight: new THREE.Color('#c084fc'), // Violeta luminoso brillante (Purple 400)
    accent: new THREE.Color('#e9d5ff'),    // Destello lavanda cristalino (Purple 200)
  },
  amber: {
    shadow: new THREE.Color('#451a03'),    // Ámbar bronce abisal profundo (Amber 950)
    primary: new THREE.Color('#f59e0b'),   // Ámbar solar puro (Amber 500)
    highlight: new THREE.Color('#fbbf24'), // Ámbar dorado luminoso (Amber 400)
    accent: new THREE.Color('#fef3c7'),    // Destello oro incandescente (Amber 100)
  },
  emerald: {
    shadow: new THREE.Color('#022c22'),    // Esmeralda bosque abisal profundo (Emerald 950)
    primary: new THREE.Color('#10b981'),   // Esmeralda puro vibrante (Emerald 500)
    highlight: new THREE.Color('#34d399'), // Esmeralda luminoso brillante (Emerald 400)
    accent: new THREE.Color('#a7f3d0'),    // Destello menta fosforescente (Emerald 200)
  },
};

// Espectro monocromático degradado para Modo Claro (sobre alabastro #F8F7FA)
export const THEME_COLORS_LIGHT: Record<ColorThemeId, ThemePalette> = {
  cyan: {
    shadow: new THREE.Color('#0e7490'),    // Cian oscuro profundo (Cyan 700)
    primary: new THREE.Color('#0284c7'),   // Cian azul medio (Sky 600)
    highlight: new THREE.Color('#38bdf8'), // Cian claro brillante (Sky 400)
    accent: new THREE.Color('#bae6fd'),    // Brillo cian suave (Sky 200)
  },
  violet: {
    shadow: new THREE.Color('#581c87'),    // Violeta oscuro profundo (Purple 800)
    primary: new THREE.Color('#7c3aed'),   // Violeta medio (Violet 600)
    highlight: new THREE.Color('#a855f7'), // Violeta claro brillante (Purple 500)
    accent: new THREE.Color('#e9d5ff'),    // Brillo lavanda suave (Purple 200)
  },
  amber: {
    shadow: new THREE.Color('#78350f'),    // Ámbar oscuro profundo (Amber 800)
    primary: new THREE.Color('#d97706'),   // Ámbar medio tostado (Amber 600)
    highlight: new THREE.Color('#f59e0b'), // Ámbar claro brillante (Amber 500)
    accent: new THREE.Color('#fde68a'),    // Brillo dorado suave (Amber 200)
  },
  emerald: {
    shadow: new THREE.Color('#064e3b'),    // Esmeralda oscuro profundo (Emerald 800)
    primary: new THREE.Color('#059669'),   // Esmeralda medio (Emerald 600)
    highlight: new THREE.Color('#10b981'), // Esmeralda claro brillante (Emerald 500)
    accent: new THREE.Color('#a7f3d0'),    // Brillo menta suave (Emerald 200)
  },
};
