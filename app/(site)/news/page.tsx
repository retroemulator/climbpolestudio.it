import type { Metadata } from "next";
import Link from "next/link";

import { getNews } from "@/sanity/lib/data";
import type { NewsPostCard } from "@/sanity/types";
import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "News",
  description: "Workshop, eventi e novità di Climb Pole Studio.",
  alternates: { canonical: "/news" },
};

function formatDate(iso?: string) {
  if (!iso) return "";
  // Formattazione stabile (no locale runtime variabile): YYYY-MM-DD → DD.MM.YYYY
  const [y, m, d] = iso.slice(0, 10).split("-");
  return d && m && y ? `${d}.${m}.${y}` : "";
}

export default async function NewsPage() {
  const posts = await getNews().catch(() => [] as NewsPostCard[]);

  return (
    <main>
      {/* HERO (stage) — navbar leggibile su scuro */}
      <Section tone="stage" className="py-24 pt-32 md:py-28 md:pt-40">
        <Container>
          <div className="relative">
            <Spine className="left-0 bg-brand/40" />
            <p className="eyebrow pl-4 text-brand md:pl-6">Novità</p>
            <ChromaticShadow as="h1" className="text-display pl-4 md:pl-6" style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}>
              News
            </ChromaticShadow>
          </div>
        </Container>
      </Section>

      {/* LISTA (light) — più leggibile dello sfondo scuro */}
      <Section tone="light" className="py-16 md:py-24">
        <Container>
          {posts.length ? (
            <ul className="border-t border-line">
              {posts.map((p, i) => (
                <Reveal key={p._id} delay={i * 0.05}>
                  <li className="border-b border-line">
                    <Link
                      href={`/news/${p.slug}`}
                      className="group flex flex-col gap-1 py-6 md:flex-row md:items-baseline md:gap-8"
                    >
                      <span className="font-mono text-sm text-muted-foreground">{formatDate(p.date)}</span>
                      <div className="max-w-2xl">
                        <h2 className="text-display block text-2xl text-ink transition-colors group-hover:text-brand-strong md:text-3xl">
                          {p.title}
                        </h2>
                        {p.excerpt ? (
                          <span className="mt-1 block text-muted-foreground">{p.excerpt}</span>
                        ) : null}
                      </div>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ul>
          ) : (
            <p className="max-w-xl text-muted-foreground">
              Nessuna news per ora. Workshop ed eventi compariranno qui.
            </p>
          )}
        </Container>
      </Section>
    </main>
  );
}
