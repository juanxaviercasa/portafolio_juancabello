export interface SkillCategory {
  title: string;
  badge: string;
  description: string;
  skills: { name: string; level: string; detail: string }[];
}

export const skillsData: SkillCategory[] = [
  {
    title: 'Educación matemática',
    badge: 'Base pedagógica',
    description: 'Planificación, explicación de conceptos, evaluación formativa y acompañamiento de estudiantes.',
    skills: [
      { name: 'Aritmética y álgebra', level: 'Docencia', detail: 'Secundaria y preparación preuniversitaria' },
      { name: 'Razonamiento matemático', level: 'Docencia', detail: 'Resolución de problemas y estrategias' },
      { name: 'Ciencias', level: 'Docencia', detail: 'Física, química y biología escolar' },
    ],
  },
  {
    title: 'Frontend y visualización',
    badge: 'Construcción web',
    description: 'React, TypeScript, JavaScript, interfaces responsivas, Canvas, WebGL y Three.js.',
    skills: [
      { name: 'React y TypeScript', level: 'Aplicado', detail: 'Componentes, estado y arquitectura frontend' },
      { name: 'Canvas y WebGL', level: 'Aplicado', detail: 'Visualización interactiva en navegador' },
      { name: 'UX/UI accesible', level: 'Aplicado', detail: 'Responsive, foco, contraste y semántica' },
    ],
  },
  {
    title: 'Producto y arquitectura',
    badge: 'Entrega integral',
    description: 'Diseño de producto, documentación, Git, Python/FastAPI, PostgreSQL y despliegue web.',
    skills: [
      { name: 'Diseño de producto', level: 'Aplicado', detail: 'Problema, contenido, interacción y validación' },
      { name: 'Backend web', level: 'En desarrollo', detail: 'Python, FastAPI, PostgreSQL y Docker' },
      { name: 'Calidad', level: 'Aplicado', detail: 'Lint, build, auditoría y documentación' },
    ],
  },
];
