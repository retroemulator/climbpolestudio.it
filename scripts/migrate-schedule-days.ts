/**
 * Migrazione una-tantum: porta `scheduleSlot.day` dal codice "lun"…"sab" al
 * formato ordinabile "1-lun"…"6-sab", così lo Studio ordina i giorni in
 * sequenza (lun→sab) invece che alfabeticamente (dove "gio" finiva primo e
 * "sab" prima di "ven").
 *
 * NON distruttiva e idempotente: NON tocca nessun altro campo e salta gli slot
 * già nel nuovo formato. Rieseguibile senza danni.
 *
 * Esegui:  npm run migrate:days
 * Richiede in `.env.local`: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 * SANITY_API_TOKEN (permesso Editor).
 */
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) throw new Error("Manca NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
if (!token) throw new Error("Manca SANITY_API_TOKEN (permesso Editor) in .env.local");

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const MAP: Record<string, string> = {
  lun: "1-lun",
  mar: "2-mar",
  mer: "3-mer",
  gio: "4-gio",
  ven: "5-ven",
  sab: "6-sab",
};

async function run() {
  const slots: { _id: string; day?: string }[] = await client.fetch(
    `*[_type == "scheduleSlot"]{ _id, day }`,
  );

  let migrated = 0;
  let skipped = 0;
  let unknown = 0;
  const tx = client.transaction();

  for (const s of slots) {
    const day = s.day ?? "";
    if (/^\d-/.test(day)) {
      skipped++; // già nel nuovo formato
      continue;
    }
    const next = MAP[day];
    if (!next) {
      unknown++;
      console.warn(`  ⚠ giorno non riconosciuto su ${s._id}: "${day}" — lasciato com'è`);
      continue;
    }
    tx.patch(s._id, (p) => p.set({ day: next }));
    migrated++;
  }

  if (migrated) await tx.commit();

  console.log(
    `✓ Migrazione completata — migrati: ${migrated}, già ok: ${skipped}, sconosciuti: ${unknown} (totale slot: ${slots.length})`,
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
