'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import cvData from '@/data/cv.json';

export type Lang = 'fr' | 'en';

export default function Home() {
  const [lang, setLang] = useState<Lang>('fr');

  const toggleLang = () => setLang((prev) => (prev === 'fr' ? 'en' : 'fr'));

  return (
    <main className="relative min-h-screen bg-gray-950 overflow-x-hidden">
      {/* Background grid */}
      <div className="fixed inset-0 bg-grid opacity-50 pointer-events-none" />

      {/* Gradient orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/3 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <Navbar lang={lang} onToggleLang={toggleLang} data={cvData} />
      <Hero lang={lang} data={cvData} />
      <About lang={lang} data={cvData} />
      <Skills lang={lang} data={cvData} />
      <Experience lang={lang} data={cvData} />
      <Projects lang={lang} data={cvData} />
      <Contact lang={lang} data={cvData} />
      <Footer lang={lang} data={cvData} />
    </main>
  );
}
