# Portafolio de Juan Cabello

Portafolio profesional de Juan Xavier Cabello Salirrosas: educador matemático y desarrollador web en Lima, Perú. Presenta proyectos públicos de educación STEM, visualización matemática, producto web e inteligencia artificial educativa.

## Principios del producto

- Responsive desde 320 px hasta escritorio, con navegación táctil y menú accesible.
- Interfaz semántica con foco visible, enlace para saltar al contenido y soporte para movimiento reducido.
- Contenido verificable: demos y repositorios reales, sin métricas de impacto inventadas.
- Escena WebGL decorativa cargada después del contenido principal y omitida con ahorro de datos o movimiento reducido.
- Formulario transparente: prepara un correo en la aplicación del visitante y no simula un envío.

## Stack

- React 19, TypeScript y Vite 8.
- Tailwind CSS 4 para utilidades y tokens CSS propios para el sistema visual.
- Three.js, React Three Fiber y GLSL para la experiencia matemática 3D.
- Zustand para preferencias, laboratorio, audio y estado de navegación.
- Web Audio API y Canvas para la visualización sonora.

## Desarrollo local

```bash
npm install
npm run dev
```

## Calidad

```bash
npm run lint
npm run build
npm audit
```

Con `npm run preview` activo en otra terminal, `npm run audit:ui` comprueba desbordamiento horizontal, etiquetas, objetivos táctiles y menú móvil en 360, 768 y 1440 px.

El objetivo de accesibilidad es WCAG 2.2 nivel AA. La validación final debe combinar pruebas automatizadas con revisión manual de teclado, zoom, contraste y tecnologías de asistencia.

## Despliegue

El proyecto genera una SPA estática en `dist/`. Incluye `CNAME`, metadatos sociales, datos estructurados, `robots.txt`, `sitemap.xml` y manifiesto web para `juan.cabellosalirrosas.com`.

## Licencia

MIT © 2026 Juan Xavier Cabello Salirrosas.
