import "server-only";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

import { supabaseUrl, supabaseAnonKey, isSupabaseConfigured } from "./config";

/**
 * Client Supabase server-side (SSR, basato sui cookie). Chiamare SOLO dopo aver
 * verificato `isSupabaseConfigured`. In RSC il set dei cookie è no-op (lo fa il
 * middleware/route handler) → try/catch.
 */
export async function createClient() {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase non configurato (mancano NEXT_PUBLIC_SUPABASE_URL / ANON_KEY).");
  }
  const cookieStore = await cookies();
  return createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (toSet: { name: string; value: string; options: CookieOptions }[]) => {
        try {
          toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          /* set di cookie non permesso in RSC: ok, lo gestisce il route handler */
        }
      },
    },
  });
}
