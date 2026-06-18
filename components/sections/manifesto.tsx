import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal, RevealText } from "@/components/motion/reveal";

/**
 * Manifesto / La nostra visione (light): blocco editoriale dopo l'hero.
 * A sinistra eyebrow + logo grande; a destra la dichiarazione di visione.
 */
export function Manifesto() {
  return (
    <Section tone="light" className="py-24 md:py-36">
      <Container className="grid items-start gap-10 md:grid-cols-[0.7fr_1.3fr]">
        <div>
          <Reveal>
            <p className="eyebrow text-brand-strong">La nostra visione</p>
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
            className="text-2xl leading-snug md:text-4xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-muted-foreground">
              Uno spazio a Torino dove forza, tecnica ed espressione crescono insieme — per chi
              sale per la prima volta come per chi vive già a testa in giù. Niente giudizio: solo
              movimento vero e una community che spinge nella stessa direzione.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
