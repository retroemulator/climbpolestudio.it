import type { Metadata } from "next";

import { getGallery } from "@/sanity/lib/data";
import { urlFor } from "@/sanity/lib/image";
import type { GalleryItem } from "@/sanity/types";
import { socials } from "@/lib/site";
import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Button } from "@/components/ui/button";
import { Gallery } from "@/components/gallery";

export const metadata: Metadata = {
  title: "Galleria",
  description: "Foto e video di Climb Pole Studio: lezioni, performance e vita dello studio.",
  alternates: { canonical: "/galleria" },
};

export default async function GalleriaPage() {
  const items = await getGallery().catch(() => [] as GalleryItem[]);
  const ig = socials.find((s) => s.platform === "instagram") ?? socials[0];

  // URL pronte (thumb per la griglia, full per il lightbox) calcolate lato server.
  const photos = items
    .filter((it) => it.image)
    .map((it) => ({
      id: it._id,
      thumb: urlFor(it.image!).width(800).quality(70).url(),
      full: urlFor(it.image!).width(1800).quality(80).url(),
      w: it.dims?.width ?? 800,
      h: it.dims?.height ?? 1000,
      caption: it.caption ?? null,
    }));

  return (
    <main>
      <Section tone="stage" className="py-28 pt-32 md:py-32 md:pt-40">
        <Container>
          <div className="relative">
            <Spine className="left-0 bg-brand/40" />
            <p className="eyebrow pl-4 text-brand md:pl-6">Lo studio in immagini</p>
            <ChromaticShadow as="h1" className="text-display pl-4 md:pl-6" style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}>
              Galleria
            </ChromaticShadow>
          </div>

          {photos.length ? (
            <Gallery photos={photos} />
          ) : (
            <div className="mt-14 max-w-xl">
              <p className="text-lg text-paper/70">
                La galleria sta prendendo forma. Nel frattempo, le foto e i video più freschi —
                lezioni, workshop e vita dello studio — li trovi sul nostro Instagram.
              </p>
              <Button asChild variant="brand" size="lg" className="mt-6">
                <a href={ig.href} target="_blank" rel="noopener noreferrer">
                  {ig.handle} su Instagram
                </a>
              </Button>
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
