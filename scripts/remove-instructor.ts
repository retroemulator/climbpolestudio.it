/**
 * Rimuove un insegnante da Sanity in SICUREZZA.
 *
 * Il campo `scheduleSlot.instructor` è un reference "strong": cancellare un
 * insegnante referenziato darebbe errore di integrità. Questo script prima
 * SGANCIA il riferimento `instructor` da ogni documento che lo punta, poi
 * elimina il documento — il tutto in un'unica transazione atomica.
 *
 * Uso:  npx tsx scripts/remove-instructor.ts instructor-<slug>
 * Es.:  npx tsx scripts/remove-instructor.ts instructor-giulia-conti
 *
 * Richiede in `.env.local`: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET
 * e SANITY_API_TOKEN (permesso Editor).
 */
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

import { createClient } from "@sanity/client";

const id = process.argv[2];
if (!id) {
  console.error("Uso: npx tsx scripts/remove-instructor.ts <instructorId>");
  process.exit(1);
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) throw new Error("Manca NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
if (!token) throw new Error("Manca SANITY_API_TOKEN (permesso Editor) in .env.local");

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

async function main() {
  const doc = await client.getDocument(id);
  if (!doc) {
    console.log(`ℹ Nessun documento "${id}" trovato (forse già rimosso).`);
  } else {
    console.log(`Trovato: ${id} — ${(doc as { name?: string }).name ?? "(senza nome)"}`);
  }

  // Documenti che referenziano l'insegnante (gli scheduleSlot via `instructor`).
  const referencing: { _id: string; displayTitle?: string }[] = await client.fetch(
    `*[references($id)]{ _id, displayTitle }`,
    { id },
  );
  console.log(`Riferimenti da sganciare: ${referencing.length}`);
  for (const r of referencing) {
    console.log(`  · ${r._id}${r.displayTitle ? ` (${r.displayTitle})` : ""}`);
  }

  const tx = client.transaction();
  for (const r of referencing) {
    tx.patch(r._id, { unset: ["instructor"] });
  }
  tx.delete(id);
  await tx.commit({ visibility: "async" });

  console.log(`✓ Rimosso "${id}" e sganciati ${referencing.length} riferimenti.`);
}

main().catch((err) => {
  console.error("✗ Rimozione fallita:", err.message);
  process.exit(1);
});
