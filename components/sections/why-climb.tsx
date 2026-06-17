import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

/** "Perché Climb" (light): i 4 pilastri (brief §4). Niente fake-stats. */
const PILLARS = [
  { k: "Forza", d: "Costruiamo la base atletica che regge ogni figura." },
  { k: "Flessibilità", d: "Mobilità e apertura, progressive, mai forzate." },
  { k: "Espressione", d: "La tecnica diventa il tuo linguaggio in aria." },
  { k: "Community", d: "Si cresce insieme, a ogni livello, senza giudizio." },
];

export function WhyClimb() {
  return (
    <Section tone="light" className="py-24 md:py-36">
      <Container>
        <p className="eyebrow text-brand-strong">Perché Climb</p>
        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.06} className="bg-paper p-7">
              <span className="text-display text-3xl">{p.k}</span>
              <p className="mt-3 text-sm text-muted-foreground">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
