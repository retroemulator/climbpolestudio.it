import "server-only";

/**
 * Ultimi post Instagram via Behold (feed JSON gratuito: feeds.behold.so).
 * Behold gestisce lato suo l'autenticazione Meta e i token; noi leggiamo solo
 * il JSON e disegniamo la griglia con la grafica del sito. Sul piano FREE il
 * feed restituisce fino a 6 post e si aggiorna 1 volta al giorno → cache ISR 1h
 * lato Next (tag "instagram", invalidabile a mano se servisse).
 *
 * Robustezza: se manca BEHOLD_FEED_ID o la fetch fallisce, ritorna un feed
 * vuoto → la sezione si nasconde da sola e il sito non si rompe mai.
 *
 * Setup (una volta): crea un feed gratis su behold.so, collega Instagram
 * (account Business/Creator) e metti l'ID del feed in BEHOLD_FEED_ID (Vercel).
 */

type BeholdSize = { mediaUrl: string; width: number; height: number };

export type InstagramPost = {
  id: string;
  permalink: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | string;
  mediaUrl?: string;
  thumbnailUrl?: string; // solo video
  sizes?: Partial<Record<"small" | "medium" | "large" | "full", BeholdSize>>;
  caption?: string;
  prunedCaption?: string;
  altText?: string;
  likeCount?: number;
  commentsCount?: number;
};

export type InstagramFeed = {
  username: string | null;
  posts: InstagramPost[];
};

const FEED_ID = process.env.BEHOLD_FEED_ID;

export const EMPTY_FEED: InstagramFeed = { username: null, posts: [] };

export async function getInstagramFeed(limit = 6): Promise<InstagramFeed> {
  if (!FEED_ID) return EMPTY_FEED;

  try {
    const res = await fetch(`https://feeds.behold.so/${FEED_ID}`, {
      next: { revalidate: 3600, tags: ["instagram"] },
    });
    if (!res.ok) return EMPTY_FEED;

    const data = (await res.json()) as { username?: string; posts?: InstagramPost[] };
    return {
      username: data.username ?? null,
      posts: Array.isArray(data.posts) ? data.posts.slice(0, limit) : [],
    };
  } catch {
    return EMPTY_FEED;
  }
}

/**
 * Miglior URL immagine quadrata per la griglia: le `sizes` di Behold sono già
 * webp ottimizzati (medium ≈ 700px, ideale per le celle). Per i video usa la
 * thumbnail; mai il `mediaUrl` di un video (è il file video, non un'immagine).
 */
export function postImage(p: InstagramPost): string | null {
  return (
    p.sizes?.medium?.mediaUrl ??
    p.sizes?.large?.mediaUrl ??
    p.sizes?.small?.mediaUrl ??
    p.thumbnailUrl ??
    (p.mediaType === "IMAGE" ? p.mediaUrl : undefined) ??
    null
  );
}

/** Testo alternativo accessibile, accorciato. */
export function postAlt(p: InstagramPost, handle: string): string {
  const raw = p.altText || p.prunedCaption || p.caption || `Post Instagram di @${handle}`;
  return raw.length > 160 ? `${raw.slice(0, 157)}…` : raw;
}
