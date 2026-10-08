const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export interface SiteConfig {
  name: string;
  brandName: string;
  brandFullName: string;
  role: string;
  tagline: string;
  description: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  tiktok: string;
  teachingProfile: string;
  cvUrl: string;
  concept357: {
    pillars: { title: string; desc: string }[];
    frequencies: { id: string; name: string; href: string }[];
    dimensions: { label: string; value: string; desc: string }[];
  };
  stats: { label: string; value: string; subtext: string }[];
  pedagogicalPrinciples: {
    title: string;
    simpleMotto: string;
    formula: string;
    description: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: 'Juan Xavier Cabello Salirrosas',
  brandName: 'FÉNIX 357',
  brandFullName: 'JUAN CABELLO // FÉNIX 357',
  role: 'Educador Matemático & Desarrollador Web',
  tagline: 'Convierto ideas matemáticas y necesidades reales en experiencias web claras, interactivas y accesibles.',
  description:
    'Bachiller en Matemática, docente de ciencias y creador de productos web educativos. Integro didáctica, desarrollo frontend y visualización interactiva.',
  location: 'Lima, Perú · Disponible para trabajo remoto',
  email: 'juan@cabellosalirrosas.com',
  phone: '+51 925 475 034',
  github: 'https://github.com/juanxaviercasa',
  linkedin: 'https://www.linkedin.com/in/xaviercabello/',
  tiktok: 'https://www.tiktok.com/@zenitmath',
  teachingProfile: 'https://www.tusclases.pe/profesores/juan-xavier-cabello-salirrosas.htm',
  cvUrl: assetUrl('cv-juan-cabello.pdf'),
  concept357: {
    pillars: [
      { title: 'Educación', desc: 'Experiencias de aprendizaje orientadas a la comprensión' },
      { title: 'Matemáticas', desc: 'Rigor, visualización y resolución de problemas' },
      { title: 'Producto Web', desc: 'Interfaces accesibles, responsivas y mantenibles' },
    ],
    frequencies: [
      { id: '01', name: 'Inicio', href: '#hero' },
      { id: '02', name: 'Proyectos', href: '#proyectos' },
      { id: '03', name: 'Laboratorio', href: '#laboratorio' },
      { id: '04', name: 'Trayectoria', href: '#sobre-mi' },
      { id: '05', name: 'Contacto', href: '#contacto' },
    ],
    dimensions: [
      { label: 'Enfoque', value: 'Educación + Web', desc: 'Producto digital con intención pedagógica' },
      { label: 'Modalidad', value: 'Remoto', desc: 'Colaboración desde Lima, Perú' },
      { label: 'Especialidad', value: 'STEM', desc: 'Matemáticas, ciencias y tecnología educativa' },
    ],
  },
  stats: [
    { label: 'Formación', value: 'Matemática', subtext: 'Bachiller por la Universidad Nacional de Educación' },
    { label: 'Experiencia', value: '2018–2026', subtext: 'Docencia escolar y preuniversitaria' },
    { label: 'Producto', value: 'Web', subtext: 'Aplicaciones responsivas e interactivas' },
  ],
  pedagogicalPrinciples: [
    {
      title: 'Comprensión antes que memorización',
      simpleMotto: 'Primero observar y relacionar; después formalizar',
      formula: 'e^{i\\theta} = \\cos\\theta + i\\sin\\theta',
      description:
        'La representación visual y la manipulación guiada ayudan a construir significado antes de introducir la notación formal.',
    },
    {
      title: 'Respuesta inmediata',
      simpleMotto: 'Cada acción debe producir una consecuencia clara',
      formula: 'f(x + \\Delta x) - f(x)',
      description:
        'Una interfaz educativa debe mostrar de inmediato qué cambió, por qué cambió y cómo volver a intentarlo.',
    },
    {
      title: 'Accesibilidad desde el diseño',
      simpleMotto: 'Aprender no debería depender del dispositivo',
      formula: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}',
      description:
        'El contenido debe seguir siendo legible, navegable y útil con teclado, pantallas pequeñas y movimiento reducido.',
    },
  ],
};
