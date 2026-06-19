"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { RevealText } from "@/components/motion/reveal";

/** Foto del team/community. `object-contain` → mai tagliate, centrate e ridimensionate
 *  dinamicamente in base alla finestra (desktop e mobile). */
const IMAGES = ["/chi-siamo-team.jpg", "/chi-siamo-team-2.jpg"];
const INTERVAL = 4500;

/**
 * Hero di "Chi siamo" — full-screen come la home. Due foto del team in
 * CROSSFADE automatico (entrata in dissolvenza, poi alternanza morbida).
 * Layer scuro perché le immagini sono chiare. Con reduced-motion: prima foto
 * statica, niente alternanza.
 */
export function ChiSiamoHero() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % IMAGES.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <Section
      tone="stage"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-32"
    >
      <div className="absolute inset-0">
        {IMAGES.map((src, i) => (
          <div
            key={src}
            aria-hidden={i !== active}
            className="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
            style={{ opacity: entered && i === active ? 1 : 0 }}
          >
            <Image
              src={src}
              alt="Il team e la community di Climb Pole Studio"
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-contain"
            />
          </div>
        ))}
        {/* Layer scuro (immagini chiare) + gradiente per la leggibilità del titolo */}
        <div aria-hidden className="absolute inset-0 bg-ink/55" />
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/25 to-ink/45" />
      </div>

      <Container className="relative z-10">
        <div className="relative">
          <Spine className="left-0 bg-brand/40" />
          <p className="eyebrow pl-4 text-brand md:pl-6">Lo studio</p>
          <ChromaticShadow
            as="h1"
            className="text-display pl-4 md:pl-6"
            style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}
          >
            Chi siamo
          </ChromaticShadow>
          <RevealText
            as="p"
            text="Uno spazio a Torino dove la pole è forza che diventa linguaggio."
            className="mt-6 max-w-2xl pl-4 text-lg text-paper/80 md:pl-6 md:text-2xl"
          />
        </div>
      </Container>
    </Section>
  );
}
