import { whatsappUrl } from "@/lib/site";
import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Reveal } from "@/components/motion/reveal";

export type FaqItem = { _id?: string; question: string; answer: string };

/**
 * FAQ (light): accordion accessibile con <details>/<summary> nativi → zero JS,
 * funziona anche senza idratazione e con tastiera. Marker che ruota su open.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  if (!items.length) return null;

  return (
    <Section tone="light" className="py-24 md:py-36">
      <Container className="grid gap-12 md:grid-cols-[0.5fr_1fr] md:gap-16">
        <div className="relative md:sticky md:top-28 md:self-start">
          <Spine className="left-0 bg-brand/40" />
          <p className="eyebrow pl-4 text-brand-strong md:pl-6">F.A.Q.</p>
          <ChromaticShadow
            as="h2"
            className="text-display mt-3 pl-4 md:pl-6"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
          >
            Prima volta?
          </ChromaticShadow>
          <p className="mt-5 max-w-sm pl-4 text-muted-foreground md:pl-6">
            Le risposte alle domande che ci fanno tutti. Se non trovi la tua,{" "}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-strong underline underline-offset-4"
            >
              scrivici su WhatsApp
            </a>
            .
          </p>
        </div>

        <ul className="border-t border-line">
          {items.map((f, i) => (
            <Reveal key={f._id ?? f.question} delay={(i % 4) * 0.05}>
              <li>
                <details className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-medium [&::-webkit-details-marker]:hidden">
                    {f.question}
                    <span
                      aria-hidden
                      className="grid size-6 shrink-0 place-items-center text-brand-strong transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-6 text-muted-foreground">{f.answer}</p>
                </details>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
