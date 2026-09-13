import * as THREE from 'three';

/**
 * Genera una geometría paramétrica para el Toro de Clifford proyectado en R3.
 * El Toro de Clifford es una variedad de 2 dimensiones incrustada de manera plana en S3 en R4.
 */
export function createCliffordTorusGeometry(
  radialSegments = 128,
  tubularSegments = 128,
  r = 1.3,
  tube = 0.55
): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  const numVertices = (radialSegments + 1) * (tubularSegments + 1);

  const positions = new Float32Array(numVertices * 3);
  const normals = new Float32Array(numVertices * 3);
  const uvs = new Float32Array(numVertices * 2);
  const indices: number[] = [];

  let ptr = 0;
  let uvPtr = 0;

  for (let j = 0; j <= radialSegments; j++) {
    const v = (j / radialSegments) * Math.PI * 2;
    for (let i = 0; i <= tubularSegments; i++) {
      const u = (i / tubularSegments) * Math.PI * 2;

      // Parametrización en R3
      const cosV = Math.cos(v);
      const sinV = Math.sin(v);
      const cosU = Math.cos(u);
      const sinU = Math.sin(u);

      const x = (r + tube * cosV) * cosU;
      const y = (r + tube * cosV) * sinU;
      const z = tube * sinV;

      positions[ptr] = x;
      positions[ptr + 1] = y;
      positions[ptr + 2] = z;

      // Normal analítica
      const nx = cosV * cosU;
      const ny = cosV * sinU;
      const nz = sinV;

      normals[ptr] = nx;
      normals[ptr + 1] = ny;
      normals[ptr + 2] = nz;

      uvs[uvPtr] = i / tubularSegments;
      uvs[uvPtr + 1] = j / radialSegments;

      ptr += 3;
      uvPtr += 2;
    }
  }

  for (let j = 1; j <= radialSegments; j++) {
    for (let i = 1; i <= tubularSegments; i++) {
      const a = (tubularSegments + 1) * j + i - 1;
      const b = (tubularSegments + 1) * (j - 1) + i - 1;
      const c = (tubularSegments + 1) * (j - 1) + i;
      const d = (tubularSegments + 1) * j + i;

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  geometry.setIndex(indices);
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

  return geometry;
}
