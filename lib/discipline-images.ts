/**
 * Foto stock provvisorie per disciplina (placeholder).
 *
 * Usate come FALLBACK quando una disciplina non ha ancora `media.image` in
 * Sanity: appena il cliente carica la foto reale, questa la sostituisce in
 * automatico (zero codice). Per cambiare una stock, modifica solo l'URL qui.
 * Fonte: Unsplash (hotlink consentito); domini già in next.config.
 */
const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;

export const disciplineImage: Record<string, string> = {
  "pole-dance": u("photo-1544782905-be933d3af4f6"), // figura pole in bianco e nero
  "cerchio-aereo": u("photo-1560633000-fe7230e33194"), // cerchio aereo in contesto studio/fitness
  "functional-training": u("photo-1534258936925-c58bed479fcb"), // allenamento in sala
  flexibility: u("photo-1562771379-eafdca7a02f8"), // stretching / mobilità
  verticali: u("photo-1598266663439-2056e6900339"), // verticale / handstand
  exotic: u("photo-1616250782501-1432e1d52a33"), // floorwork
};

/** URL stock per slug, o undefined se non mappato. */
export function disciplineImageFor(slug: string): string | undefined {
  return disciplineImage[slug];
}
