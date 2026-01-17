import React, { useEffect, useState } from 'react';
// import logo from '../../assets/logo.png'; // Opcional: Descomentar si usas logo de archivo
import { CONFIG } from '../../config/data';
import { useModal } from '../../context/ModalContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useModal();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-500 ${
        isScrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl' : 'bg-transparent py-6'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* LOGO AREA */}
        <div
          className="flex items-center gap-4 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {/* Opción A: Texto como Logo (Más fácil de vender como plantilla) */}
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-white leading-none">
              {CONFIG.brand.logoText || CONFIG.brand.name}
            </span>
            {CONFIG.brand.slogan && (
               <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-blue-400 mt-1">
                 {CONFIG.brand.slogan}
               </span>
            )}
          </div>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10">
          {CONFIG.navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
            </a>
          ))}

          <button
            type="button"
            onClick={() => openModal()}
            className="group relative px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:scale-105 shadow-lg overflow-hidden"
            aria-label="Solicitar presupuesto"
          >
            <span className="relative z-10">Presupuesto Gratis</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </button>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          type="button"
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen((s) => !s)}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
        >
          <span className={`block w-6 h-0.5 bg-current transform transition ${isMenuOpen ? 'rotate-45 translate-y-1' : 'mb-1.5'}`} />
          <span className={`block w-6 h-0.5 bg-current transform transition ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        id="mobile-menu"
        className={`absolute top-full left-0 w-full bg-slate-950 border-t border-white/5 transition-all duration-300 ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <div className="flex flex-col p-8 gap-6 text-center">
          {CONFIG.navLinks.map((item) => (
            <a key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-300 uppercase tracking-widest">
              {item.name}
            </a>
          ))}
          <button
            type="button"
            onClick={() => { setIsMenuOpen(false); openModal(); }}
            className="bg-blue-600 py-4 rounded-2xl font-black uppercase text-white tracking-widest"
          >
            Pedir Presupuesto
          </button>
        </div>
      </div>
    </nav>
  );
}