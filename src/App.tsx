import React, { useEffect, useRef } from 'react';
import { SceneContainer } from './components/3d/SceneContainer';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { LabSection } from './components/sections/LabSection';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/ui/Footer';
import { AudioToggle } from './components/ui/AudioToggle';
import { usePortfolioStore } from './store/usePortfolioStore';
import { useAudioEngine } from './audio/useAudioEngine';

export const App: React.FC = () => {
  const setScrollProgress = usePortfolioStore((state) => state.setScrollProgress);
  const setActiveSection = usePortfolioStore((state) => state.setActiveSection);
  const { playSectionTone } = useAudioEngine();

  const prevSectionRef = useRef<string>('hero');

  // Sincronización del scroll para la orquestación 3D y audio de hitos
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;
      setScrollProgress(progress);

      // Detección de sección activa basada en posición
      const sections = ['hero', 'proyectos', 'laboratorio', 'sobre-mi', 'contacto'];
      const scrollPosition = scrollY + window.innerHeight * 0.35;

      let currentSection = 'hero';
      let sectionIndex = 0;

      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = sections[i];
            sectionIndex = i;
            break;
          }
        }
      }

      if (currentSection !== prevSectionRef.current) {
        prevSectionRef.current = currentSection;
        setActiveSection(currentSection);
        playSectionTone(sectionIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrollProgress, setActiveSection, playSectionTone]);

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Capa 1: Escena 3D WebGL persistente en background */}
      <SceneContainer />

      {/* Capa 2: Interfaz HTML de Alta Usabilidad (Two-Speed UX) */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Barra de Navegación Fija */}
        <Navbar />

        {/* Secciones de Contenido Principal */}
        <main className="flex-grow space-y-12 sm:space-y-24">
          <HeroSection />
          <ProjectsSection />
          <LabSection />
          <AboutSection />
          <ContactSection />
        </main>

        {/* Pie de Página */}
        <Footer />

        {/* Botón flotante persistente de Audio */}
        <AudioToggle variant="floating" />
      </div>
    </div>
  );
};

export default App;
