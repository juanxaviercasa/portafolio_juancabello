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
    <section id="contacto" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Columna Izquierda: Información de Contacto y Descarga de CV */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-3">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>Colaboración & Diálogo</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Iniciemos un Proyecto Educativo o Tecnológico
            </h2>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              Disponible para consultoría en plataformas de aprendizaje STEM, docencia universitaria, desarrollo de simuladores WebGL o conferencias en tecnología educativa.
            </p>
          </div>

          {/* Banner de Descarga de CV de Alta Visibilidad (Recruiter Track) */}
          <GlassCard accentBorder className="p-6 bg-gradient-to-br from-cyan-950/40 via-slate-900/60 to-indigo-950/40">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                  Acceso Rápido para Evaluadores
                </span>
                <h4 className="text-lg font-bold text-white mt-1">
                  Currículum Vitae Completo
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Formato PDF &middot; Experiencia docente, publicaciones y stack técnico detallado.
                </p>
              </div>
              <a
                href={siteConfig.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTick(1300)}
                className="flex items-center justify-center p-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25 transition-transform hover:scale-105"
                title="Descargar CV en PDF"
                aria-label="Descargar CV en PDF"
              >
                <Download className="w-5 h-5" />
              </a>
            </div>
          </GlassCard>

          {/* Tarjeta de Email Directo */}
          <GlassCard className="p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-800 text-cyan-400 border border-white/5">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 block">Correo Principal</span>
                <span className="text-sm font-semibold text-slate-200">{siteConfig.email}</span>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1.5 focus:outline-none"
              title="Copiar correo"
            >
              {isCopied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-[11px] text-emerald-300 font-mono">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-[11px] font-mono">Copiar</span>
                </>
              )}
            </button>
          </GlassCard>

          {/* Enlaces Sociales y Académicos */}
          <div className="grid grid-cols-3 gap-3">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTick(900)}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/5 text-slate-300 hover:text-white transition-all text-xs font-mono"
            >
              <GithubIcon className="w-4 h-4 text-slate-400" />
              <span>GitHub</span>
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTick(900)}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/5 text-slate-300 hover:text-white transition-all text-xs font-mono"
            >
              <LinkedinIcon className="w-4 h-4 text-cyan-400" />
              <span>LinkedIn</span>
            </a>
            <a
              href={siteConfig.scholar}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTick(900)}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/5 text-slate-300 hover:text-white transition-all text-xs font-mono"
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Scholar</span>
            </a>
          </div>
        </div>

        {/* Columna Derecha: Formulario Accesible */}
        <div className="lg:col-span-7">
          <GlassCard className="p-8">
            <h3 className="text-xl font-bold text-slate-100 mb-2">
              Envía un Mensaje Directo
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Respondo usualmente en menos de 24 horas hábiles.
            </p>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-cyan-400 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold text-white">¡Mensaje Enviado con Éxito!</h4>
                <p className="text-xs text-slate-300">
                  Gracias por comunicarte. Me pondré en contacto contigo a la brevedad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-slate-300 mb-1.5">
                      Nombre o Institución *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej. Dra. Elena Morales / Universidad"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/70 border border-white/10 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-slate-300 mb-1.5">
                      Correo Electrónico *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ejemplo@institucion.edu"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/70 border border-white/10 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-mono text-slate-300 mb-1.5">
                    Asunto del Proyecto
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Ej. Colaboración en Simulador de Cálculo / Oferta Laboral"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/70 border border-white/10 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-slate-300 mb-1.5">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe los objetivos del proyecto, requerimientos de visualización o dudas pedagógicas..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/70 border border-white/10 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-300"
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
