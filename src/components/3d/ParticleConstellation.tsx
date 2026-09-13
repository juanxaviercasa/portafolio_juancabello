import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { globalMouseVector } from '../../utils/mouseTracker';

const COUNT = 220;

export const ParticleConstellation: React.FC = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const colorTheme = usePortfolioStore((state) => state.labParams.colorTheme);

  // Buffer de datos iniciales de las partículas (posiciones base y velocidades)
  const [basePositions, offsets] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const offs = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      // Distribución esférica y toroidal alrededor de la escultura
      const radius = 2.4 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      offs[i * 3] = Math.random() * Math.PI * 2; // fase de oscilación X
      offs[i * 3 + 1] = Math.random() * Math.PI * 2; // fase Y
      offs[i * 3 + 2] = 0.3 + Math.random() * 0.7; // escala del punto
    }

    return [pos, offs];
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Color de las partículas según el tema
  const particleColor = useMemo(() => {
    switch (colorTheme) {
      case 'cyan': return new THREE.Color('#38bdf8');
      case 'violet': return new THREE.Color('#c084fc');
      case 'amber': return new THREE.Color('#fbbf24');
      case 'emerald': return new THREE.Color('#34d399');
      default: return new THREE.Color('#38bdf8');
    }
  }, [colorTheme]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime * 0.4;
    const mouseX = globalMouseVector.x * 3.5;
    const mouseY = globalMouseVector.y * 3.5;

    for (let i = 0; i < COUNT; i++) {
      const idx = i * 3;
      const baseX = basePositions[idx];
      const baseY = basePositions[idx + 1];
      const baseZ = basePositions[idx + 2];

      const phaseX = offsets[idx];
      const phaseY = offsets[idx + 1];
      const scaleBase = offsets[idx + 2];

      // Oscilación armónica sutil
      let x = baseX + Math.sin(time + phaseX) * 0.25;
      let y = baseY + Math.cos(time + phaseY) * 0.25;
      let z = baseZ + Math.sin(time * 0.7 + phaseX + phaseY) * 0.2;

      // Micro-gravedad y repulsión elástica por el cursor (Physics Playground pattern)
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
      args={[undefined, undefined, COUNT]}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color={particleColor}
        transparent={true}
        opacity={0.65}
      />
    </instancedMesh>
  );
};
