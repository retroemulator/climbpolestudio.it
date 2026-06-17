import type { StructureResolver } from "sanity/structure";

/**
 * Struttura del desk. `siteSettings` come SINGLETON (un solo documento, niente
 * lista/duplicati); il resto come liste standard.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Climb — contenuti")
    .items([
      S.listItem()
        .title("Impostazioni sito")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      ...S.documentTypeListItems().filter((li) => li.getId() !== "siteSettings"),
    ]);
