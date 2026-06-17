import { sanityFetch } from "./fetch";
import {
  SETTINGS_QUERY,
  DISCIPLINES_QUERY,
  DISCIPLINE_SLUGS_QUERY,
  DISCIPLINE_BY_SLUG_QUERY,
  SCHEDULE_QUERY,
  SCHEDULE_BY_DISCIPLINE_QUERY,
  PRICING_QUERY,
} from "./queries";
import type {
  SiteSettings,
  DisciplineCard,
  Discipline,
  ScheduleSlot,
  PricingPlan,
} from "../types";

/** Getter tipizzati usati dai Server Component. ISR ~5 min. */

export function getSettings() {
  return sanityFetch<SiteSettings | null>({ query: SETTINGS_QUERY, revalidate: 300 });
}

export function getDisciplines() {
  return sanityFetch<DisciplineCard[]>({ query: DISCIPLINES_QUERY, revalidate: 300 });
}

export function getDisciplineSlugs() {
  return sanityFetch<{ slug: string }[]>({ query: DISCIPLINE_SLUGS_QUERY, revalidate: 3600 });
}

export function getDisciplineBySlug(slug: string) {
  return sanityFetch<Discipline | null>({
    query: DISCIPLINE_BY_SLUG_QUERY,
    params: { slug },
    revalidate: 300,
  });
}

export function getScheduleByDiscipline(slug: string) {
  return sanityFetch<ScheduleSlot[]>({
    query: SCHEDULE_BY_DISCIPLINE_QUERY,
    params: { slug },
    revalidate: 300,
  });
}

export function getSchedule() {
  return sanityFetch<ScheduleSlot[]>({ query: SCHEDULE_QUERY, revalidate: 300 });
}

export function getPricing() {
  return sanityFetch<PricingPlan[]>({ query: PRICING_QUERY, revalidate: 300 });
}
