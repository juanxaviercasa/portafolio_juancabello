import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { createCliffordTorusGeometry } from '../../utils/mathFormulas';
import { globalMouseVector } from '../../utils/mouseTracker';

// Fénix 357 Dark Mode color palettes (Incandescent amber, electric purple, neon magenta)
const THEME_COLORS_DARK = {
  amber: {
    primary: new THREE.Color('#f59e0b'), // incandescent amber
    secondary: new THREE.Color('#9333ea'), // electric violet
    accent: new THREE.Color('#fde047'), // bright flame gold
  },
  violet: {
    primary: new THREE.Color('#c084fc'), // amethyst light
    secondary: new THREE.Color('#7e22ce'), // royal purple
    accent: new THREE.Color('#fbbf24'), // golden amber crown
  },
  cyan: {
    primary: new THREE.Color('#38bdf8'),
    secondary: new THREE.Color('#6366f1'),
    accent: new THREE.Color('#fcd34d'),
  },
  emerald: {
    primary: new THREE.Color('#34d399'),
    secondary: new THREE.Color('#8b5cf6'),
    accent: new THREE.Color('#fbbf24'),
  },
};

// Fénix 357 Light Mode color palettes (Amethyst slate & rich amber fire)
const THEME_COLORS_LIGHT = {
  amber: {
    primary: new THREE.Color('#d97706'),
    secondary: new THREE.Color('#7e22ce'),
    accent: new THREE.Color('#b45309'),
  },
  violet: {
    primary: new THREE.Color('#7c3aed'),
    secondary: new THREE.Color('#c026d3'),
    accent: new THREE.Color('#d97706'),
  },
  cyan: {
    primary: new THREE.Color('#2563eb'),
    secondary: new THREE.Color('#9333ea'),
    accent: new THREE.Color('#d97706'),
  },
  emerald: {
    primary: new THREE.Color('#059669'),
    secondary: new THREE.Color('#7c3aed'),
    accent: new THREE.Color('#d97706'),
  },
};

const vertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uHarmonics;
  uniform float uAmplitude;
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform int uMode; // 0: phoenix wings, 1: fourier sheet, 2: spherical harmonic, 3: klein/atractor

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vDisplacement;
  varying vec3 vViewPosition;
  varying float vFlameIntensity;

  #define PI 3.14159265358979323846

  void main() {
    vUv = uv;
    vec3 pos = position;
    vec3 norm = normal;

    float t = uTime * uSpeed * 0.9;
    float disp = 0.0;

    // Síntesis de armónicos 357 acumulativa (armónicos impares primarios 3, 5, 7)
    float h = clamp(uHarmonics, 1.0, 8.0);
    for (float k = 1.0; k <= 8.0; k += 1.0) {
      if (k > h) break;
      float weight = 1.0 / (k * 0.85);
      float phase = t + k * 0.628;
      float wave = sin(k * uv.x * PI * 2.0 + phase) * cos(k * uv.y * PI * 2.0 + phase * 0.7);
      disp += weight * wave;
    }

    disp *= uAmplitude;

    // Reactividad al cursor (campo magnético vectorial del Fénix)
    float mouseDistance = length(pos.xy - uMouse * 2.5);
    float mouseInfluence = smoothstep(2.8, 0.0, mouseDistance) * 0.35;
    disp += mouseInfluence * sin(uTime * 3.5 + pos.x * 2.5);

    // Morfología del Fénix Fractal y Variedades Topológicas
    if (uMode == 0) {
      // MODO FÉNIX: Modulación de alas paramétricas y batir armónico
      float wingSpread = abs(pos.x) * 0.8;
      float wingFlap = sin(t * 2.2 + abs(pos.x) * 1.5) * wingSpread * 0.45;
      float featherRipple = sin(pos.y * 8.0 + t * 3.0) * 0.08 * uAmplitude;
      
      pos.y += wingFlap + featherRipple;
      pos.z += sin(pos.x * PI + t) * wingSpread * 0.25;
      pos += norm * (disp * 1.25);
    } else if (uMode == 1) {
      // Sábana de Fourier (Ondas armónicas superpuestas)
      pos.z += disp * 2.4;
    } else if (uMode == 2) {
      // Armónico esférico de energía
      pos = normalize(pos) * (1.65 + disp * 1.6);
    } else if (uMode == 3) {
      // Variedad de Klein / Atractor caótico
      float pinch = sin(uv.y * PI) * 0.45;
      pos += norm * (disp + pinch);
    }

    // Intensidad térmica para bioluminiscencia (crestas de alas y ápices más calientes)
    vFlameIntensity = smoothstep(-0.25, 0.45, disp) + abs(pos.x) * 0.2;
    vDisplacement = disp;
    vPosition = pos;
    vNormal = normalize(normalMatrix * norm);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform vec3 uColorPrimary;
  uniform vec3 uColorSecondary;
  uniform vec3 uColorAccent;
  uniform float uTime;
  uniform float uScroll;
  uniform float uIsLight;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vDisplacement;
  varying vec3 vViewPosition;
  varying float vFlameIntensity;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    // Fresnel óptico para efecto de cristal de fuego iridiscente
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.4);

    // Gradiente térmico: violeta abisal en los valles -> ámbar/fuego incandescente en las crestas
    float flameFactor = clamp(vFlameIntensity, 0.0, 1.0);
    vec3 baseColor = mix(uColorSecondary, uColorPrimary, flameFactor);

    // Destellos incandescentes en los vértices más calientes (Bloom selectivo)
    vec3 hotGlow = mix(baseColor, uColorAccent, pow(flameFactor, 2.0));

    // Iluminación difusa y especular
    vec3 lightDir = normalize(vec3(1.2, 2.5, 3.2));
    float diff = max(dot(normal, lightDir), 0.0) * 0.65 + 0.35;
    
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 28.0) * 0.75;

    vec3 finalColor;

    if (uIsLight > 0.5) {
      // MODO CLARO: Contraste nítido con reflejos dorados y amatista
      finalColor = hotGlow * (diff * 0.75 + 0.35);
      finalColor += fresnel * uColorPrimary * 0.8;
      finalColor += spec * uColorAccent * 0.6;
      finalColor = mix(finalColor, uColorAccent, uScroll * 0.15);
      gl_FragColor = vec4(finalColor, 0.94);
    } else {
      // MODO OSCURO: Bioluminiscencia del Fénix 357 con corona incandescente
      finalColor = hotGlow * diff;
      finalColor += fresnel * uColorAccent * 1.5;
      finalColor += spec * vec3(1.0, 0.95, 0.8);
      // Pulso armónico sutil
      float pulse = 0.95 + 0.05 * sin(uTime * 2.0);
      finalColor *= pulse;
      finalColor = mix(finalColor, uColorPrimary, uScroll * 0.25);
      gl_FragColor = vec4(finalColor, 0.90);
    }
  }
`;

export const MathematicalSculpture: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const labParams = usePortfolioStore((state) => state.labParams);
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const theme = usePortfolioStore((state) => state.theme);

  const isLight = theme === 'light';

  // Mapear modo de superficie a índice numérico
  const modeIndex = useMemo(() => {
    switch (labParams.surfaceMode) {
      case 'clifford': return 0; // Fénix Alado / Toroide
      case 'fourier': return 1;
      case 'spherical': return 2;
      case 'klein': return 3;
      default: return 0;
    }
  }, [labParams.surfaceMode]);

  // Geometría prealocada en Float32Array
  const geometry = useMemo(() => {
    if (labParams.surfaceMode === 'fourier') {
      return new THREE.PlaneGeometry(3.6, 3.6, 96, 96);
    } else if (labParams.surfaceMode === 'spherical') {
      return new THREE.SphereGeometry(1.5, 96, 96);
    } else {
      // Toro de Clifford / Malla alada del Fénix
      return createCliffordTorusGeometry(128, 128, 1.35, 0.55);
    }
  }, [labParams.surfaceMode]);

  // Colores activos según el modo de tema
  const activeColors = useMemo(() => {
    const paletteMap = isLight ? THEME_COLORS_LIGHT : THEME_COLORS_DARK;
    return paletteMap[labParams.colorTheme] || paletteMap.amber;
  }, [isLight, labParams.colorTheme]);

  // Uniforms del shader
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: labParams.speed },
      uHarmonics: { value: labParams.harmonics },
      uAmplitude: { value: labParams.amplitude },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMode: { value: modeIndex },
      uIsLight: { value: isLight ? 1.0 : 0.0 },
      uColorPrimary: { value: activeColors.primary },
      uColorSecondary: { value: activeColors.secondary },
      uColorAccent: { value: activeColors.accent },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Render loop sincronizado a 60 FPS
  useFrame((state, delta) => {
    if (!materialRef.current || !meshRef.current) return;

    // Actualizar uniforms
    materialRef.current.uniforms.uTime.value += delta;
    materialRef.current.uniforms.uSpeed.value = labParams.speed;
    materialRef.current.uniforms.uHarmonics.value = labParams.harmonics;
    materialRef.current.uniforms.uAmplitude.value = labParams.amplitude;
    materialRef.current.uniforms.uMode.value = modeIndex;
    materialRef.current.uniforms.uScroll.value = scrollProgress;
    materialRef.current.uniforms.uIsLight.value = isLight ? 1.0 : 0.0;

    // Mouse suavizado con lerp
    const targetX = globalMouseVector.x;
    const targetY = globalMouseVector.y;
    materialRef.current.uniforms.uMouse.value.lerp(globalMouseVector, 0.06);

    // Actualizar colores si cambia el tema o paleta
    materialRef.current.uniforms.uColorPrimary.value.copy(activeColors.primary);
    materialRef.current.uniforms.uColorSecondary.value.copy(activeColors.secondary);
    materialRef.current.uniforms.uColorAccent.value.copy(activeColors.accent);

    // Rotación suave con inercia del Fénix
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      0.32 + scrollProgress * Math.PI * 1.5 + targetY * 0.25,
      0.04
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      state.clock.elapsedTime * 0.16 + scrollProgress * Math.PI * 2.0 + targetX * 0.35,
      0.04
    );
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef} geometry={geometry}>
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent={true}
          wireframe={labParams.wireframe}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};
