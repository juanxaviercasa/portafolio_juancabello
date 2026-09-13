import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { globalMouseVector } from '../../utils/mouseTracker';

export const CameraController: React.FC = () => {
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const targetPos = useRef(new THREE.Vector3(0, 0, 4.8));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    const p = scrollProgress;
    const mouseX = globalMouseVector.x * 0.4;
    const mouseY = globalMouseVector.y * 0.3;

    // Waypoints cinemáticos según el avance del scroll
    if (p < 0.25) {
      // Hero: Visión frontal equilibrada
      targetPos.current.set(0 + mouseX, 0 + mouseY, 4.8);
      targetLookAt.current.set(0, 0, 0);
    } else if (p < 0.55) {
      // Proyectos: Desplazamiento a la derecha para acompañar las tarjetas HTML
      targetPos.current.set(1.4 + mouseX * 0.5, 0.3 + mouseY * 0.5, 4.4);
      targetLookAt.current.set(-0.3, 0, 0);
    } else if (p < 0.8) {
      // Laboratorio: Enfoque inmersivo central en la escultura
      targetPos.current.set(0 + mouseX * 0.6, 0.1 + mouseY * 0.6, 3.9);
      targetLookAt.current.set(0, 0, 0);
    } else {
      // Sobre Mí & Contacto: Ángulo superior cinemático
      targetPos.current.set(-1.1 + mouseX * 0.5, 0.8 + mouseY * 0.5, 4.6);
      targetLookAt.current.set(0.2, 0, 0);
    }

    // Suavizado exponencial (damping)
    state.camera.position.lerp(targetPos.current, 0.04);
    
    // Suavizado del punto de mira
    const currentLookAt = new THREE.Vector3();
    state.camera.getWorldDirection(currentLookAt);
    state.camera.lookAt(targetLookAt.current);
  });

  return null;
};
