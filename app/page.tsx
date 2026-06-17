import { Button } from "@/components/ui/button";
import { strings } from "@/lib/strings";

const DISCIPLINE = ["Pole", "Cerchio Aereo", "Flexi", "Functional", "Verticali"];

/**
 * Fase 1 — placeholder dimostrativo dello stack (token + tipografia +
 * smooth scroll). NON è la home definitiva: l'hero video + le sezioni
 * kinetic + il componente Chromatic Shadow arrivano in Fase 2/5.
 */
export default function Home() {
  return (
    <main className="dark min-h-screen bg-ink text-paper">
      <section className="relative flex min-h-screen flex-col justify-between px-6 py-10 md:px-12 md:py-14">
        {/* eyebrow su "spina" (il filo verticale = il palo) */}
        <header className="flex items-center justify-between">
          <span className="eyebrow text-paper/70">
            {strings.brand.city} · {strings.brand.payoff}
          </span>
          <span className="eyebrow text-paper/40">Fase 1 · scaffold</span>
        </header>

        <div className="relative">
          {/* la "spina": hairline verticale, ancora visiva del palo */}
          <span
            aria-hidden
            className="absolute -top-6 left-[0.12em] hidden h-[120%] w-px bg-brand/40 md:block"
          />
          <h1
            className="text-display text-paper"
            style={{
              fontSize: "clamp(4rem, 20vw, 18rem)",
              textShadow: "0.04em 0.05em 0 var(--color-brand)",
            }}
          >
            Climb
          </h1>
          <p className="mt-4 max-w-xl text-balance text-lg text-paper/80 md:text-xl">
            Salire, girare, restare sospesi. Pole, cerchio aereo e movimento — a Torino, per ogni
            livello.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="brand" size="lg">
              {strings.cta.prenotaProva}
            </Button>
            <Button variant="outline" size="lg">
              {strings.cta.scopriDiscipline}
            </Button>
          </div>
        </div>

        {/* hint del marquee (la versione reattiva alla velocità arriva in Fase 5) */}
        <footer className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-paper/10 pt-4">
          {DISCIPLINE.map((d) => (
            <span key={d} className="eyebrow text-paper/50">
              {d}
            </span>
          ))}
        </footer>
      </section>
    </main>
  );
}
