"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { weekdays } from "@/lib/site";
import type { ScheduleSlot } from "@/sanity/types";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

// JS getDay() (0=dom … 6=sab) → chiave giorno. Domenica (0) non c'è: studio chiuso.
const DOW_TO_KEY: Record<number, string> = { 1: "lun", 2: "mar", 3: "mer", 4: "gio", 5: "ven", 6: "sab" };

/**
 * Preview orari in home: mostra SOLO oggi + il prossimo giorno con lezioni
 * (saltando domenica e i giorni vuoti), con testi grandi. Tutto il resto sta in
 * `/orari` (CTA "Vedi tutti gli orari"). Client component perché "oggi" dipende
 * dalla data LOCALE del visitatore: così la home resta statica e l'orario è
 * sempre corretto. Prima del mount usa lunedì come base deterministica (niente
 * mismatch di hydration); a mount avvenuto compaiono le etichette Oggi/Domani.
 */
export function SchedulePreview({ schedule }: { schedule: ScheduleSlot[] }) {
  const [dow, setDow] = useState<number | null>(null);
  useEffect(() => setDow(new Date().getDay()), []);

  if (!schedule.length) return null;

  // Slot raggruppati per giorno, ordinati per orario.
  const slotsByKey = new Map<string, ScheduleSlot[]>();
  for (const s of schedule) {
    const arr = slotsByKey.get(s.day) ?? [];
    arr.push(s);
    slotsByKey.set(s.day, arr);
  }
  for (const arr of slotsByKey.values()) arr.sort((a, b) => a.startTime.localeCompare(b.startTime));

  // A partire da oggi, i primi 2 giorni (in ordine di settimana) che hanno lezioni.
  const base = dow ?? 1;
  const picked: { key: string; long: string; offset: number; slots: ScheduleSlot[] }[] = [];
  for (let offset = 0; offset < 7 && picked.length < 2; offset++) {
    const key = DOW_TO_KEY[(base + offset) % 7];
    if (!key) continue; // domenica → chiuso
    const slots = slotsByKey.get(key);
    if (!slots?.length) continue; // giorno senza lezioni → salta
    const wd = weekdays.find((w) => w.key === key);
    picked.push({ key, long: wd?.long ?? key, offset, slots });
  }

  if (!picked.length) return null;

  const labelFor = (offset: number, long: string) =>
    dow === null ? long : offset === 0 ? "Oggi" : offset === 1 ? "Domani" : long;

  return (
    <Section tone="stage" id="orari" className="py-24 md:py-36">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-brand">Quando</p>
            <ChromaticShadow as="h2" className="text-display mt-3" style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
              Prossime lezioni
            </ChromaticShadow>
          </div>
          <Button asChild variant="outline" size="lg">
            <Link href="/orari">Vedi tutti gli orari</Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-paper/10 bg-paper/10 sm:grid-cols-2">
          {picked.map((day) => {
            const label = labelFor(day.offset, day.long);
            const showSub = label !== day.long;
            return (
              <Reveal key={day.key} className="bg-ink p-6 md:p-8">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-display text-3xl md:text-4xl">{label}</p>
                  {showSub && <span className="eyebrow text-paper/40">{day.long}</span>}
                </div>
                <ul className="mt-6 divide-y divide-paper/10">
                  {day.slots.map((s) => (
                    <li key={s._id} className="group/slot flex items-baseline gap-4 py-4">
                      <span className="shrink-0 font-mono text-base text-brand md:text-lg">{s.startTime}</span>
                      <span className="text-lg text-paper/80 transition-colors group-hover/slot:text-paper md:text-xl">
                        {s.displayTitle}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
