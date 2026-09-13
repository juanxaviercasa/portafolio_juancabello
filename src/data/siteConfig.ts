export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  description: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  scholar: string;
  cvUrl: string;
  stats: {
    label: string;
    value: string;
    subtext: string;
  }[];
  pedagogicalPrinciples: {
    title: string;
    formula: string;
    description: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: "Juan Cabello",
  role: "Educador Matemático & Ingeniero Web Frontend",
  tagline: "Donde la abstracción matemática se transforma en experiencia visual pedagógica.",
  description: "Especialista en la intersección de pedagogía matemática moderna, computación gráfica en tiempo real (WebGL/Three.js) y diseño web accesible de alto rendimiento.",
  location: "Santiago, Chile / Remoto",
  email: "contacto@juancabello.dev",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  scholar: "https://scholar.google.com",
  cvUrl: "/cv-juan-cabello.pdf",
  stats: [
    {
      label: "Estudiantes Impactados",
      value: "45,000+",
      subtext: "A través de plataformas interactivas y cursos universitarios"
    },
    {
      label: "Simuladores Matemáticos",
      value: "28+",
      subtext: "En tiempo real con WebGL, Shaders y Web Audio"
    },
    {
      label: "Rendimiento Gráfico",
      value: "60 FPS",
      subtext: "Optimizado en dispositivos móviles y de bajo consumo"
    },
    {
      label: "Experiencia Pedagógica",
      value: "8+ Años",
      subtext: "Docencia en Cálculo, Álgebra Lineal y Computación"
    }
  ],
  pedagogicalPrinciples: [
    {
      title: "Comprensión Intuitiva Previa al Formalismo",
      formula: "\\lim_{\\Delta x \\to 0} \\frac{f(x+\\Delta x) - f(x)}{\\Delta x}",
      description: "El estudiante primero experimenta la razón de cambio geométricamente mediante deformación visual antes de memorizar la regla de derivación simbólica."
    },
    {
      title: "Interactividad Bidireccional Sin Fricción",
      formula: "e^{i\\theta} = \\cos\\theta + i\\sin\\theta",
      description: "Manipular una variable matemática debe reflejarse inmediatamente tanto en la respuesta auditiva armónica como en la proyección espacial."
    },
    {
      title: "Accesibilidad e Inclusión Cognitiva",
      formula: "\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}",
      description: "Las herramientas pedagógicas de vanguardia deben correr a 60 FPS sin requerir hardware de gama alta ni descargas de software adicionales."
    }
  ]
};
