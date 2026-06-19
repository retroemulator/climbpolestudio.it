import { defineField, defineType } from "sanity";

/** Testimonianza allieva/o. */
export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonianza",
  type: "document",
  fields: [
    defineField({ name: "author", title: "Autore", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", title: "Testo", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "context", title: "Contesto (es. \"Allieva Pole, da 1 anno\")", type: "string" }),
    defineField({ name: "rating", title: "Voto (1–5)", type: "number", validation: (r) => r.min(1).max(5) }),
    defineField({ name: "photo", title: "Foto (opzionale)", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "author", subtitle: "text", media: "photo" } },
});
