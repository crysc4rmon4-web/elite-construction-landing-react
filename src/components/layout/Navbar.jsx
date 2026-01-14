import { useState, useEffect } from 'react';
import { CONFIG } from '../../config/data';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Efecto para cambiar el fondo al hacer scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO / NOMBRE */}
        <div className="flex flex-col">
          <span className={`text-2xl font-black tracking-tighter leading-none ${
            isScrolled ? 'text-slate-900' : 'text-white'
          }`}>
            {CONFIG.clientName}
          </span>
          <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${
            isScrolled ? 'text-blue-600' : 'text-blue-400'
          }`}>
            {CONFIG.subtitle}
          </span>
        </div>

        {/* MENÚ ESCRITORIO */}
        <div className="hidden md:flex items-center gap-8">
          {['Inicio', 'Servicios', 'Proyectos'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={`text-sm font-bold uppercase tracking-widest hover:text-blue-500 transition-colors ${
                isScrolled ? 'text-slate-600' : 'text-slate-200'
              }`}
            >
              {item}
            </a>
          ))}
          <a 
            href={`https://wa.me/${CONFIG.phone}`}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-sm font-bold transition-transform hover:scale-105"
          >
            CONTACTAR
          </a>
        </div>

        {/* BOTÓN MÓVIL */}
        <button 
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`w-6 h-0.5 transition-all ${isScrolled ? 'bg-slate-900' : 'bg-white'} ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-0.5 ${isScrolled ? 'bg-slate-900' : 'bg-white'} ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 transition-all ${isScrolled ? 'bg-slate-900' : 'bg-white'} ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL */}
      <div className={`absolute top-full left-0 w-full bg-white shadow-2xl transition-all duration-300 overflow-hidden ${
        isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex flex-col p-6 gap-4 border-t border-slate-100">
          {['Inicio', 'Servicios', 'Proyectos'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-800 font-bold uppercase text-sm tracking-widest"
            >
              {item}
            </a>
          ))}
          <a 
            href={`https://wa.me/${CONFIG.phone}`}
            className="bg-green-500 text-white text-center py-3 rounded-xl font-bold"
          >
            WHATSAPP DIRECTO
          </a>
        </div>
      </div>
    </nav>
  );
}