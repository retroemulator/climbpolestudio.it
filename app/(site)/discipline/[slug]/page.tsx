import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { routes, weekdays } from "@/lib/site";
import { getDisciplineSlugs, getDisciplineBySlug, getScheduleByDiscipline } from "@/sanity/lib/data";
import { urlFor } from "@/sanity/lib/image";
import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { Media } from "@/components/media/media";
import { Button } from "@/components/ui/button";
import { RichText } from "@/components/portable-text";

/** Foto stock di fallback finché una disciplina non ha un'immagine in Sanity. */
const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=2000&q=70";

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
  return { title: d.title, description: d.summary };
}

export default async function DisciplinaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [d, slots] = await Promise.all([
    getDisciplineBySlug(slug).catch(() => null),
    getScheduleByDiscipline(slug).catch(() => []),
  ]);
  if (!d) notFound();

  const heroSrc = d.media?.image
    ? urlFor(d.media.image).width(2000).quality(70).url()
    : FALLBACK_IMG;

  const byDay = weekdays
    .map((wd) => ({ ...wd, slots: slots.filter((s) => s.day === wd.key) }))
    .filter((wd) => wd.slots.length);

  return (
    <main>
      {/* HERO (stage) */}
      <Section
        tone="stage"
        className="relative flex min-h-[70vh] flex-col justify-end overflow-hidden py-20 pt-32"
      >
        <div className="absolute inset-0">
          <Media image={{ src: heroSrc, alt: d.title }} videoUrl={d.media?.videoUrl} overlay priority />
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
            {d.body?.length ? (
              <RichText value={d.body} />
            ) : (
              <p className="text-lg leading-relaxed text-ink/80">{d.summary}</p>
            )}

            {d.suitableFor && (
              <div className="mt-12">
                <p className="eyebrow text-brand-strong">A chi è adatto</p>
                <p className="mt-3 text-lg text-ink/80">{d.suitableFor}</p>
              </div>
            )}
          </div>

          {d.youWillLearn?.length ? (
            <aside className="md:pt-1">
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
          ) : null}
        </Container>
      </Section>

      {/* ORARI COLLEGATI (stage) */}
      {byDay.length ? (
        <Section tone="stage" className="py-24 md:py-32">
          <Container>
            <p className="eyebrow text-brand">In orario</p>
            <h2 className="text-display mt-3" style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>
              Quando si pratica
            </h2>
            <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-3">
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
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="brand" size="lg">
                <Link href={routes.prenota}>Prenota la prova</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/orari">Orario completo</Link>
              </Button>
            </div>
          </Container>
        </Section>
      ) : (
        <Section tone="light" className="py-20">
          <Container className="flex flex-wrap items-center justify-between gap-6">
            <p className="text-xl">Vuoi provare {d.title}?</p>
            <div className="flex gap-3">
              <Button asChild variant="brand" size="lg">
                <Link href={routes.prenota}>Prenota la prova</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/discipline">Tutte le discipline</Link>
              </Button>
            </div>
          </Container>
        </Section>
      )}
    </main>
  );
}
