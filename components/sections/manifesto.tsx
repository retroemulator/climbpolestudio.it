import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

/**
 * Chi siamo (light): blocco editoriale dopo l'hero.
 * A sinistra eyebrow + logo grande; a destra chi siamo + CTA alla pagina.
 */
export function Manifesto() {
  return (
    <Section tone="light" className="py-24 md:py-36">
      <Container className="grid items-start gap-10 md:grid-cols-[0.7fr_1.3fr]">
        <div>
          <Reveal>
            <p className="eyebrow text-brand-strong">Chi siamo</p>
          </Reveal>
          <Reveal delay={0.08}>
            <Image
              src="/logo.png"
              alt="Climb Pole Studio — arti aeree e movimento"
              width={512}
              height={512}
              className="mt-6 h-auto w-full max-w-75 md:max-w-90"
            />
          </Reveal>
        </div>
        <div>
          <RevealText
            as="h2"
            text="Portare le arti aeree fuori dallo spettacolo e dentro la vita di tutti i giorni."
            className="max-w-2xl text-2xl leading-snug md:text-4xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-muted-foreground">
              Climb Pole Studio nasce a Torino dall&apos;idea che la forza non sia un traguardo da
              esibire, ma un modo di abitare il corpo. Pole dance, discipline aeree, flexibility e
              functional training convivono in un unico spazio — curato, sicuro e pensato per il
              movimento — dove ognuno trova il proprio ritmo.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Lavoriamo per livelli reali, dall&apos;intro all&apos;avanzato, con un&apos;insegnante
              certificata che ti segue passo dopo passo: niente giudizio, niente fretta. Che tu
              salga su un palo per la prima volta o viva già a testa in giù, qui cresci insieme a una
              community che spinge nella stessa direzione — dentro e fuori dalla sala.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <Button asChild variant="outline" size="lg" className="group/cta mt-8">
              <Link href="/chi-siamo">
                Scopri lo studio
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover/cta:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Button>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
