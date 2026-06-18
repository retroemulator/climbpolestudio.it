import { cn } from "@/lib/utils";

/**
 * Stamp — entrata "a timbro" (timbratura): l'elemento arriva enorme e sfocato
 * (da "fuori schermo", verso lo spettatore), PRECIPITA e SBATTE in posizione
 * con arresto secco e un micro-rinculo, centrato sul proprio centro. Pensato
 * per il wordmark hero, dove la firma Chromatic Shadow si ricompone all'impatto.
 *
 * Implementata in CSS (vedi globals.css §TIMBRATURA) → parte al paint, niente
 * dipendenza dall'hydration, zero JS. Con prefers-reduced-motion l'animazione
 * non viene applicata (è dentro un @media no-preference): il contenuto resta
 * statico e pienamente visibile (anche per fotosensibilità).
 */
export function Stamp({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("stamp", className)}>{children}</div>;
}
