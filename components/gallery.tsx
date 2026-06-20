"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";

export type GalleryPhoto = {
  id: string;
  thumb: string;
  full: string;
  w: number;
  h: number;
  caption: string | null;
};

/**
 * Griglia masonry + lightbox accessibile: click → overlay a tutto schermo con
 * frecce ←/→, Esc/click-fuori per chiudere, focus-trap e return-focus. Client
 * (stato + tastiera); le URL (thumb/full) arrivano già pronte dal server.
 */
export function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const open = index !== null;
  const go = (delta: number) =>
    setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length));

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

  const current = index === null ? null : photos[index];

  return (
    <>
      <div className="mt-14 columns-2 gap-4 md:columns-3 xl:columns-4 2xl:columns-5">
        {photos.map((p, i) => (
          <Reveal key={p.id} delay={(i % 6) * 0.04} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={(e) => {
                openerRef.current = e.currentTarget;
                setIndex(i);
              }}
              aria-label={p.caption ? `Apri immagine: ${p.caption}` : "Apri immagine"}
              className="group block w-full overflow-hidden rounded-lg border border-paper/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Image
                src={p.thumb}
                alt={p.caption ?? "Climb Pole Studio"}
                width={p.w}
                height={p.h}
                sizes="(max-width:768px) 50vw, (max-width:1280px) 33vw, 20vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {p.caption ? (
                <span className="block p-3 text-left text-sm text-paper/60">{p.caption}</span>
              ) : null}
            </button>
          </Reveal>
        ))}
      </div>

      {current && (
        <div
          ref={dialogRef}
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-label="Galleria immagini"
          className="fixed inset-0 z-[80] flex flex-col bg-ink/95 backdrop-blur-sm"
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
