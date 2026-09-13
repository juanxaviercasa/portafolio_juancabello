import React from 'react';
import { User, GraduationCap, Lightbulb, CheckCircle2, Award } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { skillsData } from '../../data/skillsData';
import { GlassCard } from '../ui/GlassCard';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre-mi" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-3">
          <User className="w-3.5 h-3.5 text-cyan-400" />
          <span>Perfil & Trayectoria</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
          La Intersección entre la Abstracción y la Experiencia
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
          Durante más de 8 años he trabajado como educador de cálculo y matemáticas universitarias mientras investigaba cómo las tecnologías web emergentes (WebGL, WebAssembly, Web Audio) pueden transformar la pedagogía de las ciencias exactas. Creo firmemente que un concepto matemático abstracto no se comprende plenamente hasta que el estudiante puede manipularlo, observarlo y escuchar su comportamiento en tiempo real.
        </p>
      </div>

      {/* Principios Pedagógicos Clave */}
      <div className="mb-20">
        <div className="flex items-center gap-2.5 mb-6">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Tres Principios del Diseño Pedagógico Visual
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteConfig.pedagogicalPrinciples.map((prin, idx) => (
            <GlassCard key={idx} className="flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-cyan-400 bg-cyan-950/70 px-2.5 py-1 rounded-md border border-cyan-500/30 inline-block mb-3">
                  {prin.formula}
                </span>
                <h4 className="text-base font-bold text-slate-100 mb-2">
                  {prin.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {prin.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Principio {idx + 1} de Diseño Didáctico</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Matriz de Habilidades por Especialidad */}
      <div className="mb-20">
        <div className="flex items-center gap-2.5 mb-6">
          <Award className="w-5 h-5 text-cyan-400" />
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Habilidades Especializadas & Dominio Técnico
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {skillsData.map((cat, idx) => (
            <GlassCard key={idx} className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-bold text-slate-100">{cat.title}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {cat.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  {cat.description}
                </p>

                <div className="space-y-3.5">
                  {cat.skills.map((s, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">{s.name}</span>
                        <span className="font-mono text-[11px] text-cyan-400">{s.level}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {s.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Trayectoria / Formación Académica */}
      <div>
        <div className="flex items-center gap-2.5 mb-6">
          <GraduationCap className="w-5 h-5 text-indigo-400" />
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Formación Académica y Docencia
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard>
            <span className="text-xs font-mono text-cyan-400">2018 — Presente</span>
            <h4 className="text-base font-bold text-slate-100 mt-1 mb-2">
              Profesor Universitario de Cálculo y Métodos Numéricos
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Cátedras de Cálculo Diferencial e Integral, Álgebra Lineal Computacional y Simulación Gráfica. Creador de laboratorios interactivos digitales implementados en mallas curriculares de ingeniería.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Docencia STEM</span>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Innovación Curricular</span>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Evaluación Formativa</span>
            </div>
          </GlassCard>

          <GlassCard>
            <span className="text-xs font-mono text-indigo-400">Formación de Grado y Posgrado</span>
            <h4 className="text-base font-bold text-slate-100 mt-1 mb-2">
              Licenciatura en Educación Matemática & Especialización en Computación
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Tesis enfocada en la modelización de variedades diferenciales y sistemas dinámicos mediante técnicas de renderizado por shaders en navegadores web sin plugins.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Topología Diferencial</span>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Computación Gráfica</span>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Didáctica de la Matemática</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
