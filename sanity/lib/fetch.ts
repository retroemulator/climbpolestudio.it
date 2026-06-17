import "server-only";

import { client } from "./client";

/**
 * Wrapper di lettura per i Server Component. Usa la cache di Next con
 * revalidate a tempo (ISR) + tag per invalidazioni mirate (Fase successiva:
 * webhook Sanity → revalidateTag). `params` tipizzati lato chiamante.
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
    next: { revalidate: tags.length ? false : revalidate, tags },
  });
}
