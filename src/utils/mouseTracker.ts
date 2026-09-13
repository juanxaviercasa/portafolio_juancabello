import * as THREE from 'three';

/**
 * Vector global de coordenadas normalizadas del cursor (-1 a 1).
 * Se actualiza mediante un listener global en window sin provocar re-renders en React.
 */
export const globalMouseVector = new THREE.Vector2(0, 0);

if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointermove',
    (event: PointerEvent) => {
      globalMouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
      globalMouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
    },
    { passive: true }
  );
}
