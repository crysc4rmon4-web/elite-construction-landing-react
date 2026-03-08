import { Resend } from 'resend';

// IMPORTANTE: La API Key se configura en Vercel, nunca se escribe aquí.
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, phone, message, company_field } = req.body;

  // MEJORA 2: Bloqueo de Bots (Honeypot)
  if (company_field) {
    return res.status(200).json({ success: true, message: 'Bot detected and ignored.' });
  }

  try {
    const data = await resend.emails.send({
      from: 'Carmona Studio Leads <onboarding@resend.dev>', // Luego usarás el dominio del cliente
      to: ['tu-email@gmail.com'], // Aquí llegará el lead
      subject: `🏗️ NUEVO LEAD: ${name}`,
      html: `
        <h1>Nuevo Cliente Potencial - Constructora</h1>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
        <hr />
        <p>Enviado desde el sistema Carmona Studio.</p>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: 'Error sending email' });
  }
}