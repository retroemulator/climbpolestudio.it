import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Cookie" };

export default function CookiePage() {
  return (
    <PagePlaceholder
      eyebrow="Legale"
      title="Cookie"
      intro="Informativa sui cookie e sulle preferenze. Testo definitivo a cura del titolare."
      phase="Contenuto legale — placeholder"
    />
  );
}
