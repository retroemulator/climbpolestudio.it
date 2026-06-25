# CLAUDE.md — istruzioni per Claude Code

> Questo file viene letto in automatico a ogni sessione. Tienilo conciso.
> Per i dettagli: **`HANDOFF.md`** (riferimento tecnico completo), **`NOTES.md`** (log decisionale, Fasi 0‑17), **`GUIDA-PRINCIPIANTE.md`** (guida per l'utente non tecnico), **`docs/`** (brief originale + copy).

## Cos'è
Sito di **Climb Pole Studio**, studio di arti aeree a **Torino** (titolare: Nadia Senatore).
**Stack:** Next.js 15 (App Router, RSC) · React 19 · TypeScript strict · **Tailwind v4** (config nel CSS, niente `tailwind.config`) · shadcn/ui · Framer Motion + Lenis · **Sanity** (CMS) · **Supabase** (auth/prenotazioni, opzionale) · deploy **Vercel**.
**Live (staging):** https://climbpolestudio-it.vercel.app · **Studio/CMS:** /studio · **Repo:** github.com/retroemulator/climbpolestudio.it

## ⚠️ Convenzioni di lavoro (IMPORTANTE)
- **Committa e pusha su `main` ad ogni modifica completata**: il push fa partire il deploy automatico su Vercel. Non serve chiedere il permesso di committare. Messaggi di commit in italiano, conventional (`feat(...)`, `fix(...)`, `docs:`…).
- **Prima di pushare** lancia `npm run typecheck` (e `npm run build` per modifiche non banali). Non pushare codice che non compila.
- **I sub-agenti dei workflow NON devono committare**: committa tu (orchestratore) alla fine.
- **Mai committare segreti.** I segreti stanno in `.env.local` (gitignored). Non metterli in file versionati né stamparli.
- Per i bottoni usa **sempre** il componente `components/ui/button.tsx` (`variant="brand"` per la CTA), non stili inline.
- Rispetta i **token colore** e le loro regole d'uso (vedi sotto). Ogni componente con animazioni deve avere il ramo `prefers-reduced-motion`.

## Comandi
```bash
npm run dev          # sviluppo su localhost:3000
npm run typecheck    # tsc --noEmit (SEMPRE prima di pushare)
npm run build        # build di produzione
npm run lint
npm run seed              # ripopola Sanity (richiede SANITY_API_TOKEN; sovrascrive i doc seed)
npm run generate-sessions # genera sessioni prenotabili (solo se Supabase attivo)
```
**Node 20** (`.nvmrc`). Nessuna suite di test nel progetto.

## Architettura (l'essenziale)
- **Route group `app/(site)/`** = tutte le pagine pubbliche (navbar/footer/smooth-scroll). `/studio`, `/api`, `/auth` stanno **fuori** dal group.
- **Lettura Sanity:** `sanity/lib/data.ts` (getter) → `sanity/lib/fetch.ts` (`sanityFetch`: ISR `revalidate` + tag globale `"sanity"`) → `sanity/lib/client.ts` (`useCdn:false`, `perspective:"published"`, **read-only senza token**). Scritture solo via script con `SANITY_API_TOKEN`.
- **Revalidation on-demand:** `POST /api/revalidate` fa `revalidateTag("sanity")` (verifica firma `SANITY_REVALIDATE_SECRET`). Quindi le modifiche dallo Studio compaiono in pochi secondi.
- **Instagram:** `lib/instagram.ts` legge il feed Behold (`BEHOLD_FEED_ID`); se manca, `InstagramFeedSection` si nasconde da sola.
- **Supabase è OPZIONALE e "gated":** tutto degrada con grazia se mancano le env (`isSupabaseConfigured`). Oggi **spento in locale** (fallback WhatsApp ovunque).
- **Design system** in `app/globals.css` (`@theme`): ritmo **light/stage** (`components/layout/section.tsx`, prop `tone`), firma **Chromatic Shadow** (titoli), font Archivo/Inter/Geist Mono (`lib/fonts.ts`). Dati statici/contatti in `lib/site.ts`; stringhe UI in `lib/strings.ts`.

## Token colore (regole strette)
`brand #F087DD` (fill/glow) · `brand-strong #B81FA8` (testo/CTA, contrasto AA) · `electric #FF2EC4` (**solo glow su scuro**, mai testo) · `cyan #2EE6FF` (**solo** lo split della firma) · `paper`/`ink`. Non confonderli.

## Trappole note (non ripetere errori già risolti)
- **Sanity `_id` custom: usa il trattino, mai il punto** (`.` è riservato ai namespace → i doc con punto spariscono dalla lettura pubblica).
- **Giorni dello schedule** salvati come `"1-lun"…"6-sab"` (per l'ordinamento nello Studio) e normalizzati in lettura con `dayCode()` (`lib/site.ts`). Logica duplicata in `lib/sessions/generate.ts` — tienile allineate.
- **Non aggiornare Sanity a 5/6** senza passare a Next 16 (richiede React ≥19.2.2). Attuale: `sanity@4.22`, `next-sanity@11`.
- **`@types/leaflet`** è (per errore storico) tra le `dependencies`: non è un bug bloccante.
- Sessioni Supabase: orari ISO **senza `Z`** (assunti ora locale Torino) — attenzione a timezone/DST se ci lavori.
- Componenti **orfani** (non importati, rimuovibili): `components/sections/discipline-showcase.tsx`, `components/motion/custom-cursor.tsx`, `components/layout/page-placeholder.tsx`.

## Stato / cose in sospeso (vedi `HANDOFF.md` §3 per le milestone)
- 🌐 Il dominio **climbpolestudio.it punta ancora al vecchio WordPress**; live su Vercel staging. Cutover DNS da fare (Register.it).
- ⚙️ Da attivare su Vercel: `SANITY_REVALIDATE_SECRET` (+ webhook su Sanity), `BEHOLD_FEED_ID`, `RESEND_API_KEY` (email form), `NEXT_PUBLIC_SITE_URL=https://climbpolestudio.it`.
- 🧾 `lib/site.ts` → `legal.taxId` **vuoto** (C.F./P.IVA dell'A.S.D., serve nella privacy).
- 🖼️ Mancano gli **asset reali** del cliente (foto pro, video hero definitivo): ovunque c'è fallback stock.
- 📄 `README.md` è obsoleto; `NOTES.md` si ferma alla Fase 17 (le feature del 2026‑06‑23, revalidation + Instagram, sono in `HANDOFF.md`).
