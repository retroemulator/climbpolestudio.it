"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  // Focus della modale: focus su "Chiudi" all'apertura, Esc chiude, Tab confinato,
  // focus ripristinato all'elemento che l'ha aperta.
  useEffect(() => {
    if (!selected) return;
    const prev = openerRef.current ?? (document.activeElement as HTMLElement | null);
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected(null);
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const f = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])',
      );
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [selected]);

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
    "h-11 rounded-md border border-line bg-paper-pure px-3 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong";

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
          <button onClick={reset} className="inline-flex h-11 items-center px-3 text-sm text-muted-foreground hover:text-brand transition-colors">
            Azzera filtri
          </button>
        )}
        <span className="font-mono text-sm text-muted-foreground">
          {filtered.length} lezioni
        </span>
      </div>

      {/* Griglia */}
      {filtered.length ? (
        <div
          className={cn(
            "mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line",
            day === "all" ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6" : "grid-cols-1",
          )}
        >
          {byDay.map((d) => (
            <div key={d.key} className="bg-paper-pure p-4">
              <p className="eyebrow text-muted-foreground">{d.long}</p>
              <ul className="mt-3 space-y-2">
                {d.items.map((s) => (
                  <li key={s._id}>
                    <button
                      onClick={(e) => { openerRef.current = e.currentTarget; setSelected(s); }}
                      className="group flex min-h-11 w-full items-center gap-3 rounded-md px-1 py-2 text-left transition-colors hover:bg-ink/5"
                    >
                      <span className="font-mono text-sm text-brand-strong">{s.startTime}</span>
                      <span className="text-base text-ink/80 group-hover:text-ink">
                        {s.displayTitle}
                        {s.level ? <span className="text-ink/40"> · {s.level}</span> : null}
                      </span>
                    </button>
                  </li>
                ))}
                {!d.items.length && <li className="text-sm text-ink/30">—</li>}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-10 text-muted-foreground">Nessuna lezione con questi filtri.</p>
      )}

      {/* Dettaglio slot */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto bg-ink/70 p-4 backdrop-blur-sm sm:items-center"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Dettaglio ${selected.displayTitle}`}
          >
            <motion.div
              ref={dialogRef}
              className="dark flex max-h-[85dvh] w-full max-w-md flex-col overflow-y-auto rounded-lg border border-paper/15 bg-ink-soft p-6 text-paper"
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
                <button ref={closeRef} onClick={() => setSelected(null)} aria-label="Chiudi" className="-m-2 grid size-11 place-items-center text-2xl leading-none text-paper/50 hover:text-paper">
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
              </dl>
              {selected.notes && (
                <p className="mt-3 text-sm text-paper/60">{selected.notes}</p>
              )}

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
