/**
 * CLI: genera le sessioni prenotabili dallo schedule Sanity (prossime 4 settimane).
 * Esegui:  npm run generate-sessions
 * Richiede .env.local: NEXT_PUBLIC_SANITY_* + NEXT_PUBLIC_SUPABASE_URL +
 * SUPABASE_SERVICE_ROLE_KEY. Logica condivisa in lib/sessions/generate.ts.
 */
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

import { generateSessions } from "../lib/sessions/generate";

generateSessions()
  .then(({ count }) => console.log(`✓ Generate/aggiornate ${count} sessioni.`))
  .catch((err) => {
    console.error("✗ Generazione fallita:", err.message);
    process.exit(1);
  });
