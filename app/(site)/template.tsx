"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Transizione di pagina (brief §2). In App Router `template.tsx` viene
 * rimontato a ogni navigazione → animazione di ENTRATA per ogni rotta.
 * (L'exit puro non è affidabile in App Router senza un FrozenRouter; l'entrata
 * orchestrata basta a dare continuità ed è più robusta. Da rivalutare con le
 * View Transitions API quando stabili — vedi NOTES Fase 3.)
 * Con `prefers-reduced-motion` non anima nulla.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
