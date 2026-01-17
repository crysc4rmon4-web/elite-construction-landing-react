import React from 'react';
import { useModal } from '../../context/ModalContext';

export default function Contact() {
  const { openModal } = useModal();

  return (
    <section id="contacto" className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-br from-blue-900/20 to-slate-900 border border-white/5 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase italic">Ready to Build?</h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10">
              Don't leave your project to chance. Trust the industry leaders for high-quality results and professional management.
            </p>
            <button
              type="button"
              onClick={() => openModal({ service: 'General Inquiry' })}
              className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-blue-500 hover:text-white transition-all scale-110 shadow-2xl"
            >
              Get My Free Estimate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}