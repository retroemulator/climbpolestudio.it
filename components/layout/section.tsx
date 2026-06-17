import { cn } from "@/lib/utils";

type Tone = "light" | "stage";

/**
 * Sezione nel RITMO luce/stage (Fase 0).
 * - `light` → sfondo paper, testo ink (info: editoriale, leggibile).
 * - `stage` → applica `.dark`, sfondo ink, testo paper (palco: media + glow).
 *   La classe `.dark` fa sì che i componenti shadcn usino i token scuri.
 */
export function Section({
  tone = "light",
  className,
  children,
  id,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        tone === "stage" ? "dark bg-ink text-paper" : "bg-paper text-ink",
        className,
      )}
    >
      {children}
    </section>
  );
}

/**
 * "La Spina" — hairline verticale = il palo (Fase 0). Elemento decorativo
 * ancorato a un offset; il colore si sovrascrive via className (es. su stage
 * usare `bg-brand/30`).
 */
export function Spine({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute bottom-0 top-0 w-px bg-line", className)}
    />
  );
}
