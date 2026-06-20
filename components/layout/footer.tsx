import Link from "next/link";

import { strings } from "@/lib/strings";
import { contact, navItems, routes, whatsappUrl } from "@/lib/site";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { SocialIcons } from "@/components/brand/social-icons";

/**
 * Footer globale (brief §4): CTA di chiusura + contatti, social, orari teaser,
 * nav, legali, credit. Sempre "stage" (scuro): chiude ogni pagina sul palco.
 * Server component — nessuna interattività, dati reali da `lib/site`.
 */
export function Footer() {
  const { address } = contact;

  return (
    <footer className="dark bg-ink text-paper">
      {/* Banda CTA di chiusura */}
      <Container className="border-b border-paper/10 py-16 md:py-24">
        <p className="eyebrow text-brand">{strings.brand.payoff}</p>
        <div className="mt-4 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <h2
            className="text-display max-w-3xl"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
          >
            Ci vediamo in sala.
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="brand" size="lg">
              <Link href={routes.discipline}>Scopri le discipline</Link>
            </Button>
          </div>
        </div>
      </Container>

      {/* Griglia informativa */}
      <Container className="grid grid-cols-2 gap-8 py-14 md:grid-cols-4">
        {/* Brand + indirizzo */}
        <div className="col-span-2 md:col-span-1">
          <Logo />
          <address className="mt-4 not-italic text-sm leading-relaxed text-paper/60">
            {address.street}
            <br />
            {address.zip} {address.city}
            <br />
            {address.country}
          </address>
        </div>

        {/* Naviga */}
        <nav aria-label="Footer — pagine">
          <p className="eyebrow text-paper/40">Naviga</p>
          <ul className="mt-4 space-y-1 md:space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center text-paper/75 transition-colors hover:text-brand">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/galleria" className="inline-flex min-h-11 items-center text-paper/75 transition-colors hover:text-brand">
                Galleria
              </Link>
            </li>
            <li>
              <Link href={routes.prenota} className="inline-flex min-h-11 items-center text-paper/75 transition-colors hover:text-brand">
                {strings.nav.prenota}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contatti */}
        <div>
          <p className="eyebrow text-paper/40">Contatti</p>
          <ul className="mt-4 space-y-1 md:space-y-2 text-sm">
            <li>
              <a
                href={`tel:${contact.phoneE164}`}
                className="inline-flex min-h-11 items-center text-paper/75 transition-colors hover:text-brand"
              >
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex min-h-11 items-center text-paper/75 transition-colors hover:text-brand"
              >
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-paper/75 transition-colors hover:text-brand"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <p className="eyebrow text-paper/40">Seguici</p>
          <SocialIcons tone="dark" className="mt-4 -ml-2" />
        </div>
      </Container>

      {/* Riga legale */}
      <Container className="flex flex-col items-start justify-between gap-3 border-t border-paper/10 py-6 text-xs text-paper/40 md:flex-row md:items-center">
        <p>
          © {strings.brand.name} · {address.city}
        </p>
        <div className="flex gap-4">
          <Link href="/privacy" className="inline-flex min-h-11 items-center transition-colors hover:text-paper/70">
            Privacy
          </Link>
          <Link href="/cookie" className="inline-flex min-h-11 items-center transition-colors hover:text-paper/70">
            Cookie
          </Link>
        </div>
      </Container>
    </footer>
  );
}
