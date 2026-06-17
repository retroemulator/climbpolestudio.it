import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Accedi" };

export default function AccediPage() {
  return (
    <PagePlaceholder
      eyebrow="Area personale"
      title="Accedi"
      intro="Accesso con magic link. Gestisci le tue prenotazioni e il tuo profilo."
      phase="Fase 9 — auth Supabase"
    />
  );
}
