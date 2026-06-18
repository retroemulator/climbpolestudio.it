import { getDisciplines, getSchedule } from "@/sanity/lib/data";
import type { DisciplineCard, ScheduleSlot } from "@/sanity/types";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { DisciplineShowcase } from "@/components/sections/discipline-showcase";
import { WhyClimb } from "@/components/sections/why-climb";
import { SchedulePreview } from "@/components/sections/schedule-preview";
import { PricingTeaser } from "@/components/sections/pricing-teaser";
import { Location } from "@/components/sections/location";
import { RevealSection } from "@/components/motion/reveal-section";

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
  const [disciplines, schedule] = await Promise.all([
    safe<DisciplineCard[]>(getDisciplines(), []),
    safe<ScheduleSlot[]>(getSchedule(), []),
  ]);

  return (
    <main>
      <Hero disciplines={disciplines} />
      <RevealSection>
        <Manifesto />
      </RevealSection>
      <RevealSection>
        <DisciplineShowcase disciplines={disciplines} />
      </RevealSection>
      <RevealSection>
        <WhyClimb />
      </RevealSection>
      <RevealSection>
        <SchedulePreview schedule={schedule} />
      </RevealSection>
      <RevealSection>
        <PricingTeaser />
      </RevealSection>
      <RevealSection>
        <Location />
      </RevealSection>
    </main>
  );
}
