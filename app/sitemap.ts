import type { MetadataRoute } from "next";

import { getDisciplineSlugs, getNewsSlugs } from "@/sanity/lib/data";

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

  const [disciplineSlugs, newsSlugs] = await Promise.all([
    getDisciplineSlugs().catch(() => [] as { slug: string }[]),
    getNewsSlugs().catch(() => [] as { slug: string }[]),
  ]);

  return [
    ...staticPaths.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...disciplineSlugs.map((s) => ({ url: `${SITE_URL}/discipline/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...newsSlugs.map((s) => ({ url: `${SITE_URL}/news/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
