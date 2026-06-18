"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Sincope — entrata "a singhiozzo" (stile Canva): l'elemento lampeggia e scatta
 * off-beat (opacity + spostamento + skew), poi si assesta. Pensato per il
 * wordmark hero, dove si sposa con la firma Chromatic Shadow (bordo RGB → glitch).
 *
 * Con prefers-reduced-motion rende i figli statici e pienamente visibili (un
 * flicker rapido è anche una questione di fotosensibilità): zero animazione.
 */
export function Sincope({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      style={{ willChange: "transform, opacity" }}
      initial={{ opacity: 0, x: -14, skewX: -6 }}
      animate={{
        opacity: [0, 1, 0.14, 1, 0.46, 1, 1],
        x: [-14, -12, 9, -5, 3, 0, 0],
        skewX: [-6, -5, 4, -2, 1, 0, 0],
      }}
      transition={{
        duration: 1.1,
        delay,
        times: [0, 0.07, 0.14, 0.24, 0.34, 0.46, 1],
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
