import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "./client";

const builder = imageUrlBuilder(client);

/** Helper per URL immagini responsive (es. `urlFor(img).width(1200).url()`). */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
