import React from 'react';
import { CONFIG } from '../../config/data';
import { useModal } from '../../context/ModalContext';
import { optimizeImg } from '../../utils/imageOptimizer';

export default function Hero() {
  const { openModal } = useModal();

  return (
    <section id="inicio" className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-slate-950 z-10" />

        {/* Imagen optimizada a 1920px para pantallas grandes */}
        <img
          src={optimizeImg(CONFIG.hero.bgImage, 1920)}
          alt={CONFIG.brand.name}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      <div className="relative z-20 container mx-auto px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center lg:text-left lg:mx-0">
          <h1 className="text-4xl md:text-7xl font-black text-white leading-tight mb-6">
            {CONFIG.hero.title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              {CONFIG.hero.titleAccent}
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 mb-10 font-light italic opacity-90">
            "{CONFIG.hero.subtitle}"
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto lg:mx-0">
           
            <button
              type="button"
              onClick={() => {
                // MEJORA 3: Google Analytics Event
                if (window.gtag) window.gtag('event', 'lead_click', { 'location': 'hero_main' });
                openModal({ service: 'Hero Quote Request' });
              }}
              className="group w-full sm:flex-1 bg-blue-600 hover:bg-blue-500 text-white p-5 rounded-2xl font-black text-sm md:text-base transition-all duration-300 shadow-[0_20px_40px_rgba(37,99,235,0.3)] flex items-center justify-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span className="tracking-widest uppercase">Get Quote Now</span>
            </button>

            <a
              href="#servicios"
              className="w-full sm:flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 p-5 rounded-2xl font-black text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
              <span className="tracking-widest uppercase">Our Services</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}