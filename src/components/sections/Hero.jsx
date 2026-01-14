import { CONFIG } from '../../config/data';

export default function Hero() {
  return (
    <section id="inicio" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Fondo con Overlay */}
      <div className="absolute inset-0 bg-slate-900">
        <div className="absolute inset-0 bg-black/75 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop" 
          alt="Construcción profesional"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="relative z-20 container mx-auto px-6 text-center lg:text-left">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            {CONFIG.hero.title} <span className="text-blue-500">{CONFIG.hero.titleAccent}</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-10 font-light max-w-2xl">
            {CONFIG.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a 
              href={`https://wa.me/${CONFIG.phone}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-blue-500/20 text-center"
            >
              {CONFIG.hero.cta}
            </a>
            <a 
              href="#servicios"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-xl font-bold text-lg transition-all text-center"
            >
              Nuestros Servicios
            </a>
          </div>
        </div>
      </div>
      
      {/* Decoración Inferior */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900 to-transparent z-20"></div>
    </section>
  );
}