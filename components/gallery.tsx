"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type GalleryPhoto = {
  id: string;
  thumb: string;
  full: string;
  w: number;
  h: number;
  caption: string | null;
};

const GAP = 12;

type Tile = { p: GalleryPhoto; i: number; w: number; h: number };

/**
 * Layout a MOSAICO giustificato (stile Google Photos/Flickr): righe a tutta
 * larghezza, altezza uniforme per riga, immagini di larghezza variabile che si
 * incastrano senza crop. Calcolato sulle proporzioni reali in base alla
 * larghezza del contenitore (ResizeObserver).
 */
function justify(photos: GalleryPhoto[], width: number, target: number): Tile[][] {
  const rows: Tile[][] = [];
  let row: { p: GalleryPhoto; i: number; ar: number }[] = [];
  let arSum = 0;
  photos.forEach((p, i) => {
    const ar = p.w / p.h || 0.8;
    row.push({ p, i, ar });
    arSum += ar;
    const rowWidth = arSum * target + GAP * (row.length - 1);
    if (rowWidth >= width) {
      const h = (width - GAP * (row.length - 1)) / arSum;
      rows.push(row.map((it) => ({ p: it.p, i: it.i, w: it.ar * h, h })));
      row = [];
      arSum = 0;
    }
  });
  if (row.length) {
    // ultima riga: altezza target, senza stiramento a tutta larghezza
    rows.push(row.map((it) => ({ p: it.p, i: it.i, w: it.ar * target, h: target })));
  }
  return rows;
}

/**
 * Galleria a mosaico + lightbox accessibile: click → overlay a tutto schermo con
 * frecce ←/→, Esc/click-fuori per chiudere, focus-trap e return-focus. Le URL
 * (thumb/full) arrivano già pronte dal server.
 */
export function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  // Larghezza del contenitore per il calcolo del mosaico.
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    setWidth(el.clientWidth);
    const ro = new ResizeObserver((entries) => setWidth(entries[0].contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const open = index !== null;
  const go = (delta: number) =>
    setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length));

  // Lightbox: focus iniziale, Esc/frecce, focus-trap, return-focus.
  useEffect(() => {
    if (!open) return;
    const prev = openerRef.current ?? (document.activeElement as HTMLElement | null);
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      else if (e.key === "ArrowRight") setIndex((i) => (i === null ? i : (i + 1) % photos.length));
      else if (e.key === "ArrowLeft")
        setIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
      else if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus?.();
    };
  }, [open, photos.length]);

  const target = width < 600 ? 170 : width < 1024 ? 230 : width < 1536 ? 280 : 320;
  const rows = width > 0 ? justify(photos, width, target) : [];
  const current = index === null ? null : photos[index];

  return (
    <>
      <div ref={gridRef} className="mt-14">
        {rows.length === 0 ? (
          <div className="min-h-[60vh]" aria-hidden />
        ) : (
          <div className="flex flex-col" style={{ gap: GAP }}>
            {rows.map((row, ri) => (
              <div key={ri} className="flex" style={{ gap: GAP }}>
                {row.map((t) => (
                  <button
                    key={t.p.id}
                    type="button"
                    onClick={(e) => {
                      openerRef.current = e.currentTarget;
                      setIndex(t.i);
                    }}
                    aria-label={t.p.caption ? `Apri immagine: ${t.p.caption}` : "Apri immagine"}
                    style={{ width: `${t.w}px`, height: `${t.h}px` }}
                    className="group relative shrink-0 overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    <Image
                      src={t.p.thumb}
                      alt={t.p.caption ?? "Climb Pole Studio"}
                      fill
                      sizes={`${Math.ceil(t.w)}px`}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    {t.p.caption ? (
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/85 to-transparent p-3 pt-8 text-left text-sm text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {t.p.caption}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {current && (
        <div
          ref={dialogRef}
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-label="Galleria immagini"
          className="fixed inset-0 z-80 flex flex-col bg-ink/95 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between p-4 text-paper">
            <span className="font-mono text-sm text-paper/60">
              {(index ?? 0) + 1} / {photos.length}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setIndex(null)}
              aria-label="Chiudi"
              className="grid size-11 place-items-center rounded-full text-3xl leading-none text-paper/70 transition-colors hover:bg-paper/10 hover:text-paper"
            >
              ×
            </button>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIndex(null);
            }}
          >
            {photos.length > 1 && (
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Immagine precedente"
                className="absolute left-2 z-10 grid size-12 place-items-center rounded-full bg-paper/10 text-2xl text-paper transition-colors hover:bg-paper/20 md:left-6"
              >
                ‹
              </button>
            )}
            <figure className="flex max-h-full flex-col items-center">
              <Image
                src={current.full}
                alt={current.caption ?? "Climb Pole Studio"}
                width={current.w}
                height={current.h}
                sizes="(max-width:1024px) 100vw, 1100px"
                className="h-auto max-h-[80vh] w-auto max-w-full rounded-lg object-contain"
                priority
              />
              {current.caption ? (
                <figcaption className="mt-3 max-w-2xl text-center text-sm text-paper/70">
                  {current.caption}
                </figcaption>
              ) : null}
            </figure>
            {photos.length > 1 && (
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Immagine successiva"
                className="absolute right-2 z-10 grid size-12 place-items-center rounded-full bg-paper/10 text-2xl text-paper transition-colors hover:bg-paper/20 md:right-6"
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
