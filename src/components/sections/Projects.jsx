import React, { useState, useEffect } from 'react';
import { CONFIG } from '../../config/data';
import { optimizeImg } from '../../utils/imageOptimizer'; // <--- IMPORTACIÓN AÑADIDA

export default function Projects() {
  const data = CONFIG.projects || []; 
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    function onKey(e) {
      if (openIndex === null) return;
      if (e.key === 'Escape') setOpenIndex(null);
      if (e.key === 'ArrowLeft') setOpenIndex((i) => (i === null ? null : (i - 1 + data.length) % data.length));
      if (e.key === 'ArrowRight') setOpenIndex((i) => (i === null ? null : (i + 1) % data.length));
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openIndex, data.length]);

  if (!data.length) return null;

  return (
    <section id="proyectos" className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">Proyectos realizados</h2>
          <p className="text-slate-400">Trabajos reales — ejemplo de acabados y soluciones técnicas.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((p, idx) => (
            <figure
              key={p.id}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-slate-900"
              onClick={() => setOpenIndex(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setOpenIndex(idx); }}
              aria-label={`Ver proyecto: ${p.title}`}
            >
              {/* CAMBIO 1: Imagen de la rejilla optimizada a 800px */}
              <img
                src={optimizeImg(p.image, 800)} 
                alt={p.title}
                loading="lazy"
                className="w-full h-56 object-cover transition-transform group-hover:scale-105"
              />
              <figcaption className="p-5">
                <h3 className="text-lg font-bold text-white">{p.title}</h3>
                <p className="text-slate-400 text-sm mt-1">{p.category}</p>
              </figcaption>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </figure>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setOpenIndex(null)} />
          <div className="relative max-w-5xl w-full mx-auto animate-[fadeIn_0.2s_ease-out]">
            <button
              className="absolute -top-12 right-0 z-40 text-white/50 hover:text-white transition-colors"
              onClick={() => setOpenIndex(null)}
            >
              CERRAR ✕
            </button>

            <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              {/* CAMBIO 2: Imagen del modal a 1200px para máxima calidad visual */}
              <img 
                src={optimizeImg(data[openIndex].image, 1200)} 
                alt={data[openIndex].title} 
                className="w-full max-h-[70vh] object-contain bg-black" 
              />
              <div className="p-6 bg-slate-900">
                <h3 className="text-2xl font-black text-white mb-1">{data[openIndex].title}</h3>
                <p className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-4">{data[openIndex].category}</p>
                
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <button onClick={() => setOpenIndex((i) => (i - 1 + data.length) % data.length)} className="text-slate-400 hover:text-white font-bold text-sm">← ANTERIOR</button>
                    <span className="text-slate-600 text-xs">{openIndex + 1} / {data.length}</span>
                    <button onClick={() => setOpenIndex((i) => (i + 1) % data.length)} className="text-slate-400 hover:text-white font-bold text-sm">SIGUIENTE →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}