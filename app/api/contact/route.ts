import { NextResponse } from "next/server";

import { contact } from "@/lib/site";

/**
 * Endpoint form contatti. Invia l'email via Resend SE `RESEND_API_KEY` è
 * configurata (fetch diretto all'API, nessuna dipendenza). Altrimenti risponde
 * 503 con un messaggio: il form mostra il fallback WhatsApp/email.
 *
 * Nota: il `from` deve usare un dominio VERIFICATO in Resend (climbpolestudio.it).
 */
export async function POST(req: Request) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Compila tutti i campi." }, { status: 422 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Email non valida." }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "not_configured", message: "Invio email non ancora configurato." },
      { status: 503 },
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `Climb Pole Studio <noreply@climbpolestudio.it>`,
      to: [contact.email],
      reply_to: email,
      subject: `Nuovo messaggio dal sito — ${name}`,
      text: `Da: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Invio fallito. Riprova più tardi." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
