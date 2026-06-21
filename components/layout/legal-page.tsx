import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { Section, Spine } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";

/**
 * Layout per le pagine legali (privacy, cookie). Hero "stage" (così la navbar
 * trasparente in cima legge su scuro, come da regola di design Fase 3) seguito
 * dal corpo "light" con la prosa dell'informativa. La prosa va passata come
 * children, di norma tramite <LegalContent sections={…} />.
 */
export function LegalPage({
  eyebrow = "Legale",
  title,
  intro,
  updated,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main>
      <Section tone="stage" className="py-28 pt-32 md:py-32">
        <Container>
          <div className="relative max-w-3xl">
            <Spine className="left-0 bg-brand/40" />
            <p className="eyebrow pl-4 text-brand md:pl-6">{eyebrow}</p>
            <ChromaticShadow
              as="h1"
              className="text-display pl-4 md:pl-6"
              style={{ fontSize: "clamp(2.5rem, 9vw, 6rem)" }}
            >
              {title}
            </ChromaticShadow>
            <p className="mt-6 max-w-2xl pl-4 text-lg text-paper/70 md:pl-6">{intro}</p>
            <p className="mt-4 pl-4 text-xs uppercase tracking-[0.2em] text-paper/40 md:pl-6">
              Ultimo aggiornamento: {updated}
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="light" className="py-20 md:py-28">
        <Container>
          <div className="legal-prose max-w-3xl">{children}</div>
        </Container>
      </Section>
    </main>
  );
}

/** Un paragrafo, con un eventuale link inline + coda di testo. */
type Para = { p: string; link?: { href: string; label: string }; tail?: string };
/** Un elenco puntato. */
type List = { ul: string[] };
type Block = Para | List;

export type LegalSection = { title: string; blocks: Block[] };

/** Link interno (Next) o esterno/mailto (<a>), scelto dall'href. */
function Anchor({ href, label }: { href: string; label: string }) {
  if (href.startsWith("/")) return <Link href={href}>{label}</Link>;
  const external = href.startsWith("http");
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {label}
    </a>
  );
}

/**
 * Renderizza l'informativa da una struttura dati. I testi vivono in stringhe JS
 * (non in testo JSX) così gli apostrofi italiani non vanno escapati a mano.
 */
export function LegalContent({ sections }: { sections: LegalSection[] }) {
  return (
    <>
      {sections.map((s, i) => (
        <section key={i}>
          <h2>{s.title}</h2>
          {s.blocks.map((b, j) =>
            "ul" in b ? (
              <ul key={j}>
                {b.ul.map((item, k) => (
                  <li key={k}>{item}</li>
                ))}
              </ul>
            ) : (
              <p key={j}>
                {b.p}
                {b.link ? <Anchor href={b.link.href} label={b.link.label} /> : null}
                {b.tail ?? null}
              </p>
            ),
          )}
        </section>
      ))}
    </>
  );
}
