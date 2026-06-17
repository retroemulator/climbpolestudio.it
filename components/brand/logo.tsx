import Link from "next/link";

import { cn } from "@/lib/utils";
import { strings } from "@/lib/strings";

/**
 * Logo tipografico — il wordmark "CLIMB" col palo come "I" (concept Fase 0:
 * "il logo fa del palo la I di CLIMB"). Volutamente NON dipende dal PNG nero:
 * usa `currentColor`, così funziona su sezioni chiare e scure senza una
 * seconda variante asset (risolve il TODO "logo chiaro per sezioni scure").
 *
 * Resta disciplinato: niente Chromatic Shadow qui (la firma è riservata a
 * hero + titoli di sezione, brief §2). Solo la "I" in brand come micro-accento.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${strings.brand.name} — home`}
      className={cn(
        "group inline-flex items-baseline gap-[0.05em] text-current",
        "text-display text-[1.35rem] leading-none md:text-[1.5rem]",
        className,
      )}
    >
      <span aria-hidden>CL</span>
      {/* La "I" = la Spina/palo: barra verticale sottile in brand. */}
      <span
        aria-hidden
        className="mx-[0.06em] inline-block h-[0.95em] w-[0.12em] translate-y-[0.04em] bg-brand transition-transform duration-300 group-hover:scale-y-110"
      />
      <span aria-hidden>MB</span>
    </Link>
  );
}
