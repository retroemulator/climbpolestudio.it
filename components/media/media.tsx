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
}: MediaProps) {
  const reduced = useReducedMotion();
  const [showVideo, setShowVideo] = useState(false);

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
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700"
          autoPlay
          muted
          loop
          playsInline
          poster={poster ?? image.src}
          onCanPlay={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          <source src={videoUrl} />
        </video>
      ) : null}

      {overlay ? (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/50"
        />
      ) : null}
    </div>
  );
}
