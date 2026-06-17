import { PortableText, type PortableTextComponents } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";

import { cn } from "@/lib/utils";

/** Stile dei contenuti rich-text (Portable Text) da Sanity. Pensato per fondo chiaro. */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-4 leading-relaxed text-ink/80">{children}</p>,
    h2: ({ children }) => (
      <h2 className="text-display mt-12 text-2xl md:text-3xl">{children}</h2>
    ),
    h3: ({ children }) => <h3 className="mt-8 text-xl font-semibold">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-brand pl-4 text-lg italic text-ink/70">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/80">{children}</ul>,
    number: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-ink/80">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-strong underline underline-offset-4 hover:no-underline"
      >
        {children}
      </a>
    ),
  },
};

export function RichText({
  value,
  className,
}: {
  value?: PortableTextBlock[];
  className?: string;
}) {
  if (!value?.length) return null;
  return (
    <div className={cn(className)}>
      <PortableText value={value} components={components} />
    </div>
  );
}
