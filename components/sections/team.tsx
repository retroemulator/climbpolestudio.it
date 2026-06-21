import Image from "next/image";

import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import type { Instructor } from "@/sanity/types";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";

const AVATAR_GRADIENT =
  "radial-gradient(120% 120% at 20% 15%, color-mix(in oklab, var(--color-brand) 80%, transparent) 0%, transparent 55%), radial-gradient(120% 120% at 85% 90%, color-mix(in oklab, var(--color-electric) 60%, transparent) 0%, transparent 55%)";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Team / insegnanti (stage). Da Sanity; avatar con foto o monogramma on-brand.
 * Il gruppo di card è sempre centrato in pagina (flex-wrap + justify-center):
 * - 1 sola insegnante → un box più ampio, centrato, orizzontale su desktop e
 *   impilato (verticale) su mobile;
 * - più insegnanti → griglia 2/3 colonne come prima, ma centrata (l'ultima riga
 *   incompleta resta centrata invece di allinearsi a sinistra).
 */
export function Team({ items }: { items: Instructor[] }) {
  if (!items.length) return null;
  const single = items.length === 1;

  return (
    <Section tone="stage" className="py-24 md:py-32">
      <Container>
        <p className="eyebrow text-brand">Chi ti guida</p>
        <ChromaticShadow
          as="h2"
          className="text-display mt-3"
          style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
        >
          {single ? "L'insegnante" : "Le insegnanti"}
        </ChromaticShadow>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {items.map((p, i) => (
            <Reveal
              key={p._id}
              delay={(i % 2) * 0.08}
              className={cn(
                "w-full",
                single ? "max-w-2xl" : "sm:w-[calc(50%-0.75rem)] xl:w-[calc(33.333%-1rem)]",
              )}
            >
              <Tilt max={4} scale={1.01} className="h-full">
                <article
                  className={cn(
                    "flex h-full gap-4 rounded-xl border border-paper/12 bg-ink-soft/50 p-6 sm:gap-5 md:p-7",
                    single &&
                      "flex-col items-center text-center sm:flex-row sm:items-start sm:gap-6 sm:text-left md:p-8",
                  )}
                >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-full border border-paper/15 sm:size-20 md:size-24">
                    {p.photo ? (
                      <Image
                        src={urlFor(p.photo).width(200).height(200).fit("crop").quality(75).url()}
                        alt={p.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : (
                      <div
                        aria-hidden
                        className="grid h-full w-full place-items-center bg-ink"
                        style={{ backgroundImage: AVATAR_GRADIENT }}
                      >
                        <span className="text-display text-xl text-paper">{initials(p.name)}</span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 overflow-hidden">
                    <span className="text-display block text-xl wrap-anywhere sm:text-2xl">{p.name}</span>
                    {p.role ? (
                      <span className="eyebrow mt-1 block text-brand">{p.role}</span>
                    ) : null}
                    {p.bio
                      ? p.bio.split(/\n\n+/).map((para, j) => (
                          <p key={j} className="mt-3 text-sm leading-relaxed text-paper/70">
                            {para}
                          </p>
                        ))
                      : null}
                    {p.disciplines?.length ? (
                      <div
                        className={cn(
                          "mt-4 flex flex-wrap gap-1.5",
                          single && "justify-center sm:justify-start",
                        )}
                      >
                        {p.disciplines.map((d) => (
                          <span
                            key={d.slug}
                            className="rounded-full border border-paper/15 px-2 py-0.5 text-xs text-paper/55"
                          >
                            {d.title}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
