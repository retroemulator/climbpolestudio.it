"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";

/** Reveal generico in-view: fade + translate. Statico con reduced-motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10%" }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Reveal del testo parola-per-parola (mask + slide-up con stagger).
 * Spaziatura tra parole via margin (così il testo va a capo correttamente).
 * `aria-label` porta il testo intero; i pezzi sono aria-hidden per uno
 * screen reading pulito. Con reduced-motion rende testo semplice.
 */
export function RevealText({
  text,
  as: Tag = "span",
  className,
  wordClassName,
  stagger = 0.045,
  delay = 0,
}: {
  text: string;
  as?: React.ElementType;
  className?: string;
  wordClassName?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={cn("inline-block", className)} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden className="mr-[0.25em] inline-block overflow-hidden align-bottom">
          <motion.span
            className={cn("inline-block", wordClassName)}
            initial={{ y: "115%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: delay + i * stagger, ease: EASE_OUT }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
