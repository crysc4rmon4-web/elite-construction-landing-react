import { CONFIG } from '../../config/data';

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        
        {/* Cabecera con Neón */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            NUESTROS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">SERVICIOS</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
        </div>

        {/* Grid de Servicios Dark */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {CONFIG.services.map((service) => (
            <div 
              key={service.id}
              className="group relative overflow-hidden rounded-3xl bg-slate-900/50 border border-white/5 hover:border-blue-500/50 transition-all duration-500"
            >
              {/* Imagen con Overlay Dark */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              </div>
              
              {/* Contenido con Glow al hacer Hover */}
              <div className="p-8 relative">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-6">
                  {service.desc}
                </p>
                <div className="flex items-center gap-2 text-blue-400 font-bold tracking-widest text-sm uppercase">
                  <span>Ver Detalle</span>
                  <div className="w-0 group-hover:w-10 h-px bg-blue-400 transition-all duration-500"></div>
                </div>
              </div>

              {/* Efecto de luz interna en la tarjeta */}
              <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity blur-xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}