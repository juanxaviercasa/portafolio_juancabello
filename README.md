# Portafolio Profesional — Juan Cabello
### Educador Matemático & Ingeniero Frontend WebGL

> **"Donde la abstracción matemática se transforma en experiencia visual pedagógica."**

Aplicación web de portafolio de nueva generación construida bajo la arquitectura **Two-Speed UX**, fusionando computación gráfica 3D en tiempo real (WebGL/GLSL), síntesis de micro-audio procedural nativa (Web Audio API) y una capa de interfaz accesible (WCAG AAA) optimizada para evaluadores y reclutadores.

---

## 1. Arquitectura "Two-Speed UX"

El diseño aborda y resuelve la tensión habitual entre impacto visual y usabilidad ejecutiva:

* **Vía Rápida (Recruiter Track)**:
  - Barra de navegación fija con acceso directo en 1 clic a Proyectos, Laboratorio, Sobre Mí, Contacto y Descarga directa de CV en PDF.
  - Fichas de proyectos con texto HTML semántico nativo, métricas de impacto cuantitativo (estudiantes activos, tasas de aprobación, FPS), stack tecnológico y enlaces funcionales.
  - Contraste visual certificado (WCAG 2.1 AAA) con paleta oscura y tipografía matemática geométrica (*Space Grotesk*, *Inter*, *Fira Code*).

* **Vía Inmersiva (Explorer Track)**:
  - Canvas 3D de fondo desacoplado (`pointer-events: none`) donde una escultura matemática de orden superior (**Toro de Clifford** proyectado desde $\mathbb{R}^4$ a $\mathbb{R}^3$) evoluciona con el scroll y reacciona elásticamente a la proximidad del puntero.
  - **Laboratorio 3D Integrado**: Panel en vivo donde el usuario puede alterar las variables del shader (armónicos de Fourier $k=1\dots8$, amplitud $\alpha$, velocidad angular $\omega$, modo wireframe y espectros de color).

---

## 2. Fundamentos Matemáticos y Shaders

### A. Parametrización del Toro de Clifford
El Toro de Clifford es una variedad bidimensional plana incrustada en la 3-esfera $S^3 \subset \mathbb{R}^4$:
$$x = r_1 \cos(u)\cos(v) - r_2 \sin(u)\sin(v)$$
$$y = r_1 \cos(u)\sin(v) + r_2 \sin(u)\cos(v)$$
$$z = r_1 \sin(u)$$

### B. Deformación de Malla en Vertex Shader (GLSL)
El desplazamiento vertical y normal se computa analíticamente en la GPU mediante la serie armónica de Fourier:
$$\Delta(u, v, t) = \alpha \sum_{k=1}^{n} \frac{1}{k} \sin(2\pi k u + \omega t) \cos(2\pi k v + 0.7\omega t)$$
Esto traslada todo el costo computacional a la tarjeta de video, logrando **60 FPS fijos** con buffers prealocados `Float32Array` y cero pausas por recolección de basura (*Garbage Collection*).

### C. Shading Óptico de Fresnel
El Fragment Shader evalúa la reflectancia en función del ángulo visual del observador $\mathbf{v}$ y la normal $\mathbf{n}$:
$$F(\theta) = \left(1 - \max(\mathbf{v} \cdot \mathbf{n}, 0)\right)^{2.2}$$
generando un acabado translúcido de cristal iridiscente con destellos de acento especular.

---

## 3. Motor de Audio Procedural Nativo (Web Audio API)

El sistema integra un módulo singleton `AudioSynthesizer` sin archivos de sonido externos pesados:
* **Audio responsable**: Desactivado por defecto (*Muted*), activable mediante un interruptor persistente en `localStorage`.
* **Micro-ticks de interacción**: Tonos breves (40 ms) con decaimiento exponencial al interactuar con la UI.
* **Hitos armónicos de navegación**: Al avanzar entre secciones, se dispara un acorde pentatónico puro basado en la frecuencia natural de **432 Hz**.
* **Modulación del Laboratorio**: Al manipular los deslizadores de armónicos, el sintetizador ajusta el timbre acústico mediante osciladores sinusoidales y triangulares en tiempo real.

---

## 4. Stack Tecnológico

| Capa | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Framework** | React 19 + Vite 8 + TypeScript (Strict) | Compilación ultrarrápida y tipado estricto |
| **Gráficos 3D** | Three.js + React Three Fiber + Drei | Renderizado WebGL acelerado por hardware |
| **Shaders** | GLSL (Custom Vertex & Fragment Shaders) | Deformación matemática en GPU |
| **Estilos & UI** | Tailwind CSS v4 + Glassmorphism | Sistema de diseño minimalista translúcido |
| **Estado Global** | Zustand | Gestión de scroll, audio y parámetros del Lab |
| **Audio** | Web Audio API nativo | Síntesis aditiva procedural sin latencia |
| **Iconos** | Lucide React + SVGs vectoriales nativos | Iconografía accesible |

---

## 5. Puesta en Marcha Local

### Requisitos
* Node.js 18+ (recomendado Node 20 o superior)
* npm 9+ o pnpm

### Pasos de Instalación
```bash
# 1. Clonar o navegar al directorio del proyecto
cd portafolio_juancabello

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo local
npm run dev
```

El servidor estará disponible en `http://localhost:5173`.

### Compilación para Producción
```bash
npm run build
```
Genera la carpeta optimizada `dist/` con code-splitting automático:
* `index.js`: ~67 kB (19 kB gzip)
* `three-vendor.js`: ~904 kB (240 kB gzip)
* `index.css`: ~51 kB (8.5 kB gzip)

Para probar la compilación de producción localmente:
```bash
npm run preview
```

---

## 6. Despliegue en Producción

El proyecto es una Single Page Application (SPA) completamente estática y lista para desplegarse con 0 configuración en:
* **Vercel**: Conectar el repositorio de GitHub y seleccionar el preset *Vite*.
* **Netlify**: `Publish directory: dist`, `Build command: npm run build`.
* **Hostinger / Servidor Web Tradicional**: Subir el contenido de la carpeta `dist/` a `public_html`.

---

## Licencia y Créditos
Diseñado y desarrollado por **Juan Cabello**. Licencia MIT. Libre para fines pedagógicos y académicos.
