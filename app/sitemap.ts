import type { MetadataRoute } from "next";

import { getDisciplineSlugs } from "@/sanity/lib/data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://climbpolestudio.it";

/** Sitemap: route statiche pubbliche + schede disciplina da Sanity. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "",
    "/discipline",
    "/orari",
    "/prezzi",
    "/chi-siamo",
    "/contatti",
    "/galleria",
    "/news",
  ];

  const slugs = await getDisciplineSlugs().catch(() => [] as { slug: string }[]);

  return [
    ...staticPaths.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...slugs.map((s) => ({ url: `${SITE_URL}/discipline/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
