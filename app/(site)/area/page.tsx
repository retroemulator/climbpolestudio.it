import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/(site)/accedi/actions";
import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Area personale", robots: { index: false } };

type BookingRow = {
  id: string;
  status: string;
  class_session: { title: string; starts_at: string; level: string | null } | null;
};

export default async function AreaPage() {
  if (!isSupabaseConfigured) {
    return (
      <main>
        <Section tone="stage" className="flex min-h-[70vh] items-center py-28 pt-32">
          <Container>
            <ChromaticShadow as="h1" className="text-display" style={{ fontSize: "clamp(2.5rem, 9vw, 6rem)" }}>
              Area personale
            </ChromaticShadow>
            <p className="mt-4 max-w-xl text-paper/70">
              L&apos;area personale e le prenotazioni online sono in fase di attivazione.
            </p>
          </Container>
        </Section>
      </main>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/accedi");

  const { data } = await supabase
    .from("booking")
    .select("id, status, class_session(title, starts_at, level)")
    .neq("status", "cancelled");
  const bookings = ((data as BookingRow[] | null) ?? []).sort((a, b) =>
    (a.class_session?.starts_at ?? "").localeCompare(b.class_session?.starts_at ?? ""),
  );

  return (
    <main>
      <Section tone="stage" className="py-28 pt-32 md:py-32">
        <Container>
          <div className="relative">
            <Spine className="left-0 bg-brand/40" />
            <p className="eyebrow pl-4 text-brand md:pl-6">{user.email}</p>
            <ChromaticShadow as="h1" className="text-display pl-4 md:pl-6" style={{ fontSize: "clamp(2.5rem, 9vw, 6rem)" }}>
              Le tue lezioni
            </ChromaticShadow>
          </div>

          <div className="mt-12 pl-4 md:pl-6">
            {bookings.length ? (
              <ul className="divide-y divide-paper/10 border-y border-paper/10">
                {bookings.map((b) => (
                  <li key={b.id} className="flex items-center justify-between gap-4 py-4">
                    <span className="text-paper/85">{b.class_session?.title ?? "Lezione"}</span>
                    <span className="font-mono text-sm text-paper/50">{b.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-paper/60">Non hai ancora prenotazioni. Dai un&apos;occhiata agli orari.</p>
            )}

            <div className="mt-8 flex gap-3">
              <Button asChild variant="brand" size="lg">
                <a href="/orari">Prenota una lezione</a>
              </Button>
              <form action={signOut}>
                <Button type="submit" variant="outline" size="lg">
                  Esci
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
