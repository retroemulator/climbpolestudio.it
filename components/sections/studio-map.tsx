"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

import { cn } from "@/lib/utils";

/**
 * StudioMap — mappa reale interattiva (Leaflet + tile OpenStreetMap, keyless)
 * brandizzata, con il "radar" on-brand sovrapposto (sweep + anelli + pin + alone).
 *
 * Interazione: in hover lo scroll ZOOMA la mappa (scrollWheelZoom "center", così
 * resta centrata sullo studio e il pin del radar resta preciso); fuori dalla
 * mappa lo scroll torna a muovere la pagina. `data-lenis-prevent` evita che lo
 * smooth-scroll globale (Lenis) intercetti la rotella sopra la mappa. Il drag è
 * disabilitato per non disallineare l'overlay.
 *
 * `tone`: "stage" (fondo scuro → tile invertite scure + glow electric) | "light".
 * `zoom`: livello iniziale (default 16). Gli overlay non bloccano l'interazione
 * (pointer-events:none); unico elemento cliccabile sopra: la CTA "Apri in Maps".
 */
type StudioMapProps = {
  href: string;
  address: { street: string; cityLine: string };
  geo: { lat: number; lon: number };
  tone?: "stage" | "light";
  label?: string;
  className?: string;
  zoom?: number;
};

export function StudioMap({
  href,
  address,
  geo,
  tone = "stage",
  label = "Apri in Maps",
  className,
  zoom = 16,
}: StudioMapProps) {
  const stage = tone === "stage";
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    let cancelled = false;
    let ro: ResizeObserver | null = null;
    const timers: number[] = [];
    if (!containerRef.current || mapRef.current) return;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center: [geo.lat, geo.lon],
        zoom,
        minZoom: zoom - 3,
        maxZoom: 18,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: true,
        touchZoom: "center",
        keyboard: false,
        boxZoom: false,
      });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
      }).addTo(map);

      // Leaflet rende le tile solo se conosce la dimensione reale del contenitore.
      // In layout dove l'altezza (aspect-ratio) si stabilizza dopo il mount, un solo
      // invalidateSize non basta → la mappa resta vuota (visibile soprattutto sul
      // tono chiaro). Invalidiamo a più riprese + a ogni resize del contenitore.
      const invalidate = () => mapRef.current?.invalidateSize();
      requestAnimationFrame(invalidate);
      timers.push(window.setTimeout(invalidate, 200));
      timers.push(window.setTimeout(invalidate, 600));
      if (containerRef.current) {
        ro = new ResizeObserver(() => invalidate());
        ro.observe(containerRef.current);
      }
    })();

    return () => {
      cancelled = true;
      ro?.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [geo.lat, geo.lon, zoom]);

  return (
    <div
      className={cn(
        "group relative aspect-4/3 w-full overflow-hidden rounded-lg border",
        stage ? "studio-map--stage border-paper/10 bg-ink" : "studio-map--light border-line bg-secondary",
        className,
      )}
    >
      {/* Mappa interattiva reale — scroll in hover = zoom */}
      <div
        ref={containerRef}
        role="img"
        aria-label={`Mappa di ${address.street}, ${address.cityLine}`}
        className="studio-map__embed absolute inset-0"
      />

      {/* Tinta brand + vignetta + alone (decorativi, non bloccano la mappa) */}
      <div aria-hidden className="studio-map__tint pointer-events-none absolute inset-0 z-10" />
      <div aria-hidden className="studio-map__vignette pointer-events-none absolute inset-0 z-10" />
      <div aria-hidden className="studio-map__glow pointer-events-none absolute inset-0 z-10" />

      {/* Radar sweep */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="studio-map__sweep absolute inset-0 rounded-full opacity-60" />
      </div>
      {/* Anelli radar */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 aspect-square w-[62%] -translate-x-1/2 -translate-y-1/2"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="studio-map__ring absolute inset-0 rounded-full"
            style={{ animationDelay: `${i * 1.2}s` }}
          />
        ))}
      </div>
      {/* Pin luminoso */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
      >
        <span
          className="studio-map__pin block size-3.5 rounded-full"
          style={{ background: "var(--cps-pin-core)", outline: "3px solid var(--cps-pin)" }}
        />
      </div>

      {/* Tag indirizzo */}
      <div className="studio-map__tag pointer-events-none absolute left-4 top-4 z-20 max-w-[80%]">
        <span
          className={cn(
            "eyebrow inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.6rem] backdrop-blur-sm",
            stage ? "border-paper/15 bg-ink/55 text-paper/85" : "border-line bg-paper-pure/75 text-ink/80",
          )}
        >
          <span className="size-1.5 rounded-full" style={{ background: "var(--cps-pin)" }} />
          {address.street}
        </span>
      </div>

      {/* CTA: apri in Google Maps (unico elemento interattivo sopra la mappa) */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group/cta eyebrow pointer-events-auto absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 rounded-full px-3 py-2 min-h-11 sm:py-1 sm:min-h-0 text-[0.65rem] backdrop-blur-sm transition-colors",
          stage ? "bg-ink/55 text-paper/80 hover:text-brand" : "bg-paper-pure/80 text-brand-strong",
        )}
      >
        {label}
        <span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
      </a>

      {/* Attribuzione OpenStreetMap (richiesta ODbL) */}
      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "pointer-events-auto absolute bottom-1.5 left-3 z-20 text-[0.55rem] tracking-wide transition-colors",
          stage ? "text-paper/40 hover:text-paper/70" : "text-ink/40 hover:text-ink/70",
        )}
      >
        © OpenStreetMap
      </a>
    </div>
  );
}
