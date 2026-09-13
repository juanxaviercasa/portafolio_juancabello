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
          ? 'py-3 bg-white/90 dark:bg-[#07090e]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-lg shadow-slate-200/40 dark:shadow-2xl dark:shadow-black/50'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={() => handleLinkClick(1100)}
          className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-cyan-400/50 rounded-xl p-1 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 dark:from-cyan-500 dark:to-indigo-600 flex items-center justify-center p-0.5 shadow-md shadow-blue-500/20 dark:shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white dark:bg-[#07090e] rounded-[10px] flex items-center justify-center">
              <span className="font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-400 dark:to-indigo-300 text-sm sm:text-base">
                JC
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
              Juan Cabello
            </span>
            <span className="text-[11px] sm:text-xs font-mono text-slate-500 dark:text-slate-400 tracking-wide">
              Educación &middot; Math &middot; Web
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-sm">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(980)}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-300 hover:bg-white dark:hover:bg-slate-800/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-cyan-400/40 cursor-pointer"
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
            className="group relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-500 dark:to-indigo-600 text-white shadow-md shadow-blue-500/20 dark:shadow-cyan-500/25 hover:shadow-blue-500/35 dark:hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-400 cursor-pointer"
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
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
            aria-label={isMobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 bg-white/95 dark:bg-[#0a0d14]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 space-y-2 mt-2 shadow-xl">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(950)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <Icon className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span>{link.label}</span>
              </a>
            );
          })}

          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/5 my-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Tema Visual:</span>
            <ThemeToggle variant="pill" showLabel={true} />
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-white/10">
            <a
              href={siteConfig.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleLinkClick(1320)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-500 dark:to-indigo-600 text-white shadow-md cursor-pointer"
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
