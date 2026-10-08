import React from 'react';
import { ArrowUp, ExternalLink } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { useAudioEngine } from '../../audio/useAudioEngine';

export const Footer: React.FC = () => {
  const { playTick } = useAudioEngine();
  const year = new Intl.DateTimeFormat('es-PE', { year: 'numeric' }).format(new Date());

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <strong className="font-display text-lg">{siteConfig.name}</strong>
          <p className="mt-1 max-w-xl text-sm text-[var(--text-muted)]">{siteConfig.role} · {siteConfig.location}</p>
          <p className="mt-3 text-xs text-[var(--text-muted)]">
            Desarrollado por{' '}
            <a
              href="https://xavier.cabellosalirrosas.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTick(1050)}
              className="inline-flex min-h-11 items-center gap-1 font-semibold text-[var(--text)] underline decoration-[var(--border)] underline-offset-2 transition-colors hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
            >
              Xavier Cabello
              <ExternalLink className="inline h-3 w-3 opacity-75" aria-hidden="true" />
            </a>
          </p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">© {year} · Código del portafolio disponible con licencia MIT.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a className="btn-secondary" href={siteConfig.github} target="_blank" rel="noopener noreferrer">GitHub <ExternalLink className="h-4 w-4" aria-hidden="true" /></a>
          <button type="button" className="btn-secondary" onClick={() => { playTick(1150); window.scrollTo({ top: 0, behavior: 'smooth' }); }} aria-label="Volver al inicio">
            <ArrowUp className="h-4 w-4" aria-hidden="true" /> Arriba
          </button>
        </div>
      </div>
    </footer>
  );
};
