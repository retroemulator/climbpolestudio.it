import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { getDisciplines } from "@/sanity/lib/data";
import { urlFor } from "@/sanity/lib/image";
import { disciplines as staticDisciplines } from "@/lib/site";
import type { DisciplineCard } from "@/sanity/types";
import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";
import { Tilt } from "@/components/motion/tilt";

export const metadata: Metadata = { title: "Discipline" };

const GRADIENTS = [
  "radial-gradient(130% 120% at 14% 10%, color-mix(in oklab, var(--color-brand) 75%, transparent) 0%, transparent 48%), radial-gradient(130% 120% at 90% 92%, color-mix(in oklab, var(--color-electric) 58%, transparent) 0%, transparent 46%)",
  "radial-gradient(130% 120% at 88% 12%, color-mix(in oklab, var(--color-electric) 62%, transparent) 0%, transparent 48%), radial-gradient(120% 120% at 10% 90%, color-mix(in oklab, var(--color-brand-strong) 70%, transparent) 0%, transparent 50%)",
  "radial-gradient(130% 120% at 50% 0%, color-mix(in oklab, var(--color-brand) 60%, transparent) 0%, transparent 44%), radial-gradient(120% 130% at 50% 100%, color-mix(in oklab, var(--color-electric) 52%, transparent) 0%, transparent 48%)",
];

export default async function DisciplinePage() {
  const fetched = await getDisciplines().catch(() => [] as DisciplineCard[]);
  const items = fetched.length
    ? fetched
    : staticDisciplines.map(
        (d, i): DisciplineCard => ({ _id: d.slug, title: d.name, slug: d.slug, order: i, summary: d.blurb }),
      );

  return (
    <main>
      <Section tone="stage" className="pb-12 pt-32 md:pt-40">
        <Container className="relative">
          <Spine className="left-6 bg-brand/30 md:left-10 lg:left-14" />
          <p className="eyebrow pl-3 text-brand md:pl-6">Cosa puoi fare</p>
          <ChromaticShadow
            as="h1"
            className="text-display mt-4 pl-3 md:pl-6"
            style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}
          >
            Discipline
          </ChromaticShadow>
          <RevealText
            as="p"
            text="Pole, aeree, forza ed espressione: cinque strade per muoverti, più l'Exotic. Ogni livello ha il suo punto di partenza."
            className="mt-6 max-w-2xl pl-3 text-lg text-paper/70 md:pl-6 md:text-xl"
          />
        </Container>

        <div className="mt-12 border-y border-paper/10 py-4">
          <Marquee baseVelocity={1.8}>
            <span className="text-display mx-6 text-2xl text-paper/12 md:mx-10 md:text-4xl">
              Pole · Cerchio Aereo · Flexibility · Functional · Verticali · Exotic ·
            </span>
          </Marquee>
        </div>

        <Container className="mt-12 md:mt-16">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((d, i) => {
              const img = d.media?.image
                ? urlFor(d.media.image).width(900).height(1100).fit("crop").quality(70).url()
                : null;
              return (
                <Reveal key={d._id} delay={(i % 3) * 0.06}>
                  <Tilt className="h-full">
                    <Link
                      href={`/discipline/${d.slug}`}
                      className="group relative block h-[44vh] min-h-72 overflow-hidden rounded-xl border border-paper/12"
                    >
                      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                        {img ? (
                          <Image src={img} alt={d.title} fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover" />
                        ) : (
                          <div
                            aria-hidden
                            className="absolute inset-0 bg-ink-soft"
                            style={{ backgroundImage: GRADIENTS[i % GRADIENTS.length] }}
                          />
                        )}
                      </div>
                      <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink via-ink/35 to-ink/5" />
                      <span
                        aria-hidden
                        className="text-display pointer-events-none absolute right-3 top-1 text-[6rem] leading-none text-paper/10"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <span className="text-display block text-3xl transition-colors duration-300 group-hover:text-brand">
                          {d.title}
                        </span>
                        {d.summary ? (
                          <span className="mt-2 block max-w-sm text-sm text-paper/70">{d.summary}</span>
                        ) : null}
                        <span className="mt-4 inline-flex items-center gap-2 text-sm text-paper/85 transition-colors group-hover:text-brand">
                          Scopri
                          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </span>
                      </div>
                    </Link>
                  </Tilt>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>
    </main>
  );
}
