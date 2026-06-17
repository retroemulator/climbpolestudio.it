"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { strings } from "@/lib/strings";
import { disciplines, navItems, routes } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";

/**
 * Navbar globale (brief §4). Vive sopra un hero "stage" (scuro) su ogni pagina,
 * quindi è sempre in tono chiaro (`.dark` → testo paper):
 * - in cima: trasparente, si fonde con l'hero;
 * - scrolled: vetro scuro (`bg-ink/70` + backdrop-blur) + hairline.
 * Mega-menu Discipline su desktop (hover/focus), drawer a tutto schermo su mobile.
 * Rispetta `prefers-reduced-motion`.
 */
export function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Stato "scrolled" — Lenis aggiorna comunque window.scrollY.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Chiudi tutto al cambio rotta.
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // Esc chiude; blocca lo scroll del body quando il drawer è aperto.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "dark fixed inset-x-0 top-0 z-50 text-paper transition-colors duration-300",
        scrolled
          ? "border-b border-paper/10 bg-ink/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Logo />

        {/* Navigazione desktop */}
        <nav aria-label="Principale" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.mega ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <Link
                  href={item.href}
                  aria-expanded={megaOpen}
                  aria-haspopup="true"
                  onFocus={() => setMegaOpen(true)}
                  className="navlink"
                >
                  {item.label}
                </Link>
                <AnimatePresence>
                  {megaOpen && (
                    <motion.div
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-1/2 top-full w-[min(40rem,90vw)] -translate-x-1/2 pt-3"
                    >
                      <div className="grid grid-cols-2 gap-1 rounded-lg border border-paper/10 bg-ink/95 p-3 shadow-2xl backdrop-blur-md">
                        {disciplines.map((d) => (
                          <Link
                            key={d.slug}
                            href={`/discipline/${d.slug}`}
                            className="group rounded-md p-3 transition-colors hover:bg-paper/5"
                          >
                            <span className="block font-medium text-paper transition-colors group-hover:text-brand">
                              {d.name}
                            </span>
                            <span className="mt-0.5 block text-sm text-paper/55">{d.blurb}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={item.href} href={item.href} className="navlink">
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {/* CTA desktop */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link href={routes.accedi} className="navlink">
            {strings.nav.accedi}
          </Link>
          <Button asChild variant="brand" size="sm">
            <Link href={routes.prenota}>{strings.nav.prenota}</Link>
          </Button>
        </div>

        {/* Toggle mobile */}
        <button
          type="button"
          aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="relative z-50 flex size-10 items-center justify-center lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-4 w-6">
            <span
              className={cn(
                "absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-300",
                mobileOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 block h-0.5 w-6 bg-current transition-transform duration-300",
                mobileOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "",
              )}
            />
          </span>
        </button>
      </Container>

      {/* Drawer mobile a tutto schermo */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="dark fixed inset-0 top-16 z-40 overflow-y-auto bg-ink text-paper lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-paper/10 py-4 text-2xl text-display"
                >
                  {item.label}
                </Link>
              ))}

              {/* Discipline espanse nel drawer */}
              <div className="mt-2 grid grid-cols-2 gap-2">
                {disciplines.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/discipline/${d.slug}`}
                    className="eyebrow rounded-md border border-paper/10 px-3 py-3 text-paper/70"
                  >
                    {d.name}
                  </Link>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Button asChild variant="brand" size="lg">
                  <Link href={routes.prenota}>{strings.nav.prenota}</Link>
                </Button>
                <Link href={routes.accedi} className="navlink text-center">
                  {strings.nav.accedi}
                </Link>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
