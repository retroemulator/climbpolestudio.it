import { sanityFetch } from "./fetch";
import {
  SETTINGS_QUERY,
  DISCIPLINES_QUERY,
  SCHEDULE_QUERY,
  PRICING_QUERY,
} from "./queries";
import type { SiteSettings, DisciplineCard, ScheduleSlot, PricingPlan } from "../types";

/** Getter tipizzati usati dai Server Component. ISR ~5 min. */

export function getSettings() {
  return sanityFetch<SiteSettings | null>({ query: SETTINGS_QUERY, revalidate: 300 });
}

export function getDisciplines() {
  return sanityFetch<DisciplineCard[]>({ query: DISCIPLINES_QUERY, revalidate: 300 });
}

export function getSchedule() {
  return sanityFetch<ScheduleSlot[]>({ query: SCHEDULE_QUERY, revalidate: 300 });
}

export function getPricing() {
  return sanityFetch<PricingPlan[]>({ query: PRICING_QUERY, revalidate: 300 });
}
