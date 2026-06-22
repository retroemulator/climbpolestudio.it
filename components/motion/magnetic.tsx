/**
 * Wrapper (un tempo "magnetico"): il movimento di inseguimento del cursore è
 * stato rimosso perché fastidioso. Ora è un semplice passthrough che preserva
 * il `className` (così i punti d'uso restano invariati). L'effetto "wow" sui
 * tasti è ora lo shine in hover (vedi `Button`).
 * `strength` resta accettato per retrocompatibilità ma è ignorato.
 */
export function Magnetic({
  children,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
