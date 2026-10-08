import type { MathLabParams, ConcertFrequency } from '../store/usePortfolioStore';

export interface LabPreset {
  id: string;
  name: string;
  emoji: string;
  shortDesc: string;
  badge: string;
  params: Partial<MathLabParams>;
  frequency: ConcertFrequency;
}

export interface LabChallenge {
  id: string;
  title: string;
  emoji: string;
  task: string;
  rewardText: string;
  isCompleted: (params: MathLabParams) => boolean;
}

export const DIDACTIC_HERO = {
  intuitive: {
    badge: '✨ MATEMÁTICAS MÁGICAS // FÉNIX 357',
    subBadge: 'APRENDE JUGANDO',
    titlePrefix: 'La matemática que puedes ',
    titleHighlight1: 'tocar y sentir',
    titleMiddle: ', al servicio del ',
    titleHighlight2: 'descubrimiento',
    description:
      '¡Hola! Soy Juan Cabello (Fénix 357). Creo mundos virtuales donde las ecuaciones de los libros cobran vida: se convierten en figuras 3D que bailan, emiten música y responden a tu tacto. Aquí las matemáticas no se memorizan; se exploran como en un videojuego.',
    statsPill: 'Una experiencia creada para explorar matemáticas con apoyo visual y auditivo.',
    ctaProjects: 'Ver Proyectos Divertidos',
    ctaLab: 'Jugar en el Laboratorio',
    ctaCv: 'Conocer al Profesor (CV)',
    cardTitle: 'Figura de Luz Viva',
    cardTag: 'Interacción en tiempo real',
    cardDesc:
      'Pasa el ratón o desliza tu dedo sobre la pantalla: la figura de luz sigue tu energía y modula sus alas en tiempo real.',
    cardBadge: 'Dona Mágica 3D',
    onboardingSteps: [
      {
        num: '1',
        title: 'Mueve el ratón o dedo',
        desc: 'La figura 3D siente tu cursor y se deforma suavemente como el agua.',
      },
      {
        num: '2',
        title: 'Enciende el sonido',
        desc: 'Cada curva geométrica produce una nota musical en armonía.',
      },
      {
        num: '3',
        title: 'Crea en el Laboratorio',
        desc: 'Mueve las barras abajo para fabricar tus propias criaturas de luz.',
      },
    ],
  },
  academic: {
    badge: '[ FÉNIX 357 // LABORATORIO CREATIVO & MATEMÁTICO ]',
    subBadge: 'GPU SHADER LIVE',
    titlePrefix: 'La belleza de la ',
    titleHighlight1: 'matemática',
    titleMiddle: ', al servicio del ',
    titleHighlight2: 'aprendizaje',
    description:
      'Soy Juan Cabello (FÉNIX 357), educador matemático & ingeniero web frontend. Diseño y desarrollo interfaces de aprendizaje de nueva generación integrando 3 Pilares (Educación, Matemáticas y WebGL), navegando por 5 Frecuencias y evaluando 7 Dimensiones analíticas en GPU para humanizar conceptos abstractos.',
    statsPill: 'Laboratorio experimental de visualización matemática en el navegador.',
    ctaProjects: 'Explorar Proyectos',
    ctaLab: 'Laboratorio 357',
    ctaCv: 'Descargar CV',
    cardTitle: 'Escultura Fénix 357',
    cardTag: 'WebGL + GLSL',
    cardDesc:
      'Mueve el cursor o interactúa con la pantalla para modular la resonancia armónica de la escultura y los campos de Fourier en GPU.',
    cardBadge: 'S¹ × S¹ Variedad 357',
    onboardingSteps: [
      {
        num: '1',
        title: 'Interacción de Campo',
        desc: 'Deformación elástica evaluada por gradientes en Vertex Shaders.',
      },
      {
        num: '2',
        title: 'Sonificación Pitagórica',
        desc: 'Síntesis procedural de armónicos aditivos a 432 Hz.',
      },
      {
        num: '3',
        title: 'Cómputo en GPU',
        desc: 'Modulación analítica de Fourier calculada en el shader de la superficie.',
      },
    ],
  },
};

export const LAB_PRESETS: LabPreset[] = [
  {
    id: 'dona-galactica',
    name: 'Dona Galáctica',
    emoji: '🍩',
    shortDesc: 'Forma suave y relajante inspirada en un anillo espacial.',
    badge: 'Zen & Calma',
    frequency: 432,
    params: {
      surfaceMode: 'clifford',
      harmonics: 2,
      amplitude: 0.22,
      speed: 0.6,
      wireframe: false,
      colorTheme: 'violet',
    },
  },
  {
    id: 'oceano-olas',
    name: 'Maremoto de Olas',
    emoji: '🌊',
    shortDesc: 'Ondas marinas rápidas como la superficie del océano.',
    badge: 'Alta Energía',
    frequency: 528,
    params: {
      surfaceMode: 'fourier',
      harmonics: 6,
      amplitude: 0.44,
      speed: 1.3,
      wireframe: false,
      colorTheme: 'cyan',
    },
  },
  {
    id: 'planeta-sonoro',
    name: 'Planeta Pulsante',
    emoji: '🪐',
    shortDesc: 'Esfera cósmica que late como un corazón de luz.',
    badge: 'Armonía Áurea',
    frequency: 639,
    params: {
      surfaceMode: 'spherical',
      harmonics: 4,
      amplitude: 0.35,
      speed: 0.9,
      wireframe: false,
      colorTheme: 'amber',
    },
  },
  {
    id: 'rayos-x',
    name: 'Esqueleto Cuántico',
    emoji: '⚡',
    shortDesc: 'Visión de rayos X mostrando las líneas secretas de la figura.',
    badge: 'Rayos X',
    frequency: 396,
    params: {
      surfaceMode: 'klein',
      harmonics: 5,
      amplitude: 0.32,
      speed: 0.8,
      wireframe: true,
      colorTheme: 'emerald',
    },
  },
];

export const LAB_CHALLENGES: LabChallenge[] = [
  {
    id: 'challenge-waves',
    title: 'Creador de Olas',
    emoji: '🌊',
    task: 'Sube las "Olas" (Armónicos) a 5 o más para hacer la superficie rugosa.',
    rewardText: '¡Excelente! Ahora ves cómo más ondas crean texturas complejas.',
    isCompleted: (p) => p.harmonics >= 5,
  },
  {
    id: 'challenge-xray',
    title: 'Visión de Rayos X',
    emoji: '🔍',
    task: 'Activa la "Malla de Rayos X" (Wireframe) para descubrir el esqueleto 3D.',
    rewardText: '¡Genial! Así es como la computadora conecta los puntos en el espacio.',
    isCompleted: (p) => p.wireframe === true,
  },
  {
    id: 'challenge-energy',
    title: 'Olas Gigantes',
    emoji: '⚡',
    task: 'Lleva el "Tamaño de Olas" (Amplitud) a más de 0.40 para hacer saltar la figura.',
    rewardText: '¡Increíble energía! La figura ahora se estira con fuerza.',
    isCompleted: (p) => p.amplitude >= 0.4,
  },
  {
    id: 'challenge-color',
    title: 'Magia de Colores',
    emoji: '🎨',
    task: 'Cambia el color a Ámbar o Esmeralda en el selector de espectro.',
    rewardText: '¡Hermoso color! Cambiaste la energía de la luz.',
    isCompleted: (p) => p.colorTheme === 'amber' || p.colorTheme === 'emerald',
  },
];

export const DIDACTIC_SURFACES = {
  clifford: {
    intuitive: {
      title: '🍩 Dona de Luz Alada',
      subtitle: 'Gira sobre sí misma sin fin',
      metaphor: 'Imagina una dona de luz que se dobla en 4 dimensiones. Al tocarla, bate sus alas como un pájaro.',
    },
    academic: {
      title: 'Fénix Alado 357',
      subtitle: 'Toro de Clifford en S³',
      metaphor: 'Variedad bidimensional S¹ × S¹ proyectada desde R⁴ a R³ con deformación analítica en GPU.',
    },
  },
  fourier: {
    intuitive: {
      title: '🌊 Mar de Olas Musicales',
      subtitle: 'Ondas sumadas como en el agua',
      metaphor: 'Como tirar piedritas en un lago: cada piedrita crea ondas circulares que se cruzan y forman un baile.',
    },
    academic: {
      title: 'Onda Fourier 357',
      subtitle: 'Serie Armónica Trigonométrica',
      metaphor: 'Superposición continua de senos y cosenos ortogonales evaluada con suma armónica de Fourier.',
    },
  },
  spherical: {
    intuitive: {
      title: '🪐 Planeta de Cristal',
      subtitle: 'Esfera que respira y late',
      metaphor: 'Una pelota mágica hecha de notas musicales que se infla y desinfla según el ritmo del sonido.',
    },
    academic: {
      title: 'Plasma Armónico',
      subtitle: 'Armónicos Esféricos Y_l^m',
      metaphor: 'Solución analítica de la ecuación de Laplace en coordenadas esféricas para orbitales de energía.',
    },
  },
  klein: {
    intuitive: {
      title: '🌀 El Túnel Mágico',
      subtitle: 'Figura sin adentro ni afuera',
      metaphor: 'Una figura tan curiosa que si una hormiga camina sobre ella, recorrerá el interior y el exterior sin cruzar ningún borde.',
    },
    academic: {
      title: 'Atractor Caótico',
      subtitle: 'Superficie no orientable de Klein',
      metaphor: 'Variedad compacta bidimensional cerrada con característica de Euler χ = 0 y torsión autodual.',
    },
  },
};

export const DIDACTIC_CARDS = {
  intuitive: [
    {
      title: '🎨 Miles de Pequeños Dibujantes (GPU)',
      desc: 'En tu computadora o teléfono hay un chip llamado tarjeta gráfica (GPU). Es como tener a miles de artistas dibujando a la vez cada punto de la figura 60 veces por segundo para que se mueva suave como mantequilla.',
      badge: 'Velocidad: 60 dibujos por segundo',
      analogy: '¡Cero tirones!',
    },
    {
      title: '🎵 ¿Por qué las figuras tienen música?',
      desc: 'Cuando pulsas una cuerda de guitarra, vibra en el aire y tu oído escucha una nota. En este laboratorio hacemos lo mismo: ¡la misma fórmula matemática que mueve la figura 3D produce la música que escuchas!',
      badge: 'Música de las Ecuaciones',
      analogy: 'Ver con los ojos, entender con el oído',
    },
    {
      title: '💡 Tocar para Aprender, no para Memorizar',
      desc: 'Cuando un niño juega con plastilina, entiende las formas de inmediato sin que le expliquen fórmulas pesadas. Este laboratorio es plastilina digital: ¡tocas, cambias los botones y entiendes la matemática jugando!',
      badge: 'Matemática sin Miedo',
      analogy: 'Aprender explorando',
    },
  ],
  academic: [
    {
      title: 'Cómputo Masivo en GPU (Vertex Shaders)',
      desc: 'La superficie evalúa la suma armónica de Fourier en el Vertex Shader mediante gl_Position, desplazando buena parte del cálculo visual a la GPU.',
      badge: 'Cálculo visual // GLSL',
      analogy: 'Pipeline de cómputo en paralelo',
    },
    {
      title: 'Sonificación Armónica Procedural',
      desc: 'Cada armónico k corresponde a una frecuencia pitagórica generada proceduralmente mediante OscillatorNode nativos. Al alterar los deslizadores, el oído percibe el cambio de timbre al mismo tiempo que el ojo ve la perturbación espacial.',
      badge: 'Web Audio API // 432 Hz',
      analogy: 'Afinación áurea y sobretonos',
    },
    {
      title: 'Didáctica Activa & Reducción Cognitiva',
      desc: 'Este artefacto complementa diagramas estáticos con una experiencia táctil para explorar convergencia, ortogonalidad y transformaciones topológicas.',
      badge: 'Exploración activa',
      analogy: 'Pedagogía formal basada en la intuición',
    },
  ],
};
