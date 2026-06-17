import Link from "next/link";

import type { PricingPlan } from "@/sanity/types";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

function formatPrice(p: PricingPlan) {
  if (p.price == null) return "—";
  return `${p.priceFrom ? "da " : ""}€ ${p.price}`;
}

/**
 * Teaser prezzi (light): evidenzia i mensili + l'annuale open, dal listino reale
 * (Sanity). Il listino completo è in `/prezzi` (Fase 8).
 */
export function PricingTeaser({ pricing }: { pricing: PricingPlan[] }) {
  if (!pricing.length) return null;

  const mensili = pricing.filter((p) => p.category === "mensile");
  const annuale = pricing.find((p) => p.category === "annuale");
  const iscrizione = pricing.find((p) => p.category === "iscrizione");
  const singola = pricing.find((p) => p.category === "singola");

  const featured = [...mensili, annuale].filter(Boolean).slice(0, 3) as PricingPlan[];
  if (!featured.length) return null;

  return (
    <Section tone="light" id="prezzi" className="py-24 md:py-36">
      <Container>
        <p className="eyebrow text-brand-strong">Quanto</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-display" style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
            Prezzi
          </h2>
          <Button asChild variant="brand" size="lg">
            <Link href="/prezzi">Vedi il listino</Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p._id} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-lg border border-line p-7">
                {p.badge ? (
                  <span className="eyebrow mb-3 inline-block w-fit rounded-full bg-brand/15 px-3 py-1 text-brand-strong">
                    {p.badge}
                  </span>
                ) : null}
                <span className="text-sm text-muted-foreground">{p.title}</span>
                <span className="text-display mt-2 text-4xl">{formatPrice(p)}</span>
                {p.detail ? <span className="mt-2 text-sm text-muted-foreground">{p.detail}</span> : null}
                {p.note ? <span className="mt-auto pt-4 text-xs text-muted-foreground">{p.note}</span> : null}
              </div>
            </Reveal>
          ))}
        </div>

        {(iscrizione || singola) && (
          <p className="mt-6 text-sm text-muted-foreground">
            {iscrizione ? `${iscrizione.title} € ${iscrizione.price}` : null}
            {iscrizione && singola ? " · " : null}
            {singola ? `${singola.title} € ${singola.price}` : null}
          </p>
        )}
      </Container>
    </Section>
  );
}
