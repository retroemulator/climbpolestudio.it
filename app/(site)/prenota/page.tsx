import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Prenota la prova" };

export default function PrenotaPage() {
  return (
    <PagePlaceholder
      eyebrow="Inizia"
      title="Prenota"
      intro="Scegli la lezione, accedi e blocca il tuo posto. Controllo capienza in tempo reale."
      phase="Fase 10 — flusso di prenotazione"
    />
  );
}
