import { defineField, defineType } from "sanity";

/** Giorni della settimana (chiave stabile + etichetta + ordine). */
export const WEEKDAYS = [
  { value: "lun", title: "Lunedì" },
  { value: "mar", title: "Martedì" },
  { value: "mer", title: "Mercoledì" },
  { value: "gio", title: "Giovedì" },
  { value: "ven", title: "Venerdì" },
  { value: "sab", title: "Sabato" },
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
