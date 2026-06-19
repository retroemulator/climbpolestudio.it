"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Tilt } from "@/components/motion/tilt";

export type RailItem = {
  slug: string;
  title: string;
  summary?: string;
  levels?: string[];
  imageUrl?: string;
};

/* Glow on-brand per le card senza foto: magenta/electric su ink, variati per
   posizione così ogni pannello è distinto ma resta nella palette. */
const GRADIENTS = [
  "radial-gradient(130% 120% at 12% 8%, color-mix(in oklab, var(--color-brand) 75%, transparent) 0%, transparent 46%), radial-gradient(130% 120% at 92% 96%, color-mix(in oklab, var(--color-electric) 60%, transparent) 0%, transparent 44%)",
  "radial-gradient(130% 120% at 88% 10%, color-mix(in oklab, var(--color-electric) 62%, transparent) 0%, transparent 46%), radial-gradient(120% 120% at 8% 92%, color-mix(in oklab, var(--color-brand-strong) 72%, transparent) 0%, transparent 48%)",
  "radial-gradient(130% 120% at 50% 0%, color-mix(in oklab, var(--color-brand) 62%, transparent) 0%, transparent 42%), radial-gradient(120% 130% at 50% 100%, color-mix(in oklab, var(--color-electric) 52%, transparent) 0%, transparent 46%)",
];

/**
 * Discipline in HORIZONTAL-SCROLL PINNATO (firma del brief §2): lo scroll
 * verticale guida la traslazione orizzontale dei pannelli, tenuti "incollati"
 * (sticky) a schermo. Su mobile e con reduced-motion degrada a scroll
 * orizzontale nativo con snap (tutti i pannelli restano raggiungibili).
 */
export function DisciplineRail({ items }: { items: RailItem[] }) {
  const reduced = useReducedMotion();
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [pinned, setPinned] = useState(false);
  const [range, setRange] = useState(0);
  const [vh, setVh] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -range]);

  useEffect(() => {
    if (reduced) {
      setPinned(false);
      return;
    }
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => {
      setPinned(mq.matches);
      const track = trackRef.current;
      // misurabile solo quando il track pinnato è montato (mq match)
      if (track) setRange(Math.max(0, track.scrollWidth - window.innerWidth + 48));
      setVh(window.innerHeight);
    };
    update();
    mq.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
    // `pinned` in deps: quando passa a true il track pinnato monta → rimisura.
  }, [reduced, items.length, pinned]);

  if (!items.length) return null;

  const cards = items.map((it, i) => (
    <li
      key={it.slug}
      className="w-[80vw] shrink-0 snap-start sm:w-[58vw] md:w-[44vw] lg:w-[34vw] xl:w-[29vw]"
    >
      <Tilt className="h-full">
        <Link
          href={`/discipline/${it.slug}`}
          className="group relative block h-[58vh] overflow-hidden rounded-xl border border-paper/12 md:h-[64vh]"
        >
          {/* Sfondo: foto Sanity se presente, altrimenti glow on-brand */}
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
            {it.imageUrl ? (
              <Image
                src={it.imageUrl}
                alt={it.title}
                fill
                sizes="(max-width: 768px) 80vw, 34vw"
                className="object-cover"
              />
            ) : (
              <div
                aria-hidden
                className="absolute inset-0 bg-ink-soft"
                style={{ backgroundImage: GRADIENTS[i % GRADIENTS.length] }}
              />
            )}
          </div>
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-ink via-ink/35 to-ink/5"
          />

          {/* Numero watermark */}
          <span
            aria-hidden
            className="text-display pointer-events-none absolute right-3 top-1 text-[6.5rem] leading-none text-paper/10 md:text-[8rem]"
          >
            {String(i + 1).padStart(2, "0")}
          </span>

          <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
            <span className="eyebrow text-brand">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-display mt-2 block text-3xl transition-colors duration-300 group-hover:text-brand md:text-4xl">
              {it.title}
            </span>
            {it.summary ? (
              <span className="mt-3 block max-w-sm text-sm text-paper/70">{it.summary}</span>
            ) : null}
            {it.levels?.length ? (
              <span className="mt-4 flex flex-wrap gap-1.5">
                {it.levels.slice(0, 4).map((lv) => (
                  <span
                    key={lv}
                    className="rounded-full border border-paper/20 px-2 py-0.5 text-xs text-paper/60"
                  >
                    {lv}
                  </span>
                ))}
              </span>
            ) : null}
            <span className="mt-5 inline-flex items-center gap-2 text-sm text-paper/85 transition-colors group-hover:text-brand">
              Scopri
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </Link>
      </Tilt>
    </li>
  ));

  const header = (
    <Container className="flex items-end justify-between gap-6">
      <div>
        <p className="eyebrow text-brand">Cosa puoi fare</p>
        <ChromaticShadow
          as="h2"
          className="text-display mt-3"
          style={{ fontSize: "clamp(2.5rem, 9vw, 7rem)" }}
        >
          Discipline
        </ChromaticShadow>
      </div>
      <Link
        href="/discipline"
        className="navlink hidden whitespace-nowrap pb-2 text-paper/70 md:inline-flex"
      >
        Tutte →
      </Link>
    </Container>
  );

  // PINNATO (desktop, motion attivo)
  if (pinned) {
    return (
      <Section tone="stage" id="discipline">
        <div ref={targetRef} style={{ height: range + vh }} className="relative">
          <div className="sticky top-0 flex h-screen flex-col justify-center gap-8 overflow-hidden py-10">
            {header}
            <motion.ul
              ref={trackRef}
              style={{ x }}
              className="flex gap-5 pl-[max(1.5rem,calc((100vw-88rem)/2+1.5rem))] pr-6"
            >
              {cards}
            </motion.ul>
            {/* avanzamento orizzontale */}
            <Container>
              <div className="h-px w-full origin-left bg-paper/10">
                <motion.div style={{ scaleX: scrollYProgress }} className="h-px w-full origin-left bg-brand" />
              </div>
            </Container>
          </div>
        </div>
      </Section>
    );
  }

  // FALLBACK (mobile / reduced-motion): scroll orizzontale nativo con snap
  return (
    <Section tone="stage" id="discipline" className="overflow-hidden py-24 md:py-32">
      <div className="flex flex-col gap-8">
        {header}
        <ul
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {cards}
        </ul>
      </div>
    </Section>
  );
}
