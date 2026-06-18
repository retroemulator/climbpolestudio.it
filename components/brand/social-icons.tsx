import { Instagram, Facebook, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { socials } from "@/lib/site";

const ICONS: Record<string, LucideIcon> = {
  instagram: Instagram,
  facebook: Facebook,
};

/**
 * Icone social riusabili (footer, header, contatti). Server component.
 * `tone`: "dark" (su fondo scuro) | "light" (su fondo chiaro) → colori coerenti.
 * Ogni icona è un link con aria-label leggibile dallo screen reader.
 */
export function SocialIcons({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const itemStyles =
    tone === "dark"
      ? "text-paper/70 hover:text-brand hover:bg-paper/10"
      : "text-ink/65 hover:text-brand-strong hover:bg-ink/5";

  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {socials.map((s) => {
        const Icon = ICONS[s.platform] ?? Instagram;
        return (
          <li key={s.href}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className={cn(
                "inline-flex size-9 items-center justify-center rounded-full transition-colors",
                itemStyles,
              )}
            >
              <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
