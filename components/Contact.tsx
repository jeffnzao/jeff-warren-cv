'use client';

import { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Link2, Send, CheckCircle, AlertCircle } from 'lucide-react';
import type { Lang } from '@/app/page';

interface ContactProps {
  lang: Lang;
  data: any;
}

export default function Contact({ lang, data }: ContactProps) {
  const { personal } = data;
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // ⚙️ Configure EmailJS :
    // 1. Créez un compte sur https://www.emailjs.com
    // 2. Remplacez les valeurs ci-dessous :
    const SERVICE_ID = 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

    try {
      const { default: emailjs } = await import('emailjs-com');
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: personal.email,
        },
        PUBLIC_KEY
      );
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      // Fallback: ouvre le client mail si EmailJS non configuré
      const subject = encodeURIComponent(`Contact depuis CV - ${form.name}`);
      const body = encodeURIComponent(form.message);
      window.open(`mailto:${personal.email}?subject=${subject}&body=${body}`);
      setStatus('success');
    }

    setTimeout(() => setStatus('idle'), 5000);
  };

  const contactMethods = [
    { icon: <Mail size={20} />, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { icon: <Phone size={20} />, label: lang === 'fr' ? 'Téléphone' : 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
    { icon: <MapPin size={20} />, label: lang === 'fr' ? 'Localisation' : 'Location', value: personal.location, href: null },
  ];

  const socials = [
    { icon: <Linkedin size={20} />, href: personal.linkedin, label: 'LinkedIn' },
    { icon: <Github size={20} />, href: personal.github, label: 'GitHub' },
    { icon: <Link2 size={20} />, href: personal.linktree, label: 'Linktree' },
  ];

  const labels = {
    title: { fr: 'Discutons de Votre Projet', en: "Let's Discuss Your Project" },
    lead: { fr: 'Projet ServiceNow ou besoin d\'expertise ITSM ? Contactez-moi.', en: 'ServiceNow project or need ITSM expertise? Contact me.' },
    name: { fr: 'Votre Nom', en: 'Your Name' },
    namePh: { fr: 'Prénom Nom', en: 'First Name Last Name' },
    emailPh: { fr: 'votre@email.com', en: 'your@email.com' },
    msgPh: { fr: 'Votre projet...', en: 'Your project...' },
    send: { fr: 'Envoyer le message', en: 'Send Message' },
    sending: { fr: 'Envoi en cours...', en: 'Sending...' },
    success: { fr: 'Message envoyé ! Je vous répondrai sous 24h.', en: 'Message sent! I\'ll reply within 24h.' },
    error: { fr: 'Erreur lors de l\'envoi. Réessayez.', en: 'Error sending. Please try again.' },
  };

  return (
    <section id="contact" className="section-padding" ref={sectionRef}>
      <div className="container-max">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-400 text-sm font-mono font-medium mb-4">
            # Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            <span className="gradient-text">{labels.title[lang]}</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <p className="animate-on-scroll text-gray-300 text-lg leading-relaxed">
              {labels.lead[lang]}
            </p>

            <div className="animate-on-scroll space-y-4">
              {contactMethods.map((m, i) => (
                <div key={i} className="flex items-center gap-4 glass-card p-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 shrink-0">
                    {m.icon}
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">{m.label}</div>
                    {m.href ? (
                      <a href={m.href} className="text-white font-medium hover:text-primary-400 transition-colors">
                        {m.value}
                      </a>
                    ) : (
                      <span className="text-white font-medium">{m.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="animate-on-scroll flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-3 glass-card hover:border-primary-500/40 text-gray-400 hover:text-primary-400 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="animate-on-scroll">
            <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {labels.name[lang]}
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={labels.namePh[lang]}
                  className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700/60 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/60 focus:ring-1 focus:ring-primary-500/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={labels.emailPh[lang]}
                  className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700/60 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/60 focus:ring-1 focus:ring-primary-500/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={labels.msgPh[lang]}
                  className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700/60 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/60 focus:ring-1 focus:ring-primary-500/30 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-500 disabled:opacity-60 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-primary-900/30"
              >
                <Send size={18} />
                {status === 'sending' ? labels.sending[lang] : labels.send[lang]}
              </button>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                  <CheckCircle size={16} />
                  {labels.success[lang]}
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  <AlertCircle size={16} />
                  {labels.error[lang]}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
