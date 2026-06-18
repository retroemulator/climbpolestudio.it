"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EASE_OUT } from "@/lib/motion";

/**
 * Envelope di sezione: ogni blocco "sale e si assesta" entrando nel viewport
 * (opacity + translate + micro-scale). Più ampio del Reveal generico → dà il
 * senso di transizione tra una sezione e l'altra durante lo scroll, mentre i
 * Reveal interni (testi, card) si innescano sopra per profondità.
 * Statico con prefers-reduced-motion.
 */
export function RevealSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 56, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
