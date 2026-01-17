import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useModal } from '../../context/ModalContext';
import { CONFIG } from '../../config/data';

const Icons = {
  whatsapp: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>,
  phone: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
  mail: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
};

export default function ContactModal() {
  const { isOpen, closeModal } = useModal();
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (typeof document === 'undefined') return null;
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:px-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" onClick={closeModal} />

      <div 
        ref={dialogRef}
        className="relative w-full max-w-lg bg-slate-900 border-t sm:border border-white/10 rounded-t-[2rem] sm:rounded-[2rem] p-8 shadow-2xl animate-[slideUp_0.3s_ease-out] sm:animate-[fadeIn_0.2s]"
      >
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/10 rounded-full sm:hidden" /> 
        
        <button onClick={closeModal} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors hidden sm:block">✕</button>

        <div className="text-center mb-8 mt-4 sm:mt-0">
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
            Contact <span className="text-blue-500">{CONFIG.brand.name}</span>
          </h3>
          <p className="text-slate-400 text-sm sm:text-base">Choose your preferred contact method below.</p>
        </div>

        <div className="grid gap-3 mb-8">
          <a 
            href={`https://wa.me/${CONFIG.contact.whatsapp}?text=Hi, I'm interested in a quote.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 rounded-xl transition-all group"
          >
            <div className="bg-[#25D366] text-white p-3 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
              {Icons.whatsapp}
            </div>
            <div className="text-left">
              <div className="font-bold text-white text-lg">WhatsApp</div>
              <div className="text-[#25D366] text-xs font-medium uppercase tracking-wider">Instant Reply</div>
            </div>
          </a>

          <a 
            href={`tel:${CONFIG.contact.phone}`}
            className="flex items-center gap-4 p-4 bg-slate-800 hover:bg-slate-700 border border-white/5 rounded-xl transition-all group"
          >
            <div className="bg-blue-600 text-white p-3 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
              {Icons.phone}
            </div>
            <div className="text-left">
              <div className="font-bold text-white text-lg">Call Now</div>
              <div className="text-slate-400 text-xs">Speak with an expert</div>
            </div>
          </a>

          <a 
             href={`mailto:${CONFIG.contact.email}`}
             className="flex items-center gap-4 p-4 bg-slate-800 hover:bg-slate-700 border border-white/5 rounded-xl transition-all group"
          >
            <div className="bg-slate-600 text-white p-3 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
              {Icons.mail}
            </div>
            <div className="text-left">
              <div className="font-bold text-white text-lg">Send Email</div>
              <div className="text-slate-400 text-xs">For blueprints and details</div>
            </div>
          </a>
        </div>
        
        <div className="text-center">
            <button onClick={closeModal} className="text-slate-500 text-sm hover:text-white transition-colors">Cancel</button>
        </div>
      </div>
    </div>,
    document.body
  );
}