import { Dumbbell, Feather, Sparkles, Users } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Tilt } from "@/components/motion/tilt";

/** "Perché Climb" (light): i 4 pilastri (brief §4). Niente fake-stats. */
const PILLARS = [
  {
    k: "Forza",
    Icon: Dumbbell,
    d: "Costruiamo la base atletica che regge ogni figura: trazione, core, spalle. Qui la forza è concreta e misurabile, e cresce a ogni lezione.",
  },
  {
    k: "Flessibilità",
    Icon: Feather,
    d: "Mobilità e apertura progressive, mai forzate. Un corpo che si muove meglio, dentro e fuori dalla sala.",
  },
  {
    k: "Espressione",
    Icon: Sparkles,
    d: "La tecnica diventa il tuo linguaggio: musicalità, presenza, stile personale. Non esegui, racconti.",
  },
  {
    k: "Community",
    Icon: Users,
    d: "Si cresce insieme, a ogni livello e senza giudizio. Si tifa per te quando una figura esce per la prima volta.",
  },
];

export function WhyClimb() {
  return (
    <Section tone="light" className="py-24 md:py-36">
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow text-brand-strong">Perché Climb</p>
          <ChromaticShadow
            as="h2"
            className="text-display mt-3"
            style={{ fontSize: "clamp(2.25rem, 7vw, 5rem)" }}
          >
            Più di un corso
          </ChromaticShadow>
          <RevealText
            as="p"
            text="Forza, tecnica, espressione e community: i quattro pilastri su cui costruiamo ogni percorso, dal primo giorno."
            className="mt-5 text-lg text-muted-foreground"
          />
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.06}>
              <Tilt max={6} className="h-full">
                <div className="flex h-full flex-col rounded-xl border border-line bg-paper-pure p-7">
                  <p.Icon aria-hidden className="size-7 text-brand-strong" />
                  <span className="text-display mt-6 text-2xl">{p.k}</span>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
