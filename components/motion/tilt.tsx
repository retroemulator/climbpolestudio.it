"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { SPRING_SNAP } from "@/lib/motion";

/**
 * Card "tilt": l'elemento si inclina seguendo il puntatore (rotateX/rotateY) e
 * cresce appena su hover. Micro-interazione del brief (card hover scale/tilt).
 * Disattiva con reduced-motion (rende i figli invariati).
 *
 * `transform-style: preserve-3d` + perspective sul wrapper → i figli con
 * `translateZ` (es. un overlay) "galleggiano". Usato dalle card disciplina.
 */
export function Tilt({
  children,
  className,
  max = 7,
  scale = 1.035,
}: {
  children: React.ReactNode;
  className?: string;
  /** rotazione massima in gradi */
  max?: number;
  /** scala su hover */
  scale?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 18, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 220, damping: 18, mass: 0.4 });

  if (reduced) return <div className={className}>{children}</div>;

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max);
    rx.set(-py * max);
  }

  function reset() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={cn("[transform-style:preserve-3d]", className)}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      whileHover={{ scale }}
      transition={SPRING_SNAP}
    >
      {children}
    </motion.div>
  );
}
