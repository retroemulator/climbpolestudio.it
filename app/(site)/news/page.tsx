import type { Metadata } from "next";

import { getNews } from "@/sanity/lib/data";
import type { NewsPostCard } from "@/sanity/types";
import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "News",
  description: "Workshop, eventi e novità di Climb Pole Studio.",
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
      <Section tone="stage" className="py-28 pt-32 md:py-32 md:pt-40">
        <Container>
          <div className="relative">
            <Spine className="left-0 bg-brand/40" />
            <p className="eyebrow pl-4 text-brand md:pl-6">Novità</p>
            <ChromaticShadow as="h1" className="text-display pl-4 md:pl-6" style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}>
              News
            </ChromaticShadow>
          </div>

          {posts.length ? (
            <ul className="mt-14 border-t border-paper/10">
              {posts.map((p, i) => (
                <Reveal key={p._id} delay={i * 0.05}>
                  <li className="flex flex-col gap-1 border-b border-paper/10 py-6 md:flex-row md:items-baseline md:gap-8">
                    <span className="font-mono text-sm text-paper/40">{formatDate(p.date)}</span>
                    <div>
                      <span className="text-display block text-2xl md:text-3xl">{p.title}</span>
                      {p.excerpt ? <span className="mt-1 block text-paper/60">{p.excerpt}</span> : null}
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          ) : (
            <p className="mt-14 max-w-xl text-paper/60">
              Nessuna news per ora. Workshop ed eventi compariranno qui.
            </p>
          )}
        </Container>
      </Section>
    </main>
  );
}
