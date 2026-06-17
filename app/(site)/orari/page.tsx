import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Orari" };

export default function OrariPage() {
  return (
    <PagePlaceholder
      eyebrow="Quando"
      title="Orari"
      intro="La griglia settimanale interattiva, filtrabile per disciplina, giorno e livello."
      phase="Fase 7 — griglia da Sanity"
    />
  );
}
