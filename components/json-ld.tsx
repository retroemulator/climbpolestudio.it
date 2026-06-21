/**
 * Helper generico per emettere un blocco JSON-LD (schema.org) in pagina.
 * Lo `StructuredData` globale resta in `structured-data.tsx`; questo serve agli
 * schema per-pagina (BlogPosting, Course, BreadcrumbList).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
