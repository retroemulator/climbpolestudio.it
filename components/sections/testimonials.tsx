import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";

export type TestimonialItem = {
  _id?: string;
  author: string;
  text: string;
  rating?: number;
  context?: string;
};

/**
 * Testimonianze (stage): prova sociale reale, niente numeri inventati.
 * Card con voto, citazione, autore + contesto; hover-tilt + reveal staggerato.
 */
export function Testimonials({ items }: { items: TestimonialItem[] }) {
  if (!items.length) return null;

  return (
    <Section tone="stage" className="py-24 md:py-36">
      <Container>
        <p className="eyebrow text-brand">Dicono di noi</p>
        <ChromaticShadow
          as="h2"
          className="text-display mt-3"
          style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
        >
          Voci dalla sala
        </ChromaticShadow>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 6).map((t, i) => (
            <Reveal key={t._id ?? t.author} delay={(i % 3) * 0.06}>
              <Tilt max={5} scale={1.02} className="h-full">
                <figure className="flex h-full flex-col rounded-xl border border-paper/12 bg-ink-soft/60 p-6 md:p-7">
                  <div role="img" className="text-brand" aria-label={`${t.rating ?? 5} su 5`}>
                    {"★".repeat(Math.round(t.rating ?? 5))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-paper/85">{t.text}</blockquote>
                  <figcaption className="mt-6 border-t border-paper/10 pt-4">
                    <span className="text-display block text-lg">{t.author}</span>
                    {t.context ? (
                      <span className="mt-1 block font-mono text-xs uppercase tracking-wider text-paper/45">
                        {t.context}
                      </span>
                    ) : null}
                  </figcaption>
                </figure>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
