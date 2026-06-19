import { createClient as createSanity } from "@sanity/client";
import { createClient as createSupabase } from "@supabase/supabase-js";

/**
 * Materializza le class_session dallo schedule Sanity per le prossime N settimane.
 * Idempotente (upsert su slot_ref+starts_at). Usata da scripts/generate-sessions.ts
 * (CLI) e dalla route cron. Brief §7.
 *
 * NB timezone: gli orari sono trattati come ora locale di Torino (ISO senza Z).
 */
const DAY_TO_DOW: Record<string, number> = { dom: 0, lun: 1, mar: 2, mer: 3, gio: 4, ven: 5, sab: 6 };

type Slot = {
  _id: string;
  displayTitle: string;
  level?: string;
  day: string;
  startTime: string;
  durationMin?: number;
  capacity?: number;
  discipline?: { title?: string } | null;
};

const pad = (n: number) => String(n).padStart(2, "0");

export async function generateSessions(weeksAhead = 4): Promise<{ count: number }> {
  const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!sanityProjectId) throw new Error("Manca NEXT_PUBLIC_SANITY_PROJECT_ID");
  if (!supabaseUrl || !serviceKey)
    throw new Error("Mancano NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");

  const sanity = createSanity({
    projectId: sanityProjectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01",
    useCdn: false,
  });
  const supabase = createSupabase(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  const slots: Slot[] = await sanity.fetch(
    `*[_type == "scheduleSlot"]{ _id, displayTitle, level, day, startTime, durationMin, capacity, "discipline": discipline->{title} }`,
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const rows: Record<string, unknown>[] = [];
  for (const s of slots) {
    // Lo schema può salvare il giorno col prefisso d'ordine ("1-lun"): togliamolo.
    const code = s.day.includes("-") ? s.day.slice(s.day.indexOf("-") + 1) : s.day;
    const dow = DAY_TO_DOW[code];
    if (dow === undefined) continue;
    const [hh, mm] = s.startTime.split(":").map(Number);
    for (let w = 0; w < weeksAhead * 7; w++) {
      const d = new Date(today);
      d.setDate(today.getDate() + w);
      if (d.getDay() !== dow) continue;
      const startsAt = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(hh)}:${pad(mm)}:00`;
      rows.push({
        slot_ref: s._id,
        discipline: s.discipline?.title ?? null,
        title: s.displayTitle,
        level: s.level ?? null,
        starts_at: startsAt,
        duration_min: s.durationMin ?? 60,
        capacity: s.capacity ?? 10,
      });
    }
  }

  if (!rows.length) return { count: 0 };

  const { error } = await supabase.from("class_session").upsert(rows, { onConflict: "slot_ref,starts_at" });
  if (error) throw new Error(error.message);

  return { count: rows.length };
}
