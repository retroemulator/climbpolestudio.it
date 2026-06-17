import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

import { isSupabaseConfigured, supabaseUrl, supabaseAnonKey } from "@/lib/supabase/config";

/**
 * Rinfresca la sessione Supabase a ogni navigazione (pattern @supabase/ssr).
 * No-op se Supabase non è configurato → il sito gira identico senza chiavi.
 */
export async function middleware(request: NextRequest) {
  if (!isSupabaseConfigured) return NextResponse.next();

  let response = NextResponse.next({ request });
  const supabase = createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (toSet: { name: string; value: string; options: CookieOptions }[]) => {
        toSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  await supabase.auth.getUser();
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|studio|.*\\.(?:png|jpg|jpeg|svg|webp|ico)$).*)"],
};
