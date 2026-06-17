import { defineField, defineType } from "sanity";

/** Disciplina (Pole Dance, Cerchio Aereo, …). Pagina `/discipline/[slug]`. */
export const discipline = defineType({
  name: "discipline",
  title: "Disciplina",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titolo", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Ordine", type: "number" }),
    defineField({ name: "summary", title: "Sommario (1 riga)", type: "text", rows: 2 }),
    defineField({
      name: "body",
      title: "Descrizione",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "levels",
      title: "Livelli",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({ name: "suitableFor", title: "A chi è adatto", type: "text", rows: 3 }),
    defineField({
      name: "youWillLearn",
      title: "Cosa imparerai",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "media",
      title: "Media principale",
      type: "object",
      fields: [
        defineField({ name: "image", title: "Immagine (poster/fallback)", type: "image", options: { hotspot: true } }),
        defineField({ name: "videoUrl", title: "URL video (opzionale)", type: "url" }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Galleria",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "accent",
      title: "Accent override (hex, opzionale)",
      type: "string",
      description: "Solo se questa disciplina deve discostarsi dal magenta di brand.",
    }),
  ],
  orderings: [{ name: "order", title: "Ordine", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "summary" } },
});
