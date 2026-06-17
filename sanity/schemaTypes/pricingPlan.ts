import { defineField, defineType } from "sanity";

export const PRICING_CATEGORIES = [
  { value: "iscrizione", title: "Iscrizione" },
  { value: "mensile", title: "Mensile" },
  { value: "trimestrale", title: "Trimestrale" },
  { value: "semestrale", title: "Semestrale" },
  { value: "annuale", title: "Annuale" },
  { value: "pack", title: "Pack ingressi" },
  { value: "singola", title: "Lezione singola" },
  { value: "privata", title: "Privata" },
] as const;

/** Piano/voce di listino (§6). Editabile: il cliente cambia i prezzi senza codice. */
export const pricingPlan = defineType({
  name: "pricingPlan",
  title: "Listino",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: { list: PRICING_CATEGORIES.map((c) => ({ value: c.value, title: c.title })) },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", title: "Titolo", type: "string", validation: (r) => r.required() }),
    defineField({ name: "detail", title: "Dettaglio", type: "string" }),
    defineField({ name: "price", title: "Prezzo (€)", type: "number", validation: (r) => r.min(0) }),
    defineField({
      name: "priceFrom",
      title: 'Prezzo "a partire da"',
      type: "boolean",
      description: 'Mostra "da € …" (es. lezioni private).',
      initialValue: false,
    }),
    defineField({ name: "note", title: "Note (es. rate)", type: "string" }),
    defineField({ name: "badge", title: 'Badge (es. "più scelto")', type: "string" }),
    defineField({ name: "order", title: "Ordine", type: "number" }),
  ],
  orderings: [{ name: "order", title: "Ordine", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", detail: "detail", price: "price", from: "priceFrom" },
    prepare: ({ title, detail, price, from }) => ({
      title,
      subtitle: `${detail ? detail + " · " : ""}${price != null ? (from ? "da " : "") + "€ " + price : ""}`,
    }),
  },
});
