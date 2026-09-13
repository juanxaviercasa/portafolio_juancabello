export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Educación 3D' | 'Matemáticas Puras' | 'Diseño Web' | 'Herramienta Pedagógica';
  impact: string;
  description: string;
  mathConcept: string;
  technologies: string[];
  features: string[];
  metrics: { label: string; value: string }[];
  demoUrl: string;
  repoUrl: string;
  accentColor: string;
}

export const projectsData: Project[] = [
  {
    id: 'mathflow-3d',
    title: 'MathFlow 3D: Cálculo Multivariable Visual',
    subtitle: 'Laboratorio de variedades diferenciales y campos vectoriales en tiempo real',
    category: 'Educación 3D',
    impact: 'Utilizado por más de 18,000 estudiantes universitarios en cursos de Cálculo III',
    description: 'Plataforma web pedagógica interactiva que renderiza campos de gradientes, rotacionales y divergencias en superficies paramétricas continuas. Permite a los estudiantes soltar partículas de prueba para visualizar intuitivamente el Teorema de Stokes y de la Divergencia.',
    mathConcept: '\\nabla \\times \\mathbf{F} = \\left( \\frac{\\partial F_z}{\\partial y} - \\frac{\\partial F_y}{\\partial z} \\right) \\mathbf{i} + \\dots',
    technologies: ['React', 'Three.js', 'GLSL Shaders', 'Web Audio API', 'Tailwind CSS'],
    features: [
      'Deformación de mallas con shaders en GPU a 60 FPS fijos',
      'Integración numérica de trayectorias con método Runge-Kutta 4',
      'Sonificación de la magnitud del flujo escalar con micro-osciladores',
      'Compatibilidad táctil en tablets y móviles'
    ],
    metrics: [
      { label: 'Estudiantes Activos', value: '18,500+' },
      { label: 'Tasa de Aprobación', value: '+32%' },
      { label: 'FPS Promedio', value: '60 FPS' }
    ],
    demoUrl: 'https://example.com/mathflow-3d',
    repoUrl: 'https://github.com/example/mathflow-3d',
    accentColor: '#38bdf8'
  },
  {
    id: 'fourier-resonance-lab',
    title: 'Fourier Resonance Lab',
    subtitle: 'Síntesis espectral interactiva de sonido y curvas armónicas complejas',
    category: 'Matemáticas Puras',
    impact: 'Elegido Mejor Recurso Abierto de Aprendizaje STEM 2025',
    description: 'Visualizador de series de Fourier continuas y discretas acoplado a un motor de síntesis de audio procedural. Los usuarios dibujan cualquier forma de onda en 2D y el algoritmo descompone la función en círculos epicicloidales armónicos y genera el timbre auditivo en tiempo real.',
    mathConcept: 'f(t) = \\frac{a_0}{2} + \\sum_{n=1}^\\infty \\left( a_n \\cos(n\\omega t) + b_n \\sin(n\\omega t) \\right)',
    technologies: ['TypeScript', 'Canvas API', 'Web Audio API', 'FFT Algorithms', 'Vite'],
    features: [
      'Cálculo de coeficientes mediante Transformada Rápida de Fourier (FFT)',
      'Síntesis aditiva con hasta 64 armónicos simultáneos',
      'Generación de trayectorias complejas con números imaginarios',
      'Exportación a código LaTeX y audio WAV sin comprimir'
    ],
    metrics: [
      { label: 'Armónicos en Vivo', value: '64' },
      { label: 'Latencia de Audio', value: '< 12ms' },
      { label: 'Colegios Vinculados', value: '140+' }
    ],
    demoUrl: 'https://example.com/fourier-lab',
    repoUrl: 'https://github.com/example/fourier-lab',
    accentColor: '#818cf8'
  },
  {
    id: 'topo-morph-geometry',
    title: 'TopoMorph: Topología y Variedades 4D',
    subtitle: 'Exploración de variedades no orientables y proyecciones del hiperespacio',
    category: 'Educación 3D',
    impact: 'Implementado en asignaturas de Geometría Diferencial y Topología Algebraica',
    description: 'Simulador tridimensional que proyecta variedades de cuatro dimensiones (como el Toro de Clifford, la Botella de Klein y la Superficie de Boy) a $\\mathbb{R}^3$. El usuario puede cortar rebanadas topológicas y visualizar la característica de Euler en tiempo real.',
    mathConcept: '\\chi = V - E + F = 2 - 2g',
    technologies: ['React Three Fiber', 'Rapier3D Physics', 'GLSL', 'Zustand', 'TypeScript'],
    features: [
      'Proyección estereográfica de 4D a 3D mediante rotaciones en planos SO(4)',
      'Cálculo de normales analíticas para renderizado fotorrealista de Fresnel',
      'Detección de auto-intersecciones de variedades',
      'Modo de inspección radiográfica con wireframe computado'
    ],
    metrics: [
      { label: 'Variedades 4D', value: '12 Modelos' },
      { label: 'Tiempo de Carga', value: '< 0.4s' },
      { label: 'Universidades', value: '9' }
    ],
    demoUrl: 'https://example.com/topomorph',
    repoUrl: 'https://github.com/example/topomorph',
    accentColor: '#34d399'
  },
  {
    id: 'stem-adaptive-platform',
    title: 'Plataforma Pedagógica STEM Adaptativa',
    subtitle: 'Generador procedural de problemas de cálculo con renderizado KaTeX accesible',
    category: 'Herramienta Pedagógica',
    impact: 'Más de 120,000 ejercicios matemáticos generados y evaluados automáticamente',
    description: 'Sistema web de evaluación formativa para estudiantes de ingeniería que utiliza árboles de sintaxis abstracta (AST) para generar problemas algebraicos con soluciones paso a paso parametrizadas, evitando la memorización ciega.',
    mathConcept: '\\mathcal{L}\\{f(t)\\} = \\int_0^\\infty e^{-st} f(t) dt',
    technologies: ['Next.js', 'Tailwind CSS', 'KaTeX', 'PostgreSQL', 'MathJS'],
    features: [
      'Motor de álgebra computacional en el cliente para verificación simbólica',
      'Explicaciones pedagógicas adaptadas al tipo de error del estudiante',
      'Panel analítico para docentes con mapas de calor de dificultad conceptual',
      'Cumplimiento total con estándares de accesibilidad WCAG 2.1 AAA'
    ],
    metrics: [
      { label: 'Ejercicios Resueltos', value: '120k+' },
      { label: 'Tiempo de Feedback', value: 'Instantáneo' },
      { label: 'Accesibilidad', value: '100 / 100' }
    ],
    demoUrl: 'https://example.com/stem-adaptive',
    repoUrl: 'https://github.com/example/stem-adaptive',
    accentColor: '#fbbf24'
  }
];
