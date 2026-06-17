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

**Prossima — Fase 4 (Sanity):** setup + schemi (§6) + Studio `/studio` + seed contenuti reali
(§5) + query GROQ tipizzate.
