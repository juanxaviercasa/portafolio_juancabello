import React, { Suspense, useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MathematicalSculpture } from './MathematicalSculpture';
import { ParticleConstellation } from './ParticleConstellation';
import { CameraController } from './CameraController';
import { usePortfolioStore } from '../../store/usePortfolioStore';

import { globalMouseVector } from '../../utils/mouseTracker';
import * as THREE from 'three';

const CursorPointLight: React.FC<{ isLight: boolean }> = ({ isLight }) => {
  const lightRef = useRef<THREE.PointLight>(null);
  const labParams = usePortfolioStore((state) => state.labParams);

  useFrame(() => {
    if (!lightRef.current) return;
    lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, globalMouseVector.x * 4.0, 0.08);
    lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, globalMouseVector.y * 3.5, 0.08);
  });

  const activeLightColor = useMemo(() => {
    switch (labParams.colorTheme) {
      case 'cyan': return isLight ? '#0284c7' : '#38bdf8';
      case 'violet': return isLight ? '#7c3aed' : '#c084fc';
      case 'amber': return isLight ? '#d97706' : '#fbbf24';
      case 'emerald': return isLight ? '#059669' : '#34d399';
      default: return '#38bdf8';
    }
  }, [isLight, labParams.colorTheme]);

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 3.8]}
      intensity={isLight ? 1.4 : 2.0}
      distance={14}
      color={activeLightColor}
    />
  );
};

export const SceneContainer: React.FC = () => {
  const [hasWebGL] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
      return false;
    }
  });
  const [isMobile, setIsMobile] = useState(false);
  const theme = usePortfolioStore((state) => state.theme);
  const isLight = theme === 'light';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!hasWebGL) {
    // Fallback elegante para entornos sin soporte WebGL
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden math-grid-bg">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60 sm:opacity-90 dark:opacity-85 lg:opacity-100 transition-opacity duration-500">
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        camera={{ fov: 45, position: [0, 0, 4.8], near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Iluminación adaptativa Fénix 357 */}
          <ambientLight intensity={isLight ? 0.8 : 0.45} />
          <directionalLight
            position={[5, 6, 4]}
            intensity={isLight ? 1.5 : 1.3}
            color={isLight ? '#ffffff' : '#fef3c7'}
          />
          {/* Luz de relleno en violeta eléctrico */}
          <pointLight
            position={[-4, -3, -2]}
            intensity={isLight ? 1.0 : 1.2}
            color={isLight ? '#7c3aed' : '#a855f7'}
          />
          {/* Luz de contorno en fucsia / amatista */}
          <pointLight
            position={[3, -4, 3]}
            intensity={isLight ? 0.8 : 0.9}
            color={isLight ? '#c026d3' : '#e879f9'}
          />
          {/* Luz puntual dinámica del Fénix que sigue suavemente el cursor */}
          <CursorPointLight isLight={isLight} />

          {/* Controlador Cinemático de Cámara */}
          <CameraController />

          {/* Escultura Matemática Central del Fénix */}
          <MathematicalSculpture />

          {/* Enjambre de 3,500 Partículas GPU */}
          <ParticleConstellation />
        </Suspense>
      </Canvas>
    </div>
  );
};
