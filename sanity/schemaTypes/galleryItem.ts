import { defineField, defineType } from "sanity";

/** Elemento galleria (foto o video curato). */
export const galleryItem = defineType({
  name: "galleryItem",
  title: "Galleria",
  type: "document",
  fields: [
    defineField({
      name: "type",
      title: "Tipo",
      type: "string",
      options: { list: [{ value: "photo", title: "Foto" }, { value: "video", title: "Video" }], layout: "radio" },
      initialValue: "photo",
      validation: (r) => r.required(),
    }),
    defineField({ name: "image", title: "Immagine (foto o poster del video)", type: "image", options: { hotspot: true } }),
    defineField({
      name: "videoUrl",
      title: "URL video",
      type: "url",
      hidden: ({ parent }) => parent?.type !== "video",
    }),
    defineField({ name: "caption", title: "Didascalia", type: "string" }),
    defineField({
      name: "disciplineTag",
      title: "Disciplina",
      type: "reference",
      to: [{ type: "discipline" }],
    }),
    defineField({ name: "order", title: "Ordine", type: "number" }),
  ],
  orderings: [{ name: "order", title: "Ordine", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "caption", subtitle: "type", media: "image" } },
});
