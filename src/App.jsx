// src/App.jsx
import React from 'react';
import { ModalProvider } from './context/ModalContext';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import ContactModal from './components/sections/ContactModal';
import Footer from './components/layout/Footer';

function App() {
  return (
    <ModalProvider>
      <main className="bg-slate-950 min-h-screen font-sans antialiased selection:bg-blue-500/30">
        <Navbar />
        <Hero />

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-white/5" />
          </div>
        </div>

        <Services />
        <Projects/>
        <Contact />
        <ContactModal />
        <Footer />
      </main>
    </ModalProvider>
  );
}

export default App;
