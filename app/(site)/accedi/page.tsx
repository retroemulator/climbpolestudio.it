import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Accedi",
  // Pagina funzionale di login (dati personali): fuori dall'indice.
  robots: { index: false, follow: true },
};

export default async function AccediPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  // Se già loggato → area personale.
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) redirect("/area");
  }

  // Messaggio d'errore propagato da /auth/callback (link scaduto/già usato).
  const { error } = await searchParams;

  return (
    <main>
      <Section tone="stage" className="flex min-h-[80vh] items-center py-28 pt-32">
        <Container>
          <div className="relative max-w-xl">
            <Spine className="left-0 bg-brand/40" />
            <p className="eyebrow pl-4 text-brand md:pl-6">Area personale</p>
            <ChromaticShadow
              as="h1"
              className="text-display pl-4 md:pl-6"
              style={{ fontSize: "clamp(3rem, 11vw, 7rem)" }}
            >
              Accedi
            </ChromaticShadow>
            <div className="mt-8 pl-4 md:pl-6">
              {error && (
                <p
                  role="alert"
                  className="mb-5 max-w-sm rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                  {error}
                </p>
              )}
              <AuthForm />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
