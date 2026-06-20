import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/site";
import { strings } from "@/lib/strings";

/**
 * Placeholder di pagina (Fase 3). Esiste per dare alla navbar/footer/transizioni
 * delle rotte reali su cui girare PRIMA che le pagine vere siano costruite
 * (Fasi 6–13). Ogni pagina è un hero "stage" → la navbar trasparente in cima
 * legge sempre su scuro. Si rimpiazza una pagina alla volta nelle fasi successive.
 */
export function PagePlaceholder({
  eyebrow,
  title,
  intro,
  phase,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  phase: string;
}) {
  return (
    <main>
      <Section tone="stage" className="flex min-h-[100svh] flex-col justify-center py-32">
        <Container className="relative">
          <Spine className="left-6 bg-brand/30 md:left-10 lg:left-14" />
          <p className="eyebrow pl-3 text-brand md:pl-6">{eyebrow}</p>
          <ChromaticShadow
            as="h1"
            className="text-display mt-4 pl-3 md:pl-6"
            style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}
          >
            {title}
          </ChromaticShadow>
          {intro && (
            <p className="mt-6 max-w-2xl pl-3 text-lg text-paper/70 md:pl-6 md:text-xl">{intro}</p>
          )}
          <div className="mt-10 flex flex-wrap items-center gap-3 pl-3 md:pl-6">
            <Button asChild variant="brand" size="lg">
              <Link href={routes.prenota}>{strings.cta.prenotaProva}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">Torna alla home</Link>
            </Button>
          </div>
          <p className="mt-10 pl-3 text-xs text-paper/35 md:pl-6">
            Pagina in costruzione · {phase}
          </p>
        </Container>
      </Section>
    </main>
  );
}
