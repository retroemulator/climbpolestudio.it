import { defineField, defineType } from "sanity";

/**
 * Impostazioni del sito (singleton). Contatti, social, SEO default.
 * In futuro è la fonte di verità per i dati che ora stanno in `lib/site.ts`.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Impostazioni sito",
  type: "document",
  groups: [
    { name: "brand", title: "Brand", default: true },
    { name: "contatti", title: "Contatti" },
    { name: "social", title: "Social" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Nome", type: "string", group: "brand", validation: (r) => r.required() }),
    defineField({ name: "payoff", title: "Payoff", type: "string", group: "brand" }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true }, group: "brand" }),

    defineField({ name: "phone", title: "Telefono (display)", type: "string", group: "contatti" }),
    defineField({ name: "phoneE164", title: "Telefono (E.164, per tel:)", type: "string", group: "contatti" }),
    defineField({ name: "whatsapp", title: "WhatsApp (solo cifre)", type: "string", group: "contatti" }),
    defineField({ name: "email", title: "Email", type: "string", group: "contatti" }),
    defineField({
      name: "address",
      title: "Indirizzo",
      type: "object",
      group: "contatti",
      fields: [
        defineField({ name: "street", title: "Via", type: "string" }),
        defineField({ name: "zip", title: "CAP", type: "string" }),
        defineField({ name: "city", title: "Città", type: "string" }),
        defineField({ name: "country", title: "Paese", type: "string" }),
      ],
    }),
    defineField({
      name: "geo",
      title: "Coordinate (mappa)",
      type: "object",
      group: "contatti",
      fields: [
        defineField({ name: "lat", title: "Latitudine", type: "number" }),
        defineField({ name: "lng", title: "Longitudine", type: "number" }),
      ],
    }),
    defineField({
      name: "openingHours",
      title: "Orari di apertura (testo)",
      type: "array",
      of: [{ type: "string" }],
      group: "contatti",
    }),

    defineField({
      name: "socials",
      title: "Social",
      type: "array",
      group: "social",
      of: [
        defineField({
          name: "social",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Etichetta (accessibilità)", type: "string" }),
            defineField({ name: "handle", title: "Handle / nome", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
        }),
      ],
    }),

    defineField({ name: "seoTitle", title: "SEO — titolo default", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "SEO — descrizione default", type: "text", rows: 3, group: "seo" }),
    defineField({ name: "ogImage", title: "Immagine Open Graph", type: "image", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Impostazioni sito" }) },
});
