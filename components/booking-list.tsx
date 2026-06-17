"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export type SessionRow = {
  id: string;
  title: string;
  level: string | null;
  starts_at: string;
  capacity: number;
};

const LABEL: Record<string, string> = {
  confirmed: "Prenotato ✓",
  waitlist: "In lista d'attesa",
  already_booked: "Già prenotato",
  unauthenticated: "Accedi per prenotare",
  not_found: "Sessione non trovata",
};

/** Lista sessioni prenotabili con prenotazione atomica via RPC `book_session`. */
export function BookingList({ sessions }: { sessions: SessionRow[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [result, setResult] = useState<Record<string, string>>({});

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setAuthed(Boolean(data.user)));
  }, [supabase]);

  async function book(id: string) {
    if (!authed) {
      router.push("/accedi");
      return;
    }
    setBusy(id);
    const { data, error } = await supabase.rpc("book_session", { p_session: id });
    setBusy(null);
    setResult((r) => ({ ...r, [id]: error ? "error" : (data as string) }));
  }

  if (!sessions.length) {
    return (
      <p className="text-paper/60">
        Nessuna sessione prenotabile al momento. Le sessioni vengono pubblicate a rotazione —
        torna a breve o scrivici per prenotare la prova.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-paper/10 border-y border-paper/10">
      {sessions.map((s) => {
        const fmt = new Date(s.starts_at).toLocaleString("it-IT", {
          weekday: "short",
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
        const res = result[s.id];
        return (
          <li key={s.id} className="flex items-center justify-between gap-4 py-4">
            <div>
              <span className="block text-paper/85">{s.title}</span>
              <span className="font-mono text-xs text-paper/45">
                {fmt}
                {s.level ? ` · ${s.level}` : ""}
              </span>
            </div>
            {res ? (
              <span className="text-sm text-brand">{LABEL[res] ?? "Errore"}</span>
            ) : (
              <Button variant="brand" size="sm" disabled={busy === s.id} onClick={() => book(s.id)}>
                {busy === s.id ? "…" : authed === false ? "Accedi" : "Prenota"}
              </Button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
