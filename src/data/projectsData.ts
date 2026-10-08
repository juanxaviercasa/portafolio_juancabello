export type ProjectCategory = 'Educación STEM' | 'Matemáticas' | 'Producto Web' | 'Inteligencia Artificial';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  description: string;
  context: string;
  technologies: string[];
  features: string[];
  facts: { label: string; value: string }[];
  demoUrl?: string;
  repoUrl: string;
  mathConcept?: string;
}

export const projectsData: Project[] = [
  {
    id: 'mundos-simulados',
    title: 'Mundos Simulados',
    subtitle: 'Laboratorio de física computacional en el navegador',
    category: 'Educación STEM',
    description: 'Transforma ecuaciones diferenciales y leyes de la física clásica en simulaciones visuales que pueden explorarse sin instalar software.',
    context: 'Diseñado para docencia y divulgación: permite modificar variables como gravedad, fricción, masa o carga y observar el comportamiento resultante.',
    technologies: ['JavaScript', 'HTML5 Canvas', 'WebGL', 'CSS'],
    features: ['Sistemas dinámicos', 'Controles interactivos', 'Ejecución local en el navegador'],
    facts: [{ label: 'Área', value: 'Física' }, { label: 'Formato', value: 'Laboratorio' }, { label: 'Acceso', value: 'Web' }],
    demoUrl: 'https://mundossimulados.online',
    repoUrl: 'https://github.com/juanxaviercasa/mundos-simulados',
    mathConcept: 'F = ma',
  },
  {
    id: 'transformaciones-geometricas',
    title: 'Transformaciones Geométricas',
    subtitle: 'Visualizador 2D/3D de álgebra lineal',
    category: 'Matemáticas',
    description: 'Laboratorio visual para comprender rotaciones, traslaciones, homotecias y transformaciones matriciales mediante respuesta gráfica en tiempo real.',
    context: 'Conecta la expresión algebraica con su significado geométrico para reducir la dependencia de la memorización mecánica.',
    technologies: ['TypeScript', 'Canvas', 'WebGL', 'Vite'],
    features: ['Matrices editables', 'Visualización 2D/3D', 'Controles responsivos'],
    facts: [{ label: 'Área', value: 'Álgebra' }, { label: 'Vista', value: '2D / 3D' }, { label: 'Lenguaje', value: 'TypeScript' }],
    demoUrl: 'https://transformacionesgeometricas.sistemazenit.com/',
    repoUrl: 'https://github.com/juanxaviercasa/transformaciones_geometricas',
    mathConcept: 'R(\\theta)=\\begin{pmatrix}\\cos\\theta&-\\sin\\theta\\\\\\sin\\theta&\\cos\\theta\\end{pmatrix}',
  },
  {
    id: 'tabla-periodica',
    title: 'Tabla Periódica Interactiva',
    subtitle: 'Explorador de elementos y tendencias atómicas',
    category: 'Educación STEM',
    description: 'Aplicación pedagógica para consultar los 118 elementos, comparar propiedades y reconocer tendencias periódicas mediante filtros y mapas de calor.',
    context: 'Organiza información química compleja en una experiencia visual que funciona en móvil, tablet y escritorio.',
    technologies: ['JavaScript', 'CSS Grid', 'HTML', 'Diseño responsivo'],
    features: ['118 elementos', 'Búsqueda y filtros', 'Mapas de propiedades'],
    facts: [{ label: 'Catálogo', value: '118' }, { label: 'Área', value: 'Química' }, { label: 'Interacción', value: 'Filtros' }],
    demoUrl: 'https://tablaperiodica.sistemazenit.com/',
    repoUrl: 'https://github.com/juanxaviercasa/tabla-periodica',
    mathConcept: 'Z = p^+',
  },
  {
    id: 'nube-para-pymes',
    title: 'Nube para Pymes',
    subtitle: 'Herramientas prácticas para pequeños negocios',
    category: 'Producto Web',
    description: 'Colección de utilidades web gratuitas para preparar cotizaciones, calcular precios, generar documentos y resolver tareas operativas frecuentes.',
    context: 'Reduce fricción para pequeñas empresas con herramientas directas, sin instalación y sin exigir una cuenta para empezar.',
    technologies: ['JavaScript', 'HTML', 'CSS', 'WordPress'],
    features: ['Calculadoras', 'Generadores de documentos', 'Herramientas SEO y productividad'],
    facts: [{ label: 'Público', value: 'Pymes' }, { label: 'Modelo', value: 'Gratuito' }, { label: 'Acceso', value: 'Sin cuenta' }],
    demoUrl: 'https://nubeparapymes.online/',
    repoUrl: 'https://github.com/juanxaviercasa/nube-para-pymes',
  },
  {
    id: 'rumbo-san-marcos',
    title: 'Rumbo San Marcos',
    subtitle: 'Evaluación diagnóstica para postulantes',
    category: 'Educación STEM',
    description: 'Plataforma de diagnóstico que adapta la evaluación a la carrera elegida y convierte resultados en una ruta de estudio priorizada.',
    context: 'Integra navegación de preguntas, cronómetro, análisis de brechas y revisión explicada para preparar el ingreso a la UNMSM.',
    technologies: ['JavaScript', 'HTML', 'CSS', 'Arquitectura modular'],
    features: ['Evaluación por carrera', 'Análisis de fortalezas', 'Ruta de estudio'],
    facts: [{ label: 'Objetivo', value: 'UNMSM' }, { label: 'Método', value: 'Diagnóstico' }, { label: 'Salida', value: 'Ruta' }],
    demoUrl: 'https://sanmarcos.sistemazenit.com/',
    repoUrl: 'https://github.com/juanxaviercasa/rumbo-san-marcos',
  },
  {
    id: 'zenit-ai-tutor',
    title: 'Zenit AI Tutor',
    subtitle: 'Tutor educativo con evidencia y límites explícitos',
    category: 'Inteligencia Artificial',
    description: 'Prototipo de tutor con recuperación aumentada por contexto que separa evidencia, explicación e incertidumbre en cada respuesta.',
    context: 'Explora una IA educativa responsable: fuentes visibles, validación, privacidad y control de costos en lugar de respuestas opacas.',
    technologies: ['Python', 'FastAPI', 'Next.js', 'PostgreSQL', 'Docker'],
    features: ['RAG con fuentes', 'Evaluación de respuestas', 'Arquitectura full stack'],
    facts: [{ label: 'Backend', value: 'FastAPI' }, { label: 'Datos', value: 'pgvector' }, { label: 'Estado', value: 'Prototipo' }],
    repoUrl: 'https://github.com/juanxaviercasa/zenit-ai-tutor',
  },
];
