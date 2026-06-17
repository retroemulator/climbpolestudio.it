import { getDisciplines, getSchedule, getPricing } from "@/sanity/lib/data";
import type { DisciplineCard, ScheduleSlot, PricingPlan } from "@/sanity/types";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { DisciplineShowcase } from "@/components/sections/discipline-showcase";
import { WhyClimb } from "@/components/sections/why-climb";
import { SchedulePreview } from "@/components/sections/schedule-preview";
import { PricingTeaser } from "@/components/sections/pricing-teaser";
import { Location } from "@/components/sections/location";

/** Se Sanity non è raggiungibile, la home rende comunque (sezioni vuote → null). */
async function safe<T>(p: Promise<T>, fallback: T): Promise<T> {
  try {
    return await p;
  } catch {
    return fallback;
  }
}

/**
 * Home (Fase 5). Ritmo Luce/Stage: hero(stage) → manifesto(light) →
 * discipline(stage) → perché(light) → orari(stage) → prezzi(light) → dove(stage).
 * Contenuti reali da Sanity (discipline, orari, listino).
 */
export default async function Home() {
  const [disciplines, schedule, pricing] = await Promise.all([
    safe<DisciplineCard[]>(getDisciplines(), []),
    safe<ScheduleSlot[]>(getSchedule(), []),
    safe<PricingPlan[]>(getPricing(), []),
  ]);

  return (
    <main>
      <Hero disciplines={disciplines} />
      <Manifesto />
      <DisciplineShowcase disciplines={disciplines} />
      <WhyClimb />
      <SchedulePreview schedule={schedule} />
      <PricingTeaser pricing={pricing} />
      <Location />
    </main>
  );
}
