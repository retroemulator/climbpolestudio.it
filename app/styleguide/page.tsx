import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ChromaticShadow } from "@/components/motion/chromatic-shadow";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";
import { Magnetic } from "@/components/motion/magnetic";
import { Parallax } from "@/components/motion/parallax";
import { Media } from "@/components/media/media";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const SWATCHES = [
  { name: "paper", hex: "#FAF3F4", className: "bg-paper text-ink" },
  { name: "ink", hex: "#0D0D0F", className: "bg-ink text-paper" },
  { name: "brand", hex: "#F087DD", className: "bg-brand text-ink" },
  { name: "brand-strong", hex: "#B81FA8", className: "bg-brand-strong text-paper" },
  { name: "electric", hex: "#FF2EC4", className: "bg-electric text-ink" },
  { name: "cyan", hex: "#2EE6FF", className: "bg-cyan text-ink" },
];

// Foto stock provvisoria (placeholder fino agli asset reali).
const STOCK = "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=70";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line py-12">
      <p className="eyebrow mb-6 text-muted-foreground">{title}</p>
      {children}
    </div>
  );
}

export default function Styleguide() {
  return (
    <>
      <Section tone="light">
        <Container className="py-16 pt-28">
          <p className="eyebrow text-brand-strong">Climb Pole Studio · Design System</p>
          <h1 className="text-display mt-3" style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}>
            Styleguide
          </h1>

          {/* TOKEN COLORE */}
          <Block title="01 — Token colore">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {SWATCHES.map((s) => (
                <div key={s.name} className={`${s.className} flex h-28 flex-col justify-between rounded-md p-3`}>
                  <span className="font-mono text-xs">{s.hex}</span>
                  <span className="font-mono text-xs">--{s.name}</span>
                </div>
              ))}
            </div>
          </Block>

          {/* TIPOGRAFIA */}
          <Block title="02 — Tipografia">
            <div className="space-y-3">
              <p className="text-display" style={{ fontSize: "clamp(2.5rem,8vw,5rem)" }}>
                Display · Archivo espanso
              </p>
              <p className="text-2xl">Body · Inter — neutro, lascia respirare il display.</p>
              <p className="eyebrow text-muted-foreground">Utility · Geist Mono — eyebrow / dati</p>
            </div>
          </Block>

          {/* CHROMATIC SHADOW */}
          <Block title="03 — Signature: Chromatic Shadow (hover per lo split)">
            <ChromaticShadow as="p" className="text-display" style={{ fontSize: "clamp(3rem,12vw,9rem)" }}>
              Pole
            </ChromaticShadow>
          </Block>

          {/* BOTTONI */}
          <Block title="04 — Bottoni">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="brand" size="lg">
                Prenota la prova
              </Button>
              <Button>Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Magnetic>
                <Button variant="brand">Magnetico</Button>
              </Magnetic>
            </div>
          </Block>

          {/* REVEAL */}
          <Block title="05 — Reveal del testo (parola per parola)">
            <RevealText
              as="p"
              text="Più che un allenamento, è un percorso: la forza arriva senza che te ne accorgi."
              className="max-w-3xl text-3xl md:text-4xl"
            />
          </Block>

          {/* MEDIA */}
          <Block title="06 — Media (video-ready · ora fallback foto + Ken Burns + overlay)">
            <div className="relative aspect-video w-full overflow-hidden rounded-md">
              <Media
                image={{ src: STOCK, alt: "Allenamento — foto stock provvisoria" }}
                overlay
                sizes="(max-width: 768px) 100vw, 80vw"
              />
              <div className="absolute bottom-4 left-4">
                <ChromaticShadow as="span" className="text-display text-4xl text-paper md:text-6xl">
                  Cerchio
                </ChromaticShadow>
              </div>
            </div>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              Nessun <code className="font-mono">videoUrl</code> → mostra la foto con leggero Ken
              Burns. Con un URL video (Sanity) il video sfuma sopra, con fallback su mobile/
              data-saver/reduced-motion. Zero codice da cambiare.
            </p>
          </Block>
        </Container>
      </Section>

      {/* MARQUEE + PARALLAX su stage */}
      <Section tone="stage">
        <Container className="py-16">
          <Block title="07 — Marquee reattivo allo scroll (stage)">
            <Marquee baseVelocity={3} className="border-y border-paper/10 py-4">
              <span className="text-display mx-6 text-3xl text-paper/80 md:text-5xl">
                POLE · CERCHIO AEREO · FLEXIBILITY · FUNCTIONAL · VERTICALI ·
              </span>
            </Marquee>
          </Block>

          <Block title="08 — Parallax (scrolla per vedere lo sfasamento)">
            <div className="flex gap-6">
              <Parallax speed={0.4} className="flex-1">
                <div className="flex h-48 items-center justify-center rounded-md bg-brand/20 font-mono text-sm">
                  speed 0.4
                </div>
              </Parallax>
              <Parallax speed={0.8} className="flex-1">
                <div className="flex h-48 items-center justify-center rounded-md bg-electric/20 font-mono text-sm">
                  speed 0.8
                </div>
              </Parallax>
            </div>
          </Block>

          <Reveal className="border-t border-paper/10 pt-8">
            <p className="text-paper/60">
              Tutte le animazioni rispettano <code className="font-mono">prefers-reduced-motion</code>:
              con il flag attivo, signature/parallax/marquee diventano statici.
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
