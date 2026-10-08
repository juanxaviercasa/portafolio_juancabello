import React, { useState } from 'react';
import { CheckCircle2, Clipboard, Download, GraduationCap, Mail, Send, Video } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';
import { useAudioEngine } from '../../audio/useAudioEngine';

interface FormData { name: string; email: string; subject: string; message: string }
const EMPTY_FORM: FormData = { name: '', email: '', subject: '', message: '' };

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [status, setStatus] = useState('');
  const [copied, setCopied] = useState(false);
  const { playTick } = useAudioEngine();

  const update = (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((current) => ({ ...current, [field]: event.target.value }));
    setStatus('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = formData.subject.trim() || `Contacto desde el portafolio — ${formData.name.trim()}`;
    const body = [
      `Nombre: ${formData.name.trim()}`,
      `Correo de respuesta: ${formData.email.trim()}`,
      '',
      formData.message.trim(),
    ].join('\n');
    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('Se abrió tu aplicación de correo con el mensaje preparado. Revísalo y pulsa Enviar allí.');
    playTick(1300);
    window.location.assign(mailto);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setStatus('Correo copiado al portapapeles.');
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setStatus(`Copia manualmente este correo: ${siteConfig.email}`);
    }
  };

  return (
    <section id="contacto" className="section-shell" data-od-id="contact">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div>
          <p className="section-kicker"><Mail className="h-4 w-4" aria-hidden="true" /> Contacto</p>
          <h2 className="section-heading">Conversemos sobre tu próximo proyecto.</h2>
          <p className="section-intro">
            Disponible para desarrollo web, tecnología educativa, docencia de matemáticas y colaboración remota.
          </p>

          <div className="surface-card mt-7 p-5 sm:p-6">
            <span className="text-xs font-bold uppercase tracking-wide text-[var(--text-muted)]">Correo profesional</span>
            <a className="mt-2 block break-all text-lg font-extrabold text-[var(--accent-strong)] underline decoration-2 underline-offset-4" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            <button type="button" className="btn-secondary mt-4 w-full" onClick={copyEmail}>
              {copied ? <CheckCircle2 className="h-4 w-4 text-[var(--success)]" aria-hidden="true" /> : <Clipboard className="h-4 w-4" aria-hidden="true" />}
              {copied ? 'Correo copiado' : 'Copiar correo'}
            </button>
          </div>

          <a className="btn-primary mt-4 w-full" href={siteConfig.cvUrl} target="_blank" rel="noopener noreferrer">
            <Download className="h-4 w-4" aria-hidden="true" /> Descargar CV profesional
          </a>

          <nav className="mt-5 grid grid-cols-2 gap-2" aria-label="Perfiles profesionales">
            <a className="btn-secondary" href={siteConfig.github} target="_blank" rel="noopener noreferrer"><GithubIcon className="h-4 w-4" aria-hidden="true" /> GitHub</a>
            <a className="btn-secondary" href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer"><LinkedinIcon className="h-4 w-4" aria-hidden="true" /> LinkedIn</a>
            <a className="btn-secondary" href={siteConfig.tiktok} target="_blank" rel="noopener noreferrer"><Video className="h-4 w-4" aria-hidden="true" /> TikTok</a>
            <a className="btn-secondary" href={siteConfig.teachingProfile} target="_blank" rel="noopener noreferrer"><GraduationCap className="h-4 w-4" aria-hidden="true" /> Docencia</a>
          </nav>
        </div>

        <form className="surface-card p-5 sm:p-8" onSubmit={handleSubmit} noValidate={false}>
          <h3 className="text-2xl font-bold">Preparar un correo</h3>
          <p className="mt-2 text-sm text-[var(--text-muted)]">El formulario usa tu aplicación de correo; no guarda ni envía datos a terceros.</p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold" htmlFor="contact-name">Nombre o institución</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" required value={formData.name} onChange={update('name')} placeholder="Ej.: Ana Torres…" className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-[var(--text)] placeholder:text-[var(--text-muted)]" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold" htmlFor="contact-email">Correo de respuesta</label>
              <input id="contact-email" name="email" type="email" inputMode="email" autoComplete="email" spellCheck={false} required value={formData.email} onChange={update('email')} placeholder="Ej.: ana@empresa.com…" className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-[var(--text)] placeholder:text-[var(--text-muted)]" />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-bold" htmlFor="contact-subject">Asunto</label>
            <input id="contact-subject" name="subject" type="text" autoComplete="off" value={formData.subject} onChange={update('subject')} placeholder="Ej.: Desarrollo de plataforma educativa…" className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-[var(--text)] placeholder:text-[var(--text-muted)]" />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-bold" htmlFor="contact-message">Mensaje</label>
            <textarea id="contact-message" name="message" autoComplete="off" required rows={6} value={formData.message} onChange={update('message')} placeholder="Cuéntame el objetivo, el alcance y los tiempos estimados…" className="w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-[var(--text)] placeholder:text-[var(--text-muted)]" />
          </div>

          <button type="submit" className="btn-primary mt-5 w-full sm:w-auto">
            <Send className="h-4 w-4" aria-hidden="true" /> Preparar correo
          </button>
          <p className="mt-4 min-h-6 text-sm font-medium text-[var(--success)]" role="status" aria-live="polite">{status}</p>
        </form>
      </div>
    </section>
  );
};
