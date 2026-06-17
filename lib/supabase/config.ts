/** Config Supabase. URL/anon key sono pubblici; service-role SOLO server. */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * True solo se le env Supabase ci sono. Tutte le feature di auth/prenotazione
 * controllano questo flag e degradano con grazia (fallback WhatsApp) se assente.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
