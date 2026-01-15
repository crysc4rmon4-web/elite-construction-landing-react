// src/services/LeadService.js
import { CONFIG } from '../config/data';

/**
 * LeadService (no-backend)
 * - Construye mensaje
 * - Lanza WhatsApp (wa.me)
 * - Lanza mailto
 * - Fallback: copia al portapapeles
 */
function sanitizePhone(phone) {
  if (!phone) return '';
  // Remove non-digit chars (keep country+number without +)
  return phone.replace(/\D/g, '');
}

function buildMessage({ name, phone, message, service }) {
  const lines = [];
  lines.push(`Solicitud de presupuesto`);
  if (service) lines.push(`Servicio: ${service}`);
  if (message) lines.push(`Detalle: ${message}`);
  if (name) lines.push(`Nombre: ${name}`);
  if (phone) lines.push(`Teléfono: ${phone}`);
  lines.push(`Origen: web (landing)`);
  return lines.join(' | ');
}

export async function sendLead({ name = '', phone = '', message = '', service = '' }) {
  try {
    const text = buildMessage({ name, phone, message, service });
    const encoded = encodeURIComponent(text);

    const waNumber = sanitizePhone(CONFIG.phone);
    const waUrl = `https://wa.me/${waNumber}?text=${encoded}`;

    const mailTo = encodeURIComponent(`Presupuesto - ${service || 'General'}`);
    const mailBody = encoded;
    const mailUrl = `mailto:${CONFIG.email}?subject=${mailTo}&body=${mailBody}`;

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank');

    // Attempt to open mail client
    window.open(mailUrl);

    // If clipboard supported, copy message as fallback
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return { ok: true, fallbackCopied: true, text };
    }

    return { ok: true, fallbackCopied: false, text };
  } catch (err) {
    return { ok: false, error: err?.message || String(err) };
  }
}
