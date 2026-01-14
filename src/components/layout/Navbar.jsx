import { useState, useEffect } from 'react';
import logo from '../../assets/logo-valentin.png';
import { CONFIG } from '../../config/data';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Efecto para detectar el scroll y activar el modo Glassmorphism
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled 
      ? 'bg-slate-950/80 backdrop-blur-xl border-b border-blue-500/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
      : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">

        {/* LOGO / NOMBRE CON EFECTO ECLIPSE */}
        <div className="flex items-center gap-4 group">
          <div className="relative flex items-center justify-center">
            <img
              src={logo}
              alt="Logo Valentín"
              className={`transition-all duration-700 object-contain z-10 ${
                isScrolled
                ? 'h-12 w-auto'
                : 'h-24 w-auto p-4 bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_0%,_rgba(0,0,0,0)_70%)] rounded-full scale-110'
              }`}
            />
            {/* Brillo sutil detrás del logo al hacer scroll */}
            {isScrolled && (
              <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
            )}
          </div>

          <div className="flex flex-col border-l border-white/10 pl-4">
            <span className="text-2xl font-black tracking-tighter leading-none text-white">
              {CONFIG.clientName}
            </span>
            <span className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-colors duration-500 ${
              isScrolled ? 'text-blue-400' : 'text-blue-300'
            }`}>
              {CONFIG.subtitle}
            </span>
          </div>
        </div>

        {/* MENÚ ESCRITORIO (FUTURISTA) */}
        <div className="hidden md:flex items-center gap-10">
          {['Inicio', 'Servicios', 'Proyectos'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="group relative text-sm font-bold uppercase tracking-[0.2em] text-slate-300 hover:text-white transition-colors"
            >
              {item}
              {/* Línea animada inferior */}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          
          <a
            href={`https://wa.me/${CONFIG.phone}`}
            className="relative overflow-hidden bg-green-600 hover:bg-green-500 text-white px-8 py-2.5 rounded-full text-sm font-black transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] flex items-center gap-2"
          >
            <span className="relative z-10 uppercase">Contactar</span>
            {/* Efecto de brillo interior */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full hover:animate-[shimmer_1.5s_infinite]"></div>
          </a>
        </div>

        {/* BOTÓN MÓVIL (ESTILO HAMBURGUESA MINIMALISTA) */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`w-7 h-0.5 transition-all duration-300 bg-white ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-7 h-0.5 transition-all duration-300 bg-white ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-7 h-0.5 transition-all duration-300 bg-white ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL (DARK MODE) */}
      <div className={`absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-2xl border-b border-white/5 transition-all duration-500 overflow-hidden ${
        isMenuOpen ? 'max-h-80 opacity-100 shadow-2xl' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex flex-col p-8 gap-6">
          {['Inicio', 'Servicios', 'Proyectos'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-300 font-bold uppercase text-base tracking-[0.3em] hover:text-blue-400 transition-colors"
            >
              {item}
            </a>
          ))}
          <a
            href={`https://wa.me/${CONFIG.phone}`}
            className="bg-gradient-to-r from-green-600 to-green-500 text-white text-center py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg"
          >
            WhatsApp Directo
          </a>
        </div>
      </div>
    </nav>
  );
}