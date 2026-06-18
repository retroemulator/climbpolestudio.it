import type { Metadata } from "next";

import { contact, socials, whatsappUrl } from "@/lib/site";
import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { StudioMap } from "@/components/sections/studio-map";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contatti",
  description: "Scrivici, chiamaci o vieni a trovarci in Corso Dante 109/A, Torino.",
};

export default function ContattiPage() {
  const { address } = contact;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${address.street}, ${address.zip} ${address.city}`,
  )}`;

  return (
    <main>
      <Section tone="stage" className="py-28 pt-32 md:py-32 md:pt-40">
        <Container>
          <div className="relative">
            <Spine className="left-0 bg-brand/40" />
            <p className="eyebrow pl-4 text-brand md:pl-6">Dove</p>
            <ChromaticShadow as="h1" className="text-display pl-4 md:pl-6" style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}>
              Contatti
            </ChromaticShadow>
          </div>
        </Container>
      </Section>

      <Section tone="light" className="py-24 md:py-32">
        <Container className="grid gap-12 md:grid-cols-2">
          {/* Info + mappa */}
          <div>
            <p className="eyebrow text-brand-strong">Lo studio</p>
            <address className="mt-4 text-2xl not-italic leading-snug">
              {address.street}
              <br />
              {address.zip} {address.city}
            </address>

            <div className="mt-6 space-y-2 text-muted-foreground">
              <p>
                <a href={`tel:${contact.phoneE164}`} className="hover:text-brand-strong">
                  {contact.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={`mailto:${contact.email}`} className="hover:text-brand-strong">
                  {contact.email}
                </a>
              </p>
              <p>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-strong">
                  WhatsApp
                </a>
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-muted-foreground hover:text-brand-strong"
                >
                  {s.handle}
                </a>
              ))}
            </div>

            <StudioMap
              href={maps}
              tone="light"
              className="mt-8"
              address={{ street: address.street, cityLine: `${address.zip} ${address.city}` }}
            />
          </div>

          {/* Form */}
          <div>
            <p className="eyebrow text-brand-strong">Scrivici</p>
            <div className="mt-4">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
