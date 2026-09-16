export interface SiteConfig {
  name: string;
  brandName: string;
  brandFullName: string;
  role: string;
  tagline: string;
  description: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  scholar: string;
  cvUrl: string;
  concept357: {
    pillars: { title: string; desc: string }[];
    frequencies: { id: string; name: string; href: string }[];
    dimensions: { label: string; value: string; desc: string }[];
  };
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
  brandName: "FÉNIX 357",
  brandFullName: "JUAN CABELLO // FÉNIX 357",
  role: "Educador Matemático & Ingeniero Web Frontend",
  tagline: "Donde la abstracción matemática renace como experiencia visual pedagógica.",
  description: "Especialista en la intersección de pedagogía matemática moderna, computación gráfica en tiempo real (WebGL/Three.js) y diseño web accesible de alto rendimiento.",
  location: "Santiago, Chile / Remoto",
  email: "contacto@juancabello.dev",
  github: "https://github.com/juanxaviercasa",
  linkedin: "https://www.linkedin.com/in/xaviercabello/",
  scholar: "https://scholar.google.com",
  cvUrl: "/cv-juan-cabello.pdf",
  concept357: {
    pillars: [
      { title: "Educación", desc: "Didáctica matemática intuitiva y pedagogía activa" },
      { title: "Matemáticas", desc: "Topología, cálculo multivariable y física de fluidos" },
      { title: "Diseño Web", desc: "Computación gráfica en GPU, WebGL y shaders de 60 FPS" }
    ],
    frequencies: [
      { id: "01", name: "Génesis", href: "#hero" },
      { id: "02", name: "Obras", href: "#proyectos" },
      { id: "03", name: "Laboratorio 357", href: "#laboratorio" },
      { id: "04", name: "Trayectoria", href: "#sobre-mi" },
      { id: "05", name: "Resonancia", href: "#contacto" }
    ],
    dimensions: [
      { label: "Estudiantes Impactados", value: "45,000+", desc: "A través de plataformas interactivas universitarias" },
      { label: "Simuladores Matemáticos", value: "28+", desc: "Desarrollados con Three.js, WebGL y Shaders GLSL" },
      { label: "Frecuencia Fundamental", value: "432 Hz", desc: "Afinación pitagórica del motor de audio procedural" },
      { label: "Tasa de Refresco GPU", value: "60 FPS", desc: "Evaluación analítica en Vertex Shaders sin sobrecarga" },
      { label: "Variedades Topológicas", value: "7 Modos", desc: "Superficies algebraicas computadas analíticamente" },
      { label: "Años de Docencia", value: "8+ Años", desc: "Cátedras de Cálculo y Álgebra Lineal en Ingeniería" },
      { label: "Latencia de Cómputo", value: "< 16ms", desc: "Pipeline paralelo optimizado para dispositivos móviles" }
    ]
  },
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
