import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * StudioMap — mappa reale dello studio (immagine statica da OpenStreetMap,
 * © OpenStreetMap contributors) brandizzata, con un "radar" on-brand
 * sovrapposto: sweep rotante + anelli che si propagano + pin luminoso + alone,
 * sopra le strade vere. L'intera card è un link a Google Maps.
 *
 * Perché statica e non un iframe: l'embed cross-origin non carica le tile in
 * modo affidabile (e con Lenis gli iframe sono comunque non interattivi). Una
 * PNG same-origin si filtra/colora in modo coerente e rende identica ovunque.
 *
 * Overlay 100% CSS (vedi globals.css §STUDIO MAP) → componente server, zero JS.
 * `tone`: "stage" (fondo scuro → mappa invertita scura + glow electric) |
 * "light" (fondo chiaro → mappa chiara + magenta brand-strong). Con
 * prefers-reduced-motion le animazioni si fermano ma la mappa resta visibile.
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
          ? "studio-map--stage border-paper/10 bg-ink hover:shadow-[0_18px_60px_-20px_var(--color-electric)]"
          : "studio-map--light border-line bg-secondary hover:shadow-[0_18px_60px_-24px_var(--color-brand-strong)]",
        className,
      )}
    >
      {/* Mappa reale (base) — filtrata on-brand per il tono */}
      <div aria-hidden className="studio-map__embed pointer-events-none absolute inset-0">
        <Image
          src="/studio-map.png"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-cover"
        />
      </div>

      {/* Tinta brand sulla mappa (mix-blend) */}
      <div aria-hidden className="studio-map__tint pointer-events-none absolute inset-0" />
      {/* Vignettatura: sfuma i bordi estremi nel colore della sezione */}
      <div aria-hidden className="studio-map__vignette pointer-events-none absolute inset-0" />
      {/* Alone brand stretto attorno al pin */}
      <div aria-hidden className="studio-map__glow pointer-events-none absolute inset-0" />

      {/* Radar sweep rotante (wrapper centra, l'inner ruota sul proprio centro) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="studio-map__sweep absolute inset-0 rounded-full opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
      </div>

      {/* Anelli radar che si propagano dal pin */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[62%] -translate-x-1/2 -translate-y-1/2"
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
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
      >
        <span
          className="studio-map__pin block size-3.5 rounded-full"
          style={{ background: "var(--cps-pin-core)", outline: "3px solid var(--cps-pin)" }}
        />
      </div>

      {/* Tag indirizzo (in alto a sx, fluttua piano) */}
      <div className="studio-map__tag pointer-events-none absolute left-4 top-4 z-10 max-w-[80%]">
        <span
          className={cn(
            "eyebrow inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.6rem] backdrop-blur-sm",
            stage
              ? "border-paper/15 bg-ink/55 text-paper/85"
              : "border-line bg-paper-pure/75 text-ink/80",
          )}
        >
          <span className="size-1.5 rounded-full" style={{ background: "var(--cps-pin)" }} />
          {address.street}
        </span>
      </div>

      {/* CTA in basso a dx, freccia che scatta in hover */}
      <span
        className={cn(
          "eyebrow absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.65rem] backdrop-blur-sm transition-colors",
          stage
            ? "bg-ink/55 text-paper/80 group-hover:text-electric"
            : "bg-paper-pure/75 text-brand-strong",
        )}
      >
        {label}
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>

      {/* Attribuzione OpenStreetMap (richiesta ODbL) */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute bottom-1.5 left-3 z-10 text-[0.55rem] tracking-wide",
          stage ? "text-paper/35" : "text-ink/35",
        )}
      >
        © OpenStreetMap
      </span>
    </a>
  );
}
