import { defineField, defineType } from "sanity";

/**
 * Giorni della settimana. Il `value` ha un prefisso numerico ("1-lun"…"6-sab")
 * così l'ordinamento dello Studio (che ordina per stringa) li mette in sequenza
 * lun→sab invece che alfabeticamente. Il prefisso viene tolto in lettura da
 * `dayCode()` (lib/site.ts), quindi sito e generazione sessioni vedono sempre
 * il codice stabile "lun"…"sab".
 */
export const WEEKDAYS = [
  { value: "1-lun", title: "Lunedì" },
  { value: "2-mar", title: "Martedì" },
  { value: "3-mer", title: "Mercoledì" },
  { value: "4-gio", title: "Giovedì" },
  { value: "5-ven", title: "Venerdì" },
  { value: "6-sab", title: "Sabato" },
] as const;

/**
 * Slot dell'orario settimanale pubblicato (§6). Funge da TEMPLATE: in Fase 10
 * una server action materializza da qui le `class_session` concrete prenotabili.
 */
export const scheduleSlot = defineType({
  name: "scheduleSlot",
  title: "Slot orario",
  type: "document",
  fields: [
    defineField({
      name: "discipline",
      title: "Disciplina",
      type: "reference",
      to: [{ type: "discipline" }],
    }),
    defineField({
      name: "displayTitle",
      title: "Titolo visualizzato",
      type: "string",
      description: 'Es. "Pole Base 2", "Cerchio", "Allenamento Libero".',
      validation: (r) => r.required(),
    }),
    defineField({ name: "level", title: "Livello", type: "string" }),
    defineField({
      name: "day",
      title: "Giorno",
      type: "string",
      options: { list: WEEKDAYS.map((d) => ({ value: d.value, title: d.title })), layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "startTime",
      title: "Ora inizio (HH:mm)",
      type: "string",
      validation: (r) => r.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/, { name: "HH:mm" }),
    }),
    defineField({ name: "durationMin", title: "Durata (min)", type: "number", initialValue: 60 }),
    defineField({
      name: "instructor",
      title: "Insegnante",
      type: "reference",
      to: [{ type: "instructor" }],
    }),
    defineField({ name: "capacity", title: "Capienza", type: "number", initialValue: 10 }),
    defineField({ name: "notes", title: "Note", type: "text", rows: 2 }),
  ],
  orderings: [
    {
      name: "byDayTime",
      title: "Giorno + ora",
      by: [
        { field: "day", direction: "asc" },
        { field: "startTime", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "displayTitle", day: "day", time: "startTime" },
    prepare: ({ title, day, time }) => {
      const label = WEEKDAYS.find((d) => d.value === day)?.title ?? day;
      return { title, subtitle: `${label ?? ""} · ${time ?? ""}` };
    },
  },
});
