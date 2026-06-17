import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { disciplines } from "@/lib/site";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

/** Prerendera le route delle discipline note (build-time). */
export function generateStaticParams() {
  return disciplines.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = disciplines.find((x) => x.slug === slug);
  return { title: d ? d.name : "Disciplina" };
}

export default async function DisciplinaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = disciplines.find((x) => x.slug === slug);
  if (!d) notFound();

  return (
    <PagePlaceholder
      eyebrow="Disciplina"
      title={d.name}
      intro={d.blurb}
      phase="Fase 6 — scheda disciplina"
    />
  );
}
