import React from 'react';
import { ArrowRight, Download, MapPin, MousePointer2, Sparkles } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { useAudioEngine } from '../../audio/useAudioEngine';

export const HeroSection: React.FC = () => {
  const { playTick } = useAudioEngine();

  return (
    <section id="hero" className="section-shell flex min-h-[min(900px,100svh)] items-center pt-28 sm:pt-32" data-od-id="hero">
      <div className="hero-layout grid w-full items-center gap-10 lg:grid-cols-[minmax(0,0.94fr)_minmax(14rem,0.58fr)_minmax(19rem,0.76fr)] lg:gap-5 xl:gap-8">
        <div className="hero-copy max-w-4xl">
          <p className="section-kicker">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Educación matemática · Desarrollo web
          </p>
          <h1 className="max-w-[15ch] text-[clamp(2.8rem,7.5vw,5.35rem)] font-extrabold leading-[0.96] tracking-[-0.055em]">
            Aprender, diseñar y construir con claridad.
          </h1>
          <p className="mt-6 max-w-[64ch] text-base leading-relaxed text-[var(--text-muted)] sm:text-xl">
            {siteConfig.description} Desarrollo herramientas que convierten conceptos complejos en experiencias útiles y fáciles de explorar.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#proyectos" className="btn-primary" onClick={() => playTick(980)}>
              Ver proyectos reales <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={siteConfig.cvUrl} className="btn-secondary" target="_blank" rel="noopener noreferrer" onClick={() => playTick(1200)}>
              <Download className="h-4 w-4" aria-hidden="true" /> Descargar CV
            </a>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm font-medium text-[var(--text-muted)]">
            <MapPin className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" /> {siteConfig.location}
          </p>
        </div>

        <div className="hero-sculpture-window" aria-hidden="true">
          <div className="hero-sculpture-label">
            <img src={`${import.meta.env.BASE_URL}images/fenix_logo.jpg`} alt="" width="700" height="700" />
            <span>FÉNIX 357</span>
            <small>Geometría generativa</small>
          </div>
        </div>

        <aside className="surface-card hero-profile relative overflow-hidden p-5 sm:p-6" aria-label="Perfil profesional resumido">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[var(--accent-soft)] blur-3xl" aria-hidden="true" />
          <div className="relative flex items-center gap-3">
            <span className="h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-[var(--surface)] bg-[var(--surface-soft)] shadow-[0_0_0_2px_var(--accent)]">
              <img
                src={`${import.meta.env.BASE_URL}images/Xavier%20Cabello.jpeg`}
                alt="Retrato profesional de Juan Xavier Cabello"
                className="portrait-avatar h-full w-full object-cover"
                width="628"
                height="624"
              />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent-strong)]">Perfil híbrido</p>
              <p className="text-sm font-semibold text-[var(--text-muted)]">Matemática · Educación · Web</p>
            </div>
          </div>
          <h2 className="relative mt-3 text-2xl font-bold sm:text-3xl">Docencia que entiende el producto digital.</h2>
          <p className="relative mt-4 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
            Combino experiencia en aula, formación matemática y desarrollo web para crear soluciones orientadas a estudiantes, docentes y organizaciones.
          </p>
          <dl className="relative mt-7 space-y-5 border-t border-[var(--border)] pt-6">
            {siteConfig.stats.map((stat) => (
              <div key={stat.label} className="grid grid-cols-[6.5rem_1fr] gap-3">
                <dt className="text-xs font-bold uppercase tracking-wide text-[var(--text-muted)]">{stat.label}</dt>
                <dd>
                  <strong className="block text-sm text-[var(--text)] sm:text-base">{stat.value}</strong>
                  <span className="block text-xs text-[var(--text-muted)] sm:text-sm">{stat.subtext}</span>
                </dd>
              </div>
            ))}
          </dl>
          <a href="#laboratorio" className="relative mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[var(--accent-strong)] underline decoration-2 underline-offset-4">
            <MousePointer2 className="h-4 w-4" aria-hidden="true" /> Explorar el laboratorio interactivo
          </a>
        </aside>
      </div>
    </section>
  );
};
