import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Prezzi" };

export default function PrezziPage() {
  return (
    <PagePlaceholder
      eyebrow="Quanto"
      title="Prezzi"
      intro="Mensili, pacchetti e lezioni private. Trasparenti, senza sorprese."
      phase="Fase 8 — listino da Sanity"
    />
  );
}
