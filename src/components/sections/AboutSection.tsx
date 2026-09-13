import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Lightbulb,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Compass
} from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { skillsData } from '../../data/skillsData';
import { GlassCard } from '../ui/GlassCard';
import { Latex } from '../ui/Latex';
import { useAudioEngine } from '../../audio/useAudioEngine';

type TabId = 'bento' | 'educacion' | 'tech' | 'filosofia';

const TABS: { id: TabId; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'bento', label: 'Visión Modular (Bento)', icon: Layers },
  { id: 'educacion', label: 'Educación & Matemáticas', icon: GraduationCap },
  { id: 'tech', label: 'Web & Gráficos 3D', icon: Cpu },
  { id: 'filosofia', label: 'Filosofía Pedagógica', icon: Lightbulb },
];

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('bento');
  const { playTick } = useAudioEngine();

  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    playTick(1020);
  };

  return (
    <section id="sobre-mi" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-cyan-500/10 border border-blue-500/20 dark:border-cyan-500/20 text-blue-700 dark:text-cyan-300 text-xs sm:text-sm font-mono mb-3">
          <User className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
          <span>Perfil Profesional & Métodos</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          La Intersección entre la Abstracción y la Experiencia
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
          Durante más de 8 años he trabajado como educador de cálculo y matemáticas universitarias mientras investigaba cómo las tecnologías web emergentes (WebGL, WebAssembly, Web Audio) pueden transformar la pedagogía de las ciencias exactas.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-md overflow-x-auto mb-10 shadow-sm max-w-2xl">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
                isActive
                  ? 'bg-blue-600 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-md shadow-blue-500/20 dark:shadow-cyan-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/80 dark:hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: BENTO GRID MODULAR */}
      {activeTab === 'bento' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Trayectoria & Identidad (Grande, 8 columnas) */}
          <GlassCard accentBorder className="md:col-span-8 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-cyan-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-cyan-500/30">
                  Docencia STEM & Innovación
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">8+ Años de Experiencia</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                Transformando el Cálculo en una Experiencia Sensorial
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Creo firmemente que un concepto matemático abstracto no se comprende plenamente hasta que el estudiante puede manipularlo, observarlo y escuchar su comportamiento en tiempo real. Mis plataformas han sido adoptadas por cátedras universitarias para erradicar la frustración en asignaturas clave como Cálculo Multivariable y Topología.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-white/5">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold font-mono text-blue-600 dark:text-cyan-300">18,500+</span>
                <span className="text-xs text-slate-600 dark:text-slate-400">Estudiantes beneficiados</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400">+32%</span>
                <span className="text-xs text-slate-600 dark:text-slate-400">Tasa de aprobación</span>
              </div>
              <div className="flex flex-col col-span-2 sm:col-span-1">
                <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">WCAG AAA</span>
                <span className="text-xs text-slate-600 dark:text-slate-400">Accesibilidad universal</span>
              </div>
            </div>
          </GlassCard>

          {/* Card 2: Filosofía de Diseño Visual (4 columnas) */}
          <GlassCard className="md:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-slate-900/60 dark:to-indigo-950/20">
            <div>
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 w-fit mb-4">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Filosofía de Diseño
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                "El rigor formal no está reñido con la belleza plástica. Cuando el estudiante toca la ecuación, la abstracción se vuelve intuición duradera."
              </p>
            </div>
            <div className="pt-3 border-t border-slate-200 dark:border-white/5 flex items-center gap-2 text-xs font-mono text-blue-700 dark:text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span>Two-Speed UX & Scrollytelling</span>
            </div>
          </GlassCard>

          {/* Card 3: Stack de Tecnologías Gráficas y Web (6 columnas) */}
          <GlassCard className="md:col-span-6 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-blue-500/10 dark:bg-cyan-500/10 text-blue-600 dark:text-cyan-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">Stack Web & Shaders 3D</h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Cómputo masivo en GPU a 60 FPS</span>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-blue-50 dark:bg-cyan-950/60 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-cyan-500/30">
                Experto
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Desarrollo de shaders GLSL optimizados para renderizado analítico en tiempo real, integración con Three.js, React 19, Web Audio API y gestión de estado reactivo con Zustand.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {['Three.js', 'GLSL Shaders', 'React 19', 'TypeScript', 'Web Audio API', 'Tailwind CSS'].map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/5">
                  {tech}
                </span>
              ))}
            </div>
          </GlassCard>

          {/* Card 4: Fundamento Matemático & Computación Científica (6 columnas) */}
          <GlassCard className="md:col-span-6 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">Matemáticas Puras & Aplicadas</h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Modelado riguroso y simulación</span>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30">
                Avanzado
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Especialización en análisis de Fourier armónico, topología de variedades diferenciables, campos de gradientes y resolución numérica Runge-Kutta para física interactiva.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {['Análisis de Fourier', 'Cálculo Multivariable', 'Variedades Diferenciables', 'Topología', 'Métodos Numéricos'].map((math) => (
                <span key={math} className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/5">
                  {math}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* TAB 2: EDUCACIÓN & MATEMÁTICAS */}
      {activeTab === 'educacion' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <GlassCard className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-blue-600 dark:text-cyan-400 font-semibold">2018 — Presente</span>
              <span className="text-xs font-mono bg-blue-50 dark:bg-cyan-950/60 text-blue-700 dark:text-cyan-300 px-2.5 py-1 rounded-full border border-blue-200 dark:border-cyan-500/20">Cátedra Activa</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Profesor Universitario de Cálculo y Métodos Numéricos
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Cátedras de Cálculo Diferencial e Integral, Álgebra Lineal Computacional y Simulación Gráfica. Creador de laboratorios interactivos digitales implementados en mallas curriculares de ingeniería para más de 18,000 estudiantes.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-md">Docencia STEM</span>
              <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-md">Innovación Curricular</span>
              <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-md">Evaluación Formativa</span>
            </div>
          </GlassCard>

          <GlassCard className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">Formación de Grado y Posgrado</span>
              <span className="text-xs font-mono bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-200 dark:border-indigo-500/20">Investigación</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Licenciatura en Educación Matemática & Especialización en Computación
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Tesis enfocada en la modelización de variedades diferenciales y sistemas dinámicos mediante técnicas de renderizado por shaders en navegadores web sin plugins, combinando rigor matemático y accesibilidad cognitiva.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-md">Topología Diferencial</span>
              <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-md">Computación Gráfica</span>
              <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-md">Didáctica Visual</span>
            </div>
          </GlassCard>
        </div>
      )}

      {/* TAB 3: STACK DE TECNOLOGÍAS WEB Y GRÁFICAS */}
      {activeTab === 'tech' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {skillsData.map((cat, idx) => (
            <GlassCard key={idx} className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">{cat.title}</h4>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-blue-50 dark:bg-cyan-500/10 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-500/20 font-medium">
                    {cat.badge}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  {cat.description}
                </p>

                <div className="space-y-4">
                  {cat.skills.map((s, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{s.name}</span>
                        <span className="font-mono text-xs text-blue-600 dark:text-cyan-400 font-semibold">{s.level}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {s.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* TAB 4: FILOSOFÍA DE DISEÑO */}
      {activeTab === 'filosofia' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {siteConfig.pedagogicalPrinciples.map((prin, idx) => (
            <GlassCard key={idx} className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs text-blue-700 dark:text-cyan-400 bg-blue-50 dark:bg-cyan-950/70 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-cyan-500/30 inline-block mb-4 font-semibold shadow-sm">
                  <Latex math={prin.formula} />
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                  {prin.title}
                </h4>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {prin.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/5 flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-cyan-400" />
                <span>Principio {idx + 1} de Diseño Didáctico</span>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </section>
  );
};
