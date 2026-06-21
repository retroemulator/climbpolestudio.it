import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { routes, weekdays } from "@/lib/site";
import { getDisciplineSlugs, getDisciplineBySlug, getScheduleByDiscipline } from "@/sanity/lib/data";
import { urlFor } from "@/sanity/lib/image";
import { disciplineImageFor } from "@/lib/discipline-images";
import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";
import { Magnetic } from "@/components/motion/magnetic";
import { Parallax } from "@/components/motion/parallax";
import { Tilt } from "@/components/motion/tilt";
import { Media } from "@/components/media/media";
import { Button } from "@/components/ui/button";
import { RichText } from "@/components/portable-text";

export async function generateStaticParams() {
  const slugs = await getDisciplineSlugs().catch(() => []);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = await getDisciplineBySlug(slug).catch(() => null);
  if (!d) return { title: "Disciplina" };
  const ogSrc = d.media?.image
    ? urlFor(d.media.image).width(1200).height(630).fit("crop").quality(75).url()
    : disciplineImageFor(slug);
  return {
    title: d.title,
    description: d.summary,
    alternates: { canonical: `/discipline/${slug}` },
    ...(ogSrc
      ? { openGraph: { images: [{ url: ogSrc, width: 1200, height: 630, alt: d.title }] } }
      : {}),
  };
}

export default async function DisciplinaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [d, slots] = await Promise.all([
    getDisciplineBySlug(slug).catch(() => null),
    getScheduleByDiscipline(slug).catch(() => []),
  ]);
  if (!d) notFound();

  const accent = d.accent || "var(--color-brand)";
  const heroImg = d.media?.image
    ? urlFor(d.media.image).width(3840).quality(70).url()
    : (disciplineImageFor(slug) ?? null);
  const heroGradient = `radial-gradient(130% 120% at 18% 8%, color-mix(in oklab, ${accent} 60%, transparent) 0%, transparent 50%), radial-gradient(130% 120% at 86% 96%, color-mix(in oklab, var(--color-electric) 42%, transparent) 0%, transparent 52%)`;

  const gallery = (d.gallery ?? []).filter(Boolean);

  const byDay = weekdays
    .map((wd) => ({ ...wd, slots: slots.filter((s) => s.day === wd.key) }))
    .filter((wd) => wd.slots.length);

  return (
    <main>
      {/* HERO (stage) — foto Sanity con parallax, o glow on-brand per-disciplina */}
      <Section
        tone="stage"
        className="relative flex min-h-[72vh] flex-col justify-end overflow-hidden py-20 pt-32"
      >
        <div className="absolute inset-0 overflow-hidden">
          {heroImg ? (
            <>
              <Parallax fill speed={0.4} className="absolute inset-[-8%]">
                <Media image={{ src: heroImg, alt: d.title }} videoUrl={d.media?.videoUrl} overlay priority className="h-full" />
              </Parallax>
              <div aria-hidden className="absolute inset-0 bg-ink/45" />
            </>
          ) : (
            <>
              <div aria-hidden className="absolute inset-0 bg-ink-soft" style={{ backgroundImage: heroGradient }} />
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink via-ink/40 to-ink/20" />
            </>
          )}
        </div>
        <Container className="relative z-10">
          <div className="relative">
            <Spine className="left-0 bg-brand/40" />
            <p className="eyebrow pl-4 text-brand md:pl-6">Disciplina</p>
            <ChromaticShadow
              as="h1"
              className="text-display pl-4 md:pl-6"
              style={{ fontSize: "clamp(3rem, 11vw, 9rem)" }}
            >
              {d.title}
            </ChromaticShadow>
            {d.summary && (
              <RevealText
                as="p"
                text={d.summary}
                className="mt-4 max-w-2xl pl-4 text-lg text-paper/85 md:pl-6 md:text-2xl"
              />
            )}
            {d.levels?.length ? (
              <div className="mt-6 flex flex-wrap gap-2 pl-4 md:pl-6">
                {d.levels.map((lv) => (
                  <span
                    key={lv}
                    className="rounded-full border border-paper/20 px-3 py-1 text-xs text-paper/70"
                  >
                    {lv}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* CONTENUTO (light) */}
      <Section tone="light" className="py-24 md:py-32">
        <Container className="grid gap-12 md:grid-cols-[1.4fr_0.6fr]">
          <div>
            <Reveal>
              {d.body?.length ? (
                <RichText value={d.body} className="max-w-[68ch]" />
              ) : (
                <p className="max-w-[68ch] text-lg leading-relaxed text-ink/80">{d.summary}</p>
              )}
            </Reveal>

            {d.suitableFor && (
              <Reveal delay={0.05} className="mt-12">
                <p className="eyebrow text-brand-strong">A chi è adatto</p>
                <p className="mt-3 max-w-[68ch] text-lg text-ink/80">{d.suitableFor}</p>
              </Reveal>
            )}
          </div>

          {d.youWillLearn?.length ? (
            <Reveal delay={0.1} className="md:pt-1">
              <aside>
                <p className="eyebrow text-brand-strong">Cosa imparerai</p>
                <ul className="mt-4 space-y-3">
                  {d.youWillLearn.map((item) => (
                    <li key={item} className="flex gap-3 text-ink/80">
                      <span aria-hidden className="text-brand-strong">
                        ▸
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>
            </Reveal>
          ) : null}
        </Container>
      </Section>

      {/* GALLERIA (light) — solo se ci sono immagini in Sanity */}
      {gallery.length ? (
        <Section tone="light" className="pb-24 md:pb-32">
          <Container>
            <p className="eyebrow text-brand-strong">In sala</p>
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
              {gallery.map((g, i) => (
                <Reveal key={i} delay={(i % 3) * 0.05}>
                  <Tilt max={5} className="overflow-hidden rounded-lg">
                    <div className="group relative aspect-4/5 overflow-hidden rounded-lg border border-line">
                      <Image
                        src={urlFor(g).width(800).height(1000).fit("crop").quality(70).url()}
                        alt={`${d.title} — ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  </Tilt>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Marquee kinetic di transizione */}
      <Section tone="stage" className="overflow-hidden border-y border-paper/10 py-4">
        <Marquee baseVelocity={2}>
          <span className="text-display mx-6 text-2xl text-paper/12 md:mx-10 md:text-4xl">
            {d.title} · Prenota la prova ·
          </span>
        </Marquee>
      </Section>

      {/* ORARI COLLEGATI (stage) */}
      {byDay.length ? (
        <Section tone="stage" className="py-24 md:py-32">
          <Container>
            <p className="eyebrow text-brand">In orario</p>
            <h2 className="text-display mt-3" style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>
              Quando si pratica
            </h2>
            <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {byDay.map((day) => (
                <Reveal key={day.key} className="bg-ink p-5">
                  <p className="eyebrow text-paper/40">{day.long}</p>
                  <ul className="mt-3 space-y-2">
                    {day.slots.map((s) => (
                      <li key={s._id} className="flex items-baseline gap-3">
                        <span className="font-mono text-xs text-brand">{s.startTime}</span>
                        <span className="text-sm text-paper/80">
                          {s.displayTitle}
                          {s.level ? <span className="text-paper/40"> · {s.level}</span> : null}
                          {s.durationMin ? (
                            <span className="text-paper/40"> · {s.durationMin}′</span>
                          ) : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Magnetic>
                <Button asChild variant="brand" size="lg">
                  <Link href={routes.prenota}>Prenota la prova</Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild variant="outline" size="lg">
                  <Link href="/orari">Orario completo</Link>
                </Button>
              </Magnetic>
            </div>
          </Container>
        </Section>
      ) : (
        <Section tone="light" className="py-20">
          <Container className="flex flex-wrap items-center justify-between gap-6">
            <p className="text-xl">Vuoi provare {d.title}?</p>
            <div className="flex gap-3">
              <Magnetic>
                <Button asChild variant="brand" size="lg">
                  <Link href={routes.prenota}>Prenota la prova</Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild variant="outline" size="lg">
                  <Link href="/discipline">Tutte le discipline</Link>
                </Button>
              </Magnetic>
            </div>
          </Container>
        </Section>
      )}
    </main>
  );
}
