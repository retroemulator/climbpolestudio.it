import type { Metadata } from "next";

import { contact, whatsappUrl, openingHours, mapsUrl } from "@/lib/site";
import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { RevealText } from "@/components/motion/reveal";
import { StudioMap } from "@/components/sections/studio-map";
import { SocialIcons } from "@/components/brand/social-icons";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contatti",
  description: "Scrivici, chiamaci o vieni a trovarci in Corso Dante 109/A, Torino.",
};

export default function ContattiPage() {
  const { address } = contact;
  const maps = mapsUrl;

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
            <RevealText
              as="p"
              text="Scrivici, chiamaci o vieni a trovarci. La prima prova è il modo migliore per iniziare."
              className="mt-6 max-w-2xl pl-4 text-lg text-paper/70 md:pl-6 md:text-xl"
            />
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

            <div className="mt-6 text-muted-foreground">
              <a href={`tel:${contact.phoneE164}`} className="flex min-h-11 items-center hover:text-brand-strong">
                {contact.phoneDisplay}
              </a>
              <a href={`mailto:${contact.email}`} className="flex min-h-11 items-center hover:text-brand-strong">
                {contact.email}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center hover:text-brand-strong"
              >
                WhatsApp
              </a>
            </div>

            <SocialIcons tone="light" className="mt-6 -ml-2" />

            <div className="mt-8 border-t border-line pt-6">
              <p className="eyebrow text-brand-strong">Orari</p>
              <dl className="mt-3 space-y-1.5">
                {openingHours.map((o) => (
                  <div key={o.days} className="flex justify-between gap-6 text-sm">
                    <dt className="text-muted-foreground">{o.days}</dt>
                    <dd className="font-mono">{o.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
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

      {/* MAPPA full-bleed (larghezza intera dinamica) */}
      <Section tone="light" className="pb-24 md:pb-32">
        <StudioMap
          href={maps}
          tone="light"
          className="aspect-auto h-[58vh] min-h-90 rounded-none border-x-0"
          zoom={16}
          geo={{ lat: address.lat, lon: address.lon }}
          address={{ street: address.street, cityLine: `${address.zip} ${address.city}` }}
        />
      </Section>
    </main>
  );
}
