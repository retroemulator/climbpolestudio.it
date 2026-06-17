import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <PagePlaceholder
      eyebrow="Legale"
      title="Privacy"
      intro="Informativa sul trattamento dei dati. Testo definitivo a cura del titolare."
      phase="Contenuto legale — placeholder"
    />
  );
}
