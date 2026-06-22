import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { routes } from "@/lib/site";
import { strings } from "@/lib/strings";
import { getInstructors, getTestimonials } from "@/sanity/lib/data";
import type { Instructor, Testimonial } from "@/sanity/types";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { ChiSiamoHero } from "@/components/sections/chi-siamo-hero";
import { Team } from "@/components/sections/team";
import { Testimonials } from "@/components/sections/testimonials";

export const metadata: Metadata = {
  title: "Chi siamo",
  description:
    "Climb Pole Studio: arti aeree e movimento a Torino. Lo studio, l'insegnamento e la community.",
  alternates: { canonical: "/chi-siamo" },
};

const PILLARS = [
  { k: "Forza", d: "Costruiamo la base atletica che regge ogni figura." },
  { k: "Flessibilità", d: "Mobilità e apertura, progressive, mai forzate." },
  { k: "Espressione", d: "La tecnica diventa il tuo linguaggio in aria." },
  { k: "Community", d: "Si cresce insieme, a ogni livello, senza giudizio." },
];

const STEPS = [
  {
    t: "Prenoti la prova",
    d: "Scrivici su WhatsApp o prenota online: scegli la disciplina e l'orario che ti ispira di più.",
  },
  {
    t: "Trovi il tuo livello",
    d: "Alla prima lezione l'insegnante valuta con te da dove partire. Nessuna fretta, nessun giudizio.",
  },
  {
    t: "Cresci con la community",
    d: "Entri in un percorso vero, al tuo ritmo. La forza arriva, la tecnica si affina, e non sei mai sola.",
  },
];

export default async function ChiSiamoPage() {
  const [instructors, testimonials] = await Promise.all([
    getInstructors().catch(() => [] as Instructor[]),
    getTestimonials().catch(() => [] as Testimonial[]),
  ]);

  return (
    <main>
      {/* 1 — HERO full-screen con crossfade delle due foto del team */}
      <ChiSiamoHero />

      {/* 2 — MANIFESTO (light) — logo + testo, come la sezione "Chi siamo" della home */}
      <Section tone="light" className="py-24 md:py-32">
        <Container className="grid items-stretch gap-4 md:grid-cols-[0.8fr_1.2fr] md:gap-10">
          <div className="flex flex-col md:h-full">
            <Reveal>
              <p className="eyebrow text-brand-strong">La nostra idea</p>
            </Reveal>
            {/* Logo centrato (orizz. con mx-auto, vert. su desktop) accanto al testo,
                come in home. Il mb negativo recupera il padding trasparente sotto il
                triangolo del logo su mobile; su desktop niente (md:mb-0). */}
            <Reveal delay={0.08} className="md:flex md:grow md:items-center">
              <Image
                src="/logo.png"
                alt="Climb Pole Studio — arti aeree e movimento"
                width={512}
                height={512}
                className="mx-auto mt-6 mb-[-12%] h-auto w-full max-w-sm md:mb-0 md:max-w-md"
              />
            </Reveal>
          </div>
          <div>
            <RevealText
              as="p"
              text="Climb nasce dall'idea che salire, girare e restare sospesi sia alla portata di tutte e tutti."
              className="max-w-2xl text-2xl leading-snug md:text-4xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-muted-foreground">
                Niente performance da esibire: qui contano la tecnica, l&apos;ascolto del corpo e una
                community che spinge nella stessa direzione. Lavoriamo per livelli reali —
                dall&apos;intro all&apos;avanzato — con un&apos;insegnante che ti segue passo dopo
                passo, rispettando i tempi e i limiti di ognuno. Lo spazio è curato, sicuro e pensato
                per il movimento: pole, discipline aeree, flexibility e functional training convivono
                nello stesso luogo. Non importa da dove parti o quanta esperienza hai: la forza,
                quella vera, arriva strada facendo, una lezione dopo l&apos;altra — e con lei la
                fiducia di abitare il proprio corpo.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 3 — TEAM (stage) */}
      <Team items={instructors} />

      {/* 4 — PILASTRI (light) */}
      <Section tone="light" className="py-24 md:py-32">
        <Container>
          <p className="eyebrow text-brand-strong">Perché Climb</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => (
              <Reveal key={p.k} delay={i * 0.06}>
                <Tilt max={6} className="h-full">
                  <div className="h-full rounded-xl border border-line bg-paper-pure p-7">
                    <span className="text-display text-3xl">{p.k}</span>
                    <p className="mt-3 text-sm text-muted-foreground">{p.d}</p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5 — TESTIMONIANZE (stage) */}
      <Testimonials items={testimonials} />

      {/* 6 — COME SI COMINCIA (light) + CTA */}
      <Section tone="light" className="py-24 md:py-32">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-strong">Come si comincia</p>
            <ChromaticShadow
              as="h2"
              className="text-display mt-3"
              style={{ fontSize: "clamp(2.25rem, 7vw, 5rem)" }}
            >
              Il primo passo è la prova
            </ChromaticShadow>
            <RevealText
              as="p"
              text="Non serve esperienza, né forza, né flessibilità di partenza. Serve solo la voglia di provare — al resto pensiamo insieme."
              className="mt-5 text-lg text-muted-foreground"
            />
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.07}>
                <Tilt max={6} className="h-full">
                  <div className="flex h-full flex-col rounded-xl border border-line bg-paper-pure p-7">
                    <span className="text-display text-4xl text-brand-strong">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-display mt-5 text-2xl">{s.t}</span>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <Button asChild variant="brand" size="lg">
                <Link href={routes.prenota}>{strings.cta.prenotaProva}</Link>
              </Button>
            </Magnetic>
            <Button asChild variant="outline" size="lg">
              <Link href={routes.orari}>Guarda gli orari</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
