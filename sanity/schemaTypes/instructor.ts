import { defineField, defineType } from "sanity";

/** Insegnante / staff. */
export const instructor = defineType({
  name: "instructor",
  title: "Insegnante",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Ruolo", type: "string" }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 4 }),
    defineField({ name: "photo", title: "Foto", type: "image", options: { hotspot: true } }),
    defineField({
      name: "disciplines",
      title: "Discipline",
      type: "array",
      of: [{ type: "reference", to: [{ type: "discipline" }] }],
    }),
    defineField({
      name: "socials",
      title: "Social",
      type: "array",
      of: [
        defineField({
          name: "social",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Etichetta", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
        }),
      ],
    }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
