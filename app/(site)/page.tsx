import { getDisciplines, getSchedule, getTestimonials, getFaqs } from "@/sanity/lib/data";
import type { DisciplineCard, ScheduleSlot, Testimonial, Faq as FaqDoc } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import { disciplines as staticDisciplines } from "@/lib/site";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { DisciplineRail, type RailItem } from "@/components/sections/discipline-rail";
import { WhyClimb } from "@/components/sections/why-climb";
import { SchedulePreview } from "@/components/sections/schedule-preview";
import { PricingTeaser } from "@/components/sections/pricing-teaser";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Statement } from "@/components/sections/statement";
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
 * Home. Ritmo Luce/Stage + layer KINETIC (hero parallax, discipline in
 * horizontal-scroll pinnato, statement scrubbed, testimonianze, FAQ).
 * Contenuti reali da Sanity con fallback statici dove serve.
 */
export default async function Home() {
  const [disciplines, schedule, testimonials, faqs] = await Promise.all([
    safe<DisciplineCard[]>(getDisciplines(), []),
    safe<ScheduleSlot[]>(getSchedule(), []),
    safe<Testimonial[]>(getTestimonials(), []),
    safe<FaqDoc[]>(getFaqs(), []),
  ]);

  // Pannelli del rail: da Sanity (con foto se presente), altrimenti fallback statico.
  const railItems: RailItem[] = disciplines.length
    ? disciplines.map((d) => ({
        slug: d.slug,
        title: d.title,
        summary: d.summary,
        levels: d.levels,
        imageUrl: d.media?.image
          ? urlFor(d.media.image).width(1100).height(1300).fit("crop").quality(70).url()
          : undefined,
      }))
    : staticDisciplines.map((d) => ({ slug: d.slug, title: d.name, summary: d.blurb }));

  return (
    <main>
      <Hero disciplines={disciplines} />
      <RevealSection>
        <Manifesto />
      </RevealSection>

      {/* Firma KINETIC: discipline in horizontal-scroll pinnato (no RevealSection:
          il transform romperebbe lo sticky). */}
      <DisciplineRail items={railItems} />

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
        <Testimonials items={testimonials} />
      </RevealSection>

      {/* Faq ha una colonna sticky: niente RevealSection (transform). */}
      <Faq items={faqs} />

      {/* Statement scrubbed: gestisce il proprio scroll, niente RevealSection. */}
      <Statement />

      <RevealSection>
        <Location />
      </RevealSection>
    </main>
  );
}
