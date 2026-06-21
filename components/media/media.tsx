"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

// Loop "wow": il video hero non è un loop perfetto (l'ultimo frame non combacia
// col primo). Vicino alla fine alziamo blur+zoom per mascherare lo stacco; col
// loop nativo currentTime torna a ~0 e la transizione si risolve. LOOP_LEAD ≳
// LOOP_MS così il blur è quasi al picco quando avviene il taglio.
const LOOP_MS = 700;
const LOOP_LEAD = 0.85; // secondi prima della fine in cui parte la transizione

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
  /** object-position della SOLA immagine (poster/fallback); il video resta sempre
   *  centrato. Es. "top" per ancorare in alto: il ritaglio toglie la parte BASSA. */
  objectPosition?: string;
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
  objectPosition,
}: MediaProps) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);
  const [loopOut, setLoopOut] = useState(false);

  useEffect(() => {
    if (!videoUrl || reduced) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    if (!allowMobile && window.matchMedia("(max-width: 768px)").matches) return;
    setShowVideo(true);
  }, [videoUrl, reduced, allowMobile]);

  // In modalità morph il video parte SUBITO (dall'inizio) appena è pronto, mentre
  // la dissolvenza+blur lo fanno emergere dal poster: il movimento è già in corso
  // DURANTE il morph, così non c'è lo stacco "frame congelato → play" (la pausa che
  // si percepiva attendendo la fine del morph). Negli altri casi l'autoplay gestisce
  // tutto e questo effetto è un no-op.
  useEffect(() => {
    if (!morph || !videoReady) return;
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    void v.play().catch(() => {});
    // L'entrata foto→video dura morphMs; dopo, le transizioni del loop usano una
    // durata più breve (LOOP_MS).
    const id = window.setTimeout(() => setEntranceDone(true), morphMs);
    return () => window.clearTimeout(id);
  }, [morph, videoReady, morphMs]);

  // Alza blur+zoom vicino alla fine; dopo il wrap del loop (currentTime ~0) li
  // toglie. Detection leggera via onTimeUpdate.
  const handleTimeUpdate = () => {
    if (!morph) return;
    const v = videoRef.current;
    if (!v || !v.duration || Number.isNaN(v.duration)) return;
    if (v.currentTime >= v.duration - LOOP_LEAD) {
      if (!loopOut) setLoopOut(true);
    } else if (loopOut) {
      setLoopOut(false);
    }
  };

  const animateKenBurns = kenBurns && !reduced && !showVideo;

  // Stato visivo del video in morph: entrata (pre-ready) → blur+zoom; a regime →
  // nitido; al seam del loop → di nuovo blur+zoom (il "wow"). Durata morphMs per
  // l'entrata, poi LOOP_MS per i riavvii.
  const transMs = entranceDone ? LOOP_MS : morphMs;
  const videoTransform = !morph
    ? undefined
    : !videoReady
      ? "scale(1.06)"
      : loopOut
        ? "scale(1.1)"
        : "scale(1)";
  const videoFilter = !morph ? undefined : !videoReady || loopOut ? "blur(12px)" : "blur(0px)";
  const videoTransition = morph
    ? `opacity ${transMs}ms cubic-bezier(0.45,0,0.55,1), transform ${transMs}ms cubic-bezier(0.45,0,0.55,1), filter ${transMs}ms cubic-bezier(0.45,0,0.55,1)`
    : `opacity ${morphMs}ms ease`;

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
          style={{ objectPosition }}
        />
      </motion.div>

      {showVideo && videoUrl ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover will-change-[opacity,transform,filter]"
          style={{
            opacity: videoReady ? 1 : 0,
            transform: videoTransform,
            filter: videoFilter,
            transition: videoTransition,
          }}
          // morph: niente autoplay nel markup → l'effetto sopra avvia play()
          // dall'inizio appena il video è pronto, mentre la dissolvenza lo fa
          // emergere dal poster (movimento già in corso). Altrimenti autoplay nativo.
          autoPlay={!morph}
          preload="auto"
          muted
          loop
          playsInline
          poster={morph ? undefined : poster ?? image.src}
          onCanPlay={() => setVideoReady(true)}
          onPlaying={() => setVideoReady(true)}
          onTimeUpdate={handleTimeUpdate}
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
