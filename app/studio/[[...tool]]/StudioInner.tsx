"use client";

import { NextStudio } from "next-sanity/studio";

import config from "@/sanity.config";

/**
 * Contenuto effettivo dello Studio. Caricato SOLO client-side (via dynamic
 * ssr:false in studio-loader) così la config Sanity — che usa createContext —
 * non viene mai valutata sul server (dove andrebbe in errore).
 */
export default function StudioInner() {
  return <NextStudio config={config} />;
}
