import React, { useMemo, useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { globalMouseVector } from '../../utils/mouseTracker';

const DESKTOP_COUNT = 3500;
const MOBILE_COUNT = 1500;

// Generación determinista de las posiciones del Enjambre Fénix (Alas fractales y llama central)
function generatePhoenixBuffers(totalCount: number) {
  const positions = new Float32Array(totalCount * 3);
  const randoms = new Float32Array(totalCount * 4); // [phase, speed, wingFactor, scale]
  const colors = new Float32Array(totalCount * 3);

  let seed = 35711;
  const pseudoRandom = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  const amberColor = new THREE.Color('#fbbf24');
  const fireColor = new THREE.Color('#f59e0b');
  const magentaColor = new THREE.Color('#e879f9');
  const purpleColor = new THREE.Color('#a855f7');
  const tempColor = new THREE.Color();

  for (let i = 0; i < totalCount; i++) {
    const i3 = i * 3;
    const i4 = i * 4;

    // Distribución alada del Fénix: 65% alas paramétricas, 35% columna de llama central
    const isWing = pseudoRandom() < 0.68;
    let x = 0, y = 0, z = 0;
    let tColor = 0;

    if (isWing) {
      // Alas abiertas en abanico helicoidal
      const side = pseudoRandom() > 0.5 ? 1 : -1;
      const span = 0.5 + pseudoRandom() * 2.6;
      const angle = (pseudoRandom() - 0.5) * 1.4;
      
      x = side * (span * Math.cos(angle) + 0.3);
      y = span * Math.sin(angle) * 0.7 + (pseudoRandom() - 0.5) * 0.9;
      z = (pseudoRandom() - 0.5) * 1.2 + Math.sin(span * 2.0) * 0.4;
      tColor = span / 3.0; // Puntas de las alas más calientes / doradas
    } else {
      // Columna de fuego y ascensión térmica central
      const height = (pseudoRandom() - 0.5) * 3.6;
      const radius = (0.2 + pseudoRandom() * 0.8) * (1.2 - Math.abs(height) * 0.2);
      const theta = pseudoRandom() * Math.PI * 2;

      x = radius * Math.cos(theta);
      y = height;
      z = radius * Math.sin(theta);
      tColor = 1.0 - Math.abs(height) / 2.0;
    }

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;

    randoms[i4] = pseudoRandom() * Math.PI * 2; // phase
    randoms[i4 + 1] = 0.6 + pseudoRandom() * 1.2; // speed
    randoms[i4 + 2] = isWing ? 1.0 : 0.0; // isWing
    randoms[i4 + 3] = 0.6 + pseudoRandom() * 1.0; // scale

    // Gradiente térmico: ámbar/oro en el núcleo y puntas, púrpura/fucsia en la estela
    if (tColor > 0.6) {
      tempColor.lerpColors(fireColor, amberColor, (tColor - 0.6) / 0.4);
    } else {
      tempColor.lerpColors(purpleColor, magentaColor, tColor / 0.6);
    }

    colors[i3] = tempColor.r;
    colors[i3 + 1] = tempColor.g;
    colors[i3 + 2] = tempColor.b;
  }

  return { positions, randoms, colors };
}

const { positions: BASE_POS, randoms: RANDOMS, colors: BASE_COLORS } = generatePhoenixBuffers(DESKTOP_COUNT);

const particleVertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uHarmonics;
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform float uPixelRatio;

  attribute vec4 aRandom;
  attribute vec3 aColor;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;

    vec3 pos = position;
    float phase = aRandom.x;
    float pSpeed = aRandom.y * uSpeed;
    float isWing = aRandom.z;
    float pScale = aRandom.w;

    float t = uTime * pSpeed * 0.8;

    // Batir de alas de energía y remolino caótico del Fénix
    if (isWing > 0.5) {
      float flap = sin(t * 2.2 + abs(pos.x) * 1.6 + phase) * 0.35 * (abs(pos.x) * 0.6);
      pos.y += flap;
      pos.z += cos(t * 1.8 + phase) * 0.2;
    } else {
      // Ascensión de chispas
      pos.y += sin(t * 2.5 + phase) * 0.35;
      pos.x += cos(t * 1.6 + pos.y * 2.0) * 0.15;
    }

    // Interacción dinámica con el mouse (repulsión magnética)
    vec2 mDiff = pos.xy - uMouse * 2.8;
    float mDist = length(mDiff);
    if (mDist < 2.2) {
      float force = (2.2 - mDist) * 0.35;
      pos.xy += normalize(mDiff) * force;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Atenuación de tamaño por distancia de cámara y pulsación armónica
    float harmonicPulse = 1.0 + sin(uTime * 3.0 + phase) * 0.3;
    gl_PointSize = (18.0 * pScale * harmonicPulse * uPixelRatio) / -mvPosition.z;

    vAlpha = smoothstep(0.1, 0.4, pScale);
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  uniform float uIsLight;

  void main() {
    // Partícula esférica con halo suave y decaimiento radial
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    float intensity = smoothstep(0.5, 0.05, dist);
    // Destello interior incandescente
    float core = smoothstep(0.2, 0.0, dist) * 0.5;

    vec3 finalColor = vColor + vec3(core);

    float alpha = intensity * (uIsLight > 0.5 ? 0.75 : 0.85);
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export const ParticleConstellation: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const labParams = usePortfolioStore((state) => state.labParams);
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const theme = usePortfolioStore((state) => state.theme);
  const isLight = theme === 'light';

  const [count, setCount] = useState(DESKTOP_COUNT);

  useEffect(() => {
    const handleResize = () => {
      setCount(window.innerWidth < 640 ? MOBILE_COUNT : DESKTOP_COUNT);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const posSlice = BASE_POS.slice(0, count * 3);
    const randSlice = RANDOMS.slice(0, count * 4);
    const colSlice = BASE_COLORS.slice(0, count * 3);

    geom.setAttribute('position', new THREE.BufferAttribute(posSlice, 3));
    geom.setAttribute('aRandom', new THREE.BufferAttribute(randSlice, 4));
    geom.setAttribute('aColor', new THREE.BufferAttribute(colSlice, 3));
    return geom;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: labParams.speed },
      uHarmonics: { value: labParams.harmonics },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uIsLight: { value: isLight ? 1.0 : 0.0 },
      uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state, delta) => {
    if (!materialRef.current || !pointsRef.current) return;

    materialRef.current.uniforms.uTime.value += delta;
    materialRef.current.uniforms.uSpeed.value = labParams.speed;
    materialRef.current.uniforms.uHarmonics.value = labParams.harmonics;
    materialRef.current.uniforms.uScroll.value = scrollProgress;
    materialRef.current.uniforms.uIsLight.value = isLight ? 1.0 : 0.0;
    materialRef.current.uniforms.uMouse.value.lerp(globalMouseVector, 0.08);

    // Rotación suave con inercia coordinada con la escultura central
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.08 + scrollProgress * Math.PI;
    pointsRef.current.rotation.x = scrollProgress * 0.5;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
