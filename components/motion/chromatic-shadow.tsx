"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import { EASE_OUT, SPRING_SNAP } from "@/lib/motion";

type ChromaticShadowProps = {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  /** colore del fantasma principale (default: orchidea brand) */
  ghostColor?: string;
  /** colore della traccia secondaria nello split RGB (default: cyan) */
  splitColor?: string;
  /** offset di riposo, in `em` (frazione della dimensione del testo): così la
   *  distanza dell'ombra scala col font e resta identica tra desktop e mobile. */
  offset?: number;
  /** abilita lo split RGB su hover */
  interactive?: boolean;
  /** reveal "fantasma che rincorre" in entrata. Spegnilo se l'entrata è gestita
   *  da un wrapper esterno (es. Sincope) → i layer partono già a riposo. */
  entrance?: boolean;
};

/**
 * 🔑 SIGNATURE — "Chromatic Shadow".
 * Testo display leggibile (currentColor) + duplicato magenta sfalsato, letto
 * come after-image di un corpo in movimento:
 *  - reveal in-view: il fantasma "rincorre" e atterra (EASE_OUT, da offset 3x);
 *  - hover: split RGB rapido (magenta di qua, cyan velato di là) → ricompone;
 *  - reduced-motion: ombra statica, niente jitter, piena leggibilità.
 * Solo transform/opacity (niente filtri) → performante.
 * I layer fantasma sono aria-hidden: lo screen reader legge il testo una volta.
 */
export function ChromaticShadow({
  children,
  as: Tag = "span",
  className,
  style,
  ghostColor = "var(--color-brand)",
  splitColor = "var(--color-cyan)",
  offset = 0.045,
  interactive = true,
  entrance = true,
}: ChromaticShadowProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  if (reduced) {
    return (
      <Tag className={cn("relative inline-block", className)} style={style}>
        {/* Wrapper interno: i layer fantasma si allineano al TESTO, non al box
            con eventuale padding (es. pl-*) della firma. */}
        <span className="relative inline-block">
          <span
            aria-hidden
            className="absolute inset-0"
            style={{ color: ghostColor, transform: `translate(${offset}em, ${offset}em)` }}
          >
            {children}
          </span>
          <span className="relative">{children}</span>
        </span>
      </Tag>
    );
  }

  const state = hovered ? "split" : inView || !entrance ? "rest" : "enter";

  // Offset in `em` (stringhe): framer interpola mantenendo l'unità → l'ombra
  // scala con la dimensione del testo (coerente desktop/mobile).
  // In hover l'ombra resta NELLO STESSO punto ma cambia colore: il magenta sfuma
  // via e il ciano compare (crossfade, niente movimento). A riposo solo magenta.
  const magenta: Variants = {
    enter: { x: `${offset * 3}em`, y: `${offset * 3}em`, opacity: 0 },
    rest: { x: `${offset}em`, y: `${offset}em`, opacity: 1 },
    split: { x: `${offset}em`, y: `${offset}em`, opacity: 0 },
  };
  const cyan: Variants = {
    enter: { x: `${offset}em`, y: `${offset}em`, opacity: 0 },
    rest: { x: `${offset}em`, y: `${offset}em`, opacity: 0 },
    split: { x: `${offset}em`, y: `${offset}em`, opacity: 1 },
  };

  return (
    <Tag
      className={cn("relative inline-block", className)}
      style={style}
      onPointerEnter={interactive ? () => setHovered(true) : undefined}
      onPointerLeave={interactive ? () => setHovered(false) : undefined}
    >
      {/* Wrapper interno: i layer fantasma si allineano al TESTO, non al box
          con eventuale padding (es. pl-*) della firma → niente ombra "lontana". */}
      <span className="relative inline-block">
        <motion.span
          aria-hidden
          className="absolute inset-0 will-change-transform"
          style={{ color: ghostColor }}
          variants={magenta}
          initial={entrance ? "enter" : "rest"}
          animate={state}
          transition={hovered ? SPRING_SNAP : { duration: 0.7, ease: EASE_OUT }}
        >
          {children}
        </motion.span>
        <motion.span
          aria-hidden
          className="absolute inset-0 will-change-transform"
          style={{ color: splitColor }}
          variants={cyan}
          initial={entrance ? "enter" : "rest"}
          animate={state}
          transition={SPRING_SNAP}
        >
          {children}
        </motion.span>
        <span ref={ref} className="relative">
          {children}
        </span>
      </span>
    </Tag>
  );
}
