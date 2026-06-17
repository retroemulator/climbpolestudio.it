import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Contatti" };

export default function ContattiPage() {
  return (
    <PagePlaceholder
      eyebrow="Dove"
      title="Contatti"
      intro="Corso Dante 109/A, Torino. Scrivici su WhatsApp o vieni a trovarci in studio."
      phase="Fase 13/14 — mappa e form"
    />
  );
}
