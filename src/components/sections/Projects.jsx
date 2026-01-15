// src/components/sections/Projects.jsx
import React, { useState, useEffect } from 'react';
import { CONFIG } from '../../config/data';

/**
 * Projects - Galería de trabajos
 * - 6 items placeholder (Unsplash) por defecto
 * - Lightbox accesible (teclas: ESC, ←, →)
 * - Responsive, estética High-End coherente con resto
 */

export default function Projects() {
  const data = CONFIG.projects?.length ? CONFIG.projects : getDefaultProjects();
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

  return (
    <section id="proyectos" className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">Proyectos realizados</h2>
          <p className="text-slate-400">Trabajos reales — ejemplo de acabados y soluciones técnicas. Imágenes de referencia.</p>
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
              <img
                src={p.image}
                alt={p.alt || p.title}
                loading="lazy"
                className="w-full h-56 object-cover transition-transform group-hover:scale-105"
              />
              <figcaption className="p-5">
                <h3 className="text-lg font-bold text-white">{p.title}</h3>
                <p className="text-slate-400 text-sm mt-1">{p.subtitle}</p>
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
          aria-label={`Imagen proyecto ${data[openIndex].title}`}
        >
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpenIndex(null)} />
          <div className="relative max-w-4xl w-full mx-auto">
            <button
              className="absolute top-4 right-4 z-40 text-white bg-slate-800/50 hover:bg-slate-800/70 p-2 rounded-md"
              onClick={() => setOpenIndex(null)}
              aria-label="Cerrar galería"
            >
              ✕
            </button>

            <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
              <img src={data[openIndex].image} alt={data[openIndex].alt || data[openIndex].title} className="w-full h-[60vh] object-cover" loading="eager" />
              <div className="p-6">
                <h3 className="text-2xl font-black text-white mb-2">{data[openIndex].title}</h3>
                <p className="text-slate-400 mb-4">{data[openIndex].subtitle}</p>

                <div className="flex justify-between items-center gap-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setOpenIndex((i) => (i - 1 + data.length) % data.length)}
                      className="px-4 py-2 bg-white/5 rounded-lg text-white font-bold"
                    >
                      ← Anterior
                    </button>
                    <button
                      onClick={() => setOpenIndex((i) => (i + 1) % data.length)}
                      className="px-4 py-2 bg-white/5 rounded-lg text-white font-bold"
                    >
                      Siguiente →
                    </button>
                  </div>

                  <div className="text-slate-400 text-sm">Proyecto {openIndex + 1} / {data.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* Defaults: imágenes placeholder temáticas (Unsplash queries). Cambia en CONFIG.projects para poner las tuyas */
function getDefaultProjects() {
  return [
    {
      id: 'p-bano',
      title: 'Baño alicatado',
      subtitle: 'Alicatado y reforma integral de baño — acabados premium',
      image: 'https://source.unsplash.com/1200x800/?bathroom,tiles',
      alt: 'Baño alicatado'
    },
    {
      id: 'p-pladur',
      title: 'Techo de pladur',
      subtitle: 'Falsos techos, iluminación empotrada y acabados modernos',
      image: 'https://source.unsplash.com/1200x800/?drywall,ceiling,plaster',
      alt: 'Techo pladur'
    },
    {
      id: 'p-pintura',
      title: 'Pintura profesional',
      subtitle: 'Reaviva interiores con pintura técnica y mates de alto rendimiento',
      image: 'https://source.unsplash.com/1200x800/?painting,interior',
      alt: 'Pintura interior'
    },
    {
      id: 'p-tejado',
      title: 'Reparación de tejado',
      subtitle: 'Cubiertas y tejados — impermeabilización y arreglo de filtraciones',
      image: 'https://source.unsplash.com/1200x800/?roof,roofing',
      alt: 'Reparación de tejado'
    },
    {
      id: 'p-fontaneria',
      title: 'Fontanería y saneamiento',
      subtitle: 'Instalaciones nuevas y reparaciones urgentes de fontanería',
      image: 'https://source.unsplash.com/1200x800/?plumbing,pipes',
      alt: 'Fontanería'
    },
    {
      id: 'p-electricidad',
      title: 'Electricidad y acometidas',
      subtitle: 'Instalación eléctrica, cuadros y certificados básicos',
      image: 'https://source.unsplash.com/1200x800/?electrician,wiring',
      alt: 'Electricidad'
    }
  ];
}
