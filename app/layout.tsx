import type { Metadata, Viewport } from "next";

import { fontVariables } from "@/lib/fonts";
import { strings } from "@/lib/strings";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://climbpolestudio.it";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${strings.brand.name} — ${strings.brand.payoff} a ${strings.brand.city}`,
    template: `%s · ${strings.brand.name}`,
  },
  description:
    "Studio di arti aeree e movimento a Torino: Pole Dance, Cerchio Aereo, Functional Training, Flexibility e Verticali. Per ogni livello, da zero all'avanzato.",
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: strings.brand.name,
    url: SITE_URL,
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: strings.brand.name }],
  },
  // favicon/apple-touch generati da app/icon.png e app/apple-icon.png
};

export const viewport: Viewport = {
  themeColor: "#0d0d0f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
