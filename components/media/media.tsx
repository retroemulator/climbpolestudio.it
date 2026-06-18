"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type MediaProps = {
  /** Immagine SEMPRE renderizzata: poster + fallback (LCP-safe). */
  image: { src: string; alt: string };
  /** Se presente → video in loop muto sopra l'immagine. Se vuoto → solo foto. */
  videoUrl?: string;
  poster?: string;
  priority?: boolean;
  /** Leggero Ken Burns sull'immagine quando NON c'è video. */
  kenBurns?: boolean;
  /** Gradiente scuro per leggibilità del testo sopra il media. */
  overlay?: boolean;
  className?: string;
  sizes?: string;
  /** Consente il video anche su mobile (default: no, per LCP). Utile per video
   *  verticali pensati per il portrait, es. l'hero. */
  allowMobile?: boolean;
  /** Morphing foto→video: il video entra con scale+blur che si risolvono (non
   *  un semplice fade). Pensato per l'hero. Default: crossfade semplice. */
  morph?: boolean;
  /** Durata (ms) della transizione foto→video. Default 700; hero ~2000. */
  morphMs?: number;
};

/**
 * Primitiva media "video-ready ma non video-dipendente" (richiesta chiave).
 * - Renderizza SEMPRE <Image> (poster/fallback, buono per LCP).
 * - Mostra <video> sopra SOLO se: c'è videoUrl, non è reduced-motion, non è
 *   data-saver, e non è schermo piccolo (salvo `allowMobile`). Sfuma all'avvio.
 * Aggiungere un video in futuro = incollare l'URL in Sanity: zero codice.
 */
export function Media({
  image,
  videoUrl,
  poster,
  priority,
  kenBurns = true,
  overlay = false,
  className,
  sizes = "100vw",
  allowMobile = false,
  morph = false,
  morphMs = 700,
}: MediaProps) {
  const reduced = useReducedMotion();
  const [showVideo, setShowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (!videoUrl || reduced) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    if (!allowMobile && window.matchMedia("(max-width: 768px)").matches) return;
    setShowVideo(true);
  }, [videoUrl, reduced, allowMobile]);

  const animateKenBurns = kenBurns && !reduced && !showVideo;

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0"
        initial={animateKenBurns ? { scale: 1.08 } : false}
        animate={animateKenBurns ? { scale: 1 } : undefined}
        transition={{ duration: 14, ease: "easeOut" }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </motion.div>

      {showVideo && videoUrl ? (
        <video
          className="absolute inset-0 h-full w-full object-cover will-change-[opacity,transform,filter]"
          style={{
            opacity: videoReady ? 1 : 0,
            transform: morph ? (videoReady ? "scale(1)" : "scale(1.06)") : undefined,
            filter: morph ? (videoReady ? "blur(0px)" : "blur(12px)") : undefined,
            transition: morph
              ? `opacity ${morphMs}ms cubic-bezier(0.16,1,0.3,1), transform ${morphMs}ms cubic-bezier(0.16,1,0.3,1), filter ${morphMs}ms cubic-bezier(0.16,1,0.3,1)`
              : `opacity ${morphMs}ms ease`,
          }}
          autoPlay
          muted
          loop
          playsInline
          poster={poster ?? image.src}
          onCanPlay={() => setVideoReady(true)}
          onPlaying={() => setVideoReady(true)}
        >
          <source src={videoUrl} />
        </video>
      ) : null}

      {overlay ? (
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/25 to-ink/50"
        />
      ) : null}
    </div>
  );
}
