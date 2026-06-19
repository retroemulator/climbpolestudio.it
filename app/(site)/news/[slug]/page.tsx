import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getNewsSlugs, getNewsBySlug } from "@/sanity/lib/data";
import { urlFor } from "@/sanity/lib/image";
import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { RichText } from "@/components/portable-text";

function formatDate(iso?: string) {
  if (!iso) return "";
  // Formattazione stabile (no locale runtime variabile): YYYY-MM-DD → DD.MM.YYYY
  const [y, m, d] = iso.slice(0, 10).split("-");
  return d && m && y ? `${d}.${m}.${y}` : "";
}

export async function generateStaticParams() {
  const slugs = await getNewsSlugs().catch(() => []);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsBySlug(slug).catch(() => null);
  if (!post) return { title: "News" };
  return { title: post.title, description: post.excerpt };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug).catch(() => null);
  if (!post) notFound();

  const cover = post.cover ? urlFor(post.cover).width(2000).quality(70).url() : null;

  return (
    <main>
      {/* HERO (stage) — cover Sanity se presente, altrimenti fondo scuro */}
      <Section
        tone="stage"
        className="relative flex min-h-[60vh] flex-col justify-end overflow-hidden py-20 pt-32"
      >
        <div className="absolute inset-0 overflow-hidden">
          {cover ? (
            <>
              <Image src={cover} alt={post.title} fill priority sizes="100vw" className="object-cover object-center" />
              <div aria-hidden className="absolute inset-0 bg-ink/60" />
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink via-ink/40 to-ink/30" />
            </>
          ) : (
            <div aria-hidden className="absolute inset-0 bg-ink-soft" />
          )}
        </div>
        <Container className="relative z-10">
          <div className="relative">
            <Spine className="left-0 bg-brand/40" />
            <p className="eyebrow pl-4 text-brand md:pl-6">
              News{post.date ? ` · ${formatDate(post.date)}` : ""}
            </p>
            <ChromaticShadow
              as="h1"
              className="text-display pl-4 md:pl-6"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
            >
              {post.title}
            </ChromaticShadow>
          </div>
        </Container>
      </Section>

      {/* CONTENUTO (light) */}
      <Section tone="light" className="py-20 md:py-28">
        <Container className="max-w-3xl">
          <Reveal>
            {post.excerpt ? (
              <p className="text-xl leading-relaxed text-ink/80">{post.excerpt}</p>
            ) : null}
            {post.body?.length ? (
              <RichText value={post.body} className="mt-6" />
            ) : !post.excerpt ? (
              <p className="text-lg text-ink/60">Contenuto in arrivo.</p>
            ) : null}
          </Reveal>

          <div className="mt-14 border-t border-line pt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/news">← Tutte le news</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
