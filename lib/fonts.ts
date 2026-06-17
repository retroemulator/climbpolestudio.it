import { Archivo, Inter, Geist_Mono } from "next/font/google";

/**
 * Tipografia (Fase 0). Tutto self-hosted da next/font (display: swap).
 *
 * Display = Archivo variable con asse `wdth` per la larghezza ESPANSA
 * (concept "estensione/allungo"). Se in build comparisse l'errore
 * «Unknown axis wdth», rimuovi `axes: ["wdth"]` qui sotto: il sito resta
 * valido, il display diventa solo a larghezza normale (perde l'espanso).
 */
export const fontDisplay = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

export const fontSans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const fontMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

/** Classe da applicare a <html> per esporre tutte le variabili font. */
export const fontVariables = `${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`;
