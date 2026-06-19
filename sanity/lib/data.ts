import { dayCode } from "@/lib/site";

import { sanityFetch } from "./fetch";
import {
  SETTINGS_QUERY,
  DISCIPLINES_QUERY,
  DISCIPLINE_SLUGS_QUERY,
  DISCIPLINE_BY_SLUG_QUERY,
  SCHEDULE_QUERY,
  SCHEDULE_BY_DISCIPLINE_QUERY,
  PRICING_QUERY,
  GALLERY_QUERY,
  NEWS_QUERY,
  TESTIMONIALS_QUERY,
  INSTRUCTORS_QUERY,
  FAQ_QUERY,
} from "./queries";
import type {
  SiteSettings,
  DisciplineCard,
  Discipline,
  ScheduleSlot,
  PricingPlan,
  GalleryItem,
  NewsPostCard,
  Testimonial,
  Instructor,
  Faq,
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

export async function getScheduleByDiscipline(slug: string) {
  const slots = await sanityFetch<ScheduleSlot[]>({
    query: SCHEDULE_BY_DISCIPLINE_QUERY,
    params: { slug },
    revalidate: 300,
  });
  return slots.map((s) => ({ ...s, day: dayCode(s.day) }));
}

export async function getSchedule() {
  const slots = await sanityFetch<ScheduleSlot[]>({ query: SCHEDULE_QUERY, revalidate: 300 });
  return slots.map((s) => ({ ...s, day: dayCode(s.day) }));
}

export function getPricing() {
  return sanityFetch<PricingPlan[]>({ query: PRICING_QUERY, revalidate: 300 });
}

export function getGallery() {
  return sanityFetch<GalleryItem[]>({ query: GALLERY_QUERY, revalidate: 300 });
}

export function getNews() {
  return sanityFetch<NewsPostCard[]>({ query: NEWS_QUERY, revalidate: 300 });
}

export function getTestimonials() {
  return sanityFetch<Testimonial[]>({ query: TESTIMONIALS_QUERY, revalidate: 300 });
}

export function getInstructors() {
  return sanityFetch<Instructor[]>({ query: INSTRUCTORS_QUERY, revalidate: 300 });
}

export function getFaqs() {
  return sanityFetch<Faq[]>({ query: FAQ_QUERY, revalidate: 300 });
}
