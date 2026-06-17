import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal, RevealText } from "@/components/motion/reveal";

/**
 * Manifesto (light): blocco editoriale dopo l'hero. Testo grande, voce attiva.
 */
export function Manifesto() {
  return (
    <Section tone="light" className="py-24 md:py-36">
      <Container className="grid gap-10 md:grid-cols-[0.7fr_1.3fr]">
        <Reveal>
          <p className="eyebrow text-brand-strong">Il manifesto</p>
        </Reveal>
        <div>
          <RevealText
            as="h2"
            text="Niente performance da esibire. Tecnica, ascolto del corpo e una community che spinge nella stessa direzione."
            className="text-2xl leading-snug md:text-4xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-muted-foreground">
              Lavoriamo per livelli reali — dall&apos;intro all&apos;avanzato — con insegnanti che
              ti seguono passo dopo passo. Lo spazio è curato, sicuro e pensato per il movimento.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
