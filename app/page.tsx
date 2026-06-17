import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { RevealText } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";
import { Magnetic } from "@/components/motion/magnetic";
import { strings } from "@/lib/strings";

const DISCIPLINE = ["Pole Dance", "Cerchio Aereo", "Flexibility", "Functional Training", "Verticali"];

/**
 * Fase 2 — placeholder che mostra il DESIGN SYSTEM in uso (Chromatic Shadow,
 * reveal, marquee, magnetic, ritmo luce/stage, la "spina").
 * L'hero video + tutte le sezioni della home definitiva arrivano in Fase 5.
 */
export default function Home() {
  return (
    <main>
      <Section tone="stage" className="flex min-h-screen flex-col justify-between py-10 md:py-14">
        <Container className="flex items-center justify-between">
          <span className="eyebrow text-paper/70">
            {strings.brand.city} · {strings.brand.payoff}
          </span>
          <span className="eyebrow text-paper/40">Fase 2 · design system</span>
        </Container>

        <Container className="relative">
          <Spine className="left-6 bg-brand/30 md:left-10 lg:left-14" />
          <ChromaticShadow
            as="h1"
            className="text-display pl-3 md:pl-6"
            style={{ fontSize: "clamp(4.5rem, 19vw, 17rem)" }}
          >
            Climb
          </ChromaticShadow>
          <RevealText
            as="p"
            text="Salire, girare, restare sospesi. La pole è forza che diventa linguaggio."
            className="mt-5 max-w-2xl pl-3 text-lg text-paper/80 md:pl-6 md:text-2xl"
          />
          <div className="mt-8 flex flex-wrap items-center gap-3 pl-3 md:pl-6">
            <Magnetic>
              <Button variant="brand" size="lg">
                {strings.cta.prenotaProva}
              </Button>
            </Magnetic>
            <Button variant="outline" size="lg">
              {strings.cta.scopriDiscipline}
            </Button>
          </div>
        </Container>

        <div className="border-t border-paper/10 pt-5">
          <Marquee baseVelocity={2.4}>
            {DISCIPLINE.map((d) => (
              <span key={d} className="eyebrow mx-5 text-paper/55 md:mx-8">
                {d} •
              </span>
            ))}
          </Marquee>
        </div>
      </Section>
    </main>
  );
}
