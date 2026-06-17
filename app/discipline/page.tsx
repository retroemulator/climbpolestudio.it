import type { Metadata } from "next";
import Link from "next/link";

import { disciplines } from "@/lib/site";
import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";

export const metadata: Metadata = { title: "Discipline" };

export default function DisciplinePage() {
  return (
    <main>
      <Section tone="stage" className="py-32 md:py-40">
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

          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-3">
            {disciplines.map((d) => (
              <Link
                key={d.slug}
                href={`/discipline/${d.slug}`}
                className="group flex min-h-44 flex-col justify-between bg-ink p-6 transition-colors hover:bg-ink-soft"
              >
                <span className="eyebrow text-paper/40 transition-colors group-hover:text-brand">
                  {d.name}
                </span>
                <span className="text-display mt-6 text-2xl text-paper md:text-3xl">{d.name}</span>
                <span className="mt-2 text-sm text-paper/60">{d.blurb}</span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
