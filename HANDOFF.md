# 📦 Passaggio di consegne — Climb Pole Studio (`climbpolestudio.it`)

> **Documento unico** per trasferire il progetto a un nuovo PC / nuovo utente / nuovo account Claude Code.
> Aggiornato: **2026‑06‑23**. Stack: **Next.js 15 (App Router) + Sanity (CMS) + Supabase (auth/prenotazioni, opzionale) + Vercel (hosting)**.
> Lingua del progetto e dei contenuti: **italiano**.

Indice:
1. [Cos'è il progetto e com'è fatto](#1-cosè-il-progetto-e-comè-fatto-per-ripartire-da-qui) — per far ripartire un nuovo Claude Code
2. [Servizi terzi: attivi, proprietà, da configurare](#2-servizi-terzi)
3. [Azioni rimanenti e go‑live sul dominio — Milestone](#3-azioni-rimanenti--go-live--milestone)
4. [Google Business Profile](#4-google-business-profile)
5. [Configurare Claude Code sul nuovo PC](#5-configurare-claude-code-sul-nuovo-pc)
6. [Appendice — comandi rapidi & file segreti](#6-appendice)

---

## 0. Come usare questo documento

- Sei un **umano**: leggi le sezioni 2→5, sono operative (cosa cliccare, dove).
- Sei **Claude Code** (nuovo account/PC): la sezione **1** è la tua mappa del codice. Leggi anche `NOTES.md` (log decisionale fasi 0‑17) e `docs/prompt.md` (brief originale). Poi chiedi all'utente cosa modificare.
- **Regole d'oro del progetto** (dalla memoria di lavoro): ogni modità va **committata e pushata su `main`** → Vercel fa il deploy automatico. Non serve chiedere il permesso di committare. Verifica sempre con `npm run typecheck` prima di pushare.

---

## 1. Cos'è il progetto e com'è fatto (per ripartire da qui)

### 1.1 In due righe
Sito vetrina + (in futuro) prenotazioni per **Climb Pole Studio**, studio di arti aeree e movimento a **Torino** (Pole Dance, Cerchio Aereo, Functional Training, Flexibility, Verticali, Exotic). Titolare: **Nadia Senatore**. Direzione creativa **BOLD & KINETIC**, firma grafica **Chromatic Shadow** (ombra magenta/ciano sui titoli).

### 1.2 Stack e versioni (vincoli importanti)
| Cosa | Versione | Note |
|---|---|---|
| **Node** | **20** (`.nvmrc`) | `package.json engines` dice `>=18.18.0`, ma **usa Node 20** come riferimento |
| Next.js | `^15.1.6` | App Router, React Server Components |
| React | `^19.0.0` | |
| Tailwind CSS | **v4** | **Nessun `tailwind.config.js`** — la config è nel CSS (`app/globals.css`, blocco `@theme`) |
| Sanity | `sanity@4.22`, `next-sanity@11` | **Vincolo**: salire a Sanity 5/6 richiede Next 16 (React ≥19.2.2). Non aggiornare alla leggera |
| Supabase | `@supabase/ssr ^0.5`, `supabase-js ^2.108` | Auth + prenotazioni (oggi *non attivo*, vedi §1.10) |
| Animazioni | `framer-motion ^11`, `lenis` (smooth scroll) | |
| UI | shadcn/ui (`new-york`), `lucide-react`, `class-variance-authority` | |
| Test | **nessuno** | Non esiste suite di test |

Comandi (`package.json`): `npm run dev` · `build` · `start` · `lint` · `typecheck` (`tsc --noEmit`) · `format` · `seed` · `migrate:days` · `generate-sessions`.

### 1.3 Struttura cartelle
```
app/                  Route (App Router)
  (site)/             Route group: tutte le pagine pubbliche (navbar/footer/smooth-scroll)
  api/                /api/contact, /api/revalidate, /api/cron/generate-sessions
  auth/callback/      Callback magic-link Supabase
  studio/[[...tool]]/ Sanity Studio embeddato (/studio), client-only (ssr:false)
  layout.tsx, sitemap.ts, robots.ts, opengraph-image.tsx, icon.png, apple-icon.png
components/
  sections/  ui/  motion/  layout/  brand/  media/  providers/  + componenti root
content/              studio-content.ts (testi reali per il seed)
docs/                 prompt.md (brief), TESTI-DISCIPLINE.md (copy discipline)
lib/                  site.ts (dati statici), instagram.ts, sessions/, supabase/, fonts, motion, strings, utils
sanity/               env, lib/ (client/fetch/data/queries/image), schemaTypes/ (9 schemi), structure, types
scripts/              seed, migrate-schedule-days, generate-sessions, remove-instructor
supabase/             schema.sql (DB prenotazioni)
middleware.ts         Refresh sessione Supabase (no-op se non configurato)
NOTES.md              ⭐ Log decisionale fase per fase (0→17) — leggere
```
> **NON** copiare/committare: `node_modules/`, `.next/`, `*.tsbuildinfo`, `.env*.local`, `preview/`. Si rigenerano (`npm install` + `npm run build`).

### 1.4 Le pagine (route)
| URL | Dati | Note SEO |
|---|---|---|
| `/` Home | Sanity (discipline, orari, testimonianze, FAQ) + **Instagram/Behold** | canonical `/` |
| `/discipline` e `/discipline/[slug]` | Sanity (`getDisciplines`, `getDisciplineBySlug` + orari) | JSON‑LD `Course` + breadcrumb |
| `/orari` | Sanity (`getSchedule`) + `ScheduleExplorer` (filtri) | |
| `/prezzi` | Sanity (`getPricing`) | nella sitemap ✓ |
| `/chi-siamo` | Sanity (insegnanti + testimonianze) + contenuti statici | |
| `/contatti` | Statico (`lib/site`) + `ContactForm` (→ Resend) + mappa OSM | |
| `/galleria` | Sanity (`getGallery`) + lightbox | |
| `/news` e `/news/[slug]` | Sanity (`getNews`, filtro `published==true`) | JSON‑LD `BlogPosting` |
| `/prenota` `/accedi` `/area` `/admin` | **Supabase** (oggi inattivo → fallback WhatsApp / "in arrivo") | `noindex` |
| `/privacy` `/cookie` | Statico | canonical propri |
| `/studio` | Sanity Studio (editor contenuti) | escluso da robots/middleware |
| `/styleguide` | Statico (design system) | `noindex`, escluso da robots |

Render: pagine pubbliche **SSG + ISR** (i fetch Sanity usano `revalidate: 300`; gli slug `3600`). Nessun `export const dynamic` di pagina (tranne `/api/cron` `force-dynamic`, `/api/revalidate` runtime node, `/studio` `force-static`).

### 1.5 Design system (KINETIC) — la "firma"
Tutto in **`app/globals.css`** (`@theme`). Tre pilastri (dettaglio in `NOTES.md` Fase 0):
- **Chromatic Shadow** (`components/motion/chromatic-shadow.tsx`): titoli display con ombra magenta che in hover scivola e vira al ciano. Riservata a hero/titoli.
- **Ritmo Luce/Stage** (`components/layout/section.tsx`, prop `tone`): `light` = sfondo `paper` chiaro; `stage` = applica `.dark`, sfondo `ink` scuro + glow. Le sezioni si alternano.
- **La Spina** (`Spine`): hairline verticale = "il palo", struttura del layout.

**Palette** (token → utility Tailwind `bg-*/text-*`): `paper #FAF3F4`, `ink #0D0D0F`, `ink-soft #2A2A2E`, `brand #F087DD` (orchidea del logo), `brand-strong #B81FA8` (testo/CTA, contrasto AA), `electric #FF2EC4` (**solo glow su scuro**), `cyan #2EE6FF` (**solo** split della firma), `line` (hairline). **Regole d'uso strette** — rispettarle.
**Font**: Archivo (display, asse `wdth` espanso), Inter (body), Geist Mono (eyebrow/CTA). In `lib/fonts.ts`.
**Motion** (`lib/motion.ts`): `EASE_OUT [0.16,1,0.3,1]`, `SPRING_SNAP`, ecc. Tutto degrada a statico con `prefers-reduced-motion`.

### 1.6 Componenti chiave
- **Button** (`components/ui/button.tsx`): varianti `default`/`brand`/`outline`/`ghost`/`link`, size `default/sm/lg/icon`. La `brand` è la CTA magenta con effetto "shine" (luce diagonale in hover). **Usa sempre questo componente** per i bottoni, non stili a mano.
- Sezioni home: `Hero`, `Manifesto`, `DisciplineRail` (scroll orizzontale draggabile), `WhyClimb`, `SchedulePreview` (oggi/domani), **`InstagramFeedSection`**, `PricingTeaser`, `Testimonials`, `Faq` (accordion `<details>` zero‑JS), `Statement` (testo scrubbed allo scroll), `Location` (mappa Leaflet+OSM).
- Globali: `Navbar` (mega‑menu + drawer mobile), `Footer`, `WhatsappFab`, `SmoothScroll` (Lenis), `StructuredData` (JSON‑LD LocalBusiness).
- **Componenti orfani** (definiti ma non usati, rimuovibili): `discipline-showcase.tsx`, `custom-cursor.tsx`, `page-placeholder.tsx`.

### 1.7 CMS Sanity (i contenuti)
- Project **`shudbapr`**, dataset **`production`**, org Sanity **`ov69sdLqb`**. Editor su **`/studio`**.
- **9 document types** (`sanity/schemaTypes/`): `siteSettings` (singleton: contatti/social/SEO), `discipline`, `instructor`, `scheduleSlot` (template orario; `day` salvato come `"1-lun"…"6-sab"` per l'ordinamento, normalizzato in lettura da `dayCode()`), `pricingPlan`, `galleryItem`, `newsPost` (gate `published==true`), `testimonial`, `faq`.
- Lettura: `sanity/lib/data.ts` (getter tipizzati) → `sanity/lib/fetch.ts` (`sanityFetch`, ISR + tag globale `"sanity"`) → `client.ts` (`useCdn:false`, `perspective:"published"`, **read‑only senza token**).
- Scrittura solo via script CLI con `SANITY_API_TOKEN` (permesso *Editor*). I contenuti reali stanno in `content/studio-content.ts` e vengono caricati con `npm run seed` (idempotente, `_id` col **trattino** mai col punto).

### 1.8 Revalidation (Studio → online in pochi secondi) — *fatto, ma da attivare*
Implementato il 2026‑06‑23. Ogni lettura Sanity ha il tag `"sanity"`; la rotta **`POST /api/revalidate`** (`app/api/revalidate/route.ts`) verifica la firma del webhook (`SANITY_REVALIDATE_SECRET`) e fa `revalidateTag("sanity")`. **Manca**: impostare il secret su Vercel + creare il webhook su Sanity (vedi §3 · M3).

### 1.9 Instagram (Behold) — *fatto, ma da attivare*
`lib/instagram.ts` legge il feed JSON gratuito di **Behold** (`feeds.behold.so/$BEHOLD_FEED_ID`, ISR 1h). La sezione `InstagramFeedSection` (home, sotto "Prossime lezioni") mostra gli ultimi 6 post; **se manca `BEHOLD_FEED_ID` si nasconde da sola**. **Manca**: l'ID feed su Vercel (vedi §3 · M3).

### 1.10 Auth + Prenotazioni (Supabase) — *scaffold completo ma OPZIONALE e oggi spento*
Tutto il flusso (magic‑link passwordless, area personale, admin, prenotazioni con anti‑overbooking) è **costruito** ma gira solo se ci sono le chiavi Supabase. **Oggi `.env.local` non le ha → il sito mostra ovunque il fallback WhatsApp / "in arrivo".** Non è un bug: è il design "Supabase opzionale".
- DB in `supabase/schema.sql` (3 tabelle `profiles`/`class_session`/`booking`, RLS, RPC atomica `book_session`, trigger auto‑profilo).
- Le sessioni prenotabili si generano dagli `scheduleSlot` di Sanity con `npm run generate-sessions` o il **cron Vercel** (lunedì 03:00, protetto da `CRON_SECRET`).
- Punti aperti se lo si attiva: `/admin` è minimale (solo conteggio), nessuna promozione automatica della waitlist, nessun "annulla prenotazione" in UI, timezone naïve (ISO senza `Z`, assunto Torino), CTA "Prenota" in `/area` punta a `/orari`.

### 1.11 Script e cron
| Comando | Cosa fa | Env |
|---|---|---|
| `npm run seed` | Popola Sanity dai contenuti reali (idempotente, **sovrascrive** i doc seed) | `SANITY_API_TOKEN` |
| `npm run migrate:days` | Migrazione storica formato giorni (già applicata) | `SANITY_API_TOKEN` |
| `npm run generate-sessions` | Genera le `class_session` da Sanity → Supabase (4 settimane) | Sanity + `SUPABASE_SERVICE_ROLE_KEY` |
| `npx tsx scripts/remove-instructor.ts <id>` | Rimuove un insegnante in sicurezza (niente alias npm) | `SANITY_API_TOKEN` |
| Cron Vercel | `GET /api/cron/generate-sessions` ogni lunedì 03:00 | `CRON_SECRET` |

### 1.12 Variabili d'ambiente (tabella completa)
Copiare `.env.example` → `.env.local`. **Pubbliche** = `NEXT_PUBLIC_*` (finiscono nel bundle). **Segrete** = mai esporre al client.

| Variabile | Tipo | Serve per | Stato |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | pubblica | URL base (canonical, sitemap, OG, magic‑link) | ⚠️ impostare a `https://climbpolestudio.it` in prod |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | pubblica | Sanity (`shudbapr`) | ✅ presente |
| `NEXT_PUBLIC_SANITY_DATASET` | pubblica | Sanity (`production`) | ✅ presente |
| `NEXT_PUBLIC_SANITY_API_VERSION` | pubblica | Sanity (`2024-10-01`) | ✅ presente |
| `SANITY_API_TOKEN` | **segreta** | seed/scrittura Sanity (Editor) | in `.env.local`, **da trasferire** |
| `SANITY_REVALIDATE_SECRET` | **segreta** | webhook revalidation | ❌ da impostare (Vercel + Sanity) |
| `BEHOLD_FEED_ID` | server‑side | feed Instagram | ❌ da impostare (Vercel) |
| `NEXT_PUBLIC_SUPABASE_URL` | pubblica | auth/prenotazioni | ❌ vuota (feature spenta) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | pubblica | auth/prenotazioni | ❌ vuota |
| `SUPABASE_SERVICE_ROLE_KEY` | **segreta** | generazione sessioni | ❌ vuota |
| `CRON_SECRET` | **segreta** | protegge il cron | ❌ vuota |
| `RESEND_API_KEY` | **segreta** | email form contatti | ❌ da impostare |

### 1.13 Stato attuale e disallineamenti noti (da sapere)
- 🌐 **Il dominio `climbpolestudio.it` NON punta ancora a Vercel**: l'app è live su **`climbpolestudio-it.vercel.app`**; il `.it` mostra ancora il **vecchio WordPress**. Il cutover DNS è rimandato (vedi §3 · M6).
- 📄 `README.md` è **obsoleto** (dice "Fase 1 — non verificata"): in realtà siamo oltre la Fase 17, build verificate più volte. Fidarsi di **`NOTES.md`**.
- 📝 `NOTES.md` si ferma al 2026‑06‑19: **non documenta** revalidation webhook e Instagram (2026‑06‑23) — questo file li copre.
- 🧾 `lib/site.ts` → `legal.taxId` è **vuoto**: serve il **C.F./P.IVA dell'A.S.D.** (compare nell'informativa privacy).
- 🖼️ **Mancano gli asset reali del cliente**: foto pro (studio/lezioni/insegnanti), video hero definitivo, foto disciplina. Ovunque c'è fallback a stock Unsplash / monogrammi.

---

## 2. Servizi terzi

### 2.1 Servizi attivi
| Servizio | A cosa serve | Account / ID | Piano |
|---|---|---|---|
| **GitHub** | Repository del codice | `github.com/retroemulator/climbpolestudio.it` | — |
| **Vercel** | Hosting + deploy automatico (push su `main` → deploy) | progetto su `climbpolestudio-it.vercel.app` | **Hobby (gratis)** |
| **Sanity** | CMS contenuti (`/studio`) | project `shudbapr`, org `ov69sdLqb` (2 membri) | Free |
| **Behold** | Feed Instagram (ultimi 6 post) | feed collegato a `@climbpolestudio` | Free |
| **Instagram/Meta** | Profilo studio (sorgente Behold; va Business/Creator) | `@climbpolestudio` | — |
| **Google Business Profile** | Scheda Google Maps/Search | pagina già esistente | — |
| **Register.it** | Registrar del dominio `climbpolestudio.it` | pannello cliente | — |

> ⚠️ **Nota ToS Vercel**: il piano **Hobby è per uso non commerciale**. Un sito di un'attività, a rigore, richiede il piano **Pro**. Valutare l'upgrade prima/insieme al go‑live (serve anche se si vogliono veri membri di team su Vercel — vedi sotto).

### 2.2 Passaggio di proprietà (chi controlla cosa)
Stato attuale dichiarato: il nuovo referente è **collaborator su GitHub** e **"co‑amministratore"** sull'hosting. Per un passaggio pulito:

**GitHub (il codice — la cosa più importante):**
- *Opzione consigliata*: **Transfer ownership** del repo al nuovo account (Repo → Settings → Danger Zone → *Transfer*). Il nuovo proprietario accetta; storia/branch restano. Poi aggiornare il `remote` locale.
- *Oppure*: creare un'**Organizzazione** GitHub e renderlo **Owner** (utile se più persone gestiranno il sito).

**Vercel (l'hosting):**
- Su **Hobby non esistono veri co‑amministratori** (i membri di team sono solo su Pro). Strade:
  1. Far **reimportare** il repo nel **Vercel del nuovo proprietario** (lui fa login con GitHub → *Add New Project* → importa → i deploy partono dal suo account). È il passaggio reale di proprietà dell'hosting. Poi tu cancelli il vecchio progetto.
  2. Oppure **upgrade a Pro** e invitarlo come membro del team.
- ⚠️ Dopo il passaggio, **re‑inserire tutte le Environment Variables** sul nuovo progetto Vercel (non si trasferiscono da sole) e **riconfigurare il webhook Sanity** con il nuovo URL se cambia.

**Sanity (CMS):** org `ov69sdLqb` → **Members** → invitare il nuovo proprietario (anche come admin). I contenuti restano; cambia solo chi può editarli/gestire i token.

**Behold (Instagram):** l'account Behold andrebbe creato/intestato con l'email del **proprietario finale** (login email/Google/GitHub). Behold non ha trasferimento comodo: meglio crearlo già "giusto". Conta l'**Instagram Business/Creator** collegato + l'**ID feed** in `BEHOLD_FEED_ID`.

**Register.it (dominio):** rimane del cliente; per il go‑live serve solo accedere al **pannello DNS** (vedi §3 · M6). Verificare anche chi è l'intestatario/contatti del dominio.

### 2.3 Servizi ancora DA configurare
| Servizio | Scopo | Cosa fare |
|---|---|---|
| **Resend** | Email del **form contatti** (`/api/contact`, invia da `noreply@climbpolestudio.it`) | Creare account, **verificare il dominio** `climbpolestudio.it` (record SPF/DKIM su Register.it), generare `RESEND_API_KEY` → Vercel. Senza chiave il form mostra fallback WhatsApp (503). |
| **SSL / Let's Encrypt** | Certificato HTTPS rinnovabile | ✅ **Automatico con Vercel**: quando colleghi il dominio, Vercel emette e **rinnova da solo** il certificato Let's Encrypt. Non serve gestirlo a mano. (Solo: nessun record `CAA` su Register.it deve bloccare Let's Encrypt.) |
| **Prenotazioni online** *(da decidere)* | Booking lezioni | Due strade: **(A)** attivare il **Supabase già scaffoldato** (vedi §1.10 e §3 · M9) — gratis, integrato, ma va rifinito; **(B)** un tool esterno (es. widget di booking) linkato dal sito. **Il cliente non ha ancora deciso.** Finché non si decide, "Prenota" porta a WhatsApp. |

---

## 3. Azioni rimanenti & go‑live — Milestone

Ordine consigliato. Ogni milestone è una checklist autonoma; il nuovo Claude Code può prenderne una alla volta.

### ✅ M1 — Passaggio account & ambiente locale
- [ ] Trasferire/condividere **GitHub** (§2.2) e **Sanity members**.
- [ ] Nuovo PC: installare **Node 20** + Claude Code (vedi §5), `git clone`, `npm install`.
- [ ] Ricreare **`.env.local`** dai segreti (vedi §6) — è gitignorato, **non** arriva da GitHub.
- [ ] `npm run dev` e verificare che il sito giri in locale (Sanity legge i contenuti reali).
- [ ] **Rigenerare** il `SANITY_API_TOKEN` dopo il passaggio (igiene di sicurezza).

### ✅ M2 — Variabili d'ambiente su Vercel
- [ ] Reinserire su Vercel (Settings → Environment Variables, Production) tutte le var note: i 3 `NEXT_PUBLIC_SANITY_*`, `SANITY_API_TOKEN`, e **`NEXT_PUBLIC_SITE_URL = https://climbpolestudio.it`**.
- [ ] **Redeploy** dopo ogni aggiunta (le env si attivano solo con un nuovo deploy).

### ✅ M3 — Attivare le 2 feature già pronte (revalidation + Instagram)
- [ ] **Revalidation**: generare un secret casuale → `SANITY_REVALIDATE_SECRET` su Vercel → su `sanity.io/manage/project/shudbapr/api/webhooks` creare webhook `POST` verso `https://climbpolestudio.it/api/revalidate` (dataset `production`, trigger Create/Update/Delete, stesso secret) → Redeploy. Test: modifica nello Studio → online in pochi secondi.
- [ ] **Instagram/Behold**: prendere il **Feed ID** da behold.so → `BEHOLD_FEED_ID` su Vercel → Redeploy. La sezione appare in home.

### ✅ M4 — Contenuti & asset reali (debito principale)
- [ ] Caricare in **Sanity** (`/studio`) le **foto reali**: discipline (campo `media.image`), insegnante (Nadia), galleria. Sostituiscono in automatico gli stock.
- [ ] **Video hero** definitivo (oggi provvisorio): vedi `components/sections/hero.tsx` / `public/hero.*`.
- [ ] Rivedere testi (copy pronto in `docs/TESTI-DISCIPLINE.md`), orari e listino (Studio → `scheduleSlot` / `pricingPlan`).
- [ ] Inserire **C.F./P.IVA dell'A.S.D.** → `lib/site.ts` `legal.taxId` (per l'informativa privacy).

### ✅ M5 — Email form contatti (Resend)
- [ ] Account Resend, verifica dominio `climbpolestudio.it` (record DNS su Register.it), `RESEND_API_KEY` su Vercel, Redeploy. Test invio dal form `/contatti`.

### ✅ M6 — 🌐 GO‑LIVE: dominio `climbpolestudio.it` → Vercel (da Register.it)
> Oggi il `.it` punta al vecchio WordPress. Questo è lo switch.
- [ ] Su **Vercel** → progetto → **Settings → Domains** → *Add* `climbpolestudio.it` **e** `www.climbpolestudio.it`. Vercel mostrerà i **record DNS esatti** da impostare.
- [ ] Su **Register.it** → pannello **Gestione DNS** del dominio: rimuovere i vecchi record che puntano a WordPress e impostare quelli di Vercel. Tipicamente:
  - **A** `@` → `76.76.21.21`
  - **CNAME** `www` → `cname.vercel-dns.com`
  - *(usare ESATTAMENTE i valori che Vercel indica nella pagina Domains)*
- [ ] Abbassare il **TTL** prima dello switch per propagazione rapida; la propagazione può richiedere fino a 24‑48h.
- [ ] Verificare che non ci siano record **CAA** che blocchino Let's Encrypt. L'**HTTPS si attiva da solo** (Vercel/Let's Encrypt, rinnovo automatico).
- [ ] In Vercel impostare il **redirect** da `www` ad apex (o viceversa) come dominio primario.
- [ ] ⚠️ Considerare l'**upgrade a Vercel Pro** (uso commerciale, ToS) prima del go‑live.
- [ ] Dopo il cutover: aggiornare l'**URL del webhook Sanity** e `NEXT_PUBLIC_SITE_URL` se non già sul dominio reale.

### ✅ M7 — SEO finale
- [ ] Confermare `NEXT_PUBLIC_SITE_URL` = dominio reale (canonical, OG, sitemap dipendono da lì).
- [ ] **Google Search Console**: verificare la proprietà, inviare `sitemap.xml`, richiedere reindicizzazione.
- [ ] Bing Webmaster Tools (opzionale). Controllare `robots.txt` (`/robots.txt`) e i dati strutturati con il Rich Results Test.
- [ ] Redirect 301 dalle vecchie URL WordPress (se cambiano i path) per non perdere ranking.

### ✅ M8 — Sicurezza / hardening
- [ ] Aggiungere **security headers** (CSP, `X-Frame-Options`, `Referrer-Policy`, HSTS) via `next.config.ts` `headers()` o `vercel.json`.
- [ ] **Rate‑limit** sul form `/api/contact` (oltre all'honeypot già presente) per evitare abuso.
- [ ] Verificare che i **segreti** siano solo server‑side (mai `NEXT_PUBLIC_`) — già rispettato.
- [ ] Se si attiva Supabase: ricontrollare le **RLS** e tenere la `service_role` solo lato server.
- [ ] Rotazione periodica di token/secret; rimuovere i collaboratori non più necessari.

### ⏸️ M9 — (Opzionale) Attivare le prenotazioni Supabase
- [ ] Decidere se attivarle (vedi §2.3). Se sì: creare progetto Supabase, eseguire `supabase/schema.sql`, impostare le 4 env (`NEXT_PUBLIC_SUPABASE_URL/ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`), `npm run generate-sessions`, testare magic‑link + prenotazione.
- [ ] Rifinire i punti aperti elencati in §1.10 (admin, waitlist, annullo, timezone).

### ✅ M10 — Google Business Profile → vedi §4.

---

## 4. Google Business Profile

La scheda Google è fondamentale per il **local SEO** (Torino) e deve essere **coerente** con i dati strutturati `LocalBusiness` già presenti nel sito (`components/structured-data.tsx`, da `lib/site.ts`).

**Dati da usare (identici al sito — la coerenza NAP conta):**
- **Nome**: `Climb Pole Studio`
- **Indirizzo**: Corso Dante 109/A, 10126 Torino (TO)
- **Telefono**: +39 393 025 1482
- **Sito**: `https://climbpolestudio.it` (dopo il go‑live)
- **Orari**: Lun–Ven 13:00–21:30 · Sabato 11:00–16:00 · Domenica chiuso

**Checklist configurazione:**
- [ ] **Rivendicare e verificare** la scheda (Google la verifica via codice postale/telefono/video). Account Google del proprietario.
- [ ] **Categoria principale** coerente (es. *Scuola di danza* / *Palestra* / *Centro fitness*) + categorie secondarie (Pilates/Yoga se pertinenti).
- [ ] **NAP** esattamente come sopra (stessa formattazione del sito → aiuta il ranking locale).
- [ ] **Orari** allineati al sito e a Sanity (`siteSettings.openingHours`).
- [ ] **Sito web** → dominio reale; **pulsante WhatsApp/telefono**.
- [ ] **Foto** di qualità (esterno, interno/sala, lezioni) — le stesse che caricherai in Sanity.
- [ ] **Servizi/Prodotti**: elencare le discipline (Pole Dance, Cerchio Aereo, Functional, Flexibility, Verticali, Exotic).
- [ ] **Descrizione** con keyword locali ("pole dance Torino", "arti aeree Torino").
- [ ] Attivare **recensioni** (chiedere agli allievi) e rispondere; pubblicare **Post** periodici (open day, saggi).
- [ ] Verificare che il **link Maps** del sito (`lib/site.ts` `mapsUrl`) punti alla scheda corretta.

---

## 5. Configurare Claude Code sul nuovo PC

**Claude Code lavora sulla cartella da cui lo lanci** — non c'è nulla da "collegare". Passi:

1. **Copia la cartella** del progetto sul nuovo PC (oppure, meglio, `git clone` dopo il passaggio GitHub). **Escludi** `node_modules/`, `.next/`, `*.tsbuildinfo` (si rigenerano).
2. Installa **Node 20** (es. da nodejs.org o `nvm`).
3. Installa **Claude Code**: `npm install -g @anthropic-ai/claude-code`, poi `claude` e fai **login** con l'account del nuovo utente.
4. Apri il **terminale dentro** la cartella `climbpolestudio.it` e lancia `claude`. Da lì legge/modifica tutto il progetto.
   - In **VS Code**: apri la cartella (`File → Apri cartella`) e usa l'estensione Claude Code; lavora già sulla cartella aperta.
5. Ripristina le dipendenze e i segreti:
   ```bash
   npm install
   # crea .env.local copiando .env.example e incollando i valori segreti (vedi §6)
   npm run dev
   ```
6. (Consigliato) Di' al nuovo Claude Code: **«Leggi `HANDOFF.md` e `NOTES.md` prima di iniziare.»** — così riparte con tutto il contesto.
   - Opzionale: rinominare/duplicare punti chiave in un file **`CLAUDE.md`** alla radice (Claude Code lo legge in automatico a ogni sessione).

> 🔁 **Git/deploy**: il progetto è collegato a GitHub→Vercel. Ogni `git push` su `main` fa il deploy. Assicurati che `git remote -v` punti al repo giusto dopo il passaggio.

---

## 6. Appendice

### Comandi rapidi
```bash
npm install            # dipendenze
npm run dev            # sviluppo (localhost:3000)
npm run typecheck      # controllo tipi (fai SEMPRE prima di pushare)
npm run build          # build di produzione (verifica pre-deploy)
npm run seed           # ripopola Sanity (richiede SANITY_API_TOKEN)
npm run generate-sessions  # genera sessioni prenotabili (se Supabase attivo)
```

### File con i segreti (da trasferire a mano, NON sono su GitHub)
- **`.env.local`** — contiene `SANITY_API_TOKEN` (e, se attivati, le chiavi Supabase/Resend/Cron). È **gitignorato**: passalo in modo sicuro (non via email/chat in chiaro) oppure ricrea i valori dai rispettivi pannelli. **Rigenera i token dopo il passaggio.**
- Tutti gli altri segreti vivono nei pannelli: **Vercel** (Environment Variables), **Sanity** (API → Tokens), **Behold**, **Resend**, **Supabase**.

### Link utili
- App live (staging): `https://climbpolestudio-it.vercel.app`
- Studio (CMS): `https://climbpolestudio-it.vercel.app/studio`
- Sanity manage: `https://www.sanity.io/manage/project/shudbapr`
- Repo: `https://github.com/retroemulator/climbpolestudio.it`
- Behold: `https://behold.so` · Resend: `https://resend.com` · Register.it: `https://www.register.it`

---

*Per la cronologia decisionale completa (perché certe scelte) vedi `NOTES.md` (Fasi 0‑17) e `docs/prompt.md` (brief originale).*
