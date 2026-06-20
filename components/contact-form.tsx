"use client";

import { useState } from "react";

import { whatsappUrl, contact } from "@/lib/site";
import { Button } from "@/components/ui/button";

type State = "idle" | "sending" | "ok" | "error" | "fallback";

/**
 * Form contatti. POST a /api/contact. Se l'email non è configurata (503) o
 * fallisce, mostra il fallback WhatsApp/email così il contatto è sempre possibile.
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
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Nome
        </label>
        <input id="name" name="name" required className={inputClass} autoComplete="name" />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input id="email" name="email" type="email" required className={inputClass} autoComplete="email" />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          Messaggio
        </label>
        <textarea id="message" name="message" required rows={5} className={inputClass} />
      </div>

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
