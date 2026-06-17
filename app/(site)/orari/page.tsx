import type { Metadata } from "next";

import { getSchedule } from "@/sanity/lib/data";
import type { ScheduleSlot } from "@/sanity/types";
import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { ScheduleExplorer } from "@/components/sections/schedule-explorer";

export const metadata: Metadata = {
  title: "Orari",
  description: "Orario settimanale delle lezioni di Climb Pole Studio, filtrabile per disciplina, giorno e livello.",
};

export default async function OrariPage() {
  const schedule = await getSchedule().catch(() => [] as ScheduleSlot[]);

  return (
    <main>
      <Section tone="stage" className="py-28 pt-32 md:py-32 md:pt-40">
        <Container>
          <div className="relative">
            <Spine className="left-0 bg-brand/40" />
            <p className="eyebrow pl-4 text-brand md:pl-6">Quando</p>
            <ChromaticShadow as="h1" className="text-display pl-4 md:pl-6" style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}>
              Orari
            </ChromaticShadow>
            <p className="mt-4 max-w-2xl pl-4 text-lg text-paper/70 md:pl-6">
              Tutte le lezioni della settimana. Filtra per disciplina, giorno o livello e prenota
              il tuo posto.
            </p>
          </div>

          <div className="mt-12">
            {schedule.length ? (
              <ScheduleExplorer slots={schedule} />
            ) : (
              <p className="text-paper/50">Orari in aggiornamento. Torna a trovarci a breve.</p>
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}
