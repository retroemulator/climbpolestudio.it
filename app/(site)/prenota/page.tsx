import type { Metadata } from "next";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { whatsappUrl } from "@/lib/site";
import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Button } from "@/components/ui/button";
import { BookingList, type SessionRow } from "@/components/booking-list";

export const metadata: Metadata = {
  title: "Prenota la prova",
  description:
    "Prenota la tua prova gratuita a Climb Pole Studio, Torino: scegli la lezione e scrivici su WhatsApp. Pole, aeree e movimento per ogni livello.",
};

export default async function PrenotaPage() {
  let sessions: SessionRow[] = [];
  if (isSupabaseConfigured) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("class_session")
        .select("id, title, level, starts_at, capacity")
        .gte("starts_at", new Date().toISOString())
        .order("starts_at", { ascending: true })
        .limit(50);
      sessions = (data as SessionRow[] | null) ?? [];
    } catch {
      sessions = [];
    }
  }

  return (
    <main>
      <Section tone="stage" className="py-28 pt-32 md:py-32">
        <Container>
          <div className="relative">
            <Spine className="left-0 bg-brand/40" />
            <p className="eyebrow pl-4 text-brand md:pl-6">Inizia</p>
            <ChromaticShadow as="h1" className="text-display pl-4 md:pl-6" style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}>
              Prenota
            </ChromaticShadow>
          </div>

          <div className="mt-12 max-w-2xl pl-4 md:pl-6">
            {isSupabaseConfigured ? (
              <BookingList sessions={sessions} />
            ) : (
              <div>
                <p className="text-lg text-paper/75">
                  Le prenotazioni online stanno per essere attivate. Nel frattempo, prenota la tua
                  prova gratuita in un attimo su WhatsApp: ti rispondiamo noi.
                </p>
                <Button asChild variant="brand" size="lg" className="mt-6">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    Prenota su WhatsApp
                  </a>
                </Button>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}
