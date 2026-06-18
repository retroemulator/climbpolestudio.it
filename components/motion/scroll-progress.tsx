"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * Barra di avanzamento scroll: hairline brand→electric→cyan in cima alla
 * pagina, si riempie da sinistra con la progressione di scroll. Sta sopra la
 * navbar (z-60). Con reduced-motion riflette comunque lo scroll, senza spring.
 */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const scaleX = reduce ? scrollYProgress : smooth;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-linear-to-r from-brand via-electric to-cyan"
    />
  );
}
