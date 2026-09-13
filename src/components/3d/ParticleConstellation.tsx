import React, { useMemo, useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { globalMouseVector } from '../../utils/mouseTracker';

const DESKTOP_COUNT = 200;
const MOBILE_COUNT = 75;

// Generación determinista fuera del render para máxima pureza y rendimiento
function generateParticleBuffers(totalCount: number) {
  const pos = new Float32Array(totalCount * 3);
  const offs = new Float32Array(totalCount * 3);

  let seed = 1337;
  const pseudoRandom = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let i = 0; i < totalCount; i++) {
    const radius = 2.4 + pseudoRandom() * 3.2;
    const theta = pseudoRandom() * Math.PI * 2;
    const phi = Math.acos(pseudoRandom() * 2 - 1);

    pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = radius * Math.cos(phi);

    offs[i * 3] = pseudoRandom() * Math.PI * 2;
    offs[i * 3 + 1] = pseudoRandom() * Math.PI * 2;
    offs[i * 3 + 2] = 0.3 + pseudoRandom() * 0.7;
  }

  return { pos, offs };
}

const { pos: BASE_POSITIONS, offs: OFFSETS } = generateParticleBuffers(DESKTOP_COUNT);

export const ParticleConstellation: React.FC = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const colorTheme = usePortfolioStore((state) => state.labParams.colorTheme);
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

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Color de las partículas según el tema y modo oscuro/claro
  const particleColor = useMemo(() => {
    if (isLight) {
      switch (colorTheme) {
        case 'cyan': return new THREE.Color('#2563eb');
        case 'violet': return new THREE.Color('#7c3aed');
        case 'amber': return new THREE.Color('#d97706');
        case 'emerald': return new THREE.Color('#059669');
        default: return new THREE.Color('#2563eb');
      }
    } else {
      switch (colorTheme) {
        case 'cyan': return new THREE.Color('#38bdf8');
        case 'violet': return new THREE.Color('#c084fc');
        case 'amber': return new THREE.Color('#fbbf24');
        case 'emerald': return new THREE.Color('#34d399');
        default: return new THREE.Color('#38bdf8');
      }
    }
  }, [colorTheme, isLight]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime * 0.4;
    const mouseX = globalMouseVector.x * 3.5;
    const mouseY = globalMouseVector.y * 3.5;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const baseX = BASE_POSITIONS[idx];
      const baseY = BASE_POSITIONS[idx + 1];
      const baseZ = BASE_POSITIONS[idx + 2];

      const phaseX = OFFSETS[idx];
      const phaseY = OFFSETS[idx + 1];
      const scaleBase = OFFSETS[idx + 2];

      let x = baseX + Math.sin(time + phaseX) * 0.25;
      let y = baseY + Math.cos(time + phaseY) * 0.25;
      let z = baseZ + Math.sin(time * 0.7 + phaseX + phaseY) * 0.2;

      // Micro-gravedad y repulsión elástica por el cursor
      const dx = x - mouseX;
      const dy = y - mouseY;
      const distSq = dx * dx + dy * dy;

      if (distSq < 4.0) {
        const force = (4.0 - distSq) * 0.18;
        x += dx * force;
        y += dy * force;
      }

      dummy.position.set(x, y, z);
      const s = scaleBase * (0.028 + Math.sin(time * 2.0 + phaseX) * 0.008);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color={particleColor}
        transparent={true}
        opacity={isLight ? 0.75 : 0.65}
      />
    </instancedMesh>
  );
};
