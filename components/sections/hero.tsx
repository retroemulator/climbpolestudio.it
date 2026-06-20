import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { strings } from "@/lib/strings";
import { routes } from "@/lib/site";
import type { DisciplineCard } from "@/sanity/types";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { Media } from "@/components/media/media";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Stamp } from "@/components/motion/stamp";
import { RevealText } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";
import { Magnetic } from "@/components/motion/magnetic";
import { Parallax } from "@/components/motion/parallax";

/**
 * Hero della home (brief §4). Video-ready: oggi mostra un poster (foto) a tutto
 * schermo; per attivare il video basta passare `videoUrl` (da Sanity in futuro).
 * Wordmark gigante con la firma Chromatic Shadow + marquee discipline + scroll cue.
 */

// Poster provvisorio (stock) finché non arrivano le foto reali dello studio.
const HERO_POSTER =
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=2000&q=70";

// Video hero (in `public/`). Verticale provvisorio → zoom a riempire l'hero
// (object-cover, centrato: ritaglia sopra/sotto, niente bande laterali).
const HERO_VIDEO = "/hero.mp4";

export function Hero({ disciplines }: { disciplines: DisciplineCard[] }) {
  const names = disciplines.length
    ? disciplines.map((d) => d.title)
    : ["Pole Dance", "Cerchio Aereo", "Flexibility", "Functional Training", "Verticali"];

  return (
    <Section
      tone="stage"
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Sfondo media (video full-bleed) con parallax + overlay leggibilità.
          Il media è leggermente sovradimensionato (inset negativo) così la
          deriva parallasse non scopre i bordi. */}
      <div className="absolute inset-0 overflow-hidden">
        <Parallax fill speed={0.4} className="absolute inset-[-8%]">
          <Media
            image={{ src: HERO_POSTER, alt: "Allenamento di arti aeree a Climb Pole Studio" }}
            videoUrl={HERO_VIDEO}
            allowMobile
            overlay
            priority
            sizes="100vw"
            morph
            morphMs={3500}
            className="h-full"
          />
        </Parallax>
        {/* Scrim: leggibilità del wordmark anche su frame video chiari. */}
        <div aria-hidden className="absolute inset-0 bg-ink/50" />
      </div>

      <Container className="relative z-10 flex flex-1 flex-col justify-end pb-10 pt-28 md:pb-14">
        <div className="relative">
          <Spine className="left-0 bg-brand/40" />
          <p className="eyebrow pl-4 text-[0.7rem] tracking-[0.18em] text-balance text-paper/80 sm:text-xs sm:tracking-[0.3em] md:pl-6">
            {strings.brand.city} · {strings.brand.payoff}
          </p>
          <Stamp className="pl-4 md:pl-6">
            <ChromaticShadow
              as="h1"
              entrance={false}
              className="text-display"
              style={{ fontSize: "clamp(4.5rem, 20vw, 18rem)" }}
            >
              {/* "I" = il palo: barra verticale brand, come nel logo. Ombra BIANCA
                  inversa (vedi .cps-pole in globals.css): opposta all'ombra cromatica
                  che la firma dà alle lettere C L M B. */}
              <span className="sr-only">{strings.brand.name}</span>
              <span aria-hidden>CL</span>
              <span
                aria-hidden
                className="cps-pole mx-[0.06em] inline-block h-[0.95em] w-[0.12em] translate-y-[0.04em] bg-brand align-baseline"
              />
              <span aria-hidden>MB</span>
            </ChromaticShadow>
          </Stamp>
          <RevealText
            as="p"
            text="Salire, girare, restare sospesi. La pole è forza che diventa linguaggio."
            className="mt-4 max-w-2xl pl-4 text-lg text-paper/85 md:pl-6 md:text-2xl"
          />
          <div className="mt-8 flex flex-wrap items-center gap-3 pl-4 md:pl-6">
            <Magnetic>
              <Button asChild variant="brand" size="lg">
                <Link href={routes.prenota}>{strings.cta.prenotaProva}</Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="outline" size="lg">
                <Link href={routes.discipline}>{strings.cta.scopriDiscipline}</Link>
              </Button>
            </Magnetic>
          </div>
        </div>
      </Container>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="eyebrow text-paper/45">Scorri</span>
        <ChevronDown className="size-5 animate-bounce text-brand" />
      </div>

      {/* Marquee discipline reattivo allo scroll */}
      <div className="relative z-10 border-t border-paper/10 py-4 backdrop-blur-sm">
        <Marquee baseVelocity={2.2}>
          {names.map((n) => (
            <span key={n} className="eyebrow mx-5 text-paper/60 md:mx-8">
              {n} •
            </span>
          ))}
        </Marquee>
      </div>
    </Section>
  );
}
