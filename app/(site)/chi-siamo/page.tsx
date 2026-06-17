import type { Metadata } from "next";
import Link from "next/link";

import { contact, routes } from "@/lib/site";
import { strings } from "@/lib/strings";
import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Chi siamo" };

/**
 * ESEMPIO di "Ritmo Luce / Stage" (Fase 0): fasce alternate scure (stage) e
 * chiare (light). NB: pagina ancora placeholder nei contenuti (testi definitivi
 * + foto reali in Fase 13) — serve a mostrare l'alternanza chiaro/scuro.
 */
const PILLARS = [
  { k: "Forza", d: "Costruiamo la base atletica che regge ogni figura." },
  { k: "Flessibilità", d: "Mobilità e apertura, progressive, mai forzate." },
  { k: "Espressione", d: "La tecnica diventa il tuo linguaggio in aria." },
  { k: "Community", d: "Si cresce insieme, a ogni livello, senza giudizio." },
];

export default function ChiSiamoPage() {
  const { address } = contact;

  return (
    <main>
      {/* 1 — HERO (stage / scuro) */}
      <Section tone="stage" className="flex min-h-[80vh] flex-col justify-center py-32">
        <Container className="relative">
          <Spine className="left-6 bg-brand/30 md:left-10 lg:left-14" />
          <p className="eyebrow pl-3 text-brand md:pl-6">Lo studio</p>
          <ChromaticShadow
            as="h1"
            className="text-display mt-4 pl-3 md:pl-6"
            style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}
          >
            Chi siamo
          </ChromaticShadow>
          <RevealText
            as="p"
            text="Uno spazio a Torino dove la pole è forza che diventa linguaggio."
            className="mt-6 max-w-2xl pl-3 text-lg text-paper/70 md:pl-6 md:text-2xl"
          />
        </Container>
      </Section>

      {/* 2 — MANIFESTO (light / bianco) */}
      <Section tone="light" className="py-24 md:py-32">
        <Container className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow text-brand-strong">Il manifesto</p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-2xl leading-snug md:text-4xl">
              Climb nasce dall&apos;idea che salire, girare e restare sospesi sia alla portata di
              tutte e tutti. Niente performance da esibire: tecnica, ascolto del corpo e una
              community che spinge nella stessa direzione.
            </p>
            <p className="mt-6 max-w-xl text-muted-foreground">
              Lavoriamo per livelli reali — dall&apos;intro all&apos;avanzato — con insegnanti che
              ti seguono passo dopo passo. Lo spazio è curato, sicuro e pensato per il movimento.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* 3 — PILASTRI (stage / scuro) */}
      <Section tone="stage" className="py-24 md:py-32">
        <Container>
          <p className="eyebrow text-brand">Perché Climb</p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => (
              <Reveal key={p.k} delay={i * 0.06} className="bg-ink p-7">
                <span className="text-display text-3xl text-paper">{p.k}</span>
                <p className="mt-3 text-sm text-paper/60">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4 — LO SPAZIO (light / bianco) + CTA */}
      <Section tone="light" className="py-24 md:py-32">
        <Container className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-brand-strong">Lo spazio</p>
            <h2 className="text-display mt-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              {address.street}
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              {address.zip} {address.city}. Una sala attrezzata per pole, aerial e mobilità.
              Vieni a vederla: la prima prova è il modo migliore per capire se fa per te.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="brand" size="lg">
                <Link href={routes.prenota}>{strings.cta.prenotaProva}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contatti">Come arrivare</Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            {/* Placeholder media: in Fase 13 → foto reali dello studio. */}
            <div className="aspect-4/3 w-full rounded-lg border border-line bg-linear-to-br from-secondary to-muted" />
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
