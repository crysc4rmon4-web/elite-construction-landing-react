import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';

function App() {
  return (
    <main className="bg-slate-900 min-h-screen">
      <Navbar />
      <Hero />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
      <div className="w-full h-20 bg-gradient-to-b from-slate-900 to-slate-950"></div>
      <Services />
    </main>
  );
}

export default App;