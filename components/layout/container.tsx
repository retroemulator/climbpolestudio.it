import { cn } from "@/lib/utils";

/** Larghezza massima + padding orizzontale coerenti su tutto il sito. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[88rem] px-6 md:px-10 lg:px-14", className)}>
      {children}
    </div>
  );
}
