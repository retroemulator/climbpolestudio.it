import { defineField, defineType } from "sanity";

/** Articolo / news (workshop, eventi, comunicazioni). */
export const newsPost = defineType({
  name: "newsPost",
  title: "News",
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
    defineField({ name: "date", title: "Data", type: "datetime" }),
    defineField({ name: "cover", title: "Cover", type: "image", options: { hotspot: true } }),
    defineField({ name: "excerpt", title: "Estratto", type: "text", rows: 3 }),
    defineField({ name: "body", title: "Contenuto", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "published", title: "Pubblicato", type: "boolean", initialValue: false }),
  ],
  orderings: [{ name: "byDate", title: "Data (recenti)", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "date", media: "cover" } },
});
