import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Effetto "wow" su hover (sostituisce il vecchio movimento magnetico): una luce
// diagonale attraversa il tasto una volta. Solo sui tasti pieni, dove il bagliore
// bianco risalta sul magenta. content-[''] serve a creare lo pseudo-elemento.
const shine =
  "relative overflow-hidden before:pointer-events-none before:absolute before:inset-0 before:-translate-x-full before:bg-[linear-gradient(110deg,transparent_40%,rgba(255,255,255,0.55)_50%,transparent_60%)] before:content-[''] hover:before:animate-[cps-btn-shine_0.7s_ease-out]";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: `bg-primary text-primary-foreground hover:bg-primary/90 ${shine}`,
        // CTA di brand — magenta saturo su chiaro, testo paper (AA verificato).
        brand: `bg-brand-strong text-paper hover:bg-brand-strong/90 uppercase tracking-wide font-mono text-xs ${shine}`,
        // Tasto secondario (trasparente): in hover accento CIANO — fill ink con
        // testo/bordo/glow ciano. Leggibile sia su scuro (hero) sia su chiaro
        // (chi-siamo), perché il ciano sta sul fill scuro. Distinto dalla CTA
        // piena (magenta). Niente shine: l'effetto qui è il glow ciano.
        outline:
          "border border-input bg-transparent transition-[color,background-color,border-color,box-shadow] duration-300 hover:border-cyan hover:bg-ink hover:text-cyan hover:shadow-[0_0_34px_-8px_var(--color-cyan)]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-brand-strong underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
