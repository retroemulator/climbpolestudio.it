"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EASE_OUT } from "@/lib/motion";

/**
 * Transizione di pagina (brief §2). In App Router `template.tsx` viene rimontato
 * a ogni navigazione → animazione di ENTRATA per ogni rotta.
 *
 * "Curtain wipe": due pannelli (brand che guida + ink che segue) coprono e poi
 * si sollevano fuori dallo schermo rivelando la pagina, mentre il contenuto sale
 * in dissolvenza sotto di essi. L'exit puro non è affidabile in App Router senza
 * FrozenRouter; l'entrata orchestrata basta e regge meglio.
 * Con `prefers-reduced-motion` non anima nulla.
 */
const WIPE = [0.83, 0, 0.17, 1] as const; // ease-in-out deciso, "sipario"

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-100 bg-brand"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.45, ease: WIPE }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-100 bg-ink"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.5, ease: WIPE, delay: 0.08 }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.24, ease: EASE_OUT }}
      >
        {children}
      </motion.div>
    </>
  );
}
