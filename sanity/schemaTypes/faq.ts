import { defineField, defineType } from "sanity";

/** Domanda frequente (FAQ). Mostrata su /chi-siamo o in fondo alle pagine. */
export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Domanda", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Risposta", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "order", title: "Ordine", type: "number" }),
  ],
  orderings: [{ name: "byOrder", title: "Ordine", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "question" } },
});
