// src/components/layout/Footer.jsx
import React from 'react';
import { CONFIG } from '../../config/data';

export default function Footer() {
  // Extraemos con seguridad y valores por defecto para evitar el error de consola
  const brand = CONFIG?.brand || {};
  const contact = CONFIG?.contact || {};
  const navLinks = CONFIG?.navLinks || [];
  const hero = CONFIG?.hero || {};

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        
        {/* Brand Section */}
        <div>
          <h4 className="text-white font-black text-xl mb-6 tracking-tighter uppercase">
            {brand.name || "PRIME CONSTRUCTION"}
          </h4>
          <p className="text-slate-500 leading-relaxed italic">
            "{hero.subtitle ? hero.subtitle.slice(0, 80) : "Excellence in every detail"}..."
          </p>
        </div>

        {/* Navigation Section */}
        <div>
          <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Navigation</h4>
          <ul className="space-y-4 text-slate-400 font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="hover:text-blue-500 transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Contact</h4>
          <p className="text-slate-400 mb-2">{brand.location || "Global Service"}</p>
          
          <p className="text-slate-400 mt-4 text-sm">
            Call us: <a href={`tel:${contact.phone || ""}`} className="text-blue-500 font-bold hover:underline">
              {contact.phone || "Request Phone"}
            </a>
          </p>
          
          <p className="text-slate-400 mt-4 text-sm">
            Email: <a href={`mailto:${contact.email || ""}`} className="text-blue-400">
              {contact.email || "Request Email"}
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-600 text-xs">
          © {currentYear} {brand.name || "Prime Construction"}. All rights reserved.
        </p>
        <p className="text-slate-600 text-[10px] uppercase tracking-widest">
          Premium Template by <span className="text-blue-500/50">Crys-C4rmon4</span>
        </p>
      </div>
    </footer>
  );
}