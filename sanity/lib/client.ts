import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

/**
 * Client di lettura per il sito. `useCdn: false`: le letture vanno all'API
 * "live" (sempre fresche) — necessario per evitare prerender stantii subito
 * dopo un seed/una modifica. La cache la mette già Next davanti (ISR
 * `revalidate` in `sanityFetch`), quindi l'origine non viene martellata.
 * Le scritture (seed) usano un client separato col token.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});
