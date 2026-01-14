import Navbar from './components/layout/Navbar';
import { CONFIG } from './config/data';
function App() {
  return (
    <main className="relative w-full">
      <Navbar />
      
      {/* Esto es solo para que puedas hacer scroll y ver cómo cambia el Navbar */}
      <section id="inicio" className="h-[200vh] bg-slate-900 pt-32 px-10 text-center">
        <h1 className="text-white text-5xl font-black mb-6">
          PROYECTO: {CONFIG.clientName}
        </h1>
        <p className="text-blue-400 text-xl font-bold uppercase tracking-widest">
          {CONFIG.subtitle}
        </p>
        <div className="mt-20 animate-bounce text-white/30 italic">
          Desliza hacia abajo para ver la magia del menú...
        </div>
      </section>
    </main>
  );
}

export default App;