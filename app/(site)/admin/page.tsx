import type { Metadata } from "next";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };

/**
 * Admin minimale (Fase 12). Contenuti (corsi/orari/prezzi) si gestiscono in
 * Sanity Studio; qui la sola lettura delle prenotazioni per gli admin.
 */
export default async function AdminPage() {
  const notAuthorized = (
    <Section tone="stage" className="flex min-h-[70vh] items-center py-28 pt-32">
      <Container>
        <h1 className="text-display" style={{ fontSize: "clamp(2rem, 7vw, 4rem)" }}>
          Accesso riservato
        </h1>
        <p className="mt-4 text-paper/70">Questa area è riservata allo staff.</p>
        <Button asChild variant="brand" size="lg" className="mt-6">
          <a href="/accedi">Accedi</a>
        </Button>
      </Container>
    </Section>
  );

  if (!isSupabaseConfigured) return <main>{notAuthorized}</main>;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return <main>{notAuthorized}</main>;

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") return <main>{notAuthorized}</main>;

  const { count } = await supabase.from("booking").select("*", { count: "exact", head: true });

  return (
    <main>
      <Section tone="stage" className="py-28 pt-32 md:py-32">
        <Container>
          <p className="eyebrow text-brand">Staff</p>
          <h1 className="text-display mt-3" style={{ fontSize: "clamp(2rem, 7vw, 4rem)" }}>
            Pannello
          </h1>
          <p className="mt-4 text-paper/70">Prenotazioni totali: {count ?? 0}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="brand" size="lg">
              <a href="/studio" target="_blank" rel="noopener noreferrer">
                Gestisci contenuti (Studio)
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/orari">Vedi orari</a>
            </Button>
          </div>
          <p className="mt-6 max-w-xl text-sm text-paper/50">
            Corsi, orari e prezzi si modificano in Sanity Studio. Le sessioni prenotabili si
            generano dallo schedule con <code>npm run generate-sessions</code> (o cron).
          </p>
        </Container>
      </Section>
    </main>
  );
}
