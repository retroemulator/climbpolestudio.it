"use client";

import { useActionState } from "react";

import { signInWithEmail, type AuthState } from "@/app/(site)/accedi/actions";
import { whatsappUrl } from "@/lib/site";
import { Button } from "@/components/ui/button";

const initial: AuthState = { status: "idle" };

/** Form magic-link. Gestisce gli stati: inviato / errore / non configurato. */
export function AuthForm() {
  const [state, action, pending] = useActionState(signInWithEmail, initial);

  if (state.status === "sent") {
    return (
      <div className="rounded-lg border border-paper/15 p-6">
        <p className="text-display text-2xl">Controlla la mail ✓</p>
        <p className="mt-2 text-paper/70">Ti abbiamo inviato un link per accedere. Apri la mail dallo stesso dispositivo.</p>
      </div>
    );
  }

  if (state.status === "not_configured") {
    return (
      <div className="rounded-lg border border-paper/15 p-6">
        <p className="text-display text-2xl">Accesso in arrivo</p>
        <p className="mt-2 text-paper/70">
          L&apos;area personale e le prenotazioni online stanno per essere attivate. Per ora
          prenota la prova su WhatsApp.
        </p>
        <Button asChild variant="brand" size="lg" className="mt-4">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Scrivici su WhatsApp
          </a>
        </Button>
      </div>
    );
  }

  return (
    <form action={action} className="max-w-sm space-y-4">
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-md border border-paper/20 bg-transparent px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        />
      </div>
      {state.status === "error" && <p className="text-sm text-destructive">{state.message}</p>}
      <Button type="submit" variant="brand" size="lg" disabled={pending}>
        {pending ? "Invio…" : "Invia il link di accesso"}
      </Button>
      <p className="text-xs text-paper/50">
        Accesso senza password: ti inviamo un link via email.
      </p>
    </form>
  );
}
