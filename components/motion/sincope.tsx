import { cn } from "@/lib/utils";

/**
 * Sincope — entrata "a singhiozzo" (stile Canva): l'elemento lampeggia e scatta
 * off-beat (opacity + spostamento + skew), poi si assesta. Pensato per il
 * wordmark hero, dove si sposa con la firma Chromatic Shadow (bordo RGB → glitch).
 *
 * Implementata in CSS (vedi globals.css §SINCOPE) → parte all'istante del paint,
 * niente dipendenza dall'hydration, zero JS. Con prefers-reduced-motion
 * l'animazione non viene applicata (è dentro un @media no-preference): il
 * contenuto resta statico e pienamente visibile (anche per fotosensibilità).
 */
export function Sincope({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("sincope", className)}>{children}</div>;
}
