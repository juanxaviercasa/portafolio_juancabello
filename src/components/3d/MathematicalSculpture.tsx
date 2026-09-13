import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { createCliffordTorusGeometry } from '../../utils/mathFormulas';
import { globalMouseVector } from '../../utils/mouseTracker';

// Dark Mode color palettes
const THEME_COLORS_DARK = {
  cyan: {
    primary: new THREE.Color('#06b6d4'),
    secondary: new THREE.Color('#3b82f6'),
    accent: new THREE.Color('#e0f2fe'),
  },
  violet: {
    primary: new THREE.Color('#a855f7'),
    secondary: new THREE.Color('#ec4899'),
    accent: new THREE.Color('#fae8ff'),
  },
  amber: {
    primary: new THREE.Color('#f59e0b'),
    secondary: new THREE.Color('#ef4444'),
    accent: new THREE.Color('#fef3c7'),
  },
  emerald: {
    primary: new THREE.Color('#10b981'),
    secondary: new THREE.Color('#06b6d4'),
    accent: new THREE.Color('#d1fae5'),
  },
};

// Light Mode color palettes (richer saturation & contrast against #F8FAFC)
const THEME_COLORS_LIGHT = {
  cyan: {
    primary: new THREE.Color('#2563eb'), // deep sapphire
    secondary: new THREE.Color('#0284c7'), // technical cobalt
    accent: new THREE.Color('#1d4ed8'),
  },
  violet: {
    primary: new THREE.Color('#7c3aed'),
    secondary: new THREE.Color('#db2777'),
    accent: new THREE.Color('#6d28d9'),
  },
  amber: {
    primary: new THREE.Color('#d97706'),
    secondary: new THREE.Color('#b91c1c'),
    accent: new THREE.Color('#b45309'),
  },
  emerald: {
    primary: new THREE.Color('#059669'), // technical emerald
    secondary: new THREE.Color('#2563eb'), // sapphire accent
    accent: new THREE.Color('#047857'),
  },
};

const vertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uHarmonics;
  uniform float uAmplitude;
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform int uMode; // 0: clifford, 1: fourier, 2: spherical, 3: klein

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vDisplacement;
  varying vec3 vViewPosition;

  #define PI 3.14159265358979323846

  void main() {
    vUv = uv;
    vec3 pos = position;
    vec3 norm = normal;

    float t = uTime * uSpeed * 0.8;
    float disp = 0.0;

    // Síntesis de Fourier armónica acumulativa
    float h = clamp(uHarmonics, 1.0, 8.0);
    for (float k = 1.0; k <= 8.0; k += 1.0) {
      if (k > h) break;
      float weight = 1.0 / k;
      float phase = t + k * 0.5;
      float wave = sin(k * uv.x * PI * 2.0 + phase) * cos(k * uv.y * PI * 2.0 + phase * 0.7);
      disp += weight * wave;
    }

    disp *= uAmplitude;

    // Reactividad al cursor (campo magnético)
    float mouseDistance = length(pos.xy - uMouse * 2.0);
    float mouseInfluence = smoothstep(2.5, 0.0, mouseDistance) * 0.25;
    disp += mouseInfluence * sin(uTime * 3.0 + pos.x * 2.0);

    // Variaciones según el modo topológico seleccionado
    if (uMode == 0) {
      // Toroide de Clifford
      pos += norm * disp;
    } else if (uMode == 1) {
      // Sábana de Fourier (Ondas sinusoidales superpuestas)
      pos.z += disp * 2.2;
    } else if (uMode == 2) {
      // Armónico esférico
      pos = normalize(pos) * (1.6 + disp * 1.5);
    } else if (uMode == 3) {
      // Botella de Klein simulada
      float pinch = sin(uv.y * PI) * 0.4;
      pos += norm * (disp + pinch);
    }

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

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    // Fresnel óptico para efecto de cristal iridiscente
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.2);

    // Gradiente matemático basado en la altura y desplazamiento de Fourier
    float factor = smoothstep(-0.4, 0.4, vDisplacement);
    vec3 baseColor = mix(uColorSecondary, uColorPrimary, factor);

    // Luz difusa y especular suave
    vec3 lightDir = normalize(vec3(1.0, 2.0, 3.0));
    float diff = max(dot(normal, lightDir), 0.0) * 0.6 + 0.4;
    
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0) * 0.6;

    vec3 finalColor;

    if (uIsLight > 0.5) {
      // MODO CLARO: Mayor densidad cromática, contraste nítido y reflejos limpios
      finalColor = baseColor * (diff * 0.75 + 0.35);
      finalColor += fresnel * uColorSecondary * 0.7;
      finalColor += spec * vec3(0.9, 0.95, 1.0) * 0.5;
      finalColor = mix(finalColor, uColorPrimary, uScroll * 0.15);
      gl_FragColor = vec4(finalColor, 0.92);
    } else {
      // MODO OSCURO: Luminiscencia etérea con borde de Fresnel brillante
      finalColor = baseColor * diff;
      finalColor += fresnel * uColorAccent * 1.2;
      finalColor += spec * vec3(1.0);
      finalColor = mix(finalColor, uColorPrimary, uScroll * 0.25);
      gl_FragColor = vec4(finalColor, 0.88);
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
      case 'clifford': return 0;
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
      // Toro de Clifford / Klein
      return createCliffordTorusGeometry(128, 128, 1.25, 0.52);
    }
  }, [labParams.surfaceMode]);

  // Colores activos según el modo de tema
  const activeColors = useMemo(() => {
    const paletteMap = isLight ? THEME_COLORS_LIGHT : THEME_COLORS_DARK;
    return paletteMap[labParams.colorTheme] || paletteMap.cyan;
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
    materialRef.current.uniforms.uMouse.value.lerp(globalMouseVector, 0.05);

    // Actualizar colores si cambia el tema o paleta
    materialRef.current.uniforms.uColorPrimary.value.copy(activeColors.primary);
    materialRef.current.uniforms.uColorSecondary.value.copy(activeColors.secondary);
    materialRef.current.uniforms.uColorAccent.value.copy(activeColors.accent);

    // Rotación suave del objeto: rotación autónoma + respuesta al scroll
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      0.35 + scrollProgress * Math.PI * 1.5 + targetY * 0.2,
      0.04
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      state.clock.elapsedTime * 0.15 + scrollProgress * Math.PI * 2.0 + targetX * 0.3,
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
