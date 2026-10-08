import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { LabSection } from './components/sections/LabSection';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/ui/Footer';
import { usePortfolioStore } from './store/usePortfolioStore';
import { useAudioEngine } from './audio/useAudioEngine';

const SceneContainer = lazy(() =>
  import('./components/3d/SceneContainer').then((module) => ({ default: module.SceneContainer })),
);

const SECTION_IDS = ['hero', 'proyectos', 'laboratorio', 'sobre-mi', 'contacto'];

export const App: React.FC = () => {
  const [showScene, setShowScene] = useState(false);
  const setScrollProgress = usePortfolioStore((state) => state.setScrollProgress);
  const setActiveSection = usePortfolioStore((state) => state.setActiveSection);
  const theme = usePortfolioStore((state) => state.theme);
  const brandTheme = usePortfolioStore((state) => state.labParams.colorTheme);
  const { playSectionTone, processScrollDynamics } = useAudioEngine();
  const previousSection = useRef('hero');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.brandTheme = brandTheme;
  }, [brandTheme]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = 'connection' in navigator && Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
    if (reduceMotion || saveData) return;
    const timer = window.setTimeout(() => setShowScene(true), 500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = documentHeight > 0 ? Math.min(Math.max(scrollY / documentHeight, 0), 1) : 0;
      setScrollProgress(progress);
      processScrollDynamics(scrollY, documentHeight);

      const marker = scrollY + window.innerHeight * 0.35;
      let currentSection = 'hero';
      let currentIndex = 0;
      SECTION_IDS.forEach((id, index) => {
        const element = document.getElementById(id);
        if (element && marker >= element.offsetTop) {
          currentSection = id;
          currentIndex = index;
        }
      });

      if (currentSection !== previousSection.current) {
        previousSection.current = currentSection;
        setActiveSection(currentSection);
        playSectionTone(currentIndex);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, [playSectionTone, processScrollDynamics, setActiveSection, setScrollProgress]);

  return (
    <div className="app-shell min-h-screen overflow-x-hidden">
      <a className="skip-link" href="#contenido-principal">Saltar al contenido principal</a>
      {showScene && (
        <Suspense fallback={null}>
          <SceneContainer />
        </Suspense>
      )}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main id="contenido-principal" className="flex-grow" tabIndex={-1}>
          <HeroSection />
          <ProjectsSection />
          <LabSection />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
