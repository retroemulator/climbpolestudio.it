import "server-only";

import { client } from "./client";

/**
 * Wrapper di lettura per i Server Component. Usa la cache di Next con
 * revalidate a tempo (ISR) come rete di sicurezza + un tag globale "sanity"
 * per la revalidation ISTANTANEA: il webhook di Sanity chiama `/api/revalidate`
 * a ogni pubblicazione, che fa `revalidateTag("sanity")` e svuota tutta la
 * cache → le modifiche dello Studio compaiono online in pochi secondi senza
 * redeploy. `params` tipizzati lato chiamante.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string;
  params?: Record<string, unknown>;
  revalidate?: number | false;
  tags?: string[];
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate, tags: ["sanity", ...tags] },
  });
}
