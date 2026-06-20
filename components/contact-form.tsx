"use client";

import { useState } from "react";

import { whatsappUrl, contact } from "@/lib/site";
import { Button } from "@/components/ui/button";

type State = "idle" | "sending" | "ok" | "error" | "fallback";

// Motivi del contatto: guidano la richiesta verso il funnel reale dello studio
// (la prova gratuita è la conversione principale).
const SUBJECTS = [
  "Prova gratuita",
  "Informazioni sui corsi",
  "Prezzi e abbonamenti",
  "Workshop ed eventi",
  "Altro",
];

/**
 * Form contatti. POST a /api/contact. Se l'email non è configurata (503) o
 * fallisce, mostra il fallback WhatsApp/email così il contatto è sempre possibile.
 * Campi obbligatori: nome, email, motivo, messaggio e consenso privacy (GDPR).
 */
export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setState("ok");
        form.reset();
        return;
      }
      const json = await res.json().catch(() => ({}));
      if (res.status === 503) {
        setState("fallback");
        return;
      }
      setError(json.error || "Invio fallito. Riprova.");
      setState("error");
    } catch {
      setState("error");
      setError("Errore di rete. Riprova.");
    }
  }

  if (state === "ok") {
    return (
      <div className="rounded-lg border border-line p-6">
        <p className="text-display text-2xl">Messaggio inviato ✓</p>
        <p className="mt-2 text-muted-foreground">Ti rispondiamo il prima possibile.</p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-md border border-input bg-transparent px-3 py-3 text-base sm:text-sm sm:py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Nome <span className="text-brand-strong">*</span>
          </label>
          <input id="name" name="name" required className={inputClass} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email <span className="text-brand-strong">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
            autoComplete="email"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium">
            Telefono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            className={inputClass}
            autoComplete="tel"
            placeholder="Facoltativo"
          />
        </div>
        <div>
          <label htmlFor="subject" className="mb-1 block text-sm font-medium">
            Motivo <span className="text-brand-strong">*</span>
          </label>
          <select id="subject" name="subject" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Seleziona…
            </option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          Messaggio <span className="text-brand-strong">*</span>
        </label>
        <textarea id="message" name="message" required rows={5} className={inputClass} />
      </div>

      {/* Honeypot anti-spam: nascosto agli umani, lo compilano solo i bot. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden" tabIndex={-1}>
        <label htmlFor="website">Non compilare questo campo</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label htmlFor="privacy" className="flex items-start gap-3 text-sm text-muted-foreground">
        <input
          id="privacy"
          name="privacy"
          type="checkbox"
          required
          value="yes"
          className="mt-1 size-4 shrink-0 accent-brand-strong"
        />
        <span>
          Ho letto e accetto la{" "}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-brand-strong"
          >
            Privacy Policy
          </a>{" "}
          <span className="text-brand-strong">*</span>
        </span>
      </label>

      <p className="text-xs text-muted-foreground">
        I campi con <span className="text-brand-strong">*</span> sono obbligatori.
      </p>

      {state === "error" && <p className="text-sm text-destructive">{error}</p>}

      {state === "fallback" ? (
        <div className="rounded-md border border-line bg-secondary p-4 text-sm">
          <p>Il form email è in fase di attivazione. Scrivici direttamente:</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Button asChild variant="brand" size="sm">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </Button>
          </div>
        </div>
      ) : (
        <Button type="submit" variant="brand" size="lg" disabled={state === "sending"}>
          {state === "sending" ? "Invio…" : "Invia messaggio"}
        </Button>
      )}
    </form>
  );
}
