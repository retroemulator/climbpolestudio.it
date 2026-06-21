import { NextResponse } from "next/server";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

/**
 * Callback magic link: scambia il `code` per la sessione, poi redirect a `next`.
 *
 * Se lo scambio fallisce (link scaduto o già usato) o Supabase rimanda qui con un
 * errore esplicito, NON proseguiamo verso /area (che rimbalzerebbe a /accedi in un
 * loop silenzioso): torniamo a /accedi con un messaggio leggibile in querystring.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/area";
  // Supabase può rimandare qui con ?error / ?error_description (es. otp_expired).
  const providerError = searchParams.get("error_description") ?? searchParams.get("error");

  const fail = (message: string) =>
    NextResponse.redirect(`${origin}/accedi?error=${encodeURIComponent(message)}`);

  if (!isSupabaseConfigured) return NextResponse.redirect(`${origin}/`);
  if (providerError) return fail(providerError);
  if (!code) return fail("Link di accesso non valido. Richiedine uno nuovo.");

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return fail("Il link di accesso è scaduto o è già stato usato. Richiedine uno nuovo.");
  }

  return NextResponse.redirect(`${origin}${next}`);
}
