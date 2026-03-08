import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function LeadForm() {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // MEJORA 2: Honeypot Anti-Spam
    if (data.company_field) return; 

    setStatus('loading');
    try {
      // MEJORA 1: Captura real de leads (Endpoint Serverless)
      const response = await fetch('/api/sendLead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        reset();
        if (window.gtag) window.gtag('event', 'form_submission_success');
      } else {
        throw new Error();
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Honeypot Field - Invisible para humanos */}
      <input type="text" {...register('company_field')} className="hidden" tabIndex="-1" autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            {...register('name', { required: true })}
            placeholder="Full Name"
            className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-all"
          />
        </div>
        <div>
          <input
            {...register('phone', { required: true })}
            placeholder="Phone Number"
            className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      <input
        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        placeholder="Email Address"
        className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-all"
      />

      <textarea
        {...register('message', { required: true })}
        placeholder="Tell us about your project..."
        rows="3"
        className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-all"
      ></textarea>

      <div className="flex items-start gap-2 px-1">
        <input type="checkbox" {...register('privacy', { required: true })} className="mt-1" />
        <label className="text-xs text-slate-400">
          I agree to the processing of my data to receive a quote. (RGPD)
        </label>
      </div>

      <button
        disabled={status === 'loading'}
        className={`w-full p-4 rounded-xl font-bold uppercase tracking-widest transition-all ${
          status === 'success' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-500'
        } text-white`}
      >
        {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent Successfully!' : 'Get Free Quote'}
      </button>

      {status === 'error' && <p className="text-red-400 text-xs text-center">Connection error. Please try WhatsApp.</p>}
    </form>
  );
}