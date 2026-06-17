"use client";

import { createBrowserClient } from "@supabase/ssr";

import { supabaseUrl, supabaseAnonKey } from "./config";

/** Client Supabase lato browser. Usare solo se `isSupabaseConfigured`. */
export function createClient() {
  return createBrowserClient(supabaseUrl!, supabaseAnonKey!);
}
