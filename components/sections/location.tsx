import Link from "next/link";

import { contact, routes, whatsappUrl } from "@/lib/site";
import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { StudioMap } from "@/components/sections/studio-map";
import { Button } from "@/components/ui/button";

/**
 * Location (stage): lo spazio fisico + come raggiungerlo + CTA. La mappa vera
 * (embed/static) arriva in Fase 14; qui un placeholder coerente col tema.
 */
export function Location() {
  const { address } = contact;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${address.street}, ${address.zip} ${address.city}`,
  )}`;

  return (
    <Section tone="stage" id="dove" className="py-24 md:py-36">
      <Container className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative">
          <Spine className="left-0 bg-brand/40" />
          <p className="eyebrow pl-4 text-brand md:pl-6">Dove</p>
          <h2 className="text-display mt-3 pl-4 md:pl-6" style={{ fontSize: "clamp(1.5rem, 4vw, 2.75rem)" }}>
            {address.street}
          </h2>
          <p className="mt-4 pl-4 text-paper/70 md:pl-6">
            {address.zip} {address.city} · {address.country}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 pl-4 md:pl-6">
            <Button asChild variant="brand" size="lg">
              <Link href={routes.prenota}>Prenota la prova</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Scrivici su WhatsApp
              </a>
            </Button>
          </div>
          <p className="mt-6 pl-4 text-sm text-paper/50 md:pl-6">
            <a href={`tel:${contact.phoneE164}`} className="transition-colors hover:text-brand">
              {contact.phoneDisplay}
            </a>{" "}
            ·{" "}
            <a href={`mailto:${contact.email}`} className="transition-colors hover:text-brand">
              {contact.email}
            </a>
          </p>
        </div>

        {/* Mappa "locator" on-brand animata (radar + pin). Click → Google Maps. */}
        <Reveal delay={0.1}>
          <StudioMap
            href={maps}
            tone="stage"
            geo={{ lat: address.lat, lon: address.lon }}
            address={{ street: address.street, cityLine: `${address.zip} ${address.city}` }}
          />
        </Reveal>
      </Container>
    </Section>
  );
}
