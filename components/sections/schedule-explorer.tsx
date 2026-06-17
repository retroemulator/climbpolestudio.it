"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { weekdays, routes } from "@/lib/site";
import type { ScheduleSlot } from "@/sanity/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * Griglia orari interattiva (Fase 7): filtri disciplina/giorno/livello + click
 * su uno slot → pannello di dettaglio con CTA Prenota. Tutto client-side sui
 * dati già caricati (nessun refetch). Accessibile: select native, Esc chiude.
 */
export function ScheduleExplorer({ slots }: { slots: ScheduleSlot[] }) {
  const reduce = useReducedMotion();
  const [discipline, setDiscipline] = useState("all");
  const [day, setDay] = useState("all");
  const [level, setLevel] = useState("all");
  const [selected, setSelected] = useState<ScheduleSlot | null>(null);

  const disciplineOptions = useMemo(
    () => Array.from(new Set(slots.map((s) => s.discipline?.title).filter(Boolean))) as string[],
    [slots],
  );
  const levelOptions = useMemo(
    () => Array.from(new Set(slots.map((s) => s.level).filter(Boolean))) as string[],
    [slots],
  );

  const filtered = slots.filter(
    (s) =>
      (discipline === "all" || s.discipline?.title === discipline) &&
      (day === "all" || s.day === day) &&
      (level === "all" || s.level === level),
  );

  const byDay = weekdays
    .map((wd) => ({ ...wd, items: filtered.filter((s) => s.day === wd.key) }))
    .filter((wd) => (day === "all" ? true : wd.key === day));

  const reset = () => {
    setDiscipline("all");
    setDay("all");
    setLevel("all");
  };

  const selectClass =
    "h-11 rounded-md border border-paper/20 bg-ink px-3 text-sm text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand";

  return (
    <div>
      {/* Filtri */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="sr-only" htmlFor="f-disc">
          Filtra per disciplina
        </label>
        <select id="f-disc" className={selectClass} value={discipline} onChange={(e) => setDiscipline(e.target.value)}>
          <option value="all">Tutte le discipline</option>
          {disciplineOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="f-day">
          Filtra per giorno
        </label>
        <select id="f-day" className={selectClass} value={day} onChange={(e) => setDay(e.target.value)}>
          <option value="all">Tutti i giorni</option>
          {weekdays.map((w) => (
            <option key={w.key} value={w.key}>
              {w.long}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="f-level">
          Filtra per livello
        </label>
        <select id="f-level" className={selectClass} value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="all">Tutti i livelli</option>
          {levelOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>

        {(discipline !== "all" || day !== "all" || level !== "all") && (
          <button onClick={reset} className="navlink text-paper/60">
            Azzera filtri
          </button>
        )}
        <span className="ml-auto font-mono text-sm text-paper/40">{filtered.length} lezioni</span>
      </div>

      {/* Griglia */}
      {filtered.length ? (
        <div
          className={cn(
            "mt-8 grid gap-px overflow-hidden rounded-lg border border-paper/10 bg-paper/10",
            day === "all" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1",
          )}
        >
          {byDay.map((d) => (
            <div key={d.key} className="bg-ink p-4">
              <p className="eyebrow text-paper/40">{d.long}</p>
              <ul className="mt-3 space-y-2">
                {d.items.map((s) => (
                  <li key={s._id}>
                    <button
                      onClick={() => setSelected(s)}
                      className="group flex w-full items-baseline gap-3 rounded-md py-1.5 text-left transition-colors hover:bg-paper/5"
                    >
                      <span className="font-mono text-xs text-brand">{s.startTime}</span>
                      <span className="text-sm text-paper/80 group-hover:text-paper">
                        {s.displayTitle}
                        {s.level ? <span className="text-paper/40"> · {s.level}</span> : null}
                      </span>
                    </button>
                  </li>
                ))}
                {!d.items.length && <li className="text-sm text-paper/30">—</li>}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-10 text-paper/50">Nessuna lezione con questi filtri.</p>
      )}

      {/* Dettaglio slot */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/70 p-4 backdrop-blur-sm sm:items-center"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Dettaglio ${selected.displayTitle}`}
          >
            <motion.div
              className="dark w-full max-w-md rounded-lg border border-paper/15 bg-ink-soft p-6 text-paper"
              initial={reduce ? false : { y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { y: 24, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-brand">
                    {weekdays.find((w) => w.key === selected.day)?.long} · {selected.startTime}
                  </p>
                  <h3 className="text-display mt-2 text-3xl">{selected.displayTitle}</h3>
                </div>
                <button onClick={() => setSelected(null)} aria-label="Chiudi" className="text-2xl text-paper/50 hover:text-paper">
                  ×
                </button>
              </div>

              <dl className="mt-5 space-y-2 text-sm">
                {selected.discipline && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-paper/50">Disciplina</dt>
                    <dd>
                      <Link href={`/discipline/${selected.discipline.slug}`} className="text-brand hover:underline">
                        {selected.discipline.title}
                      </Link>
                    </dd>
                  </div>
                )}
                {selected.level && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-paper/50">Livello</dt>
                    <dd>{selected.level}</dd>
                  </div>
                )}
                {selected.durationMin && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-paper/50">Durata</dt>
                    <dd>{selected.durationMin} min</dd>
                  </div>
                )}
                {selected.instructor?.name && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-paper/50">Insegnante</dt>
                    <dd>{selected.instructor.name}</dd>
                  </div>
                )}
                {selected.notes && <p className="pt-2 text-paper/60">{selected.notes}</p>}
              </dl>

              <Button asChild variant="brand" size="lg" className="mt-6 w-full">
                <Link href={routes.prenota}>Prenota questa lezione</Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
