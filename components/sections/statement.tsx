"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Marquee } from "@/components/motion/marquee";

/** Una parola che si "accende" (da velata a piena) mentre scorri la sezione. */
function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.22em] inline-block">
      {children}
    </motion.span>
  );
}

const DEFAULT =
  "Non vendiamo lo spettacolo. Ti insegniamo la forza, la tecnica e il movimento.";

/**
 * Fascia "manifesto" KINETIC (stage): un marquee reattivo allo scroll + una frase
 * che si rivela parola per parola LEGATA allo scroll (scrub), non al solo ingresso.
 * È il momento in cui lo scrolling stesso "scrive" il testo. Statica con
 * reduced-motion (frase piena, marquee fermo).
 */
export function Statement({ text = DEFAULT }: { text?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.split(" ");

  return (
    <Section tone="stage" className="overflow-hidden">
      <div className="border-y border-paper/10 py-4">
        <Marquee baseVelocity={1.6}>
          <span className="text-display mx-6 text-2xl text-paper/12 md:mx-10 md:text-4xl">
            Forza · Tecnica · Espressione · Community ·
          </span>
        </Marquee>
      </div>

      <Container>
        <div ref={ref} className="mx-auto max-w-5xl py-24 md:py-36">
          <p className="font-display text-3xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
            {reduced
              ? text
              : words.map((w, i) => (
                  <Word
                    key={i}
                    progress={scrollYProgress}
                    range={[i / words.length, (i + 1) / words.length]}
                  >
                    {w}
                  </Word>
                ))}
          </p>
        </div>
      </Container>
    </Section>
  );
}
