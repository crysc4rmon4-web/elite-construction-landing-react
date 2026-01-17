import React from 'react';
import { CONFIG } from '../../config/data';
import { useModal } from '../../context/ModalContext';
import { optimizeImg } from '../../utils/imageOptimizer'; // <--- IMPORTACIÓN AÑADIDA

export default function Services() {
  const { openModal } = useModal();

  return (
    <section id="servicios" className="py-24 bg-slate-950 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase">
            Soluciones <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Integrales</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-light">
            Especialistas en reformas y construcción. Calidad artesanal con tecnología moderna.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CONFIG.services.map((service) => (
            <article
              key={service.id}
              className="group relative bg-slate-900/40 border border-white/5 rounded-[2rem] overflow-hidden hover:border-blue-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/20"
            >
              <div className="relative h-56 overflow-hidden">
            
                <img
                  src={optimizeImg(service.image, 600)} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 min-h-[60px]">{service.desc}</p>

                <button
                  type="button"
                  onClick={() => openModal({ service: service.title })}
                  className="w-full group/btn relative overflow-hidden flex items-center justify-center gap-3 bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-500 py-4 rounded-2xl transition-all duration-300"
                  aria-label={`Solicitar presupuesto para ${service.title}`}
                >
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white relative z-10">Consultar Presupuesto</span>
                  <svg className="w-4 h-4 text-blue-400 group-hover/btn:text-white transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}