# Climb Pole Studio

Sito web dello studio di **arti aeree e movimento** di Torino (Pole Dance, Cerchio Aereo,
Functional Training, Flexibility, Verticali + Exotic). Direzione creativa **BOLD & KINETIC**,
con firma tipografica _Chromatic Shadow_.

> **Stato:** in costruzione per fasi (vedi [NOTES.md](NOTES.md) e `docs/PROMPT.md` §12).
> Fase corrente: **1 — Scaffold completata** (non ancora verificata a runtime, vedi sotto).

---

## ⚠️ Prerequisito: Node non presente in fase di sviluppo

Questo repo è stato **scritto a mano senza Node disponibile** sulla macchina di sviluppo.
Il codice è completo e corretto-per-costruzione, ma **non è ancora stato eseguito** (nessun
`npm install`, build, lint o screenshot). Per avviarlo serve:

1. **Node.js ≥ 18.18** (consigliato **20 LTS** — vedi `.nvmrc`).
2. Installazione dipendenze e avvio:
   ```bash
   npm install
   npm run dev          # http://localhost:3000
   ```

Finché non gira almeno una volta, le versioni in `package.json` usano range `^` standard:
se `npm install` segnala un peer-warning o un axis font (vedi `lib/fonts.ts`), è atteso e
documentato — non è un errore del progetto.

---

## Stack

- **Next.js 15** (App Router, TypeScript strict, RSC)
- **Tailwind CSS v4** (CSS-first, token in `app/globals.css`) + **shadcn/ui**
- **next/font** self-hosted — Archivo (display), Inter (body), Geist Mono (utility)
- **Framer Motion** + **Lenis** (smooth scroll, reduced-motion aware)
- _(In arrivo per fase:)_ **Sanity** (CMS, Fase 4) · **Supabase** (auth+prenotazioni, Fase 9) ·
  **Resend** (email, Fase 14) · deploy **Vercel** (Fase 16)

## Comandi

| Comando                | Azione                          |
| ---------------------- | ------------------------------- |
| `npm run dev`          | Server di sviluppo              |
| `npm run build`        | Build di produzione             |
| `npm run start`        | Avvia la build                  |
| `npm run lint`         | ESLint (next/core-web-vitals)   |
| `npm run typecheck`    | `tsc --noEmit`                  |
| `npm run format`       | Prettier su tutto il progetto   |

## Struttura

```
app/            route, layout, globals.css, icone (favicon)
components/
  ui/           primitive shadcn (button, …)
  providers/    SmoothScroll (Lenis)
  motion/       primitive di motion (Fase 2)
  sections/     sezioni di pagina (fasi successive)
lib/            utils (cn), fonts, strings (IT centralizzate)
sanity/         schemi + query (Fase 4)
content/        seed contenuti reali (Fase 4)
public/         logo.png (trasparente), logo.svg (sorgente)
docs/           brief (PROMPT.md) + copy discipline (TESTI-DISCIPLINE.md)
```

## Variabili d'ambiente

Copia `.env.example` in `.env.local`. **Nessuna è necessaria per le Fasi 1–3.** Si compilano
arrivando alle fasi Sanity (4), Supabase (9), Resend (14).

## Asset / logo

Il logo sorgente (`logo.svg`) è un PNG 1600×1600 con maschera di trasparenza. Da esso sono
stati generati: `public/logo.png` (trasparente, per navbar/footer/OG) e la **favicon
semplificata** col solo marchio (climber orchidea su tile ink — `app/icon.png`,
`app/apple-icon.png`). Un eventuale **vettoriale originale** dal grafico è sostituibile senza
toccare il codice. Per i media (hero e sezioni): campo `videoUrl` in Sanity, con **fallback a
foto** se vuoto → i video si aggiungono dopo, solo incollando l'URL.
