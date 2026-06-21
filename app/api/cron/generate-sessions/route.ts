import { NextResponse } from "next/server";

import { generateSessions } from "@/lib/sessions/generate";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Endpoint cron (Vercel, vedi vercel.json): rigenera le sessioni prenotabili.
 * Protetto da CRON_SECRET (Vercel invia `Authorization: Bearer $CRON_SECRET`).
 *
 * Senza CRON_SECRET l'endpoint resta CHIUSO (401): scrive sul DB e non deve
 * essere invocabile pubblicamente. Per la generazione manuale, in locale o in
 * fase di setup, usare la CLI: `npm run generate-sessions`.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "cron_not_configured" }, { status: 401 });
  }
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const { count } = await generateSessions();
    return NextResponse.json({ ok: true, count });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
