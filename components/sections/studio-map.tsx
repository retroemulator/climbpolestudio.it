import { cn } from "@/lib/utils";

/**
 * StudioMap — "locator" on-brand animato che sostituisce il placeholder mappa.
 * 100% CSS (vedi globals.css §STUDIO MAP) → componente server, zero JS bundle.
 * Effetto: griglia "strade" sfumata + avenue diagonali + radar rotante + anelli
 * che si propagano da un pin luminoso. Cliccabile → Google Maps reale.
 *
 * `tone`: "stage" (su fondo scuro, glow electric) | "light" (su fondo chiaro,
 * magenta brand-strong). Con prefers-reduced-motion tutto degrada a statico.
 */
type StudioMapProps = {
  href: string;
  /** Indirizzo mostrato sul tag in alto a sinistra. */
  address: { street: string; cityLine: string };
  tone?: "stage" | "light";
  label?: string;
  className?: string;
};

export function StudioMap({
  href,
  address,
  tone = "stage",
  label = "Apri in Maps",
  className,
}: StudioMapProps) {
  const stage = tone === "stage";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${address.street}, ${address.cityLine} — apri in Google Maps`}
      className={cn(
        "group relative block aspect-4/3 w-full select-none overflow-hidden rounded-lg border transition-[transform,box-shadow] duration-500 will-change-transform hover:-translate-y-0.5",
        stage
          ? "studio-map--stage border-paper/10 bg-linear-to-br from-ink-soft to-ink hover:shadow-[0_18px_60px_-20px_var(--color-electric)]"
          : "studio-map--light border-line bg-linear-to-br from-paper to-secondary hover:shadow-[0_18px_60px_-24px_var(--color-brand-strong)]",
        className,
      )}
    >
      {/* Griglia "strade" sfumata ai bordi */}
      <div aria-hidden className="studio-map__grid absolute inset-0" />

      {/* Avenue principali (due diagonali che si incrociano sul pin) */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-px w-[160%] -translate-x-1/2 -translate-y-1/2 rotate-[27deg]"
        style={{ background: "var(--cps-road)" }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-px w-[160%] -translate-x-1/2 -translate-y-1/2 -rotate-[57deg] opacity-70"
        style={{ background: "var(--cps-road)" }}
      />

      {/* Radar sweep rotante (wrapper centra, l'inner ruota sul proprio centro) */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="studio-map__sweep absolute inset-0 rounded-full opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Anelli radar che si propagano dal pin */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 aspect-square w-[62%] -translate-x-1/2 -translate-y-1/2"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="studio-map__ring absolute inset-0 rounded-full"
            style={{ animationDelay: `${i * 1.2}s` }}
          />
        ))}
      </div>

      {/* Pin luminoso (wrapper centra, l'inner pulsa) */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
      >
        <span
          className="studio-map__pin block size-3.5 rounded-full"
          style={{ background: "var(--cps-pin-core)", outline: "3px solid var(--cps-pin)" }}
        />
      </div>

      {/* Tag indirizzo (in alto a sx, fluttua piano) */}
      <div className="studio-map__tag absolute left-4 top-4 z-10 max-w-[80%]">
        <span
          className={cn(
            "eyebrow inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.6rem] backdrop-blur-sm",
            stage
              ? "border-paper/15 bg-ink/40 text-paper/80"
              : "border-line bg-paper-pure/70 text-ink/80",
          )}
        >
          <span
            className="size-1.5 rounded-full"
            style={{ background: "var(--cps-pin)" }}
          />
          {address.street}
        </span>
      </div>

      {/* CTA in basso a dx, freccia che scatta in hover */}
      <span
        className={cn(
          "eyebrow absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 text-[0.65rem] transition-colors",
          stage ? "text-paper/70 group-hover:text-electric" : "text-brand-strong",
        )}
      >
        {label}
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </a>
  );
}
