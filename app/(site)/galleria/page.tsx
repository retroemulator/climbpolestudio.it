import type { Metadata } from "next";
import Image from "next/image";

import { getGallery } from "@/sanity/lib/data";
import { urlFor } from "@/sanity/lib/image";
import type { GalleryItem } from "@/sanity/types";
import { socials } from "@/lib/site";
import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Galleria",
  description: "Foto e video di Climb Pole Studio: lezioni, performance e vita dello studio.",
};

export default async function GalleriaPage() {
  const items = await getGallery().catch(() => [] as GalleryItem[]);
  const ig = socials.find((s) => s.platform === "instagram") ?? socials[0];

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

          {items.length ? (
            <div className="mt-14 columns-2 gap-4 md:columns-3">
              {items.map((it, i) => (
                <Reveal key={it._id} delay={(i % 6) * 0.04} className="mb-4 break-inside-avoid">
                  <figure className="overflow-hidden rounded-lg border border-paper/10">
                    {it.image ? (
                      <Image
                        src={urlFor(it.image).width(800).quality(70).url()}
                        alt={it.caption ?? "Climb Pole Studio"}
                        width={it.dims?.width ?? 800}
                        height={it.dims?.height ?? 1000}
                        sizes="(max-width:768px) 50vw, 33vw"
                        className="h-auto w-full"
                      />
                    ) : null}
                    {it.caption ? (
                      <figcaption className="p-3 text-sm text-paper/60">{it.caption}</figcaption>
                    ) : null}
                  </figure>
                </Reveal>
              ))}
            </div>
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
