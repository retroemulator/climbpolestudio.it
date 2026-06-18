"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { routes } from "@/lib/site";
import { EASE_OUT, SPRING_SNAP } from "@/lib/motion";
import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";

/**
 * Teaser prezzi (light) — "de-redazione".
 * Dove un sito normale nasconde i prezzi dietro un muro, qui si vede un
 * documento che si DEcensura riga per riga: barre di redazione brand che si
 * ritirano allo scroll svelando NON dei numeri, ma cosa è incluso. Il prezzo
 * vero è un click in più (/prezzi): la CTA è sempre attiva, mai "sbloccabile".
 *
 * Nessun prezzo mostrato (vincolo). Con prefers-reduced-motion la sezione parte
 * già rivelata (testo pieno, niente barre), semantica <ul>/<li> per lo SR.
 */
const VALUES = [
  "Prima prova gratuita",
  "Sospendi o cambi corso quando vuoi",
  "Pole, aeree e functional in un unico spazio",
  "Insegnanti certificate",
  "Community vera, dentro e fuori la sala",
  "Nessun costo nascosto",
];

const listVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const barVariants: Variants = {
  hidden: { scaleX: 1 },
  shown: { scaleX: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};
const textVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  shown: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export function PricingTeaser() {
  const reduced = useReducedMotion();

  return (
    <Section tone="light" id="prezzi" className="py-24 md:py-36">
      <Container className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Colonna editoriale + CTA sempre attiva */}
        <div className="relative">
          <Spine className="left-0 bg-brand/40" />
          <p className="eyebrow pl-4 text-brand-strong md:pl-6">Trasparenza</p>
          <h2 className="text-display mt-3 pl-4 md:pl-6" style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
            Tutto in{" "}
            <ChromaticShadow as="span" ghostColor="var(--color-brand)" splitColor="var(--color-cyan)">
              chiaro
            </ChromaticShadow>
            .
          </h2>
          <p className="mt-5 max-w-md pl-4 text-lg text-muted-foreground md:pl-6">
            Prima di chiederti quanto, guarda cosa c&apos;è dentro. Nessun costo nascosto, nessuna
            sorpresa — solo quello che ti porti a casa dal primo giorno.
          </p>
          <div className="mt-8 pl-4 md:pl-6">
            <Magnetic>
              <Button asChild variant="brand" size="lg" className="group/cta">
                <Link href={routes.prezzi}>
                  Vai al listino
                  <span aria-hidden className="transition-transform duration-300 group-hover/cta:translate-x-1">
                    →
                  </span>
                </Link>
              </Button>
            </Magnetic>
          </div>
        </div>

        {/* Il "documento" che si de-censura */}
        {reduced ? (
          <ul className="border-t border-line">
            {VALUES.map((v, i) => (
              <li key={v} className="flex items-baseline gap-4 border-b border-line py-4">
                <span className="eyebrow tabular-nums text-brand-strong/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-medium md:text-xl">{v}</span>
              </li>
            ))}
          </ul>
        ) : (
          <motion.ul
            className="border-t border-line"
            variants={listVariants}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "-15%" }}
          >
            {VALUES.map((v, i) => (
              <motion.li
                key={v}
                className="group/row flex items-baseline gap-4 border-b border-line py-4"
                whileHover={{ x: 6 }}
                transition={SPRING_SNAP}
              >
                <span className="eyebrow tabular-nums text-brand-strong/50 transition-colors group-hover/row:text-brand-strong">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative inline-block overflow-hidden">
                  <motion.span variants={textVariants} className="block text-lg font-medium md:text-xl">
                    {v}
                  </motion.span>
                  <motion.span
                    aria-hidden
                    variants={barVariants}
                    className="absolute inset-0 origin-right rounded-[2px] bg-brand-strong"
                  />
                </span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </Container>
    </Section>
  );
}
