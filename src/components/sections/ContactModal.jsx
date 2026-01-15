// src/components/sections/ContactModal.jsx
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useModal } from '../../context/ModalContext';
import { sendLead } from '../../services/LeadService';

function FocusTrap({ active, onClose, children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!active) return;
    const container = ref.current;
    if (!container) return;

    const focusable = container.querySelectorAll('a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const prevActive = document.activeElement;

    first?.focus();

    function onKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    }

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      prevActive?.focus?.();
    };
  }, [active, onClose]);

  return <div ref={ref}>{children}</div>;
}

export default function ContactModal() {
  const { isOpen, payload, closeModal } = useModal();
  const [step, setStep] = useState('form'); // form | success | sending
  const [formData, setFormData] = useState({ name: '', phone: '', msg: '' });
  const [info, setInfo] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setStep('form');
      setFormData({ name: '', phone: '', msg: '' });
      setInfo(null);
    } else {
      // focus first input when open
      setTimeout(() => dialogRef.current?.querySelector('input,textarea')?.focus(), 50);
    }
  }, [isOpen]);

  if (typeof document === 'undefined') return null;
  if (!isOpen) return null;

  const service = payload?.service || 'General';

  const handleChange = (e) => setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!formData.name.trim()) return 'Nombre obligatorio';
    if (!formData.phone.trim()) return 'Teléfono obligatorio';
    if (!formData.msg.trim()) return 'Describe brevemente lo que necesitas';
    return null;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setInfo({ type: 'error', text: v });
      return;
    }

    setStep('sending');
    setInfo({ type: 'info', text: 'Enviando...' });

    const res = await sendLead({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      message: formData.msg.trim(),
      service
    });

    if (res.ok) {
      setStep('success');
      setInfo({ type: 'success', text: res.fallbackCopied ? 'Mensaje copiado al portapapeles y abiertos WhatsApp/Email.' : 'Se han abierto WhatsApp y tu cliente de correo.' });

      // small analytics event if dataLayer exists
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'lead_sent', service, name: formData.name });
      }
    } else {
      setStep('form');
      setInfo({ type: 'error', text: 'Error al enviar. Intenta copiar el mensaje manualmente.' });
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
    >
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={closeModal} aria-hidden="true" />

      <FocusTrap active={isOpen} onClose={closeModal}>
        <div ref={dialogRef} className="relative bg-slate-900 border border-white/10 w-full max-w-lg rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden z-10">
          {step === 'form' && (
            <>
              <button onClick={closeModal} aria-label="Cerrar" className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">✕</button>
              <div className="mb-6">
                <h3 id="contact-modal-title" className="text-3xl font-black text-white mb-2">Hablemos de tu <span className="text-blue-500">obra</span></h3>
                <p className="text-slate-400">Recibirás respuesta por WhatsApp y Email.</p>
              </div>

              {info && <div className={`mb-4 p-3 rounded-md ${info.type === 'error' ? 'bg-red-900 text-red-300' : info.type === 'success' ? 'bg-green-900 text-green-300' : 'bg-slate-800 text-slate-200'}`}>{info.text}</div>}

              <form onSubmit={handleSend} className="space-y-4">
                <input name="name" type="text" placeholder="Tu nombre" required className="w-full bg-slate-800 border border-white/5 p-4 rounded-xl text-white outline-none focus:border-blue-500" onChange={handleChange} value={formData.name} />
                <input name="phone" type="tel" placeholder="Teléfono de contacto" required className="w-full bg-slate-800 border border-white/5 p-4 rounded-xl text-white outline-none focus:border-blue-500" onChange={handleChange} value={formData.phone} />
                <textarea name="msg" placeholder="¿Qué necesitas reformar?" required className="w-full bg-slate-800 border border-white/5 p-4 rounded-xl text-white h-32 outline-none focus:border-blue-500" onChange={handleChange} value={formData.msg} />
                <div className="flex gap-3 mt-4">
                  <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest transition-all">Enviar Presupuesto</button>
                  <button type="button" onClick={closeModal} className="flex-1 border border-white/10 py-4 rounded-2xl">Cancelar</button>
                </div>
              </form>
            </>
          )}

          {step === 'sending' && (
            <div className="text-center py-10">
              <div className="mb-6 animate-pulse text-white/60">Enviando...</div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
              <h3 className="text-3xl font-black text-white mb-4">¡MENSAJE ENVIADO!</h3>
              <p className="text-slate-400 mb-8">{info?.text || 'Hemos abierto WhatsApp y tu app de correo.'}</p>
              <div className="flex justify-center gap-4">
                <button onClick={closeModal} className="text-blue-400 font-bold border-b border-blue-400">Cerrar</button>
              </div>
            </div>
          )}
        </div>
      </FocusTrap>
    </div>,
    document.body
  );
}
