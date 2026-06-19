import type { Metadata } from "next";
import Link from "next/link";

import { routes } from "@/lib/site";
import { cn } from "@/lib/utils";
import { getPricing } from "@/sanity/lib/data";
import type { PricingPlan } from "@/sanity/types";
import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Prezzi",
  description: "Listino di Climb Pole Studio: iscrizione, mensili, trimestrali, pacchetti e lezioni private.",
};

/** Ordine ed etichette delle categorie di listino. */
const CATEGORY_ORDER: { key: string; label: string }[] = [
  { key: "iscrizione", label: "Iscrizione" },
  { key: "mensile", label: "Abbonamenti mensili" },
  { key: "trimestrale", label: "Trimestrali" },
  { key: "semestrale", label: "Semestrali" },
  { key: "annuale", label: "Annuali" },
  { key: "pack", label: "Pacchetti ingressi" },
  { key: "singola", label: "Lezioni singole" },
  { key: "privata", label: "Lezioni private" },
];

function price(p: PricingPlan) {
  if (p.price == null) return "—";
  return `${p.priceFrom ? "da " : ""}€ ${p.price}`;
}

export default async function PrezziPage() {
  const pricing = await getPricing().catch(() => [] as PricingPlan[]);
  const groups = CATEGORY_ORDER.map((c) => ({
    ...c,
    items: pricing.filter((p) => p.category === c.key).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
  })).filter((g) => g.items.length);

  return (
    <main>
      {/* HERO (stage) */}
      <Section tone="stage" className="py-28 pt-32 md:py-32 md:pt-40">
        <Container>
          <div className="relative">
            <Spine className="left-0 bg-brand/40" />
            <p className="eyebrow pl-4 text-brand md:pl-6">Quanto</p>
            <ChromaticShadow as="h1" className="text-display pl-4 md:pl-6" style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}>
              Prezzi
            </ChromaticShadow>
            <p className="mt-4 max-w-2xl pl-4 text-lg text-paper/70 md:pl-6">
              Trasparenti, senza sorprese. Scegli la formula che ti somiglia — o vieni a fare la
              prova e decidi dopo.
            </p>
          </div>
        </Container>
      </Section>

      {/* LISTINO (light) */}
      <Section tone="light" className="py-24 md:py-32">
        <Container>
          {groups.length ? (
            <div className="space-y-16">
              {groups.map((g) => (
                <div key={g.key}>
                  <h2 className="eyebrow text-brand-strong">{g.label}</h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {g.items.map((p, i) => (
                      <Reveal key={p._id} delay={i * 0.04}>
                        <div
                          className={cn(
                            "flex h-full flex-col rounded-lg border p-6 transition-all duration-300 hover:-translate-y-1",
                            p.badge
                              ? "border-brand-strong/50 bg-brand/5 ring-1 ring-brand-strong/15"
                              : "border-line hover:border-brand-strong/40",
                          )}
                        >
                          {p.badge ? (
                            <span className="eyebrow mb-3 inline-block w-fit rounded-full bg-brand-strong px-3 py-1 text-paper">
                              {p.badge}
                            </span>
                          ) : null}
                          <span className="text-sm text-muted-foreground">{p.title}</span>
                          <span className="text-display mt-1 text-3xl">{price(p)}</span>
                          {p.detail ? (
                            <span className="mt-2 text-sm text-muted-foreground">{p.detail}</span>
                          ) : null}
                          {p.note ? (
                            <span className="mt-auto pt-4 text-xs text-muted-foreground">{p.note}</span>
                          ) : null}
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Listino in aggiornamento.</p>
          )}

          <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-line pt-10">
            <p className="text-lg">Non sai da dove iniziare?</p>
            <Magnetic>
              <Button asChild variant="brand" size="lg">
                <Link href={routes.prenota}>Prenota la prova</Link>
              </Button>
            </Magnetic>
          </div>
        </Container>
      </Section>
    </main>
  );
}
