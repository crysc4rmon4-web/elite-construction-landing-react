// src/components/layout/Footer.jsx
import React from 'react';
import { CONFIG } from '../../config/data';

export default function Footer() {
  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        <div>
          <h4 className="text-white font-black text-xl mb-6 tracking-tighter uppercase">{CONFIG.clientName}</h4>
          <p className="text-slate-500 leading-relaxed italic">"Construyendo sueños, reformando realidades en la provincia de Soria."</p>
        </div>
        <div>
          <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Navegación</h4>
          <ul className="space-y-4 text-slate-400 font-medium">
            <li><a href="#inicio" className="hover:text-blue-500">Inicio</a></li>
            <li><a href="#servicios" className="hover:text-blue-500">Servicios</a></li>
            <li><a href="#proyectos" className="hover:text-blue-500">Proyectos</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Contacto</h4>
          <p className="text-slate-400 mb-2">Soria, España</p>
          <p className="text-blue-500 font-bold">{CONFIG.phone}</p>
          <p className="text-slate-400 mt-4 text-sm">Email: <a href={`mailto:${CONFIG.email}`} className="text-blue-400">{CONFIG.email}</a></p>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-600 text-xs">© 2026 {CONFIG.clientName}. Todos los derechos reservados.</p>
        <p className="text-slate-600 text-[10px] uppercase tracking-widest">Design by Elite Web Services</p>
      </div>
    </footer>
  );
}
