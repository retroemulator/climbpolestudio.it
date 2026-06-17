import Link from "next/link";

import type { DisciplineCard } from "@/sanity/types";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Reveal } from "@/components/motion/reveal";

/**
 * Showcase discipline (stage): indice editoriale grande, una riga per disciplina,
 * con hover kinetic (nome → brand, freccia che scorre). Legge da Sanity.
 */
export function DisciplineShowcase({ disciplines }: { disciplines: DisciplineCard[] }) {
  if (!disciplines.length) return null;

  return (
    <Section tone="stage" id="discipline" className="py-24 md:py-36">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <ChromaticShadow as="h2" className="text-display" style={{ fontSize: "clamp(2.5rem, 9vw, 7rem)" }}>
            Discipline
          </ChromaticShadow>
          <Link
            href="/discipline"
            className="navlink hidden whitespace-nowrap pb-2 text-paper/70 md:inline-flex"
          >
            Tutte →
          </Link>
        </div>

        <ul className="mt-12 border-t border-paper/10">
          {disciplines.map((d, i) => (
            <Reveal key={d._id} delay={i * 0.05}>
              <li>
                <Link
                  href={`/discipline/${d.slug}`}
                  className="group flex items-center gap-4 border-b border-paper/10 py-6 md:gap-8 md:py-8"
                >
                  <span className="font-mono text-sm text-paper/30 md:text-base">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="text-display block text-3xl transition-colors duration-300 group-hover:text-brand md:text-5xl">
                      {d.title}
                    </span>
                    {d.summary && (
                      <span className="mt-2 block max-w-2xl text-sm text-paper/55 md:text-base">
                        {d.summary}
                      </span>
                    )}
                  </span>
                  {d.levels?.length ? (
                    <span className="hidden max-w-[10rem] flex-wrap justify-end gap-1 lg:flex">
                      {d.levels.map((lv) => (
                        <span
                          key={lv}
                          className="rounded-full border border-paper/15 px-2 py-0.5 text-xs text-paper/50"
                        >
                          {lv}
                        </span>
                      ))}
                    </span>
                  ) : null}
                  <span
                    aria-hidden
                    className="text-2xl text-paper/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand"
                  >
                    →
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
