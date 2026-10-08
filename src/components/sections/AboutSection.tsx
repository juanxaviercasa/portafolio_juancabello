import React from 'react';
import { BookOpenCheck, BriefcaseBusiness, Code2, GraduationCap } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { skillsData } from '../../data/skillsData';

const EXPERIENCE = [
  {
    period: '2025–2026',
    role: 'Docente de Aritmética, Álgebra y Razonamiento Matemático',
    place: 'CEPREMUNI Ate',
    detail: 'Ciclos de verano y semestrales en sedes de Ate, Ollantaytambo y Huaycán.',
  },
  {
    period: '2018–2025',
    role: 'Docente de Matemáticas y Ciencias',
    place: 'Instituciones educativas y academias de Lima',
    detail: 'Física, Química, Biología, Aritmética, Geometría y Razonamiento Matemático en nivel secundario y preuniversitario.',
  },
];

export const AboutSection: React.FC = () => (
  <section id="sobre-mi" className="section-shell" data-od-id="about">
    <header>
      <p className="section-kicker"><BookOpenCheck className="h-4 w-4" aria-hidden="true" /> Trayectoria</p>
      <h2 className="section-heading">Matemática, aula y software en una misma práctica.</h2>
      <p className="section-intro">
        Mi trabajo parte de una pregunta sencilla: ¿cómo puede una interfaz ayudar a comprender mejor? Esa mirada une mi experiencia docente con el desarrollo de productos digitales.
      </p>
    </header>

    <div className="mt-9 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <article className="surface-card p-6 sm:p-8">
        <GraduationCap className="h-7 w-7 text-[var(--accent)]" aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-bold">Formación</h3>
        <ul className="mt-5 space-y-5">
          <li>
            <strong className="block">Bachiller en Matemática</strong>
            <span className="text-sm text-[var(--text-muted)]">Universidad Nacional de Educación Enrique Guzmán y Valle — La Cantuta</span>
          </li>
          <li>
            <strong className="block">Desarrollo Web Full Stack</strong>
            <span className="text-sm text-[var(--text-muted)]">Make It Real Camp</span>
          </li>
          <li>
            <strong className="block">Programación desde Cero</strong>
            <span className="text-sm text-[var(--text-muted)]">Egg Cooperation</span>
          </li>
        </ul>
        <a className="btn-secondary mt-7 w-full" href={siteConfig.teachingProfile} target="_blank" rel="noopener noreferrer">
          Ver perfil docente <span aria-hidden="true">↗</span>
        </a>
      </article>

      <article className="surface-card p-6 sm:p-8">
        <BriefcaseBusiness className="h-7 w-7 text-[var(--accent)]" aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-bold">Experiencia docente</h3>
        <ol className="mt-5 space-y-6">
          {EXPERIENCE.map((item) => (
            <li key={item.period} className="grid gap-2 border-l-2 border-[var(--border)] pl-4 sm:grid-cols-[7rem_1fr]">
              <span className="font-mono text-sm font-bold text-[var(--accent-strong)]">{item.period}</span>
              <div>
                <strong className="block">{item.role}</strong>
                <span className="block text-sm font-semibold text-[var(--text-muted)]">{item.place}</span>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </article>
    </div>

    <article className="surface-card mt-5 p-6 sm:p-8">
      <Code2 className="h-7 w-7 text-[var(--accent)]" aria-hidden="true" />
      <div className="mt-4 grid gap-6 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">
        <div>
          <h3 className="text-2xl font-bold">Competencias técnicas</h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
            Desarrollo interfaces responsivas, visualizaciones interactivas y herramientas educativas con una base sólida de accesibilidad y contenido.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {skillsData.map((skill) => (
            <div key={skill.title} className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
              <strong className="text-sm">{skill.title}</strong>
              <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  </section>
);
