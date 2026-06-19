import Link from "next/link";

import { weekdays } from "@/lib/site";
import type { ScheduleSlot } from "@/sanity/types";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

/**
 * Preview orari (stage): la griglia settimanale reale (da Sanity), compatta.
 * La versione interattiva con filtri arriva in `/orari` (Fase 7).
 */
export function SchedulePreview({ schedule }: { schedule: ScheduleSlot[] }) {
  if (!schedule.length) return null;

  const byDay = weekdays.map((wd) => ({
    ...wd,
    slots: schedule
      .filter((s) => s.day === wd.key)
      .sort((a, b) => a.startTime.localeCompare(b.startTime)),
  }));

  return (
    <Section tone="stage" id="orari" className="py-24 md:py-36">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-brand">Quando</p>
            <ChromaticShadow as="h2" className="text-display mt-3" style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
              Orari
            </ChromaticShadow>
          </div>
          <Button asChild variant="outline" size="lg">
            <Link href="/orari">Vedi tutti gli orari</Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-paper/10 bg-paper/10 md:grid-cols-3 lg:grid-cols-6">
          {byDay.map((day) => (
            <Reveal key={day.key} className="bg-ink p-4 transition-colors duration-300 hover:bg-ink-soft">
              <p className="eyebrow text-paper/40">{day.short}</p>
              <ul className="mt-3 space-y-3">
                {day.slots.map((s) => (
                  <li key={s._id} className="group/slot leading-tight">
                    <span className="block font-mono text-xs text-brand">{s.startTime}</span>
                    <span className="block text-sm text-paper/70 transition-colors group-hover/slot:text-paper">
                      {s.displayTitle}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
