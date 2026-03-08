import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useModal } from '../../context/ModalContext';
import { CONFIG } from '../../config/data';
import LeadForm from '../sections/LeadForm';

const Icons = {
  whatsapp: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
};

export default function ContactModal() {
  const { isOpen, closeModal } = useModal();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md transition-opacity" onClick={closeModal} />

      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl animate-[fadeIn_0.2s]">
        <button onClick={closeModal} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">✕</button>

        <div className="text-center mb-8">
          <h3 className="text-2xl font-black text-white mb-2 italic uppercase tracking-tighter">
            Request <span className="text-blue-500">Proposal</span>
          </h3>
          <p className="text-slate-400 text-sm">Send us your project details today.</p>
        </div>

        {/* INTEGRACIÓN DEL FORMULARIO */}
        <LeadForm />

        <div className="relative my-8 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
          <span className="relative px-4 bg-slate-900 text-slate-500 text-xs uppercase tracking-widest">or direct contact</span>
        </div>

        <div className="flex gap-4">
          <a 
            href={`https://wa.me/${CONFIG.contact.whatsapp}?text=Hi, I need a construction quote.`}
            className="flex-1 flex items-center justify-center gap-2 p-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-xl transition-all text-green-500 font-bold text-sm"
          >
            {Icons.whatsapp} WhatsApp
          </a>
          <a 
            href={`tel:${CONFIG.contact.phone}`}
            className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-slate-700 border border-white/5 rounded-xl transition-all text-white font-bold text-sm"
          >
            Call Expert
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}