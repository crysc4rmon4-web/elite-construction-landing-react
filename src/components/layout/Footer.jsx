// src/components/layout/Footer.jsx
import React from 'react';
import { CONFIG } from '../../config/data';

export default function Footer() {
  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        <div>
          <h4 className="text-white font-black text-xl mb-6 tracking-tighter uppercase">
            {CONFIG.brand.name}
          </h4>
          <p className="text-slate-500 leading-relaxed italic">
            "{CONFIG.hero.subtitle.slice(0, 80)}..."
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Navegación</h4>
          <ul className="space-y-4 text-slate-400 font-medium">
            {CONFIG.navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="hover:text-blue-500 transition-colors">{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Contacto</h4>
          <p className="text-slate-400 mb-2">{CONFIG.brand.location}</p>
          <p className="text-slate-400 mt-4 text-sm">
            Llamar: <a href={`tel:${CONFIG.contact.phone}`} className="text-blue-500 font-bold hover:underline">{CONFIG.contact.phone}</a>
          </p>
          <p className="text-slate-400 mt-4 text-sm">Email: <a href={`mailto:${CONFIG.contact.email}`} className="text-blue-400">{CONFIG.contact.email}</a></p>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-600 text-xs">© {new Date().getFullYear()} {CONFIG.brand.name}. Todos los derechos reservados.</p>
        <p className="text-slate-600 text-[10px] uppercase tracking-widest">
          Premium Template by <span className="text-blue-500/50">Crys-C4rmon4</span>
        </p>
      </div>
    </footer>
  );
}