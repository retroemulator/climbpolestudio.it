"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";

export type RailItem = {
  slug: string;
  title: string;
  summary?: string;
  levels?: string[];
  imageUrl?: string;
};

/* Glow on-brand per le (rare) card senza foto. */
const GRADIENTS = [
  "radial-gradient(130% 120% at 12% 8%, color-mix(in oklab, var(--color-brand) 75%, transparent) 0%, transparent 46%), radial-gradient(130% 120% at 92% 96%, color-mix(in oklab, var(--color-electric) 60%, transparent) 0%, transparent 44%)",
  "radial-gradient(130% 120% at 88% 10%, color-mix(in oklab, var(--color-electric) 62%, transparent) 0%, transparent 46%), radial-gradient(120% 120% at 8% 92%, color-mix(in oklab, var(--color-brand-strong) 72%, transparent) 0%, transparent 48%)",
  "radial-gradient(130% 120% at 50% 0%, color-mix(in oklab, var(--color-brand) 62%, transparent) 0%, transparent 42%), radial-gradient(120% 130% at 50% 100%, color-mix(in oklab, var(--color-electric) 52%, transparent) 0%, transparent 46%)",
];

/**
 * Discipline in scorrimento ORIZZONTALE: barra di scorrimento + trascinamento
 * col mouse su desktop, swipe col dito su mobile (scroll nativo + snap). Così si
 * vedono tutti i pannelli senza dipendere dallo scroll verticale.
 */
export function DisciplineRail({ items }: { items: RailItem[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });

  if (!items.length) return null;

  function onPointerDown(e: React.PointerEvent<HTMLUListElement>) {
    if (e.pointerType === "touch") return; // il touch scrolla nativamente
    const el = ref.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
  }
  function onPointerMove(e: React.PointerEvent<HTMLUListElement>) {
    if (!drag.current.down) return;
    const el = ref.current;
    if (!el) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  }
  function endDrag() {
    drag.current.down = false;
  }
  function onClickCapture(e: React.MouseEvent<HTMLUListElement>) {
    // evita che un trascinamento apra il link
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  }

  return (
    <Section tone="stage" id="discipline" className="overflow-hidden py-24 md:py-32">
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

      <ul
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className="disc-rail-scroll mt-10 flex snap-x snap-mandatory select-none gap-5 overflow-x-auto px-6 pb-5 md:cursor-grab md:px-10 md:active:cursor-grabbing"
      >
        {items.map((it, i) => (
          <li
            key={it.slug}
            className="w-[80vw] shrink-0 snap-start sm:w-[56vw] md:w-[42vw] lg:w-[32vw] lg:max-w-[24rem] xl:w-[26vw] xl:max-w-[26rem] 2xl:w-[24rem]"
          >
            <Link
              href={`/discipline/${it.slug}`}
              draggable={false}
              className="group relative block h-[58vh] min-h-[440px] max-h-[620px] overflow-hidden rounded-xl border border-paper/12 md:h-[62vh]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              >
                {it.imageUrl ? (
                  <Image
                    src={it.imageUrl}
                    alt={it.title}
                    fill
                    sizes="(max-width:640px) 80vw, (max-width:768px) 56vw, (max-width:1024px) 42vw, (max-width:1280px) 32vw, 26vw"
                    className="object-cover"
                    draggable={false}
                  />
                ) : (
                  <div
                    className="absolute inset-0 bg-ink-soft"
                    style={{ backgroundImage: GRADIENTS[i % GRADIENTS.length] }}
                  />
                )}
              </div>
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink via-ink/35 to-ink/5" />

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
          </li>
        ))}
      </ul>

      <Container className="mt-3">
        <p className="eyebrow text-paper/30">← Trascina o scorri →</p>
      </Container>
    </Section>
  );
}
