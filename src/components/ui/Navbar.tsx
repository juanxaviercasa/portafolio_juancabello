import React, { useState, useEffect } from 'react';
import { Download, Menu, X, Compass, Layers, User, Mail } from 'lucide-react';
import { AudioToggle } from './AudioToggle';
import { ThemeToggle } from './ThemeToggle';
import { useAudioEngine } from '../../audio/useAudioEngine';
import { siteConfig } from '../../data/siteConfig';

const NAV_LINKS = [
  { label: 'Proyectos', href: '#proyectos', icon: Layers },
  { label: 'Laboratorio 3D', href: '#laboratorio', icon: Compass },
  { label: 'Sobre Mí', href: '#sobre-mi', icon: User },
  { label: 'Contacto', href: '#contacto', icon: Mail },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { playTick } = useAudioEngine();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (freq = 880) => {
    playTick(freq);
    setIsMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-white/90 dark:bg-[#0B0813]/90 backdrop-blur-xl border-b border-purple-200/70 dark:border-purple-500/20 shadow-lg shadow-purple-900/5 dark:shadow-2xl dark:shadow-black/70'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo FÉNIX 357 */}
        <a
          href="#hero"
          onClick={() => handleLinkClick(1100)}
          className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-xl p-1 cursor-pointer"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-amber-500 flex items-center justify-center p-0.5 shadow-md shadow-purple-500/25 group-hover:shadow-purple-500/40 group-hover:scale-105 transition-all">
            <div className="w-full h-full bg-[#FAF5FF] dark:bg-[#0B0813] rounded-[10px] flex items-center justify-center relative overflow-hidden">
              {/* Geometric Phoenix Flame Glyph */}
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <path
                  d="M12 2L15 8L20 9L16 14L17 21L12 17L7 21L8 14L4 9L9 8L12 2Z"
                  fill="url(#phoenix-nav-grad)"
                  stroke="url(#phoenix-nav-stroke)"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="phoenix-nav-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A855F7" />
                    <stop offset="50%" stopColor="#E879F9" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                  <linearGradient id="phoenix-nav-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C084FC" />
                    <stop offset="100%" stopColor="#FDE047" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-semibold tracking-[0.2em] text-slate-900 dark:text-white text-xs sm:text-sm uppercase group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                Juan Cabello
              </span>
              <span className="text-purple-500 font-mono font-bold text-xs">//</span>
              <span className="font-mono font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-500 to-amber-500 dark:from-purple-400 dark:via-fuchsia-300 dark:to-amber-400 text-xs sm:text-sm">
                FÉNIX 357
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-purple-900/60 dark:text-purple-300/70 tracking-widest uppercase">
              3 Pilares &middot; 5 Frecuencias &middot; 7 Dimensiones
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-purple-50/70 dark:bg-[#130E24]/80 p-1.5 rounded-full border border-purple-200/70 dark:border-purple-500/20 backdrop-blur-md shadow-sm">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(980)}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-amber-300 hover:bg-white dark:hover:bg-purple-900/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 cursor-pointer"
              >
                <Icon className="w-3.5 h-3.5 opacity-80" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Actions Desktop (Pill Theme Switcher, Audio Toggle, CV) */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle variant="pill" showLabel={true} />
          <AudioToggle variant="header" />

          <a
            href={siteConfig.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleLinkClick(1320)}
            className="group relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-amber-500 hover:from-purple-500 hover:via-fuchsia-500 hover:to-amber-400 text-white shadow-md shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Descargar CV</span>
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-1.5">
          <ThemeToggle variant="pill" showLabel={false} />
          <AudioToggle variant="header" />
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-xl bg-purple-50 dark:bg-[#130E24] border border-purple-200 dark:border-purple-500/30 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer"
            aria-label={isMobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 bg-white/95 dark:bg-[#0B0813]/95 backdrop-blur-2xl border-b border-purple-200 dark:border-purple-500/20 space-y-2 mt-2 shadow-xl">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(950)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-[#130E24] hover:text-purple-600 dark:hover:text-amber-300 transition-colors cursor-pointer"
              >
                <Icon className="w-4 h-4 text-purple-600 dark:text-amber-400" />
                <span>{link.label}</span>
              </a>
            );
          })}

          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-purple-50/80 dark:bg-[#130E24] border border-purple-200/80 dark:border-purple-500/20 my-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Tema Visual:</span>
            <ThemeToggle variant="pill" showLabel={true} />
          </div>

          <div className="pt-2 border-t border-purple-200 dark:border-purple-500/20">
            <a
              href={siteConfig.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleLinkClick(1320)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-amber-500 text-white shadow-md shadow-purple-500/30 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Currículum Vitae (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
