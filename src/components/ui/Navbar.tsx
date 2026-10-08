import React, { useEffect, useRef, useState } from 'react';
import { Download, FlaskConical, FolderKanban, Mail, Menu, UserRound, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { siteConfig } from '../../data/siteConfig';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { useAudioEngine } from '../../audio/useAudioEngine';

const LINKS = [
  { label: 'Proyectos', href: '#proyectos', id: 'proyectos', icon: FolderKanban },
  { label: 'Laboratorio', href: '#laboratorio', id: 'laboratorio', icon: FlaskConical },
  { label: 'Trayectoria', href: '#sobre-mi', id: 'sobre-mi', icon: UserRound },
  { label: 'Contacto', href: '#contacto', id: 'contacto', icon: Mail },
];

export const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = usePortfolioStore((state) => state.activeSection);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { playTick } = useAudioEngine();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const close = () => { setOpen(false); playTick(930); };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-200 ${scrolled || open ? 'border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_94%,transparent)] shadow-sm backdrop-blur-xl' : 'border-transparent bg-transparent'}`}>
      <div className="mx-auto flex min-h-[4.75rem] w-[min(100%-1.25rem,76rem)] items-center justify-between gap-3">
        <a href="#hero" className="flex min-h-11 min-w-0 items-center gap-3 rounded-xl" onClick={close} aria-label="Juan Cabello, ir al inicio">
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-[var(--surface)] bg-[var(--surface-soft)] shadow-[0_0_0_2px_var(--accent)]" aria-hidden="true">
            <img
              src={`${import.meta.env.BASE_URL}images/Xavier%20Cabello.jpeg`}
              alt=""
              className="portrait-avatar h-full w-full object-cover"
              width="628"
              height="624"
            />
          </span>
          <span className="min-w-0">
            <strong className="block truncate text-sm leading-tight text-[var(--text)]">Juan Cabello</strong>
            <span className="block truncate text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">Educación · Web</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
          {LINKS.map((link) => {
            const active = activeSection === link.id;
            return (
              <a key={link.id} href={link.href} aria-current={active ? 'location' : undefined} onClick={close} className={`flex min-h-11 items-center rounded-xl px-3 text-sm font-bold transition-colors ${active ? 'bg-[var(--accent-soft)] text-[var(--accent-strong)]' : 'text-[var(--text-muted)] hover:bg-[var(--surface-soft)] hover:text-[var(--text)]'}`}>
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle variant="icon" />
          <a href={siteConfig.cvUrl} target="_blank" rel="noopener noreferrer" className="btn-primary hidden sm:inline-flex">
            <Download className="h-4 w-4" aria-hidden="true" /> CV
          </a>
          <button ref={menuButton} type="button" className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] lg:hidden" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-navigation" className="max-h-[calc(100svh-4.75rem)] overflow-y-auto overscroll-contain border-t border-[var(--border)] bg-[var(--surface)] px-3 py-4 lg:hidden" aria-label="Navegación móvil">
          <div className="mx-auto grid w-full max-w-xl gap-2">
            {LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a key={link.id} href={link.href} aria-current={activeSection === link.id ? 'location' : undefined} onClick={close} className="flex min-h-12 items-center gap-3 rounded-xl px-4 font-bold text-[var(--text)] hover:bg-[var(--surface-soft)]">
                  <Icon className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" /> {link.label}
                </a>
              );
            })}
            <a href={siteConfig.cvUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-2 sm:hidden" onClick={close}>
              <Download className="h-4 w-4" aria-hidden="true" /> Descargar CV
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
