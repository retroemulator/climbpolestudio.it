# NOTES — decisioni & cose provate

Log delle scelte di design/architettura, fase per fase (brief §12).
Le date sono assolute. Stato repo: build **verificata a runtime** dal 2026-06-17
(Node 24.16.0 LTS installato via winget — vedi Fase 1 § "Collaudo runtime").

---

## Fase 0 — Design plan (APPROVATO 2026-06-17)

### Concept guida: "Gravità & Ascensione"

Tre dispositivi _ownable_ (non portabili su un altro business = test "non-template"):

1. **La Spina (il palo)** — hairline verticale continua come asse strutturale; il logo già fa
   del palo la "I" di CLIMB.
2. **Chromatic Shadow** — firma: display ink + duplicato magenta sfalsato, letto come
   _after-image di un corpo in movimento_ (atterra al load, si splitta su hover/scroll-velocity,
   si ricompone). Solo su hero + titoli di sezione.
3. **Ritmo Luce / Stage** — sezioni alternate `paper` (chiaro, editoriale, info) e `ink`
   (palco scuro, dove vivono media e glow magenta).

### Token colore (derivati dal logo reale)

| Token            | Hex                  | Uso                                            |
| ---------------- | -------------------- | ---------------------------------------------- |
| `--color-paper`  | `#FAF3F4`            | sfondo "luce"                                  |
| `--color-ink`    | `#0D0D0F`            | testo su chiaro / sfondo "stage"               |
| `--color-brand`  | `#F087DD`            | orchidea **reale del logo** · fill/glow/decoro |
| `--color-brand-strong` | `#B81FA8`      | accenti testuali/CTA su chiaro (**AA ~5:1**)   |
| `--color-electric` | `#FF2EC4`          | glow/kinetic SOLO su scuro (mai testo)         |
| `--color-cyan`   | `#2EE6FF`            | SOLO lo split RGB della firma, minimale        |

- `--brand` allineato all'**orchidea campionata dal logo** (`#F087DD`), non al `#E880E0` del
  brief → schermo == logo. _(Decisione utente, 2026-06-17.)_
- Contrasto verificato a mano: ink/paper ~17:1; brand-strong/paper ~5.0:1 (passa AA testo
  normale); brand/paper ~1.9:1 → **mai testo**, solo decoro.

### Tipografia (3 ruoli, free + self-hosted)

- **Display** = **Archivo** variable, asse `wdth` → **espanso** (concept "allungo/estensione").
  Scelto al posto di Clash Display (troppo "font-template"). Asse `wdth` animabile = gancio
  kinetic. _(Decisione utente: Archivo, 2026-06-17.)_
- **Body** = **Inter** variable.
- **Utility/Mono** = **Geist Mono** (eyebrow, orari, prezzi, label).

### Auto-critica vs default "AI/templated"

- **Rischio #1 — pink+nero = cliché "fitness femminile".** Reale, ma è il brand. Mitigazione:
  riqualificare il magenta come _segnale elettrico/energia_ (nero "palco" duro, scala brutale,
  mono-accento disciplinato, Chromatic Shadow come movimento). Da "carino" a "kinetic".
- Evitati: cream+serif+terracotta, nero+verde-acido, broadsheet, Clash Display.
- Rischio residuo (pin-scroll/marquee/magnetic = cliché award-site) → ogni motion legato al
  soggetto + firma in un punto solo + la Spina come struttura vera.

### Scoperte sul logo (analisi pixel reale)

- `logo.svg` = **PNG 1600² in maschera di luminanza** (non vettoriale). Inizialmente JPEG con
  sfondo bianco; **aggiornato dall'utente a versione trasparente** ✓ (verificato: angoli alpha 0).
- Marchio/wordmark **nero** → su sezioni scure servirà variante chiara (TODO Fase 3, navbar).
- Generati in Fase 1: `public/logo.png` (composito trasparente), favicon `app/icon.png` +
  `app/apple-icon.png` (climber orchidea su tile ink, no testo).

---

## Fase 1 — Scaffold (2026-06-17)

**Fatto:** progetto Next 15 + TS strict + Tailwind v4 + shadcn (foundation) + next/font (3
famiglie) + Lenis (provider reduced-motion aware) + Framer Motion (dep) + ESLint/Prettier.
Token di brand e semantici shadcn in `app/globals.css`. Home placeholder che prova lo stack.
Stringhe IT centralizzate (`lib/strings.ts`). Asset logo + favicon in `public/`/`app/`.

**Scelte:**

- **Tailwind v4** (CSS-first, `@theme`) invece di v3: meno config, token in CSS coerenti col
  brief. shadcn con `cssVariables: true`.
- **Niente `.dark` globale**: il buio è per-sezione (ritmo luce/stage). I token `.dark` ci sono
  per gli isolotti scuri (es. navbar su hero) e per i componenti shadcn.
- `next/font/google` (self-hosta a build) invece di `next/font/local`: non avendo Node/rete non
  posso scaricare i `.woff2` ora; Google li self-hosta in build. Stesso risultato.

**Cose da sapere / rischi (per la prima esecuzione con Node):**

- `lib/fonts.ts`: se la build lamenta l'asse `wdth` di Archivo, rimuovere `axes: ["wdth"]`
  (fallback documentato inline). Il resto non dipende da quell'asse.
- Versioni in `package.json` con range `^`: possibili patch più recenti alla prima install.
- **Il tool Write scrive CRLF** su questa macchina Windows: gli edit multilinea vanno fatti come
  rewrite o a riga singola.

### Collaudo runtime (2026-06-17) ✓

Node assente in sviluppo → installato **Node 24.16.0 LTS** (`winget install OpenJS.NodeJS.LTS`,
nessun account richiesto). Primo vero collaudo dello stack:

- `npm install` → 335 pacchetti, ok.
- `npm run build` (produzione) → **pulita, 0 errori** TS/ESLint. L'asse `wdth` di Archivo
  (rischio #1) **regge**: nessun fallback necessario. 7 route prerenderizzate; home 154 kB,
  styleguide 161 kB First Load JS.
- `npm run dev` → ready in ~1.4s; `/` e `/styleguide` rispondono 200; QA visiva su home OK
  (Chromatic Shadow, Spina, marquee, CTA renderizzano come da design).
- **`npm audit` (2 moderate, postcss <8.5.10 XSS): NON si tocca.** È una dep *interna* di Next
  (build-time), non sfruttabile col nostro uso (nessun CSS non fidato nello stringify); l'unico
  "fix" proposto (`--force`) downgradderebbe Next a 9.3.3. Rumore di audit, decisione: ignorare.

---

## Fase 2 — Design System (2026-06-17)

**Fatto:** la firma e le primitive di motion/layout/media + una pagina styleguide.

- **`ChromaticShadow`** (`components/motion/chromatic-shadow.tsx`) — la firma: reveal in-view
  (il fantasma "atterra"), split RGB su hover (magenta + traccia cyan) → ricompone, **statico**
  con reduced-motion. Solo transform/opacity (no filtri). Layer fantasma `aria-hidden`.
- **Motion primitives** (`components/motion/`): `Reveal` + `RevealText` (parola-per-parola),
  `Marquee` (reattivo alla **velocità di scroll**), `Magnetic`, `Parallax`, `CustomCursor`
  (solo puntatore fine, off con reduced-motion). Costanti in `lib/motion.ts`.
- **`Media`** (`components/media/media.tsx`) — primitiva **video-ready ma non video-dipendente**:
  renderizza SEMPRE l'immagine (poster/fallback, LCP-safe); mostra il video SOLO se c'è
  `videoUrl` e non è reduced-motion / data-saver / mobile. Aggiungere un video = incollare l'URL,
  zero codice.
- **Layout** (`components/layout/`): `Section` (tone `light`/`stage` per il ritmo luce/stage),
  `Container`, `Spine` (la "spina"/palo).
- **`/styleguide`** (noindex) — riferimento vivo: token, tipografia, signature, bottoni, reveal,
  marquee, parallax, media. Da usare per QA visiva alla prima esecuzione.
- Home aggiornata a placeholder che **mostra il sistema in uso**.

**Scelte / note:**

- Componenti polimorfici (`as`) senza ref sul Tag (ref interno / `whileInView`) → niente attriti
  TS con `React.ElementType`.
- `RevealText`: spaziatura parole via `mr-[0.25em]` (non spazio in-contenuto) così il testo va a
  capo correttamente.
- `CustomCursor` **non** è montato globalmente: lo fa la Fase 3 (layout). Per ora è in styleguide.

**TODO aperti (prossime fasi):**

- `logo.png` ~360KB: valutare ottimizzazione / vettoriale originale dal cliente.

---

## Fase 3 — Layout (2026-06-17)

**Fatto:** navbar globale, footer, page transitions, montaggio globale di
`CustomCursor`/`SmoothScroll`, e le rotte dell'IA (brief §4) come placeholder navigabili.

- **Data layer `lib/site.ts`** — fonte unica per STRUTTURA: `navItems` + `routes`, le 6
  discipline (slug+blurb), `contact`/`socials` con i **dati reali** (§5), `whatsappUrl`
  precompilato. In Fase 4 questi verranno da Sanity `siteSettings`; il file resta seed/fallback.
  (`lib/strings.ts` resta per le etichette UI pure.)
- **`Logo`** (`components/brand/logo.tsx`) — wordmark tipografico "CL|MB" con la "I" = la Spina
  in brand. **Usa `currentColor`** → funziona su chiaro e scuro: **risolve il TODO "variante
  logo chiara"** senza un secondo asset. Niente Chromatic Shadow qui (firma riservata a hero/
  titoli di sezione).
- **`Navbar`** — `fixed`, sempre in tono chiaro (`.dark` → testo paper) perché vive sopra un
  hero "stage" su ogni pagina. In cima: trasparente; **scrolled** (`scrollY>8`): vetro scuro
  `bg-ink/70` + blur + hairline. **Mega-menu Discipline** (hover/focus, `AnimatePresence`),
  **drawer mobile** full-screen (lock scroll, Esc, chiusura al cambio rotta). CTA Prenota +
  Accedi. Utility `.navlink` in `globals.css`.
- **`Footer`** — server component, sempre "stage". Banda CTA di chiusura + griglia
  contatti/nav/social + riga legale (privacy/cookie). Tutto da `lib/site` (tel/mail/WhatsApp).
- **`app/template.tsx`** — transizione di **entrata** per rotta (fade+rise). Scelta su
  template.tsx invece di AnimatePresence-exit: l'exit puro non è affidabile in App Router senza
  FrozenRouter. Da rivalutare con le **View Transitions API** quando stabili. Off con reduced-motion.
- **Montaggio globale** in `layout.tsx`: `SmoothScroll` > `Navbar` + children + `Footer`.
- **`CustomCursor` NON montato (decisione utente 2026-06-17):** il cursore custom (anello) non
  piace → rimosso dal layout e dalla styleguide; torna il cursore di sistema. Il componente
  resta in `components/motion/` ma inutilizzato (riattivabile se cambia idea).
- **Pagine placeholder** (`PagePlaceholder`): `/discipline` (griglia) + `/discipline/[slug]`
  (SSG via `generateStaticParams`, 404 su slug ignoto), `/orari`, `/prezzi`, `/chi-siamo`,
  `/contatti`, `/prenota`, `/accedi`, `/privacy`, `/cookie`. Servono a far girare layout e
  transizioni su rotte vere; si rimpiazzano una alla volta nelle Fasi 6–13.

**Regola di design introdotta:** *ogni pagina inizia con un hero "stage" (scuro)* così la navbar
trasparente in cima legge sempre su scuro. (Eccezione: `/styleguide`, pagina interna noindex
con tema chiaro — lì la navbar è leggibile solo da scrolled; accettabile.)

**Collaudo:** `npm run build` pulita, **22 route** (incl. 6 discipline SSG). Dev: tutte le rotte
200; slug disciplina ignoto → 404 corretto.

**TODO Fase 3 → chiusi:** ~~variante logo chiara~~ (Logo tipografico), ~~navbar/footer/transizioni/
montaggio globale~~.

---

## Fase 4 — Sanity / CMS (2026-06-17)

**Fatto:** CMS Sanity completo — schemi §6, Studio embeddato su `/studio`, client + query GROQ
tipizzate, script di seed coi dati reali §5. Project ID **`shudbapr`**, dataset **`production`**.

- **Stack/versioni (vincolo importante):** `next-sanity@11` (peer Next `^15.1`; la v12+ vuole
  Next 16) + **`sanity@4.22` / `@sanity/vision@4.22`**. `sanity@5/6` richiede React ≥19.2.2
  (usa `useEffectEvent`), ma **Next 15.5 fa il bundle di una sua copia di React 19.0/19.1** →
  errore `useEffectEvent is not exported`. La v4 (peer React `^18||^19`) evita il problema.
  *Quando passeremo a Next 16 si potrà salire a sanity 5/6 + next-sanity 12/13.*
- **Architettura route:** introdotto il route group **`app/(site)/`** con il proprio
  `layout.tsx` (SmoothScroll + Navbar + Footer). Il root `app/layout.tsx` è ora minimale
  (html/body/font/metadata). Così **`/studio` NON eredita** chrome né smooth-scroll del sito.
  (Il route group non cambia gli URL.) Tutte le pagine marketing spostate sotto `(site)/`.
- **Studio client-only:** `/studio` falliva in *page-data collection* (`createContext is not a
  function`: la config Sanity valutata sul server). Risolto caricando lo Studio via
  `next/dynamic` **`ssr:false`** (`studio-loader` → `StudioInner`), isolando l'import della
  config nel chunk client. Bundle route piccolissimo; lo Studio si scarica on-demand.
- **Schemi** (`sanity/schemaTypes/`): `siteSettings` (singleton via `structure.ts`), `discipline`,
  `instructor`, `scheduleSlot` (template orario §7), `pricingPlan`, `galleryItem`, `newsPost`,
  `testimonial`.
- **Client/lib:** `sanity/env.ts` (env validate), `lib/client.ts` (useCdn, published),
  `lib/image.ts` (`urlFor`), `lib/fetch.ts` (`sanityFetch` con revalidate/tag, `server-only`),
  `lib/queries.ts` (GROQ via `defineQuery`), `sanity/types.ts` (tipi a mano; typegen in futuro).
- **Seed** (`scripts/seed.ts`, `npm run seed`): popola siteSettings + 6 discipline + **31 slot
  orario** + **18 voci di listino** coi dati reali §5. Idempotente (delete-by-query dei tipi
  gestiti + `createOrReplace` con _id deterministici). Carica le env con `@next/env`. Richiede
  `SANITY_API_TOKEN` (Editor). **Eseguito e verificato (lettura pubblica OK).**
- **⚠️ Gotcha _id con punto:** la prima passata usava _id tipo `discipline.pole-dance` →
  i documenti risultavano **esclusi dalla lettura pubblica** (`omitted: reason "permission"`),
  mentre `siteSettings` (senza punto) era leggibile. Sanity riserva il `.` a namespace speciali
  (`drafts.`/`versions.`/`system.`). **Fix: _id con trattino** (`discipline-pole-dance`,
  `slot-…`, `price-…`); il seed ripulisce prima i vecchi doc dottati. **Regola: mai punti negli
  _id custom.**
- **Env:** `.env.local` (con projectId, **token da inserire**) + `.env.example` aggiornato.

**Collaudo:** `npm run build` pulita (23 route, `/studio` inclusa); `npm run typecheck` pulito;
dev: sito + `/studio` rispondono 200 (Studio compila ~11s al primo accesso, normale).

**Ancora da fare (utente):** creare il **token Editor** su sanity.io/manage → metterlo in
`.env.local` → `npm run seed`. Poi `/studio` mostrerà i contenuti. **CORS**: aggiungere
`http://localhost:3000` (e poi il dominio) in API → CORS origins.

**Prossima — Fase 5 (Home):** hero video + sezioni kinetic, leggendo i contenuti da Sanity
(le query sono pronte in `lib/queries.ts`).

---

## Fase 5 — Home (2026-06-17)

**Fatto:** home definitiva, **contenuti reali da Sanity**, ritmo Luce/Stage. Server Component
che fa fetch in parallelo (discipline/orari/listino) e compone 7 sezioni client-aware.

- **Data layer** `sanity/lib/data.ts`: getter tipizzati (`getDisciplines/getSchedule/getPricing`)
  via `sanityFetch` (ISR **revalidate 300s**). Home avvolge i fetch in `safe()` → se Sanity è
  irraggiungibile la pagina rende comunque (sezioni vuote → `null`, hero con fallback statico).
- **Sezioni** (`components/sections/`): `Hero` (Media video-ready + poster stock, ChromaticShadow
  "Climb", marquee discipline), `Manifesto` (light), `DisciplineShowcase` (indice editoriale
  kinetic da Sanity), `WhyClimb` (4 pilastri), `SchedulePreview` (griglia 6 giorni dai 31 slot),
  `PricingTeaser` (mensili + annuale dal listino), `Location` (indirizzo + mappa placeholder +
  WhatsApp). Footer globale chiude.
- **Sequenza tono:** stage → light → stage → light → stage → light → stage → footer(stage).
- `lib/site.ts`: aggiunto `weekdays` (chiavi giorni → etichette), riusato dalla preview orari e
  dalla futura `/orari`.
- Poster hero = stock Unsplash provvisorio (verrà sostituito da foto/video reali). Per attivare
  il video basta passare `videoUrl` al `Media` (zero codice, da Sanity in futuro).

**Collaudo:** `npm run build` pulita; home **SSG+ISR** (164 kB First Load, revalidate 5m); dev:
home 200, HTML contiene i dati reali (Pole Dance, 13:00, € 120, Corso Dante). Nessun errore.

**Aperti per dopo:** sezioni team/gallery/testimonianze (mancano contenuti+foto reali, schemi già
pronti); horizontal-scroll pinnato discipline (enhancement); foto/video reali dello studio.

**Prossima — Fase 6:** schede disciplina `/discipline/[slug]` (da Sanity: body, livelli, a chi è
adatto, cosa imparerai, slot collegati).
