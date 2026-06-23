import Link from "next/link";
import { Instagram } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Reveal } from "@/components/motion/reveal";
import { type InstagramFeed, postImage, postAlt } from "@/lib/instagram";

/**
 * Feed Instagram (stage): ultimi post reali da Behold, in una griglia quadrata
 * che usa la grafica del sito (non un widget incollato). Ogni cella linka al
 * post originale; overlay con icona IG all'hover. Se il feed è vuoto (ID non
 * ancora configurato o fetch fallita) la sezione non rende nulla.
 */
export function InstagramFeedSection({ feed }: { feed: InstagramFeed }) {
  if (!feed.posts.length) return null;

  const handle = feed.username ?? "climbpolestudio";
  const profileUrl = `https://www.instagram.com/${handle}/`;

  return (
    <Section tone="stage" className="py-24 md:py-36">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <div>
            <p className="eyebrow text-brand">Seguici</p>
            <ChromaticShadow as="h2" className="text-display mt-3" style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
              @{handle}
            </ChromaticShadow>
          </div>
          <Link
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border border-paper/20 px-5 py-3 text-sm font-medium text-paper/80 transition-colors hover:border-brand hover:bg-brand hover:text-ink"
          >
            <Instagram className="size-5" aria-hidden />
            Seguici su Instagram
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
          {feed.posts.map((p, i) => {
            const img = postImage(p);
            const alt = postAlt(p, handle);
            return (
              <Reveal key={p.id} delay={(i % 3) * 0.05}>
                <Link
                  href={p.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Apri su Instagram: ${alt}`}
                  className="group relative block aspect-square overflow-hidden rounded-lg bg-ink-soft"
                >
                  {img ? (
                    // Immagine già ottimizzata (webp) da Behold: <img> nativo, niente
                    // re-ottimizzazione Vercel (risparmia quota del piano gratuito).
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={img}
                      alt={alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : null}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition duration-300 group-hover:bg-ink/45 group-hover:opacity-100"
                  >
                    <Instagram className="size-8 text-paper drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
