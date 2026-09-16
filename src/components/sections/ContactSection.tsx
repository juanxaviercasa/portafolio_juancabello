import React, { useState } from 'react';
import { Mail, BookOpen, Download, Send, CheckCircle2, Copy } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { GlassCard } from '../ui/GlassCard';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';
import { useAudioEngine } from '../../audio/useAudioEngine';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { playTick } = useAudioEngine();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playTick(1400);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setIsCopied(true);
    playTick(1200);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <section id="contacto" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Columna Izquierda: Información de Contacto y Descarga de CV */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-cyan-500/10 border border-blue-500/20 dark:border-cyan-500/20 text-blue-700 dark:text-cyan-300 text-xs sm:text-sm font-mono mb-3">
              <Mail className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              <span>Colaboración & Diálogo</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Iniciemos un Proyecto Educativo o Tecnológico
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
              Disponible para consultoría en plataformas de aprendizaje STEM, docencia universitaria, desarrollo de simuladores WebGL o conferencias en tecnología educativa.
            </p>
          </div>

          {/* Banner de Descarga de CV de Alta Visibilidad */}
          <GlassCard accentBorder className="p-6 bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-white dark:from-cyan-950/40 dark:via-slate-900/60 dark:to-indigo-950/40 border-blue-200 dark:border-cyan-500/30">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-semibold text-blue-700 dark:text-cyan-400 uppercase tracking-wider">
                  Acceso Rápido para Evaluadores
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
                  Currículum Vitae Completo
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Formato PDF &middot; Experiencia docente, publicaciones y stack técnico detallado.
                </p>
              </div>
              <a
                href={siteConfig.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTick(1300)}
                className="flex items-center justify-center p-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 shadow-lg shadow-blue-500/25 dark:shadow-cyan-500/25 transition-transform hover:scale-105"
                title="Descargar CV en PDF"
                aria-label="Descargar CV en PDF"
              >
                <Download className="w-5 h-5" />
              </a>
            </div>
          </GlassCard>

          {/* Tarjeta de Email Directo */}
          {/* Tarjeta de Email Directo */}
          <GlassCard className="p-4 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 sm:p-3 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-cyan-400 border border-blue-100 dark:border-white/5 flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">Correo Principal</span>
                <span className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 truncate block" title={siteConfig.email}>
                  {siteConfig.email}
                </span>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors text-xs flex items-center justify-center gap-1.5 focus:outline-none min-h-[44px] flex-shrink-0 cursor-pointer"
              title="Copiar correo"
            >
              {isCopied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs text-emerald-700 dark:text-emerald-300 font-mono font-medium">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-xs font-mono font-medium">Copiar</span>
                </>
              )}
            </button>
          </GlassCard>

          {/* Enlaces Sociales y Académicos */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTick(900)}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 py-3 sm:p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/60 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all text-xs font-mono font-semibold min-h-[44px] cursor-pointer"
            >
              <GithubIcon className="w-4 h-4 text-slate-600 dark:text-slate-400 flex-shrink-0" />
              <span className="truncate">GitHub</span>
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTick(900)}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 py-3 sm:p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/60 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all text-xs font-mono font-semibold min-h-[44px] cursor-pointer"
            >
              <LinkedinIcon className="w-4 h-4 text-blue-600 dark:text-cyan-400 flex-shrink-0" />
              <span className="truncate">LinkedIn</span>
            </a>
            <a
              href={siteConfig.scholar}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTick(900)}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 py-3 sm:p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/60 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all text-xs font-mono font-semibold min-h-[44px] cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
              <span className="truncate">Scholar</span>
            </a>
          </div>
        </div>

        {/* Columna Derecha: Formulario Accesible con inputs h-12 y etiquetas claras */}
        <div className="lg:col-span-7">
          <GlassCard className="p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Envía un Mensaje Directo
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-8">
              Respondo usualmente en menos de 24 horas hábiles.
            </p>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-blue-50 dark:bg-cyan-950/40 border border-blue-200 dark:border-cyan-500/30 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-blue-600 dark:text-cyan-400 mx-auto animate-bounce" />
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">¡Mensaje Enviado con Éxito!</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Gracias por comunicarte. Me pondré en contacto contigo a la brevedad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                      Nombre o Institución *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej. Dra. Elena Morales / Universidad"
                      className="w-full h-12 px-4 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-400/20 transition-all shadow-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                      Correo Electrónico *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ejemplo@institucion.edu"
                      className="w-full h-12 px-4 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-400/20 transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    Asunto del Proyecto
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Ej. Colaboración en Simulador de Cálculo / Oferta Laboral"
                    className="w-full h-12 px-4 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-400/20 transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe los objetivos del proyecto, requerimientos de visualización o dudas pedagógicas..."
                    className="w-full min-h-[120px] p-4 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-400/20 transition-all resize-none shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 min-h-[48px] px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-cyan-500 dark:to-indigo-600 dark:hover:from-cyan-400 dark:hover:to-indigo-500 text-white font-semibold text-sm uppercase tracking-wider shadow-lg shadow-blue-500/25 dark:shadow-cyan-500/25 transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-300"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensaje</span>
                </button>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
