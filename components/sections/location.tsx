import { contact } from "@/lib/site";
import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { StudioMap } from "@/components/sections/studio-map";

/**
 * Location (stage): lo spazio fisico, i contatti diretti e la mappa interattiva.
 * Niente CTA prenota/WhatsApp qui: sono nel footer subito sotto (no ridondanza).
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
          <ChromaticShadow
            as="h2"
            className="text-display mt-3 pl-4 md:pl-6"
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
          >
            Vieni a trovarci
          </ChromaticShadow>
          <p className="mt-4 pl-4 text-lg text-paper/80 md:pl-6">
            {address.street} · {address.zip} {address.city}
          </p>
          <div className="mt-8 space-y-3 pl-4 md:pl-6">
            <a
              href={`tel:${contact.phoneE164}`}
              className="block text-lg text-paper/85 transition-colors hover:text-brand md:text-2xl"
            >
              {contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="block text-lg text-paper/85 transition-colors hover:text-brand md:text-2xl"
            >
              {contact.email}
            </a>
          </div>
        </div>

        {/* Mappa interattiva on-brand (radar + pin); scroll in hover = zoom. */}
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
