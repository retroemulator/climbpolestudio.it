import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

/**
 * Client di lettura per il sito. `useCdn: true` → contenuti pubblicati via CDN
 * (veloce, cache-friendly). Le scritture (seed) usano un client separato col token.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
