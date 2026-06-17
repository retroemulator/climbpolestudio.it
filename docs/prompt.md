# MEGA-PROMPT — Sito web Climb Pole Studio

> Da incollare in **Claude Code**. È pensato come brief completo: stack, design, contenuti reali (orari + listino già trascritti), schema CMS, sistema di prenotazione e ordine di build in fasi. Puoi darlo tutto in una volta o per fasi (vedi §12).

---

## 0. Come usare questo prompt

Sei il **design lead + full-stack engineer** di uno studio creativo. Il cliente ha già scartato proposte "templated" e paga per un punto di vista distintivo. Prima di scrivere codice, **completa la fase di design (§12, Fase 0)**: produci un piano di design (token + tipografia + layout + signature), critica te stesso contro questo brief e solo dopo costruisci. Procedi per fasi, fai commit atomici e tieni un file `NOTES.md` con scelte e cose provate.

**Lingua sito:** italiano (copy in italiano). Predisponi la struttura per un eventuale EN futuro (stringhe centralizzate), ma **non** implementare i18n completo ora.

---

## 1. Brief & obiettivo

**Climb Pole Studio** — studio di arti aeree e movimento a Torino. Discipline: **Pole Dance, Cerchio Aereo, Functional Training, Flexibility, Verticali** (più varianti: Exotic, Intro to Pole, Pole Combo, Allenamento Libero).

**Obiettivo:** un sito con **effetto wow reale** — deve far sbavare. I competitor di settore (es. turinpoledancestudio.com, queenpoledanceasd.com, trudansing.com) sono template WordPress datati: il nostro deve essere **nettamente superiore** per movimento, tipografia e fotografia. Direzione scelta: **BOLD & KINETIC**.

Obiettivi di business:
1. Comunicare l'energia e la professionalità dello studio (conversione: prova gratuita / contatto).
2. Far **prenotare le lezioni online** (con account, capienza posti — **senza pagamenti**).
3. Dare a **Nadia** (titolare) un pannello per gestire corsi, orari, prezzi e contenuti in autonomia.

---

## 2. Identità & direzione creativa (design brief)

### Sistema di token (colori) — derivati dal logo reale
```
--paper        #FAF3F4   /* off-white caldo, sfondo principale (sezioni "luce") */
--paper-pure   #FFFFFF
--ink          #0D0D0F   /* near-black, testo e sezioni "stage" */
--ink-soft     #2A2A2E
--brand        #E880E0   /* ORCHIDEA del logo — colore di brand esatto (estratto dal PNG) */
--brand-strong #B81FA8   /* magenta saturo per link/CTA/testo accent su sfondo chiaro — VERIFICARE contrasto AA */
--electric     #FF2EC4   /* magenta elettrico SOLO per glow/effetti kinetic su sezioni scure (mai testo su chiaro) */
```
Regole: testo corpo sempre `--ink` su chiaro / `--paper` su scuro. `--brand-strong` per accenti testuali (verifica AA, ≥4.5 per testo normale). `--brand` e `--electric` per fill, glow, bordi, elementi decorativi. Costruisci sezioni alternate **"luce" (paper)** e **"stage" (ink)**: lo scuro fa esplodere i video e il magenta.

### Tipografia (proposta — finalizza nella Fase 0)
- **Display** (hero, titoli sezione): **Clash Display** (Fontshare) Bold/Semibold — carattere con personalità, non sovraesposto. *Alternativa:* Archivo Expanded Black per claim ultra-wide.
- **Body**: **Inter** (o Geist) — neutro, lascia respirare il display.
- **Utility/dati** (eyebrow, orari, prezzi, label): **Geist Mono** o IBM Plex Mono, usato con parsimonia (dà un taglio editoriale/tech alla griglia orari).
- Usa `next/font` self-hosted (display: swap). Scala tipografica netta, pesi e tracking intenzionali, titoli **uppercase**.

### 🔑 SIGNATURE ELEMENT — "Chromatic Shadow"
L'elemento memorabile del sito, ispirato al trattamento dei titoli nei materiali Canva del cliente: **testo display in `--ink` con un duplicato magenta sfalsato di pochi px** (aberrazione cromatica / ombra glitch).
- Reveal al load: i layer convergono (magenta → posizione) con stagger.
- Hover/scroll: rapido **RGB-split** (magenta in una direzione, eventuale cyan `#2EE6FF` molto leggero nell'altra) che poi si ricompone. Mantienilo prevalentemente **monocromatico magenta** per restare on-brand; il cyan è opzionale e minimale.
- **Usalo solo su hero + titoli di sezione principali.** Tutto il resto resta disciplinato e pulito. Spendi l'audacia in un punto solo.
- Layer leggibile = testo scuro ad alto contrasto; il magenta è decorativo. Versione `prefers-reduced-motion`: ombra statica, niente jitter, leggibilità garantita.
- Implementazione: layered con pseudo-elementi (`::before/::after` con `text-shadow`/`clip-path`) o duplicati assoluti, animati con Framer Motion / CSS. Niente filtri pesanti che uccidono le performance.

### Motion (BOLD & KINETIC) — orchestrato, non sparpagliato
- **Smooth scroll** con Lenis.
- **Hero**: video fullscreen muto in loop (autoplay, `playsInline`), overlay/gradiente per leggibilità, wordmark gigante con Chromatic Shadow animato, scroll cue.
- **Marquee/ticker** reattivo alla velocità di scroll: `POLE • CERCHIO AEREO • FLEXI • FUNCTIONAL • VERTICALI •`.
- **Scroll-driven**: reveal del testo (split per parola/riga), parallax sui media, una sezione **discipline in horizontal-scroll pinnata**.
- **Micro-interazioni**: bottoni magnetici, hover su card (scale/tilt leggero), image-hover reveal, cursore custom sottile (off con reduced-motion).
- **Transizioni di pagina** (View Transitions API / Framer).
- **Niente fake-stats** "01/02/03" o contatori inventati: usa numeri solo se reali (numeri forniti dal cliente). I marker numerati solo se rappresentano una vera sequenza (es. i livelli).
- **Reduced motion**: disattiva glitch/parallax/marquee-autoplay → versioni statiche. Focus visibile, navigazione da tastiera.

### Tone of voice (copy)
Energico, diretto, inclusivo, mai gergale-da-sistema. Voce attiva ("Prenota la prova", non "Invia"). Stesso termine in tutto il flusso (il bottone "Prenota" produce il toast "Prenotato"). Inclusivo e non stereotipato. Niente claim sessualizzanti gratuiti: forza, tecnica, espressione, community.

---

## 3. Stack tecnico

- **Next.js 15** (App Router, TypeScript, Server Components dove sensato).
- **Tailwind CSS** + **shadcn/ui** (componenti base accessibili).
- **Sanity v3** — CMS contenuti, Studio embeddato in `/studio` (`next-sanity`, `@sanity/image-url`).
- **Supabase** (Postgres + **Auth** + RLS) — utenti, sessioni prenotabili, prenotazioni. *Motivazione:* bundle auth+db+RLS, ottimo su Vercel. *(Alternativa equivalente: Neon + Drizzle + Clerk.)*
- **Framer Motion** (animazioni) + **Lenis** (smooth scroll).
- **Resend** (email: form contatti + conferme prenotazione) — alternativa Formspree per il solo form.
- Deploy **Vercel**, dominio **climbpolestudio.it**.
- Qualità: ESLint + Prettier, TypeScript strict, `next/image` per tutte le immagini, `next/font`.

---

## 4. Architettura informativa (pagine)

| Route | Contenuto |
|---|---|
| `/` | Hero video → manifesto → showcase 5 discipline (kinetic) → "perché Climb" (forza/flessibilità/espressione/community) → preview orari → teaser prezzi → Nadia/team → striscia gallery → testimonianze (se disponibili) → location+orari+CTA → footer |
| `/discipline/[slug]` | Pole Dance, Cerchio Aereo, Functional Training, Flexibility, Verticali (+ Exotic). Hero media, descrizione, livelli/a chi è adatto, cosa imparerai, slot in orario collegati, CTA "Prenota prova" |
| `/orari` | Griglia settimanale interattiva (da Sanity), filtri per disciplina/giorno/livello; click slot → dettaglio + "Prenota" |
| `/prezzi` | Listino completo (mensili, trimestrali, semestrali, Annuale Open, pack, lezioni private, iscrizione) + note rate + CTA |
| `/prenota` | Flusso: scegli disciplina → sessioni in arrivo (con posti disponibili) → login/registrazione → conferma. Enfasi sulla prova gratuita/di prova |
| `/area-personale` | Dashboard allievo: prenotazioni in arrivo, storico, annulla, profilo |
| `/chi-siamo` | Storia studio + Nadia + filosofia + lo spazio (Corso Dante 109/A) + team |
| `/galleria` | Foto + video (curati in Sanity) |
| `/contatti` | Mappa (Corso Dante 109/A), WhatsApp, telefono, email, orari, form contatti |
| `/news` | News/eventi/workshop (opzionale, da Sanity) |
| `/studio` | Sanity Studio (gestione contenuti — Nadia) |
| `/admin` | Area protetta: gestione sessioni + visione prenotazioni (v1 minimale, role-based) |
| `/accedi`, `/registrati` | Auth (consigliato magic link Supabase) |
| `/privacy`, `/cookie` | Pagine legali GDPR (placeholder, le compila il cliente) |

Navbar: logo + Discipline (mega-menu con le 5), Orari, Prezzi, Chi siamo, Contatti, **Prenota** (CTA evidenziato), Accedi/Area personale. Sticky con stato scrolled. Footer: contatti, social, mappa mini, orari, legali, credit.

---

## 5. Contenuti & dati reali da inserire (SEED)

> Usa questi dati per popolare Sanity con contenuti d'esempio reali. Stagione **dal 14 settembre 2026 al 27 giugno 2027**.

### Contatti / brand
- Titolare: **Nadia Senatore**
- WhatsApp/Tel: **+39 393 025 1482**
- Email: **info@climbpolestudio.it**
- Indirizzo: **Corso Dante 109/A, 10126 Torino, Italia**
- Dominio: **climbpolestudio.it**
- Social: Instagram `@climbpolestudio`, Facebook (profilo studio), Instagram titolare `@_nadia.senatore_`
- Logo: triangolo orchidea + silhouette pole, nero/bianco. *(Asset: vedi §14 — serve SVG/PNG trasparente.)*

### Orario corsi (griglia settimanale)
**LUNEDÌ** — 13:00 Pole Open (anche Base1) · 17:30 Base1 · 18:30 Pole Base 2 · 19:45–20:45 Cerchio
**MARTEDÌ** — 11:30–12:30 Exotic Intermedio · 13:00 Cerchio · 16:30–18:00 Allenamento Libero · 18:30 Pole Int/Adv · 19:30 Allenamento Funzionale · 20:30 Base1
**MERCOLEDÌ** — 11:00–12:30 Allenamento Libero · 13:00 Pole Open (anche Base1) · 18:30 Intro to Pole · 19:30 Flessibilità · 20:30 Pole Open (no Base1)
**GIOVEDÌ** — 11:30–12:30 Exotic Base · 13:00 Cerchio · 16:00–17:30 Allenamento Libero · 18:00 Base1 · 19:00 Pole Base 2 · 20:00 Pole Intermedio
**VENERDÌ** — 11:00–12:30 Allenamento Libero · 13:00 Pole Open (anche Base1) · 17:30 Intro to Pole · 18:30 Flessibilità/Allenamento Funz · 19:30 Pole Combo
**SABATO** — 10:30 Cerchio · 12:00 Intro/Base 1 · 13:00 Pole Base2/Intermedio · 14:00 Verticali · pomeriggio: Workshop & Lab

### Listino prezzi
**Iscrizione annuale: € 40**

| Tipo | Dettaglio | Prezzo |
|---|---|---|
| Mensile | 2 volte/sett — 8 lezioni | € 120 |
| Mensile | 3 volte/sett — 12 lezioni | € 165 |
| Trimestrale * | 2 volte/sett — 24 lezioni | € 325 |
| Trimestrale * | 3 volte/sett — 36 lezioni | € 430 |
| Trimestrale Cerchio | 2 volte/sett — 24 lezioni | € 370 |
| Semestrale ** | 2 volte/sett — 48 lezioni | € 610 |
| Semestrale ** | 3 volte/sett — 72 lezioni | € 800 |
| Annuale Open ** | Tutte le lezioni che vuoi (valido fino al 27/06/2027) | € 1450 |
| Pack ingressi | 10 ingressi — durata 6 mesi | € 185 |
| Pack ingressi | 20 ingressi — durata 12 mesi | € 340 |
| Pack Cerchio | 10 ingressi — durata 3 mesi | € 180 |
| Pack Allenamento Libero | 10 — durata 6 mesi | € 100 |
| Lezione singola | — | € 20 |
| Allenamento singolo | — | € 15 |
| Privata 60 min | a discrezione dell'insegnante | da € 40 |
| Privata 90 min | a discrezione dell'insegnante | da € 50 |
| Pack 5 lezioni private | a discrezione dell'insegnante | da € 175 |

\* Pagabile in 2 rate &nbsp;&nbsp; ** Pagabile in 3 rate

> ⚠️ Modella i prezzi come **contenuto editabile in Sanity** (vedi §6), non hardcoded: il cliente deve poterli cambiare.

### Discipline (testi base — riscrivili migliori, tono §2)
- **Pole Dance** — danza, ginnastica e fitness fino all'acrobatico e artistico; sviluppa forza, ritmo, tonicità, autostima. Livelli: Base 1, Base 2, Intermedio, Int/Adv, Open.
- **Cerchio Aereo** — disciplina aerea su cerchio: forza, eleganza, controllo, figure sospese.
- **Functional Training** — preparazione fisica e condizionamento a supporto delle aeree (Allenamento Funzionale).
- **Flexibility / Flessibilità** — mobilità e flessibilità (adatta anche da zero) per movimenti più armoniosi e prevenzione.
- **Verticali** — handstand e equilibri: forza, allineamento, controllo.
- **Exotic** (variante Pole, su tacchi) — Base e Intermedio.

---

## 6. CMS (Sanity) — schemi documento

Crea questi schemi e popola con i dati §5. Studio in `/studio`.

- **siteSettings** (singleton): nome, payoff, logo, contatti (tel/WhatsApp/email/indirizzo + geo lat/lng), orari apertura, social (array), SEO default, OG image.
- **discipline**: title, slug, ordine, sommario, descrizione (rich text/Portable Text), livelli (array), "a chi è adatto", "cosa imparerai", media (immagine + videoUrl), galleria, color accent override (opz.).
- **instructor**: nome, ruolo, bio, foto, discipline (ref), social.
- **scheduleSlot**: discipline (ref), titolo visualizzato (es. "Pole Base 2"), livello, giorno (lun–sab), orarioInizio, durataMin, insegnante (ref), **capienza** (int), note. *(Questi slot rappresentano l'orario settimanale pubblicato e fungono da template per generare le sessioni prenotabili — vedi §7.)*
- **pricingPlan**: categoria (mensile/trimestrale/semestrale/annuale/pack/privata/iscrizione), titolo, dettaglio, prezzo, note (rate), badge ("più scelto" opz.), ordine.
- **galleryItem**: tipo (foto/video), media/posterUrl, didascalia, tag disciplina (ref), ordine.
- **newsPost**: titolo, slug, data, cover, excerpt, body, pubblicato.
- **testimonial**: autore, testo, rating, foto (opz.).

Esponi un endpoint/query GROQ tipizzata per ogni tipo. Usa `@sanity/image-url` per le immagini responsive.

---

## 7. Booking + Auth (Supabase) — modello dati & flusso

**Niente pagamenti.** Prenotazione con account + capienza posti.

### Tabelle (Postgres)
- **profiles**: `id uuid pk references auth.users`, `full_name`, `phone`, `created_at`. Trigger su signup per crearlo.
- **class_session**: `id`, `slot_ref` (id dello scheduleSlot Sanity, text), `title`, `discipline`, `level`, `starts_at timestamptz`, `duration_min`, `capacity int`, `instructor`, `status`, `created_at`. *(Istanza datata di uno slot.)*
- **booking**: `id`, `session_id fk`, `user_id fk`, `status` (`confirmed` | `cancelled` | `waitlist`), `created_at`. **Unique(session_id, user_id)**.

### Generazione sessioni (dallo schedule Sanity)
La UX "creare corsi" sta in **Sanity** (Nadia definisce gli `scheduleSlot` settimanali con capienza). Una **server action / cron Vercel** materializza le `class_session` concrete per una finestra mobile (es. prossime 4 settimane), evitando duplicati (idempotente su `slot_ref + starts_at`). Documenta la funzione e rendila ri-eseguibile.
> *Alternativa più semplice se preferisci:* Nadia crea le sessioni direttamente da `/admin` (CRUD su `class_session`). Implementa quella se la generazione automatica complica troppo il v1 — ma la generazione da Sanity è la UX migliore.

### Flusso prenotazione (`/prenota`)
1. Utente sceglie disciplina/giorno → lista sessioni in arrivo con **posti disponibili** (`capacity − count(confirmed)`).
2. Se non loggato → login/registrazione (Supabase, **magic link** consigliato).
3. Conferma → crea `booking confirmed` **se ci sono posti** (controllo capienza via RPC/trigger atomico per evitare overbooking); altrimenti proponi **waitlist**.
4. Email di conferma (Resend) + voce in `/area-personale`.
5. **Annulla** entro X ore dall'inizio (configurabile); l'annullamento libera il posto (promuovi il primo in waitlist se presente — nice-to-have).

### RLS (obbligatorio)
- `profiles`: l'utente legge/aggiorna solo il proprio.
- `class_session`: lettura pubblica; scrittura solo `admin`.
- `booking`: l'utente vede/gestisce solo le proprie; `admin` vede tutte.
- Ruolo `admin` via custom claim / tabella ruoli. Service-role key **solo server-side**.

### Area personale
Prossime prenotazioni, storico, annulla, modifica profilo. Stato vuoto come invito all'azione ("Non hai ancora prenotato — scopri gli orari").

---

## 8. Pannello admin (`/admin`, role-based, v1 minimale)

- Elenco sessioni con **occupazione** (X/capienza) e lista iscritti per sessione.
- Trigger generazione sessioni / CRUD sessioni (se usi l'alternativa).
- Export iscritti (CSV) per sessione — nice-to-have.
- Tutto il resto dei contenuti (corsi, prezzi, gallery, news) si gestisce in **Sanity Studio** `/studio`.

---

## 9. Integrazioni

- **WhatsApp**: bottone flottante + CTA → `https://wa.me/393930251482` con messaggio precompilato ("Ciao Nadia, vorrei informazioni su…").
- **Instagram**: per il v1 **galleria curata in Sanity** + link al profilo (niente dipendenze da API IG). Feed live opzionale in seguito (es. Behold).
- **Google Maps**: embed mappa su `/contatti` (Corso Dante 109/A, Torino) + link "Indicazioni".
- **Email**: form contatti → **Resend** → `info@climbpolestudio.it`; email di conferma prenotazione.
- **Mappa/telefono/email** cliccabili (`tel:`, `mailto:`).

---

## 10. SEO / Performance / Accessibilità

- **Metadata** per pagina (title/description) + Open Graph dinamiche (`next/og`), favicon dal logo.
- **JSON-LD** `SportsActivityLocation`/`LocalBusiness`: nome, indirizzo, geo, telefono, `openingHours`, `sameAs` (social), `priceRange`.
- `sitemap.xml`, `robots.txt`, `lang="it"`.
- **Performance**: video con `poster`, lazy, **fallback immagine su mobile** (no autoplay pesante con data-saver) per non distruggere LCP; `next/image` ovunque; font `display: swap`; budget Lighthouse **≥ 90** mobile.
- **Accessibilità**: `prefers-reduced-motion` rispettato (signature/parallax/marquee), contrasto AA (attenzione al magenta su chiaro → usa `--brand-strong` verificato; testo corpo sempre `--ink`), focus visibile, HTML semantico, label su tutti i campi, `alt` su tutte le immagini, navigazione tastiera completa.

---

## 11. Repo, env, deploy

- Repo GitHub suggerito: **`climb-pole-studio`**. Deploy **Vercel**. Dominio `climbpolestudio.it`.
- Struttura: `app/`, `components/` (`ui/`, `motion/`, `sections/`), `sanity/` (schemas, lib, queries), `lib/` (supabase client/server, utils), `styles/`, `content/` (seed).
- **Env**:
  ```
  NEXT_PUBLIC_SITE_URL
  SANITY_PROJECT_ID / SANITY_DATASET / SANITY_API_TOKEN
  NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY
  RESEND_API_KEY
  ```
- README con setup (Sanity, Supabase migrations/RLS, seed, run, deploy).

---

## 12. Ordine di build (fasi)

- **Fase 0 — Design plan & critica.** Token (4–6 hex), tipografia (display/body/utility), concept di layout (wireframe ASCII), **signature** (Chromatic Shadow). Confronta col brief: se qualcosa somiglia ai default AI (cream+serif+terracotta / nero+verde-acido / broadsheet) → rivedi e spiega cosa hai cambiato. **Non costruire prima di aver validato l'unicità.**
- **Fase 1 — Scaffold.** Next 15 + TS + Tailwind + shadcn + `next/font` + Lenis + Framer Motion. Lint/format.
- **Fase 2 — Design system.** Token CSS, tipografia, **componente Chromatic Shadow**, primitive di motion, componenti base.
- **Fase 3 — Layout.** Navbar (mega-menu discipline, stato scrolled), footer, smooth scroll, transizioni di pagina.
- **Fase 4 — Sanity.** Setup + schemi (§6) + Studio `/studio` + seed contenuti reali (§5) + query GROQ tipizzate.
- **Fase 5 — Home.** Hero video + tutte le sezioni con motion kinetic. (Critica con screenshot.)
- **Fase 6 — Discipline** (`/discipline/[slug]`).
- **Fase 7 — Orari** (griglia interattiva da Sanity, filtri).
- **Fase 8 — Prezzi** (da Sanity).
- **Fase 9 — Supabase.** Schema + RLS + Auth (magic link).
- **Fase 10 — Prenotazione.** Generazione sessioni dallo schedule + flusso `/prenota` + controllo capienza atomico + email.
- **Fase 11 — Area personale.**
- **Fase 12 — Admin** (minimale).
- **Fase 13 — Chi siamo, Galleria, Contatti, News.**
- **Fase 14 — Integrazioni** (WhatsApp, mappa, form email, OG, JSON-LD).
- **Fase 15 — SEO / Performance / A11y / Responsive QA** (reduced-motion, mobile, Lighthouse).
- **Fase 16 — Deploy** Vercel + env + dominio.

Dopo ogni fase: commit, aggiorna `NOTES.md`, breve auto-critica.

---

## 13. Definition of done / criteri qualità

- [ ] Effetto wow reale: hero video + Chromatic Shadow + motion orchestrato (non sparpagliato).
- [ ] Responsive impeccabile fino a mobile; tutto degrada con grazia (video → poster).
- [ ] `prefers-reduced-motion` rispettato ovunque; focus visibile; AA sul testo.
- [ ] Lighthouse mobile ≥ 90 (Perf/A11y/Best/SEO).
- [ ] Nadia gestisce corsi/orari/prezzi/gallery/news da `/studio` senza toccare codice.
- [ ] Prenotazione end-to-end: registrazione → scelta sessione → conferma con capienza → email → visibile in area personale → annullabile.
- [ ] Nessun overbooking (controllo capienza atomico).
- [ ] JSON-LD LocalBusiness + metadata + OG + sitemap + robots.
- [ ] Prezzi e orari **editabili da CMS**, non hardcoded.
- [ ] README completo; env documentate; deploy su Vercel funzionante.

---

## 14. Cosa devo preparare io (asset & account) — *nota per me, non per Claude Code*

- **Logo** in **SVG + PNG trasparente** (ora ho solo JPG): serve per navbar/favicon/OG nitidi.
- **Video pro** (hero + discipline): clip verticali e orizzontali, possibilmente 1080p+/H.264, loop puliti, con **poster/frame** per fallback. Tenere i pesi bassi (compressione) per LCP.
- **Foto pro** dello studio, lezioni, Nadia/insegnanti.
- **Testi**: bio Nadia/insegnanti, storia studio, eventuali testimonianze reali, numeri reali (anni di attività, allievi) se vogliamo contatori veri.
- **Account/chiavi**: progetto **Sanity**, progetto **Supabase**, **Resend** (dominio email verificato), accesso **Vercel** + DNS dominio `climbpolestudio.it`.
- **Conferma** (vedi assunzioni qui sotto).

---

## Assunzioni prese (da confermare/modificare)

1. **Lingua:** solo italiano per il v1, struttura pronta per EN futuro. *(Se vuoi EN subito, aggiungo next-intl.)*
2. **Booking layer:** Supabase (auth + DB + RLS). *(Alternativa Neon + Clerk + Drizzle se preferisci.)*
3. **Nessun pagamento online** (come da tua scelta). Aggiungibile dopo (Stripe).
4. **Capienza posti** gestita per sessione; waitlist come nice-to-have.
5. **Gallery** curata in Sanity (no API Instagram nel v1).
6. **Insegnanti:** per ora Nadia; struttura `instructor` pronta per aggiungerne.
7. Le **discipline** principali sono 5 (Pole, Cerchio Aereo, Functional, Flexibility, Verticali) + Exotic come variante Pole.
