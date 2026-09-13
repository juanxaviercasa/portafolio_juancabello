import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { MathematicalSculpture } from './MathematicalSculpture';
import { ParticleConstellation } from './ParticleConstellation';
import { CameraController } from './CameraController';
import { usePortfolioStore } from '../../store/usePortfolioStore';

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
          {/* Iluminación adaptativa según el tema (Modo Claro vs Modo Oscuro) */}
          <ambientLight intensity={isLight ? 0.75 : 0.4} />
          <directionalLight
            position={[5, 6, 4]}
            intensity={isLight ? 1.4 : 1.2}
            color={isLight ? '#ffffff' : '#f8fafc'}
          />
          <pointLight
            position={[-4, -3, -2]}
            intensity={isLight ? 0.9 : 0.8}
            color={isLight ? '#2563eb' : '#38bdf8'}
          />
          <pointLight
            position={[3, -4, 3]}
            intensity={isLight ? 0.7 : 0.6}
            color={isLight ? '#059669' : '#818cf8'}
          />

          {/* Controlador Cinemático de Cámara */}
          <CameraController />

          {/* Escultura Matemática Central */}
          <MathematicalSculpture />

          {/* Constelación de Partículas con Físicas y optimización para móvil */}
          <ParticleConstellation />
        </Suspense>
      </Canvas>
    </div>
  );
};
