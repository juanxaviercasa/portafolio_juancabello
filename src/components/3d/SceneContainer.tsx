import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { MathematicalSculpture } from './MathematicalSculpture';
import { ParticleConstellation } from './ParticleConstellation';
import { CameraController } from './CameraController';

export const SceneContainer: React.FC = () => {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    // Fallback elegante para entornos sin soporte WebGL
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden math-grid-bg">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45, position: [0, 0, 4.8], near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Iluminación tridimensional calculada */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 6, 4]} intensity={1.2} color="#f8fafc" />
          <pointLight position={[-4, -3, -2]} intensity={0.8} color="#38bdf8" />
          <pointLight position={[3, -4, 3]} intensity={0.6} color="#818cf8" />

          {/* Controlador Cinemático de Cámara */}
          <CameraController />

          {/* Escultura Matemática Central */}
          <MathematicalSculpture />

          {/* Constelación de Partículas con Físicas */}
          <ParticleConstellation />
        </Suspense>
      </Canvas>
    </div>
  );
};
