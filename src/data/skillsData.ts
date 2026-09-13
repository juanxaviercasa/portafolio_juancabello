export interface SkillCategory {
  title: string;
  badge: string;
  description: string;
  skills: {
    name: string;
    level: string;
    detail: string;
  }[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Matemáticas & Computación Científica",
    badge: "Fundamento Riguroso",
    description: "Modelado algebraico, cálculo diferencial e integrales armónicas proyectadas al espacio computacional.",
    skills: [
      { name: "Análisis de Fourier & Armónicos", level: "Avanzado", detail: "Descomposición espectral, series ortogonales y procesamiento de señales" },
      { name: "Cálculo Multivariable & Campos", level: "Avanzado", detail: "Teoremas de Stokes/Gauss, integración de campos escalares y vectoriales" },
      { name: "Álgebra Lineal & Espacios Métricos", level: "Avanzado", detail: "Transformaciones unitarias, valores propios, proyecciones en hiperplanos" },
      { name: "Geometría Diferencial & Topología", level: "Competente", detail: "Curvatura de Gauss, variedades compactas, proyecciones estereográficas" },
      { name: "Métodos Numéricos & Simulación", level: "Avanzado", detail: "Integración Runge-Kutta 4, método de Euler, estabilidad numérica" }
    ]
  },
  {
    title: "Gráficos 3D en Tiempo Real & Shaders",
    badge: "Tecnología Visual",
    description: "Arquitectura de escenas WebGL con cálculo masivo en GPU y optimización estricta a 60 FPS.",
    skills: [
      { name: "Three.js & React Three Fiber", level: "Experto", detail: "Escenas complejas desacopladas, render loop estricto, InstancedMesh" },
      { name: "GLSL & Shaders de Vértices/Fragmentos", level: "Avanzado", detail: "Deformaciones matemáticas procedurales, efectos Fresnel, cálculo analítico" },
      { name: "Web Audio API Procedural", level: "Avanzado", detail: "Síntesis aditiva de sonido, sincronización de frecuencia visual-acústica" },
      { name: "Físicas & Colisiones (Rapier3D)", level: "Competente", detail: "Simulación de cuerpos blandos, microgravedad e interacción cinemática" },
      { name: "Optimización de Rendimiento WebGL", level: "Experto", detail: "Zero-GC buffers Float32Array, control de draw calls, LOD dinámico" }
    ]
  },
  {
    title: "Diseño Web & Pedagogía Digital",
    badge: "Impacto Humano",
    description: "Creación de experiencias digitales donde la alta fidelidad estética no compromete la inclusión ni la usabilidad.",
    skills: [
      { name: "Diseño Instruccional & STEM", level: "Experto", detail: "Secuenciación didáctica de conceptos abstractos y andamiaje cognitivo" },
      { name: "Two-Speed UX & Scrollytelling", level: "Experto", detail: "Dualidad de navegación para evaluadores rápidos e inmersión exploratoria" },
      { name: "React, TypeScript & Tailwind CSS", level: "Experto", detail: "Componentes tipados en modo estricto, sistemas de diseño glassmorphism" },
      { name: "Accesibilidad Web (WCAG AAA)", level: "Avanzado", detail: "Navegación por teclado, soporte de lectores de pantalla y contraste óptimo" },
      { name: "Animaciones Cinemáticas (Framer Motion)", level: "Avanzado", detail: "Transiciones de estado fluidas coordinadas con eventos del scroll" }
    ]
  }
];
