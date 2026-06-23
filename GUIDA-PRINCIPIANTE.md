# 🌱 Guida per principianti — Gestire il sito Climb Pole Studio

> Sei la persona che da oggi si occuperà del sito **climbpolestudio.it** e **non hai mai usato** un terminale, GitHub, Vercel, Sanity o Claude Code? Questa guida è scritta apposta per te: spiega **ogni cosa da zero**, un passo alla volta, senza dare nulla per scontato.
>
> 👉 **Leggi i capitoli in ordine**, almeno le prime volte. Il **Capitolo 1** (glossario) e il **Capitolo 2** (installazione) sono le fondamenta: parti da lì.
> 📘 Quando vorrai i dettagli più tecnici del progetto, accanto a questo file c'è **`HANDOFF.md`** (riferimento per chi sviluppa e per Claude Code).
> 🛟 **Regola d'oro:** quasi tutto è **reversibile**. In caso di dubbio, puoi sempre **chiedere a Claude Code** di spiegarti cosa sta succedendo — è fatto apposta.

## Indice
1. Glossario e concetti base (parti da qui)
2. Primo giorno: installare tutto e aprire il progetto
3. Usare Claude Code (il tuo assistente che modifica il sito)
4. Cambiare testi, foto, orari e prezzi (Sanity Studio)
5. Vercel: dove vive il sito online (deploy e variabili)
6. Attivare il feed Instagram in home (Behold)
7. Mandare il sito sul dominio vero climbpolestudio.it (Register.it)
8. Far funzionare il modulo contatti (email con Resend)
9. Sistemare la scheda Google (Google Business Profile)
10. Quando qualcosa non va: piccola guida ai problemi

---

## 1. Glossario e concetti base (parti da qui)

Prima di "mettere le mani" sul sito, ti spiego le parole che incontrerai. Leggile con calma. Non devi impararle a memoria: ti basta sapere che esistono, così quando le rivedrai nei capitoli dopo non ti spaventeranno. Tranquillo: niente di quello che leggi qui può rompere qualcosa. Stiamo solo dando un nome alle cose.

### Il terminale (riga di comando)
È una finestra dove scrivi ordini al computer a parole, invece di cliccare con il mouse. Pensa a un assistente molto preciso: tu scrivi una frase, premi Invio, e lui esegue. Non ha bottoni colorati, solo testo. Sembra serio, ma è solo un modo diverso (e più veloce) di parlare col computer.

### Cartella e percorso
Una cartella è esattamente come le cartelle che già conosci sul computer: un contenitore di file. Il "percorso" è l'indirizzo completo di quella cartella, tipo `C:\Temp\CLAUDE CODE\climbpolestudio.it`. È come l'indirizzo di casa: dice dove si trova esattamente, partendo dal disco fino alla stanza giusta.

### Comando
Un comando è la frase che scrivi nel terminale per far fare qualcosa al computer. Una riga, un'azione. Per esempio "elenca i file" oppure "avvia il sito". Ogni comando ha un nome e a volte delle opzioni dopo, come "fai questa cosa, ma in questo modo".

### Node e NPM
Node è il "motore" che fa funzionare il sito sul computer: senza di lui il sito non parte, come un'auto senza motore. NPM è il suo "magazziniere": scarica e tiene in ordine tutti i pezzi (le librerie) di cui il sito ha bisogno. Per questo progetto serve Node nella versione 20.

### Codice sorgente
È il sito scritto in forma di testo: tutte le istruzioni che dicono come appare e come si comporta. È la "ricetta" del sito. Sono tanti file di testo organizzati in cartelle. Non devi scriverlo tu: ci penserà Claude Code (lo vedi più sotto).

### Git (la "macchina del tempo" del codice)
Git tiene la cronologia di ogni modifica fatta al codice sorgente. Ogni volta che cambi qualcosa, lui salva una "fotografia" del prima e del dopo. Così puoi sempre tornare indietro se qualcosa va storto. È la tua rete di sicurezza: con Git non perdi mai il lavoro.

### GitHub (l'archivio online)
GitHub è il posto su internet dove vive la cronologia di Git, al sicuro e sempre disponibile. È come una cassaforte online del codice: anche se il tuo computer si rompe, il codice è là. Il nostro è su `github.com/retroemulator/climbpolestudio.it`.

### Repository
Il repository (o "repo") è la cartella del progetto, completa di tutta la sua cronologia Git. In pratica è "il progetto intero, con la sua macchina del tempo incorporata". Quando parliamo del repository su GitHub, intendiamo quella cartella custodita online.

### Commit e push
Un commit è una singola "fotografia salvata" nella cronologia: tu raccogli le modifiche fatte e le registri con una breve descrizione ("ho cambiato il titolo"). Il push è il gesto di mandare quelle fotografie da computer a GitHub. Prima fai il commit (salvi), poi il push (spedisci).

### Branch (cenno)
Un branch è un "ramo" parallelo dove provare modifiche senza toccare la versione buona. Per ora ti basta sapere che il ramo principale, quello ufficiale, si chiama `main`. Lavorerai quasi sempre lì.

### Deploy
Fare il deploy significa "pubblicare" il sito: prendere il codice e renderlo visibile e funzionante su internet. È il momento in cui le tue modifiche passano dal computer al sito vero, online, che tutti possono vedere.

### Hosting (Vercel)
L'hosting è il servizio che tiene il sito acceso su internet 24 ore su 24, come l'affitto di un negozio sempre aperto. Il nostro hosting è Vercel. La cosa comoda: ogni volta che fai push su GitHub, Vercel se ne accorge e fa il deploy da solo. Il piano attuale è quello gratuito ("Hobby").

### Dominio e DNS (la "rubrica" di internet)
Il dominio è l'indirizzo che le persone digitano per arrivare al sito: `climbpolestudio.it`. Il DNS è la rubrica telefonica di internet: tu scrivi il nome (il dominio) e il DNS sa a quale "numero" (il server, cioè Vercel) collegarti. Oggi il dominio punta ancora al vecchio sito; cambiare questa rubrica sarà il go-live.

### HTTPS e certificato
HTTPS è la versione sicura del collegamento: il lucchetto chiuso che vedi vicino all'indirizzo nel browser. Vuol dire che i dati viaggiano protetti. Il "certificato" è il documento che garantisce questa sicurezza. Buona notizia: su Vercel si attiva e si rinnova da solo, non devi pensarci.

### CMS (Sanity)
Un CMS è un pannello comodo per cambiare testi e foto del sito senza toccare il codice. Il nostro si chiama Sanity. È come l'editor di un blog: entri, modifichi una frase o sostituisci un'immagine, salvi, e il sito si aggiorna. L'editor è su `climbpolestudio-it.vercel.app/studio`.

### Variabile d'ambiente (le "chiavi" segrete)
Sono informazioni riservate che il sito usa per collegarsi ad altri servizi: password, codici, chiavi d'accesso. Pensa al mazzo di chiavi di casa: non lo lasci sotto lo zerbino. Per questo le chiavi segrete non finiscono su GitHub, ma stanno in un file a parte (`.env.local`) e dentro Vercel.

### Claude Code
Claude Code è un assistente con intelligenza artificiale che scrive e modifica il codice sorgente per te, direttamente dal terminale. Tu gli spieghi a parole cosa vuoi ("sposta il pulsante più in alto"), e lui lo fa nei file. È come avere un programmatore paziente seduto accanto, a cui dare istruzioni in italiano normale.

### La mappa mentale (tieni a mente questa)
- Il **codice** del sito sta su **GitHub** (la cassaforte online).
- Quando fai **push**, **Vercel** se ne accorge e **pubblica** il sito online (deploy).
- I **contenuti** (testi e foto) si cambiano comodamente da **Sanity**, senza toccare il codice.
- Il **dominio** `climbpolestudio.it` è l'indirizzo, e il **DNS** è la rubrica che lo collega a Vercel.
- **Claude Code** è l'assistente che, dal **terminale**, modifica il codice per te.

## 2. Primo giorno: installare tutto e aprire il progetto

In questo capitolo facciamo partire il sito **sul tuo computer**. Solo sul tuo, per ora: nessuno su Internet vedrà quello che fai. È come provare una ricetta in cucina prima di servirla agli ospiti.

Mettiti comoda. Andiamo un passo alla volta. E ricordati una cosa, che ripeterò spesso: **non puoi rompere niente di grave**. Il sito "vero" online è un'altra cosa, separata. Qui stai solo lavorando su una copia.

Ti servirà circa **un'ora** la prima volta. Le volte successive saranno pochi minuti.

### Cosa faremo, in breve

1. Installare **Node** (il "motore" che fa girare il sito — l'abbiamo conosciuto nel Capitolo 1).
2. (Consigliato) Installare **VS Code**, un programma per leggere e scrivere i file con comodità.
3. Avere sul PC la **cartella del progetto** (i file del sito).
4. Aprire il **terminale** dentro quella cartella.
5. Dare il comando `npm install` (scarica i "pezzi" che servono al sito).
6. Creare il file dei segreti, `.env.local`.
7. Dare il comando `npm run dev` e aprire il sito nel browser.

Pronta? Iniziamo.

---

### 2.1 Installare Node 20

Node è il programma che "fa funzionare" il sito sul tuo computer. Senza di lui, niente parte. Si installa una volta sola.

1. Apri il tuo browser (Chrome, Edge, Firefox…) e vai su questo indirizzo:

```
https://nodejs.org
```

2. Sulla pagina vedrai due grossi pulsanti di download. **Clicca quello con la scritta "LTS"**.

   - "LTS" vuol dire *Long Term Support*, cioè "versione stabile e supportata a lungo". È quella consigliata per non avere sorprese. L'altro pulsante ("Current") è la versione più nuova ma più sperimentale: **non** ci serve.
   - **Importante:** ci serve **Node versione 20**. Se il pulsante LTS mostra il numero 20 (per esempio "20.x.x"), perfetto. Se mostrasse un numero diverso (per esempio 22), va comunque bene scaricare la LTS più recente: il sito è pensato per funzionare da Node 18 in su. Ma se vuoi andare sul sicuro al 100%, cerca nella pagina la voce "Other Downloads" o "Previous Releases" e scegli la **20**.

   **Cosa vedrai:** si scarica un file che finisce con `.msi` (è il programma di installazione per Windows).

3. Apri il file scaricato (di solito lo trovi in basso nel browser, oppure nella cartella **Download**). Si apre una finestra di installazione.

4. Vai avanti cliccando **Next** ad ogni schermata. Quando ti chiede di accettare le condizioni (*license agreement*), spunta la casella e prosegui. **Lascia tutte le opzioni come sono già**: non cambiare niente. Alla fine clicca **Install** e poi **Finish**.

   - Se Windows ti chiede *"Vuoi consentire a questa app di apportare modifiche?"*, rispondi **Sì**. È normale.

   **Cosa vedrai:** una barra che si riempie, poi una schermata che dice "Completed" o "Finish".

#### Verificare che Node sia installato

Adesso controlliamo che sia andato tutto bene. Per farlo apriamo il **terminale** (la finestra nera dove si scrivono i comandi, di cui abbiamo parlato nel Capitolo 1).

5. Clicca sul pulsante **Start** di Windows (l'icona in basso a sinistra), scrivi `terminale` o `PowerShell`, e apri **"Windows PowerShell"** o **"Terminale"**.

   **Cosa vedrai:** una finestra (di solito scura) con del testo e un cursore che lampeggia. Ti aspetta.

6. Scrivi **esattamente** questo e poi premi **Invio**:

```
node -v
```

   Questo comando chiede a Node: "che versione sei?".

   **Cosa vedrai:** una riga tipo `v20.11.1` (i numeri possono cambiare). Se inizia con `v20` (o `v18`, `v22`), sei a posto: Node è installato.

7. Già che ci sei, controlla anche **npm** (è il "fattorino" che scarica i pezzi del sito; arriva insieme a Node). Scrivi:

```
npm -v
```

   **Cosa vedrai:** un numero tipo `10.2.4`. Va benissimo qualsiasi numero: l'importante è che appaia un numero e non un errore.

   **Se non funziona** (per esempio compare *"node non è riconosciuto come comando…"*):
   - Chiudi **completamente** la finestra del terminale e riaprila. Spesso il terminale "non si accorge" del nuovo programma finché non viene riaperto.
   - Se ancora niente, **riavvia il computer** e riprova il passo 6. Sembra un consiglio da barzelletta, ma in questo caso risolve davvero.
   - Se proprio non va, reinstalla Node ripetendo i passi 1–4.

---

### 2.2 (Consigliato) Installare VS Code

VS Code è un **editor**, cioè un programma per aprire e modificare i file del sito in modo ordinato e colorato. Pensa alla differenza tra leggere un documento con il Blocco Note (tutto grigio e confuso) e leggerlo con i colori e gli strumenti giusti: molto più facile.

Non è obbligatorio per far partire il sito, ma ti renderà la vita molto più semplice (e ha un terminale già incorporato, comodissimo). **Te lo consiglio.**

1. Vai su:

```
https://code.visualstudio.com
```

2. Clicca il grande pulsante di download (riconosce da solo che sei su Windows). Apri il file scaricato e installa cliccando avanti, avanti.

   - Quando arrivi alla schermata con le caselle da spuntare, **lascia spuntata** la voce *"Add to PATH"* (di solito è già selezionata). Se vedi anche *"Open with Code"* per le cartelle, spunta pure quella: ti farà comodo.

   **Cosa vedrai:** al termine si apre VS Code, con una schermata di benvenuto. Puoi chiuderla.

3. (Facoltativo) VS Code di base è in inglese. Se preferisci l'italiano: clicca sull'icona dei quadratini sulla barra di sinistra (è il pannello "Extensions"), cerca **"Italian Language Pack"**, installalo e riavvia VS Code quando te lo chiede.

---

### 2.3 Avere la cartella del progetto sul tuo computer

Il "progetto" è semplicemente una **cartella** piena di file: sono questi file che, tutti insieme, formano il sito. Ci sono **due modi** per ottenerla. Leggili entrambi e scegli quello adatto alla tua situazione.

#### Modo A — Ti hanno passato la cartella (chiavetta, WeTransfer, Drive…)

Questo è il modo più semplice se qualcuno ti consegna direttamente i file.

1. Copia la cartella del progetto in un posto comodo e facile da ritrovare. Ti consiglio il **Desktop** o la cartella **Documenti**.

   - Un buon nome/posizione, per esempio: `Documenti\climbpolestudio`.

2. **Attenzione a due cartelle "pesanti":** all'interno potrebbero esserci due cartelle chiamate `node_modules` e `.next`.
   - `node_modules` è la cartella con tutti i "pezzi" scaricati: è enorme (migliaia di file) e **non** va spostata da un PC all'altro. La ricostruiremo tra poco con un comando.
   - `.next` è una cartella temporanea che il sito si crea da solo.
   - **Se chi ti passa la cartella le ha già tolte: perfetto.** È così che si fa. Se invece ci sono, non è un dramma, ma è meglio che chi te la passa le elimini prima, così il trasferimento è molto più veloce e leggero.

   **Cosa vedrai:** dentro la cartella ci sono file come `package.json`, `next.config.js`, e sottocartelle come `app`, `components`, `public`. Questi sono i file "veri" del sito. Se vedi questi, hai la cartella giusta.

#### Modo B — Scaricare il progetto da GitHub con "git clone"

GitHub è il "magazzino online" dove vive il codice del sito (ne abbiamo parlato nel Capitolo 1: è come un Google Drive fatto apposta per i programmatori). "Clonare" vuol dire **scaricare una copia** di quel magazzino sul tuo PC.

Per fare questo ti serve un programma che si chiama **Git**. Se non ce l'hai, installiamolo.

1. Installa Git. Vai su:

```
https://git-scm.com
```

   Clicca il pulsante di download per Windows, apri il file e installa cliccando **Next** ad ogni schermata fino alla fine. **Non cambiare nessuna opzione**: le impostazioni predefinite vanno benissimo.

   **Cosa vedrai:** tante schermate con opzioni. Ignorale, vai sempre avanti e clicca **Install** alla fine.

   Per verificare, chiudi e riapri il terminale e scrivi:

```
git -v
```

   **Cosa vedrai:** una riga tipo `git version 2.45.0`.

2. Ora scegli **dove** vuoi mettere il progetto. Apri il terminale e "spostati" nella cartella Documenti scrivendo:

```
cd ~\Documents
```

   `cd` vuol dire *"change directory"*, cioè "spostati in questa cartella". Lo vedremo meglio nel prossimo paragrafo.

3. Adesso scarica il progetto con questo comando (è **una riga sola**, copiala tutta):

```
git clone https://github.com/retroemulator/climbpolestudio.it
```

   Questo comando va su GitHub e scarica tutta la cartella del progetto dentro Documenti.

   **Cosa vedrai:** scorrono delle righe tipo `Cloning into 'climbpolestudio.it'...`, poi delle percentuali che salgono fino a 100%. Alla fine torna il cursore libero. Adesso dentro Documenti hai una cartella nuova chiamata `climbpolestudio.it`.

   **Se non funziona:**
   - *"git non è riconosciuto…"*: Git non è installato o il terminale va riaperto. Ripeti il passo 1 e riapri il terminale.
   - Ti chiede **utente e password** o dà un errore di "permission denied" / "authentication failed": vuol dire che il magazzino è privato e il tuo computer non ha ancora le "chiavi" per entrare. In questo caso, **usa il Modo A** (fatti passare la cartella). Non è un problema tuo da risolvere ora: chiedi a chi gestisce il progetto di darti accesso a GitHub oppure di mandarti la cartella.

---

### 2.4 Aprire il terminale DENTRO la cartella del progetto

Questo è il passaggio che all'inizio confonde di più, quindi prendiamocela con calma. È il più importante di tutti.

Quando dai un comando nel terminale, il computer lo esegue **nella cartella in cui ti trovi in quel momento**. È come dare istruzioni a un assistente: se gli dici "metti in ordine", lui mette in ordine *la stanza in cui si trova*. Se è nella stanza sbagliata, fa un disastro (o, più spesso, non trova niente e dà errore).

Quindi prima di lanciare i comandi del sito, dobbiamo assicurarci che il terminale sia **"dentro" la cartella del progetto** (quella che contiene il file `package.json`).

Ci sono due modi facili per farlo.

#### Modo 1 — Tasto destro nella cartella (il più semplice)

1. Apri **Esplora file** (la cartellina gialla sulla barra in basso) e vai dentro la cartella del progetto, quella con dentro `package.json`, `app`, `components`…

2. In un punto **vuoto** dentro la cartella, clicca con il **tasto destro** del mouse.

3. Dal menu scegli **"Apri nel terminale"**.
   - Su Windows 11 questa voce c'è quasi sempre. Se non la vedi subito, clicca **"Mostra altre opzioni"** e cercala lì.

   **Cosa vedrai:** si apre il terminale, e nella riga in alto (o accanto al cursore) comparirà il **percorso della tua cartella**, qualcosa tipo:

```
PS C:\Users\Nadia\Documents\climbpolestudio.it>
```

   Quel percorso che finisce con il nome del progetto è la conferma che sei **nel posto giusto**.

#### Modo 2 — Da dentro VS Code (se l'hai installato)

1. Apri **VS Code**.

2. In alto clicca su **File** → **Apri cartella…** (*Open Folder*), e seleziona la cartella del progetto. Conferma.

   - Se compare un messaggio che chiede *"Do you trust the authors of the files in this folder?"* ("ti fidi di questi file?"), clicca **"Yes, I trust the authors"**. Sono i tuoi file, fidati pure.

   **Cosa vedrai:** sulla sinistra appare l'elenco di tutti i file e cartelle del progetto.

3. In alto clicca sul menu **Terminale** → **Nuovo terminale** (*Terminal* → *New Terminal*).

   **Cosa vedrai:** in basso si apre una striscia con il terminale, **già posizionato dentro la cartella del progetto**. Comodissimo: non devi pensarci tu.

#### Come capire in che cartella sei (se hai un dubbio)

Se non sei sicura di essere nel posto giusto, scrivi questo comando e premi Invio:

```
dir
```

   `dir` mostra l'**elenco dei file** presenti nella cartella in cui ti trovi.

   **Cosa vedrai:** un elenco. Se tra i nomi compaiono **`package.json`** e cartelle come **`app`** e **`components`**, sei nel posto giusto. Se invece vedi cose tipo "Desktop", "Documenti", "Download", allora sei ancora "fuori": sei nella cartella generale del tuo utente, non dentro il progetto. In quel caso, usa il **Modo 1** qui sopra (tasto destro → Apri nel terminale) per riposizionarti correttamente.

---

### 2.5 Installare i "pezzi" del sito: `npm install`

Ricordi `node_modules`, quella cartella enorme che non abbiamo copiato? Adesso la ricostruiamo. Questo comando legge la "lista della spesa" del progetto (un file chiamato `package.json`) e scarica da Internet tutti i pezzi (le *librerie*) che servono al sito per funzionare. È come montare un mobile: hai le istruzioni, ora arrivano tutte le viti e gli incastri.

1. Assicurati che il terminale sia **dentro la cartella del progetto** (vedi il paragrafo 2.4: il percorso deve finire con il nome del progetto).

2. Scrivi **esattamente** e premi Invio:

```
npm install
```

   **Cosa vedrai:** parte una specie di "rotellina" che gira o delle barrette che si muovono, e scorrono righe di testo. È normale e vuol dire che sta lavorando. Ci mette da **1 a 5 minuti** circa, a seconda della velocità della tua connessione e del computer. **Lascialo lavorare senza chiudere la finestra.**

   Alla fine vedrai un messaggio riassuntivo, tipo:

```
added 350 packages in 47s
```

   e il cursore torna libero (puoi scrivere di nuovo). Significa: **finito, tutto a posto.**

   **Cose normali che NON sono errori:** durante l'installazione potrebbero apparire righe gialle che parlano di `warn` o `deprecated`. Sono semplici **avvisi** ("attenzione"), non errori. Puoi ignorarli tranquillamente: il sito funziona lo stesso.

   **Se non funziona:**
   - *"npm non è riconosciuto…"*: Node non è installato bene o il terminale va riaperto. Torna al paragrafo 2.1 e verifica con `node -v`.
   - *"package.json not found"* (o simile): **non sei nella cartella giusta.** Il terminale è "fuori" dal progetto. Rileggi il paragrafo 2.4 e riapri il terminale dentro la cartella.
   - Si blocca a metà o dà un errore di rete: di solito è la connessione Internet. Controlla di essere online, poi **ridai semplicemente `npm install`**: può ripartire da dove era. Ridarlo non fa danni.

---

### 2.6 Creare il file dei segreti: `.env.local`

Il sito usa alcuni servizi esterni: il sistema per gestire i contenuti (**Sanity**), le email del modulo contatti (**Resend**), il feed di **Instagram**, e altri. Per parlare con questi servizi, il sito ha bisogno di alcune **chiavi**: sono come le password che dimostrano "sono io, ho il permesso".

Queste chiavi si scrivono tutte in un unico file speciale chiamato **`.env.local`**. Il nome inizia con un punto: è voluto.

**Notizia che ti toglie l'ansia:** anche **senza** questo file, il sito **parte lo stesso**. Funzionerà in versione "ridotta": vedrai il design, le pagine, i testi di esempio, ma alcune parti (come i contenuti che arrivano da Sanity o l'invio delle email) non saranno attive. Per **vedere il sito** e capire come funziona, ti basta questo. Le chiavi le aggiungerai quando arriverai ai capitoli dedicati.

Nel progetto esiste già un file di esempio chiamato **`.env.example`**: contiene l'elenco di tutte le chiavi, ma **vuote** (senza i valori segreti). Lo useremo come modello da copiare.

#### Crearlo con VS Code (modo consigliato, facile)

1. In VS Code, nell'elenco file a sinistra, cerca il file **`.env.example`** e cliccaci sopra per aprirlo. Vedrai un elenco di righe tipo `NEXT_PUBLIC_SANITY_PROJECT_ID=shudbapr` e altre che finiscono con il segno `=` e poi niente (sono i valori segreti, ancora vuoti).

2. Crea una **copia** di questo file e chiamala `.env.local`:
   - Clicca con il **tasto destro** su `.env.example` nell'elenco a sinistra → **Copia** (*Copy*).
   - Tasto destro in un punto vuoto dell'elenco → **Incolla** (*Paste*). Comparirà un file tipo `.env copy.example`.
   - Tasto destro su quel nuovo file → **Rinomina** (*Rename*) e scrivi esattamente:

   ```
   .env.local
   ```

   **Cosa vedrai:** un nuovo file `.env.local` nell'elenco, con lo stesso contenuto dell'esempio.

3. Ora apri `.env.local` e, **dove ti hanno fornito i valori segreti**, incollali dopo il segno `=`, senza spazi e senza virgolette. Per esempio, se ti danno il token di Sanity, la riga deve diventare così:

   ```
   SANITY_API_TOKEN=ilvaloresegretochetihannodato
   ```

   - Alcuni valori sono già scritti nell'esempio perché non sono segreti (come `NEXT_PUBLIC_SANITY_PROJECT_ID=shudbapr`): quelli lasciali così come sono.
   - Le righe che iniziano con `#` sono **commenti** (spiegazioni per te): il computer le ignora. Non toccarle.
   - **Le righe di cui non hai ancora il valore: lasciale vuote.** Non inventare niente. Il sito parte comunque.

4. Salva il file: **Ctrl + S**.

   **Cosa vedrai:** il pallino accanto al nome del file (che indica "modifiche non salvate") sparisce. Salvato.

> **Una regola d'oro:** il file `.env.local` contiene segreti e **non va mai messo su GitHub né mandato in giro** via email senza precauzioni. Il progetto è già impostato per ignorarlo automaticamente (non finirà mai online per sbaglio). Tienilo per te.

**Se non funziona / dubbi comuni:**
- *Non vedo il file `.env.example`*: in Esplora file di Windows i file che iniziano con il punto a volte sono nascosti. In VS Code invece si vedono sempre: per questo ti ho consigliato di usare VS Code per questo passaggio.
- *Ho i valori ma non so quale va dove*: ogni riga ha un nome (per esempio `RESEND_API_KEY`). Chi ti consegna i segreti te li darà associati a quel nome. Incolla ogni valore sulla sua riga. Se hai dubbi, salta: lo riprenderemo nei capitoli dedicati.

---

### 2.7 Far partire il sito: `npm run dev` e aprire il browser

Ci siamo. Adesso accendiamo il sito **sul tuo computer**.

1. Sempre nel terminale dentro la cartella del progetto, scrivi e premi Invio:

```
npm run dev
```

   Questo comando avvia il sito in "modalità sviluppo" (*dev* sta per *development*): è la modalità pensata per lavorarci sopra e vedere subito le modifiche.

   **Cosa vedrai:** dopo qualche secondo compaiono delle righe, e tra queste una tipo:

```
   ▲ Next.js 15.x
   - Local:   http://localhost:3000
   ✓ Ready
```

   La parola **`Ready`** ("pronto") e quell'indirizzo **`http://localhost:3000`** sono il segnale che è tutto acceso e funzionante.

2. **Lascia questa finestra del terminale aperta.** È il "motore acceso": se la chiudi, il sito si spegne. Apri il tuo browser (Chrome, Edge…) e nella barra degli indirizzi in alto scrivi:

```
http://localhost:3000
```

   poi premi Invio.

   **Cosa vedrai:** si apre il sito di Climb Pole Studio, sul tuo computer. Puoi cliccare sui menu, navigare tra le pagine, scorrere. È il sito vero, ma in versione "prova in cucina".

#### Cosa vuol dire "in locale"

`localhost` significa, letteralmente, **"questo computer qui"**. Il sito che vedi a quell'indirizzo gira **solo sul tuo PC**: nessun altro al mondo lo può vedere, neanche se gli mandi quel link. È la tua "palestra privata" dove provare le cose in tranquillità.

Il sito vero, quello pubblico su Internet, è un'altra cosa e lo gestiremo (tramite Vercel) nei capitoli successivi. **Quello che fai in locale non tocca il sito pubblico.** Di nuovo: non puoi rompere niente di grave.

#### Come spegnere il sito

Quando hai finito di lavorare e vuoi "spegnere il motore":

3. Torna nella finestra del terminale (quella dove gira `npm run dev`) e premi insieme i tasti **Ctrl + C**.

   **Cosa vedrai:** scompare il testo "in movimento" e il cursore torna libero. Il sito è spento. Se ora aggiorni la pagina `http://localhost:3000` nel browser, non si caricherà più: è normale.

   Per riaccenderlo, basta ridare `npm run dev` (passo 1).

**Se non funziona:**
- *Nel browser dice "Impossibile raggiungere il sito" / "connessione rifiutata"*: quasi sempre vuol dire che il terminale **non** sta più girando (`npm run dev` non è attivo o l'hai chiuso). Torna al terminale e controlla che ci sia scritto `Ready`. Se non c'è, ridai `npm run dev`.
- *Nel terminale appare un errore tipo "port 3000 is already in use"* ("la porta 3000 è già occupata"): vuol dire che il sito è già acceso in un'altra finestra. O lo usi così com'è, oppure chiudi le altre finestre del terminale e riprova. In alternativa, a volte Next.js si sposta da solo su un altro indirizzo (per esempio `http://localhost:3001`): usa quello che ti mostra nel terminale.
- *La pagina si apre ma alcune cose sembrano mancare* (per esempio non si vede il feed Instagram o i contenuti veri): è **normale** se non hai ancora messo le chiavi nel `.env.local`. Il sito sta girando in versione "ridotta", come ti avevo anticipato. Va benissimo così per ora.

---

### 2.8 Riepilogo del "primo giorno"

Hai fatto tanto. Riassumiamo cosa hai sul computer adesso:

1. **Node** installato (il motore). Verificato con `node -v`.
2. (Consigliato) **VS Code** installato (l'editor comodo).
3. La **cartella del progetto** sul PC (passata a mano o clonata da GitHub).
4. I **pezzi** del sito scaricati con `npm install`.
5. Il file dei segreti **`.env.local`** creato (anche se per ora parzialmente vuoto: va bene).
6. Il sito che **gira in locale** con `npm run dev`, visibile su `http://localhost:3000`.

D'ora in poi, per riaprire il progetto le prossime volte, ti basteranno tre cose veloci: aprire il terminale **dentro la cartella**, dare `npm run dev`, e aprire `http://localhost:3000` nel browser. Niente più installazioni.

Nel prossimo capitolo iniziamo a **toccare i contenuti** e a capire dove si modificano le varie parti del sito. Ricorda sempre: stai lavorando su una copia, c'è la cronologia su GitHub e ci sono i backup di Vercel. **Non puoi combinare guai irreparabili.** Vai serena.

## 3. Usare Claude Code (il tuo assistente che modifica il sito)

Questo è il capitolo più importante di tutta la guida. Se imparerai bene solo questo, sarai già in grado di gestire il tuo sito da sola. Prenditi il tuo tempo: non c'è fretta e, come ripeteremo spesso, non puoi rompere niente di grave.

### 3.1 Cos'è Claude Code (e perché lo userai quasi sempre)

Claude Code è un assistente intelligente che vive dentro il terminale (la "finestra nera" di cui abbiamo parlato nel Capitolo 1). Non è un sito web e non è un'app con tanti bottoni: è un programma a cui tu **scrivi in italiano cosa vuoi**, e lui lo fa.

Pensalo come un dipendente molto bravo e velocissimo che:

- sa leggere tutti i file del tuo sito (il "codice", cioè le istruzioni con cui il sito è costruito),
- capisce cosa gli chiedi a parole, anche senza termini tecnici,
- modifica i file al posto tuo,
- e poi **pubblica online** le modifiche, così le vedi sul sito vero.

Un'analogia: è come avere un falegname in casa a cui dici "sposta quella mensola più in alto" e lui lo fa, ti mostra il risultato, e se non ti piace rimette tutto com'era. Tu parli, lui esegue.

Perché lo userai più di ogni altra cosa? Perché quasi tutto ciò che vorrai cambiare nel sito (un testo, un colore, una sezione nuova, un bottone, sistemare un errore) lo chiederai a lui. Gli altri strumenti (Sanity, Vercel, GitHub) servono per cose specifiche; Claude Code è quello "tuttofare".

> Nota importante: una cosa la fai **dentro Claude Code** (modifiche al codice del sito), un'altra la fai **dentro Sanity** (i contenuti come testi, foto, corsi). Nel Capitolo dedicato a Sanity vedremo la differenza. Per ora ricorda solo: Claude Code = costruzione del sito; Sanity = riempire il sito di contenuti.

### 3.2 Installare Claude Code (si fa una volta sola)

Hai già installato Node nel Capitolo 2. Bene: Claude Code si installa con un solo comando.

1. Apri il terminale (la "finestra nera"). Va bene un terminale qualsiasi, non deve essere per forza dentro la cartella del progetto, perché stiamo installando un programma per tutto il computer.

2. Scrivi questo comando esatto e premi Invio:

```bash
npm install -g @anthropic-ai/claude-code
```

Cosa fa: scarica e installa Claude Code sul tuo computer. La sigla `-g` significa "globale", cioè "rendilo disponibile ovunque, non solo in questa cartella".

**Cosa vedrai:** tante righe di testo che scorrono per qualche secondo (a volte mezzo minuto). Alla fine il terminale torna calmo e ti lascia scrivere di nuovo. È normale che compaiano righe gialle con la parola "warning" (avviso): non sono errori, puoi ignorarle.

**Se non funziona:**
- Se dice qualcosa come `npm: command not found` ("comando non trovato"), vuol dire che Node non è installato o il terminale non lo "vede": torna al Capitolo 2 e reinstalla Node, poi **chiudi e riapri** il terminale.
- Se vedi righe rosse con "permission denied" (permesso negato) su Mac, riprova lo stesso comando mettendo davanti la parola `sudo` (ti chiederà la password del computer). Su Windows di solito non serve.

3. Verifica che sia installato. Scrivi:

```bash
claude --version
```

Cosa fa: chiede a Claude Code di dirti la sua versione, giusto per controllare che ci sia.

**Cosa vedrai:** un numero di versione (per esempio qualcosa tipo `1.x.x`). Se compare un numero, l'installazione è andata a buon fine.

### 3.3 Il primo avvio e il login

La prima volta che avvii Claude Code, lui ti chiederà di **fare il login** (accedere), un po' come quando entri in un sito con email e password. Serve a collegarlo al tuo account Anthropic (l'azienda che fa Claude).

1. Nel terminale scrivi semplicemente:

```bash
claude
```

Cosa fa: avvia l'assistente.

**Cosa vedrai la prima volta:** ti farà qualche domanda di avvio (per esempio sul tema dei colori, chiaro o scuro: scegli quello che preferisci). Poi ti proporrà di **accedere**. Di solito ti dice di premere Invio per aprire il browser, oppure ti mostra un indirizzo web (un link) e/o un codice.

2. Segui quello che ti chiede:
   - Se si apre da solo il browser, accedi con il tuo account (email) e poi clicca il bottone di conferma/autorizzazione.
   - Se invece ti mostra un link e un codice, copia il link nel browser, accedi, e quando ti chiede il codice incollalo.

**Cosa vedrai dopo:** il browser dirà qualcosa tipo "puoi tornare al terminale", e nel terminale comparirà una scritta che conferma l'accesso. Da quel momento sei dentro: vedrai una specie di riga in basso dove puoi **scrivere i tuoi messaggi a Claude**.

**Se non funziona:**
- Se il browser non si apre da solo, copia a mano il link che vedi nel terminale e incollalo nella barra degli indirizzi del browser.
- Se ti chiede di scegliere un piano/abbonamento, segui le indicazioni a schermo: per usare Claude Code serve un account valido.
- Il login si fa **una volta sola**. Le volte successive Claude Code ti riconosce già.

3. Per uscire da Claude Code quando hai finito, scrivi `/exit` e premi Invio, oppure premi due volte i tasti `Ctrl` e `C` insieme. Tornerai alla finestra nera normale. Non hai cancellato niente: hai solo chiuso l'assistente.

### 3.4 Avviarlo nel posto giusto: dentro la cartella del progetto

Questo è il passaggio che all'inizio confonde di più, quindi andiamo piano. Claude Code va avviato **dentro la cartella del tuo sito**. Se lo avvii altrove, lui non "vede" i file del progetto e non può aiutarti.

Un'analogia: è come chiamare l'idraulico ma farlo entrare nella casa del vicino. È bravissimo, ma sta guardando la stanza sbagliata. Devi farlo entrare in casa **tua** (la cartella del progetto).

La cartella del progetto è quella che contiene il sito di Climb Pole Studio (l'avrai scaricata seguendo i capitoli precedenti). Ci sono due modi semplici per avviare Claude Code lì dentro.

#### Modo A: con il terminale

1. Apri il terminale.

2. "Entra" nella cartella del progetto con il comando `cd` (che vuol dire "change directory", cioè "cambia cartella"). Scrivi `cd ` (con uno spazio dopo) e poi **trascina la cartella del progetto dentro la finestra del terminale**: il percorso si scriverà da solo. Poi premi Invio. Per esempio sarà qualcosa del genere:

```bash
cd "C:\Temp\CLAUDE CODE\climbpolestudio.it"
```

Cosa fa: dice al terminale "d'ora in poi lavoriamo dentro questa cartella".

**Cosa vedrai:** la riga del terminale cambia e mostra il nome della cartella in cui ti trovi adesso.

3. Ora avvia l'assistente:

```bash
claude
```

**Cosa vedrai:** Claude Code parte e questa volta è "dentro casa tua", pronto a leggere i file del progetto.

**Se non funziona:**
- Se dopo `cd` ti dice "cannot find the path" / "percorso non trovato", probabilmente hai sbagliato cartella o c'è un errore di battitura. Riprova trascinando di nuovo la cartella, così il percorso è sicuramente giusto.

#### Modo B: con VS Code (più comodo, consigliato)

Nel Capitolo 2 hai installato VS Code, l'editor che ti mostra i file in modo ordinato. Da lì è tutto più semplice.

1. Apri VS Code.

2. In alto vai su **File → Apri cartella…** (File → Open Folder…) e scegli la cartella del progetto. **Cosa vedrai:** sulla sinistra compare l'elenco dei file e delle cartelle del sito.

3. Apri il terminale **dentro** VS Code dal menu in alto: **Terminale → Nuovo terminale** (Terminal → New Terminal). **Cosa vedrai:** una finestra nera si apre nella parte bassa di VS Code, ed è **già posizionata nella cartella giusta** (questo è il bello: non devi fare `cd`).

4. In quel terminale scrivi `claude` e premi Invio. Sei pronta.

C'è anche un'estensione ufficiale di Claude Code per VS Code (la trovi cercando "Claude Code" nella sezione Estensioni, l'icona dei quadratini sulla sinistra). Non è obbligatoria, ma rende l'esperienza più piacevole: ti mostra meglio le modifiche proposte, con i colori del "prima e dopo". Se ti trovi bene con VS Code, installala pure; se ti confonde, lascia stare e usa il terminale: il risultato è identico.

### 3.5 Come parlargli: scrivi in italiano cosa vuoi

Questa è la parte bella: con Claude Code **parli normale**, in italiano. Non ci sono comandi magici da imparare a memoria. Scrivi una frase, premi Invio, e lui lavora.

Qualche esempio di cose che puoi scrivergli:

```text
Cambia il titolo della home in "Vola con noi"
```

```text
Nella pagina dei corsi, aggiungi una sezione che parla del corso di pole base
```

```text
Il bottone "Prenota" è troppo piccolo, fammelo un po' più grande
```

```text
C'è un errore di battitura nella pagina chi siamo: "arti aeere" va corretto in "arti aeree"
```

Cosa succede dopo che premi Invio:

1. Claude **legge** i file che gli servono per capire la richiesta. Vedrai scorrere righe in cui dice cosa sta guardando: è normale, lo sta facendo per fare un buon lavoro.
2. Ti **spiega** cosa intende fare, oppure fa direttamente la modifica mostrandoti cosa ha cambiato.
3. Spesso ti mostra il "prima e dopo" del testo modificato: le righe tolte e quelle aggiunte.
4. Se gli dici di pubblicare, **carica le modifiche online** (vedi il punto 3.6) e dopo un minuto le vedi sul sito vero.

**Una buona prima frase, ogni volta che inizi a lavorare.** Appena avviato Claude Code, prima di chiedergli modifiche, scrivigli questa frase. Serve a fargli "studiare" il progetto, così le sue risposte saranno più precise:

```text
Leggi HANDOFF.md e NOTES.md, poi aspetta le mie istruzioni
```

Cosa fa: gli dici di aprire due file di appunti tecnici che spiegano com'è fatto il sito (li ha lasciati chi ha costruito il progetto). Dopo averli letti, Claude conosce il contesto e lavora molto meglio. È come dare a un nuovo collaboratore il "manuale dell'azienda" prima di metterlo al lavoro.

### 3.6 Cosa vuol dire "pubblicare" (commit + push → Vercel)

Quando una modifica ti piace e la vuoi rendere visibile sul sito vero, Claude Code fa tre cose. Ti basta capirle a grandi linee.

- **Commit**: è come salvare una "fotografia" della modifica nella cronologia del progetto, con un'etichetta che dice cosa è cambiato. Pensa al pulsante "Salva versione" di un documento.
- **Push**: è caricare quella fotografia su GitHub, la "cassaforte" online dove vive il codice del sito.
- **Vercel pubblica**: appena GitHub riceve la modifica, Vercel (il servizio che tiene il sito online) la prende e **aggiorna il sito da solo**, in genere in uno o due minuti.

Quindi il giro completo è: tu chiedi → Claude modifica → commit + push → Vercel pubblica → tu vedi il risultato online. Nel nostro caso il sito di prova è qui:

```text
https://climbpolestudio-it.vercel.app
```

Per la maggior parte delle cose ti basta dire a Claude, al termine, una frase come:

```text
Va bene, ora salva e pubblica online
```

E lui farà commit e push da solo.

> Promemoria importante e rassicurante: **ogni** pubblicazione resta nella cronologia. Vercel tiene da parte anche **tutte le versioni precedenti** del sito. Quindi se qualcosa non va, si può sempre tornare a com'era prima. Lo vedremo meglio nel capitolo sugli errori, ma tienilo a mente fin da ora: non stai "scrivendo sulla pietra".

### 3.7 Concetti chiave per non spaventarsi

Pochi principi, ma importanti. Se li tieni a mente, lavorerai serena.

**1. Modifica file VERI.** Claude Code non fa "finta": tocca davvero i file del tuo sito. Non è un problema, anzi è il suo lavoro. Ma significa che conviene essere ordinati: vedi i punti qui sotto.

**2. Una richiesta alla volta.** Invece di scrivere un elenco lungo di dieci modifiche tutte insieme, fai una cosa, controlla che vada bene, e poi passa alla successiva. Così, se qualcosa non torna, capisci subito quale modifica l'ha causato. È come montare un mobile: un pezzo alla volta, non tutti in mano insieme.

**3. Descrivi bene cosa vuoi.** Più sei precisa, meglio lavora. "Sposta il bottone" è vago. "Sposta il bottone Prenota in fondo alla pagina dei corsi, sotto l'ultima foto" è chiarissimo. Se non sai come dirlo in modo tecnico, non importa: spiegalo come lo diresti a un amico.

**4. Chiedi sempre l'anteprima.** Prima che faccia una modifica un po' grossa, puoi scrivere:

```text
Fammi vedere cosa cambieresti prima di farlo, non modificare ancora niente
```

Cosa fa: Claude ti mostra il piano e le modifiche **senza** applicarle. Tu leggi, e se ti convince dici "ok, procedi". È come chiedere un preventivo prima dei lavori.

**5. Verifica dopo la pubblicazione.** Dopo che Claude ha pubblicato, aspetta un paio di minuti, poi apri il sito di prova (`https://climbpolestudio-it.vercel.app`) e guarda con i tuoi occhi se la modifica c'è ed è giusta. Consiglio pratico: se non vedi il cambiamento, ricarica la pagina tenendo premuto `Ctrl` (su Mac `Cmd`) mentre clicchi il tasto di ricarica: a volte il browser mostra la versione vecchia salvata in memoria.

**6. C'è sempre la cronologia.** Lo ripetiamo perché conta: ogni modifica è salvata e annullabile. Se sbagli, puoi dire a Claude:

```text
L'ultima modifica non mi piace, riportala com'era prima
```

E lui sa come tornare indietro.

### 3.8 I comandi che iniziano con "/" (la barra)

Oltre a parlargli in italiano, dentro Claude Code esistono dei **comandi speciali** che iniziano con il simbolo `/` (la barra, quella che su molte tastiere è sopra il `7` o vicino al punto interrogativo). Non sono richieste in italiano: sono "scorciatoie" per il programma stesso.

Non devi impararli tutti. Questi tre ti bastano per partire:

- `/help` → mostra l'**aiuto**, cioè l'elenco delle cose che puoi fare e dei comandi disponibili. Quando sei persa, parti da qui.
- `/clear` → **pulisce** la conversazione e ricomincia da capo "a mente fresca". Utile quando passi a un argomento completamente diverso e non vuoi che si confonda con quello di prima.
- `/exit` → **esci** da Claude Code (torni al terminale normale).

Suggerimento: appena scrivi `/` ti compare un elenco dei comandi disponibili. Puoi scorrerlo con le frecce della tastiera per curiosare, senza paura: leggere l'elenco non fa partire niente.

### 3.9 Cosa NON fare / sicurezza

Poche regole, semplici, per stare tranquilla.

**1. Non condividere mai i file segreti.** C'è un file speciale chiamato `.env.local`: contiene le "chiavi" del sito, cioè password e codici segreti che fanno funzionare email, contenuti, prenotazioni. Tratta quel file come le chiavi di casa: **non incollarlo in chat, email o messaggi**, non pubblicarlo, non mandarlo a nessuno se non sei sicurissima. Per fortuna è già impostato perché **non** finisca su GitHub. Se qualcuno ti chiede "mandami il file con le chiavi", fermati e verifica chi è davvero.

**2. Non far cancellare cose che non capisci.** Se Claude propone di **eliminare** file o intere parti, e tu non capisci bene perché, non avere fretta di dire "sì". Chiedi prima una spiegazione (vedi punto 4). Cancellare non è la fine del mondo (c'è la cronologia), ma è meglio capire cosa stai facendo.

**3. Vai piano con le richieste "grosse".** Cose come "rifai tutto il sito" o "cambia tutta la grafica" sono modifiche enormi: falle solo quando hai più dimestichezza, una alla volta, e sempre chiedendo prima l'anteprima.

**4. Nel dubbio, chiedi a Claude Code stesso.** Questa è la cosa più bella: il tuo assistente sa anche **spiegarsi**. Se non capisci qualcosa che ha scritto o proposto, scrivigli, in italiano, frasi come:

```text
Spiegami con parole semplici cosa fa questa modifica e se è rischiosa
```

```text
Non ho capito cosa stai per cancellare e perché: spiegamelo come a un principiante
```

Lui ti risponderà in modo comprensibile. Non c'è nessuna domanda "stupida": chiedere è sempre la mossa giusta.

### 3.10 Tranquilla: non puoi rompere il sito in modo permanente

Chiudiamo con la cosa più importante da ricordare di tutto il capitolo.

Anche se sbagli, anche se Claude fa una modifica che rovina qualcosa, **il sito non è perso**. Per due motivi:

- **C'è la cronologia Git**: ogni modifica è una "fotografia" salvata, e si può sempre tornare a una foto precedente.
- **C'è Vercel**: il servizio che tiene il sito online conserva **tutte le versioni pubblicate**. Con pochi clic (lo vedremo nel capitolo su Vercel) si può rimettere "in vetrina" la versione di ieri, o di un'ora fa, come se non fosse successo niente.

Quindi sperimenta con serenità. Fai domande. Prova modifiche. Il peggio che può capitare è che una pagina venga storta per qualche minuto, finché non torni alla versione buona. Non esiste il "bottone che distrugge tutto". Hai sempre una via d'uscita, e hai sempre il tuo assistente pronto a spiegarti la strada.

## 4. Cambiare testi, foto, orari e prezzi (Sanity Studio)

Questo è il capitolo più importante per te. Buona notizia: per cambiare quasi tutti i **contenuti** del sito (le parole, le foto, gli orari, i prezzi, le news, le FAQ, gli insegnanti) **non devi toccare il codice e non ti serve Claude Code**.

Ti basta un pannello che si apre nel browser, come quando entri nella tua email. Si chiama **Sanity Studio**.

### Cos'è Sanity Studio (con parole semplici)

Immagina il sito come un giornale. Il **codice** è la macchina da stampa: complicata, la tocca solo chi sviluppa. I **contenuti** sono gli articoli, le foto e i prezzi che metti dentro al giornale.

**Sanity Studio** è il pannello dove scrivi e cambi quei contenuti, senza dover toccare la macchina da stampa. È come un editor di testo online, con tanti campi già pronti da riempire.

Il termine tecnico è **CMS** (Content Management System, cioè "sistema per gestire i contenuti"). Tutte le volte che senti "CMS" o "Sanity", pensa: "il pannello dove cambio testi e foto".

> Tranquilla: qui dentro **non puoi rompere il sito**. Nel peggiore dei casi scrivi una cosa sbagliata, te ne accorgi e la correggi. Il sito tecnico (la "macchina da stampa") resta intatto.

### 4.1 Aprire lo Studio e fare il login

1. Apri il browser (Chrome, Edge, Safari… quello che usi di solito).

2. Nella barra dell'indirizzo in alto, scrivi questo e premi Invio:

```
https://climbpolestudio-it.vercel.app/studio
```

Questo è l'indirizzo del tuo pannello. La parte `/studio` alla fine è la "porta d'ingresso" all'editor.

   - **Cosa vedrai:** una pagina con il logo e un pulsante per accedere (di solito "Continue with Google" o simili).

3. Clicca sul pulsante di accesso e scegli l'account con cui sei stata registrata (in genere il tuo indirizzo Google).

   - **Cosa vedrai:** dopo qualche secondo si apre lo Studio vero e proprio: a **sinistra** una lista di voci (i tipi di contenuto), al **centro** lo spazio dove compaiono i campi da modificare.

   - **Se non funziona** (ti dice che non hai i permessi / "you don't have access"): vuol dire che il tuo indirizzo non è ancora stato autorizzato. Non è un errore tuo. Chiedi a chi ha sviluppato il sito di invitarti come membro del progetto Sanity. È una cosa di un minuto per loro.

> Consiglio: una volta entrata, salva questa pagina nei **preferiti** del browser. Così domani non devi ricordarti l'indirizzo: la ritrovi con un clic.

### 4.2 Tour dei "tipi di contenuto"

Sulla sinistra trovi un elenco di voci. Ognuna è un **tipo di contenuto**: un contenitore per un certo genere di informazioni. È come avere tanti raccoglitori etichettati nello schedario.

Ecco cosa contiene ognuno (i nomi esatti possono variare un pelo, ma il senso è questo):

- **Impostazioni sito** — le informazioni generali: nome dello studio, indirizzo, telefono, email, link ai social, testi che compaiono un po' dappertutto. È il "documento unico" del sito: di solito c'è **una sola scheda**, non una lista.

- **Discipline** — le attività che insegnate (pole dance, tessuti aerei, eccetera). Ogni disciplina ha un titolo, una descrizione e di solito una foto.

- **Orari / Slot** — gli orari dei corsi durante la settimana. Ogni "slot" è una lezione: giorno, ora, disciplina, eventualmente il livello.

- **Listino prezzi** — i prezzi dei pacchetti e degli abbonamenti.

- **Galleria** — le foto della galleria fotografica del sito.

- **News** — gli avvisi e le novità (un evento, una promozione, la chiusura estiva…). Sono come dei piccoli articoli del blog.

- **Testimonianze** — le frasi delle allieve contente, quelle che si vedono come "recensioni" sul sito.

- **FAQ** — le domande frequenti con le relative risposte ("Devo essere allenata per iniziare?" e così via).

- **Insegnanti** — le schede delle insegnanti: nome, foto, breve biografia.

Per **entrare** in un tipo di contenuto, clicca sul suo nome a sinistra. Se è un elenco (per esempio le News), si apre la lista delle schede già esistenti; clicca su una scheda per aprirla, oppure usa il pulsante per crearne una nuova.

### 4.3 Modificare un testo

Facciamo l'esempio più semplice: cambiare una frase.

1. A sinistra, clicca sul tipo di contenuto giusto (per esempio **Impostazioni sito** se vuoi cambiare un testo generale, o **Discipline** se vuoi cambiare la descrizione di un corso).

2. Apri la scheda da modificare (se è una lista, clicca sulla riga giusta).

   - **Cosa vedrai:** al centro compaiono dei **campi** con delle etichette (tipo "Titolo", "Descrizione", "Telefono"). Sono caselle di testo, come in un modulo da compilare.

3. Clicca dentro la casella del testo che vuoi cambiare e scrivilo come vuoi tu, esattamente come faresti in Word.

4. **Non serve "salvare" con un pulsante:** Sanity salva da solo, mano a mano che scrivi, una **bozza** (una copia di lavoro non ancora online).

   - **Cosa vedrai:** in basso o in alto compare la scritta che il documento ha modifiche non pubblicate (spesso un pallino o la parola "Unpublished changes").

5. Quando sei soddisfatta, premi **Pubblica** (vedi il punto 4.6). Solo allora la modifica va sul sito vero.

> La differenza tra **bozza** e **pubblicato** è importante: finché non premi "Pubblica", quello che scrivi lo vedi solo tu qui dentro. I visitatori del sito vedono ancora la versione vecchia. Questo ti permette di scrivere con calma e correggere prima di mostrare tutto al mondo.

### 4.4 Caricare o cambiare una foto

Quasi tutte le schede hanno un **campo immagine**: un riquadro dove carichi una foto.

1. Apri la scheda dove vuoi mettere la foto (per esempio un'insegnante, una disciplina, o una voce della galleria).

2. Trova il campo immagine (un riquadro grande, di solito con scritto "Image", "Immagine" o un'icona di una foto).

3. Per **aggiungere** una foto nuova: clicca su **"Upload"** (carica) e scegli il file dal tuo computer. Oppure trascina la foto direttamente dentro il riquadro.

   - **Cosa vedrai:** una barra di caricamento, poi l'anteprima della foto dentro il riquadro.

   - **Se non funziona** (la foto non parte o dà errore): di solito è perché il file è troppo pesante. Usa una foto sotto i ~5 MB. Se è enorme, ridimensionala prima (anche con lo strumento "Foto" del telefono o del computer).

4. Per **sostituire** una foto già presente: clicca sulla foto (o sui tre puntini accanto) e scegli "Replace" / "Carica nuova". La vecchia sparisce e resta la nuova.

#### L'hotspot (il "punto importante" della foto)

Quando carichi una foto, Sanity ti permette di scegliere il punto della foto che **non deve mai essere tagliato**. Si chiama **hotspot** (in italiano: "punto caldo").

A cosa serve: il sito mostra la stessa foto in posti diversi (grande su computer, piccola e quadrata su telefono). Per stare in spazi di forma diversa, a volte la foto viene **ritagliata**. L'hotspot dice al sito: *"qualsiasi taglio tu faccia, tieni sempre dentro questo punto"*.

Esempio: in una foto di un'insegnante, metti l'hotspot sul **viso**. Così non rischi che, su telefono, il sito tagli la testa e mostri solo le spalle.

1. Dopo aver caricato la foto, cerca un pulsante tipo "Edit hotspot" o un'icona di mirino/ritaglio.

2. Apparirà la foto con un **cerchio** spostabile. Trascina il cerchio sopra la parte importante (il viso, il soggetto principale).

3. Chiudi. È fatto. Non devi essere precisa al millimetro: serve solo a evitare ritagli infelici.

> Se salti questo passaggio non succede niente di grave: la foto si vede lo stesso. L'hotspot serve solo a rendere i ritagli più belli.

### 4.5 Aggiungere una news (con il flag "published")

Le **News** sono gli avvisi che vuoi far comparire sul sito (una promozione, un evento, la chiusura per le ferie).

1. A sinistra clicca su **News**.

2. Clicca sul pulsante per **creare** una nuova scheda (di solito un "+" o "Create new" in alto).

3. Compila i campi: **Titolo**, **testo/corpo**, eventualmente una **data** e una **foto**.

4. **Attenzione al passaggio che si dimentica più spesso:** c'è un interruttore (un flag) chiamato **"Published"** (oppure "Pubblicata", "Visibile", o simile). È un **interruttore acceso/spento**.

   - Se resta **spento**, la news non compare sul sito, anche se hai premuto Pubblica. È come scrivere un cartello e lasciarlo nel cassetto.

   - **Accendilo** (clicca finché diventa attivo/verde/spuntato) perché la news si veda davvero online.

5. Adesso premi **Pubblica** (punto 4.6).

> Due cose diverse, non confonderle:
> - **"Pubblica"** (il pulsante grande in fondo) = manda online la scheda.
> - **Flag "Published"** dentro la news = dice al sito di mostrarla nella lista delle news.
> Per una news servono **tutte e due**: flag acceso **e** pulsante Pubblica premuto.

### 4.6 Il pulsante "Pubblica" e cosa succede dopo

Questo è il momento che rende le tue modifiche visibili a tutti.

1. Dopo aver modificato una scheda, guarda **in basso** (a volte in alto a destra): c'è un pulsante verde **"Publish"** / **"Pubblica"**.

2. Cliccalo.

   - **Cosa vedrai:** il pulsante per un attimo gira/lampeggia, poi la scritta "modifiche non pubblicate" sparisce. Ora la versione online è aggiornata.

3. **Quando lo vedo sul sito vero?**

   - Se il **webhook** è attivo (è un avviso automatico che dice al sito "ehi, è cambiato qualcosa, aggiornati"), le modifiche compaiono online in **pochi secondi**. Ricarica la pagina del sito e ci sono.

   - Se il webhook **non** è ancora attivo, il sito si aggiorna comunque da solo, ma ci mette **fino a 5 minuti circa**. Basta aspettare e ricaricare la pagina.

> "Webhook" è una parola tecnica che spaventa, ma il concetto è banale: è una **chiamata automatica** tra Sanity e il sito. Tu non devi farci niente. Se le modifiche tardano qualche minuto, è normale e non è un errore: il sito è solo un po' più lento ad aggiornarsi. (L'attivazione del webhook è una di quelle cose "da sviluppatore", spiegata più avanti.)

4. **Hai pubblicato per sbaglio o vuoi tornare indietro?** Niente panico. Sanity tiene la **cronologia** delle versioni: si può sempre recuperare un testo precedente. E anche dovesse andare storto qualcosa, Vercel (l'hosting) ha le sue copie del sito. **Non puoi combinare guai irreparabili da qui.**

### 4.7 Cose importanti da ricordare

- Per cambiare **testi, foto, orari, prezzi, news, FAQ, testimonianze, insegnanti**: usa **solo** lo Studio. **Non serve il codice, non serve Claude Code, non serve il terminale.** Questa è la tua zona, tranquilla e sicura.

- **Pubblicare non rompe il sito.** Stai cambiando contenuti, non la "macchina da stampa". Il peggio che può capitare è un testo con un refuso, che correggi in dieci secondi.

- Una distinzione tecnica, giusto perché tu la conosca (ma **non è compito tuo**): gli orari e i prezzi "di partenza" che furono caricati la prima volta sul sito vengono da una procedura tecnica chiamata **"seed"** (in inglese "seme": i dati iniziali piantati nel sistema). Quella è roba di chi sviluppa. **Tu non devi rifare il seed:** da oggi in poi orari e prezzi li cambi **normalmente dallo Studio**, scheda per scheda, come hai imparato qui sopra. Se un giorno senti parlare di "rifare il seed", sappi solo che riguarda il codice e non queste modifiche di tutti i giorni.

- Se non trovi un campo o non sei sicura, **non forzare**: lascia stare, non premere Pubblica, e chiedi. Una bozza non pubblicata non fa danni.

## 5. Vercel: dove vive il sito online (deploy e variabili)

In questo capitolo conosci **Vercel**. È il posto dove il tuo sito "vive" e diventa visibile a tutti su Internet. Non spaventarti: userai il sito di Vercel dal browser, come faresti con Facebook o la posta. Niente comandi strani qui.

E ricordati la frase magica di questa guida: **non puoi rompere niente di grave**. Ogni versione del sito resta salvata, e si può sempre tornare indietro.

### 5.1 Cos'è Vercel, spiegato facile

Immagina di aver scritto un libro (il **codice** del sito) e di averlo messo in un magazzino ordinato (è **GitHub**, che vediamo nel Capitolo 4). Il libro nel magazzino, però, nessuno lo può leggere: è solo conservato lì.

**Vercel** è come la libreria che prende il tuo libro dal magazzino, ne stampa migliaia di copie e le mette sugli scaffali, pronte per chiunque passi. In parole tecniche: Vercel è il **server**, cioè il computer sempre acceso che prende il codice e lo trasforma in un **sito web vero**, raggiungibile da tutti.

Il tuo sito di prova vive qui:

```
https://climbpolestudio-it.vercel.app
```

E l'editor dei contenuti (di cui parliamo nel capitolo su Sanity) è qui:

```
https://climbpolestudio-it.vercel.app/studio
```

> **Parola difficile: "deploy"**
> "Deploy" (si legge *di-plòi*) significa semplicemente **pubblicare online** una nuova versione del sito. Quando senti "ho fatto un deploy", traduci con "ho messo online le ultime modifiche".

### 5.2 La cosa più bella: si pubblica da solo

Questa è la parte che ti farà tirare un sospiro di sollievo.

Quando Claude Code (o tu) salva le modifiche e fa il famoso **"push"** verso GitHub (cioè manda il libro aggiornato nel magazzino), **Vercel se ne accorge da solo** e ripubblica il sito automaticamente. Non devi cliccare niente.

In pratica il giro è sempre questo:

1. Claude Code modifica il sito.
2. Claude Code fa "push" su GitHub.
3. Vercel vede la novità e, da solo, mette online la nuova versione.
4. Dopo circa **1-2 minuti** il sito aggiornato è visibile a tutti.

**Cosa vedrai:** dopo un push, se vai su Vercel troverai una nuova riga in lavorazione, e poco dopo il tuo sito mostrerà le modifiche.

Quindi, nel 90% dei casi, **tu su Vercel non devi fare nulla**. Lo apri solo per *controllare* che sia andato tutto bene, oppure per le due cose che vedremo dopo: leggere un eventuale errore e aggiungere le "variabili segrete".

### 5.3 Entrare nel pannello di Vercel (login)

"Pannello" è solo una parola elegante per dire "la tua area personale sul sito di Vercel", come la tua bacheca quando entri in un social.

1. Apri il browser e vai su:

```
https://vercel.com/login
```

2. Clicca su **"Continue with GitHub"** (Continua con GitHub).

   *Perché GitHub?* Perché il tuo account Vercel è collegato a quello di GitHub (il magazzino del codice): così entri con le stesse credenziali, senza creare una nuova password.

3. Se è la prima volta, GitHub ti chiederà di autorizzare Vercel: clicca **"Authorize"** (Autorizza).

**Cosa vedrai:** entri nella **Dashboard** (la "bacheca"), una pagina con dei riquadri. Ogni riquadro è un progetto.

**Se non funziona:** se ti chiede una password che non ricordi, non inventarne una nuova. Usa sempre il pulsante **"Continue with GitHub"**: è quello giusto per questo progetto.

### 5.4 Trovare il progetto giusto

Nella bacheca potresti vedere uno o più riquadri.

1. Cerca il riquadro con il nome **climbpolestudio** (o simile, tipo `climbpolestudio-it`).
2. Cliccaci sopra.

**Cosa vedrai:** la pagina del progetto. In alto trovi un menu con varie schede (delle "linguette"), tipo: **Project** / **Deployments** / **Analytics** / **Settings**. Sono le sezioni che useremo.

**Se non funziona:** se non vedi nessun progetto, probabilmente sei entrata con un account diverso. Controlla in alto a destra: clicca sul tuo nome/avatar e verifica di essere nell'account collegato a GitHub `retroemulator`. Se vedi più "team" o "account", prova a cambiarli da quel menu finché non compare il progetto.

### 5.5 La scheda "Deployments": lo storico delle pubblicazioni

Clicca sulla scheda **"Deployments"** in alto.

Pensa ai **Deployments** come al **registro delle pubblicazioni**: ogni riga è una versione del sito che è stata messa online, in ordine di tempo (la più recente in alto). È come la cronologia delle versioni di un documento: ogni volta che si è pubblicato qualcosa, resta segnato qui.

Per ogni riga vedrai un **pallino colorato** con uno stato. Sono i due colori che ti interessano:

- 🟢 **Pallino verde con scritta "Ready"** = tutto a posto, **questa versione è pubblicata e online**. È quello che vuoi vedere.
- 🔴 **Pallino rosso con scritta "Error" o "Failed"** = qualcosa è andato storto durante la pubblicazione. **Importante: il sito NON crolla.** Resta online l'ultima versione che funzionava (quella verde più recente). Quindi i visitatori continuano a vedere un sito sano.

Vedrai anche, mentre sta lavorando, un pallino **giallo che gira** con scritta **"Building"** (sta costruendo) o **"Queued"** (in coda): vuol dire "sto pubblicando, aspetta uno-due minuti".

#### Cosa fare se vedi il pallino rosso (Error)

Niente panico. Il sito vecchio è ancora su, hai tutto il tempo.

1. Clicca sulla riga rossa per aprirla.
2. Cerca la sezione **"Build Logs"** (i "log della costruzione"). I **log** sono semplicemente il **diario di bordo**: l'elenco di tutto ciò che il computer ha fatto, riga per riga. Quando c'è un errore, di solito è scritto in **rosso** e spesso vicino alla parola **"Error"**.
3. Non devi capirci niente di tecnico. La cosa più furba è **copiare** quel testo rosso (selezionalo col mouse e premi `Ctrl+C`).
4. Apri Claude Code (il tuo assistente, vedi Capitolo 3) e **incolla** l'errore scrivendo qualcosa come:

```
Il deploy su Vercel è fallito con questo errore, me lo risolvi?
[qui incolli il testo rosso copiato]
```

**Cosa vedrai:** Claude Code leggerà l'errore, ti spiegherà cosa è successo e proverà a sistemarlo. Quando avrà finito e fatto un nuovo push, su Vercel comparirà una **nuova riga** che (si spera) diventerà verde.

> In breve: pallino verde = festeggia. Pallino rosso = copia il diario di bordo e dallo in pasto a Claude Code. Non devi diagnosticare nulla da sola.

### 5.6 Le "Environment Variables": le chiavi segrete del sito

Ora la seconda cosa per cui ti servirà davvero Vercel. È un pochino più delicata, ma se segui i passi è facile.

#### Cosa sono (con un'analogia)

Il tuo sito, per funzionare del tutto, ha bisogno di alcune **chiavi segrete e impostazioni**: per esempio la chiave per mandare le email del modulo contatti, o quella per mostrare i post di Instagram.

Immagina queste chiavi come il **mazzo di chiavi di casa**: aprono le porte ai servizi esterni. Non le scrivi mai dentro al codice (sarebbe come incollare le chiavi di casa sulla porta, alla vista di tutti). Le metti invece in una **cassaforte separata**: quella cassaforte si chiama **Environment Variables** (variabili d'ambiente).

Ogni chiave è fatta di due parti:

- **Key** (la *targhetta*): il nome della chiave, scritto SEMPRE in MAIUSCOLO, per esempio `RESEND_API_KEY`.
- **Value** (il *valore*): il codice segreto vero e proprio, una lunga sequenza di lettere e numeri.

Il tuo progetto ha **12** di queste variabili (alcune segrete, altre no). I loro nomi sono, ad esempio:

```
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
SANITY_API_TOKEN            (segreta)
SANITY_REVALIDATE_SECRET    (segreta, per il webhook)
BEHOLD_FEED_ID              (Instagram)
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY   (segreta)
CRON_SECRET                 (segreta)
RESEND_API_KEY              (segreta, email del form)
```

> **Da dove vengono i valori segreti?**
> Stanno in un file sul computer chiamato `.env.local`. Questo file, di proposito, **non è su GitHub** (i segreti non vanno mai nel magazzino pubblico): vanno copiati a mano da quel file dentro la cassaforte di Vercel. Tienilo a mente per quando ti serviranno.

#### Dove si trovano su Vercel

1. Sei nella pagina del progetto. Clicca la scheda **"Settings"** (Impostazioni) in alto.
2. Nel menu a sinistra, clicca **"Environment Variables"** (Variabili d'ambiente).

**Cosa vedrai:** una pagina con l'elenco delle variabili già presenti (vedrai le **targhette/Key**, mentre i valori segreti restano nascosti con dei pallini, per sicurezza) e, in alto, un riquadro per **aggiungerne una nuova**.

### 5.7 Procedura: aggiungere una nuova variabile (riusabile)

Questa è una procedura che **userai più volte**: per attivare il webhook di Sanity, per il feed Instagram di Behold, per le email con Resend. È sempre la stessa. Imparala una volta, ti servirà sempre.

> **Importante, leggi prima di iniziare:** questa procedura ha **due tempi**. Prima si *aggiunge* la variabile (passi 1-6). Poi, e solo dopo, va fatto il **Redeploy** (sezione 5.8). Se salti il secondo tempo, la variabile resta lì ma **non si attiva**. È l'errore numero uno: tienilo a mente.

1. Vai in **Settings > Environment Variables** (come nella sezione 5.6).
2. Nel riquadro per aggiungere, scrivi nel campo **"Key"** il **nome** della variabile, esattamente come ti viene indicato (tutto MAIUSCOLO, senza spazi). Esempio:

```
RESEND_API_KEY
```

3. Nel campo **"Value"** incolla il **valore segreto** (il codice lungo che hai nel file `.env.local` o che ti dà il servizio). Incollalo **tutto, senza spazi davanti o dietro**.
4. Sotto trovi gli **"Environments"** (gli ambienti): di solito ci sono tre caselle, **Production**, **Preview**, **Development**. Per andare sul sicuro, **lascia tutte e tre spuntate** (così la chiave vale ovunque). "Production" è il sito vero, quello pubblico: quella è la più importante.
5. Clicca il pulsante **"Save"** (Salva).
6. **Cosa vedrai:** la nuova variabile compare nell'elenco, con la sua targhetta. Vercel di solito ti avvisa con un messaggio del tipo *"You need to redeploy to apply changes"* (Devi ripubblicare per applicare le modifiche). Questo messaggio è il tuo promemoria per il passo successivo.

**Se non funziona / errori comuni:**
- Se appare *"already exists"* (esiste già): quella chiave c'è già. Non crearne un doppione. Per cambiarne il valore, cerca la riga esistente, clicca i **tre puntini `...`** a fine riga e scegli **"Edit"** (Modifica).
- Se hai sbagliato a scrivere il **nome** (la Key), il sito non troverà la chiave. Controlla che sia identico, lettera per lettera e tutto maiuscolo. Anche un solo carattere diverso la rende invisibile al sito.
- Occhio agli **spazi invisibili** all'inizio o alla fine del Value quando incolli: sono una causa frequente di "non funziona". Se hai dubbi, cancella e reincolla con attenzione.

### 5.8 Il passo CRUCIALE: il Redeploy

Ecco il "secondo tempo", quello che tutti dimenticano. Leggilo con calma.

**Perché serve:** le variabili nuove (o modificate) **non entrano in funzione subito**. Il sito le "legge" solo nel momento in cui viene pubblicato. Quindi, dopo aver salvato una variabile, devi dire a Vercel: *"ripubblica il sito così la usi"*. Questo si chiama **Redeploy** (ri-pubblicare).

> Analogia: hai aggiunto una chiave nuova al mazzo, ma la persona è già uscita di casa con il mazzo vecchio. Il Redeploy è "richiamarla indietro e darle il mazzo aggiornato".

Ecco come si fa:

1. Vai sulla scheda **"Deployments"** (lo storico, sezione 5.5).
2. Guarda la **prima riga in alto**: è l'ultima pubblicazione, quella verde "Ready".
3. A destra di quella riga clicca i **tre puntini `...`** (il menu delle opzioni).
4. Dal menu che si apre, clicca **"Redeploy"**.
5. Si aprirà una finestrella di conferma. **Lascia tutto come sta** e clicca di nuovo il pulsante **"Redeploy"** per confermare.

   *(Se c'è una casella tipo "Use existing Build Cache" / "Usa la cache", puoi lasciarla com'è: va bene in entrambi i modi.)*

6. **Cosa vedrai:** compare una nuova riga in cima ai Deployments, con il pallino **giallo "Building"**. Aspetta **1-2 minuti**. Quando diventa **verde "Ready"**, la tua variabile nuova è finalmente attiva e il sito la sta usando.

**Se non funziona:**
- Se il nuovo deploy diventa **rosso**, segui la procedura della sezione 5.5: apri i log, copia il testo rosso e dallo a Claude Code.
- Se hai aggiunto la variabile ma "non si vede l'effetto" sul sito, nel 99% dei casi è perché **hai saltato il Redeploy**, oppure il Redeploy non è ancora finito (aspetta che sia verde). Ricontrolla.

### 5.9 Riepilogo della procedura (da tenere a portata di mano)

Ogni volta che devi attivare un servizio nuovo (webhook Sanity, Behold/Instagram, email Resend), il giro è sempre questo:

1. **Settings > Environment Variables** → scrivi **Key** e **Value** → **Save**.
2. **Deployments** → tre puntini `...` sulla prima riga → **Redeploy** → conferma.
3. Aspetta il **pallino verde "Ready"**.
4. Vai sul sito e verifica che il servizio ora funzioni.

Tienila vicino: la userai più volte nei capitoli successivi.

### 5.10 Una nota sul piano (gratis vs a pagamento)

Oggi il progetto è sul piano **"Hobby"** di Vercel, che è **gratuito**. Per un sito di prova e per imparare va benissimo: non paghi nulla.

Una sola avvertenza, da sapere fin d'ora: il piano Hobby, secondo le regole di Vercel, è pensato per **usi personali e non commerciali**. Climb Pole Studio è un'attività vera, con clienti. Quindi, **prima del go-live "ufficiale"** (cioè quando il dominio `climbpolestudio.it` punterà davvero qui, lo vediamo in un capitolo dedicato), è bene valutare il passaggio al piano **"Pro"** (a pagamento, una quota mensile per ogni membro). Non è urgente adesso, ma segnatelo: è una di quelle decisioni "da titolare" da prendere con calma con chi ti segue tecnicamente.

> Buona notizia finale sulla sicurezza del sito: il **lucchetto verde** del browser (l'**HTTPS**, cioè la connessione cifrata che protegge i dati) su Vercel **si attiva e si rinnova da solo**, gratis. Non devi fare assolutamente nulla. Una preoccupazione in meno.

## 6. Attivare il feed Instagram in home (Behold)

In questo capitolo facciamo comparire gli ultimi 6 post di Instagram dello studio direttamente in homepage. Niente paura: non scrivi codice, non tocchi file. Colleghi solo due servizi tra loro e incolli un codice in Vercel.

Per capirci con un'immagine: Instagram è la vetrina dei tuoi post. Behold è un "fattorino" gratuito che va a prendere quei post e li consegna al tuo sito. Tu devi solo dare al sito il numero di "consegna" giusto (il FEED ID), così sa quali post mostrare.

Tranquilla: come sempre, non puoi rompere niente di grave. Se qualcosa non va, il sito continua a funzionare e questa sezione semplicemente non appare.

### Prerequisito: l'Instagram deve essere "Business" o "Creator"

Behold riesce a leggere i post solo se l'account Instagram dello studio è di tipo **Business** (azienda) o **Creator** (creatore). Sono profili gratuiti, pensati per le attività. Se oggi il profilo è "personale", va convertito una volta sola. È gratis e si torna indietro quando vuoi.

Come convertirlo (dall'app Instagram, sul telefono):

1. Apri Instagram, vai sul tuo profilo (icona in basso a destra), poi tocca le tre lineette in alto a destra (il menu "☰") e scegli **Impostazioni e privacy**.
2. Cerca la voce **Strumenti per professionisti** (oppure "Account" → "Passa a un account professionale"), poi tocca **Passa a un account professionale**.
3. Segui i passaggi e scegli **Business** (o **Creator**); puoi saltare le parti che non ti interessano (telefono, indirizzo) toccando "Salta".

**Cosa vedrai:** dopo qualche tocco, sul tuo profilo compaiono nuovi strumenti (statistiche, contatti). Sei a posto.

**Se non funziona:** se non trovi le voci con quei nomi esatti, è solo perché Instagram cambia spesso le diciture. Cerca sempre la parola "professionale" o "Business": il percorso è quello. Niente di grave se ci provi più volte.

### Passo 1 — Crea un account gratuito su Behold

Behold (si scrive *behold.so*) è il servizio gratuito che fa da ponte tra Instagram e il sito.

1. Apri il browser (Chrome, Edge, Safari) e vai su **behold.so**.
2. Clicca sul pulsante per registrarti, di solito **Sign up** o **Get started** (in alto a destra).
3. Iscriviti usando **l'email del proprietario o dello studio** (per esempio l'email principale di Climb Pole Studio), non un'email personale qualsiasi. Così domani chi gestisce lo studio ha le credenziali in mano.

**Cosa vedrai:** dopo l'iscrizione entri in una pagina (la "dashboard", cioè il tuo pannello di controllo Behold), per ora vuota.

**Se non funziona:** se non ricevi l'email di conferma, controlla la cartella **Spam/Posta indesiderata**. Capita spesso.

### Passo 2 — Collega l'account Instagram

Ora dici a Behold da quale Instagram prendere i post.

1. Nella dashboard di Behold cerca il pulsante **Connect Instagram** (Collega Instagram) e cliccalo.
2. Si apre la finestra di Instagram/Facebook che ti chiede il permesso: accedi con l'account Instagram dello studio e **autorizza** Behold a leggere i post.

**Cosa vedrai:** tornato su Behold, l'account Instagram dello studio risulta collegato (vedi il nome utente, tipo "@climbpolestudio").

**Se non funziona:**
- Se Behold dice che l'account "non è supportato", quasi sempre vuol dire che è ancora un profilo **personale**: torna al prerequisito qui sopra e convertilo in Business o Creator.
- Se l'Instagram è collegato a una Pagina Facebook, durante l'autorizzazione spunta tutte le caselle dei permessi che ti propone, altrimenti Behold non vede i post.

### Passo 3 — Crea un "feed" e copia il FEED ID

Un "feed" è semplicemente la lista di post che Behold prepara per il tuo sito.

1. Nella dashboard clicca su **New feed** (Nuovo feed) o **Create feed**.
2. Dai un nome qualsiasi (per esempio "Home sito") e salva. Le opzioni di stile non servono: il sito ha già il suo look.
3. Apri il feed appena creato. Ora guarda **la barra dell'indirizzo del browser** in alto: l'indirizzo finisce con una sigla, tipo:

```
https://feeds.behold.so/AbCd1234XyZ
```

4. La parte finale dopo l'ultima barra (`/`) — nell'esempio `AbCd1234XyZ` — è il tuo **FEED ID**. Selezionala con il mouse e copiala (tasto destro → Copia, oppure Ctrl+C su Windows / Cmd+C su Mac).

**Cosa vedrai:** un codice corto fatto di lettere e numeri. Quello è il "numero di consegna" che cercavamo.

**Se non funziona:** se nell'indirizzo non vedi `feeds.behold.so/...`, cerca dentro la pagina del feed una voce chiamata **Feed ID** o un riquadro "Embed/Code": lì lo stesso codice è scritto in chiaro e puoi copiarlo da quel punto.

Un consiglio: incolla per un attimo questo codice in una nota o in una mail a te stessa, così non lo perdi mentre passi al prossimo passo.

### Passo 4 — Incolla l'ID in Vercel (variabile BEHOLD_FEED_ID)

Adesso consegniamo questo codice al sito. Il sito legge un "cassetto" chiamato **BEHOLD_FEED_ID**: ci mettiamo dentro il tuo FEED ID e il sito saprà quali post mostrare.

La procedura esatta per aggiungere una variabile su Vercel e poi rifare la pubblicazione (il "redeploy") l'hai già vista nel **Capitolo 5**. Qui ti ricordo solo cosa inserire:

1. Vai nelle impostazioni del progetto su Vercel, nella sezione **Environment Variables** (le "variabili d'ambiente", cioè i cassetti con le impostazioni del sito).
2. Nel campo del nome scrivi esattamente, tutto in maiuscolo:

```
BEHOLD_FEED_ID
```

3. Nel campo del valore incolla il **FEED ID** che hai copiato dal Passo 3 (per esempio `AbCd1234XyZ`, senza la parte `https://feeds.behold.so/`).
4. Salva e poi fai il **redeploy** (la ri-pubblicazione), come spiegato nel Capitolo 5. Serve perché il sito legge i cassetti solo quando viene ri-pubblicato.

**Cosa vedrai:** la variabile `BEHOLD_FEED_ID` compare nell'elenco su Vercel, e dopo il redeploy il sito è di nuovo online (stato "Ready", cioè "pronto").

**Se non funziona:**
- Controlla di non aver incollato spazi vuoti prima o dopo il codice. Anche uno spazio di troppo lo rende invalido.
- Assicurati di aver scritto il nome **identico**: `BEHOLD_FEED_ID`, senza errori di battitura, altrimenti il sito non lo trova.

### Cosa vedrai sul sito a fine procedura

Apri la homepage del sito di prova: **https://climbpolestudio-it.vercel.app**

Scorri verso il basso fino alla sezione **"Prossime lezioni"**: subito **sotto** comparirà la sezione **"Seguici"** con una **griglia di 6 post** Instagram. Cliccandoli si aprono i post veri su Instagram.

### Cose importanti da ricordare

- **Piano gratuito = 6 post.** Behold gratis mostra gli ultimi 6 post. Per la home è perfetto.
- **Si aggiorna 1 volta al giorno.** Se pubblichi un post nuovo su Instagram, sul sito appare entro il giorno dopo, non all'istante. È normale, non è un guasto.
- **Se l'ID manca, la sezione resta nascosta.** Finché non hai inserito `BEHOLD_FEED_ID`, la sezione "Seguici" semplicemente non si vede. **Non è un errore** e non rompe nulla: il resto del sito funziona come sempre. Appena metti l'ID e fai il redeploy, la sezione compare da sola.

Ricorda: c'è sempre la cronologia su GitHub e i deploy precedenti su Vercel. Qualunque cosa succeda, si torna indietro. Qui stai solo aggiungendo un cassetto: nel peggiore dei casi la griglia non appare, e basta riprovare.

## 7. Mandare il sito sul dominio vero climbpolestudio.it (Register.it)

Questo è il passo più delicato di tutta la guida. Ma niente paura: te lo spiego con calma, un pezzo alla volta. E, come sempre, ricorda una cosa che ti tranquillizza: **non puoi rompere niente di grave**. Se qualcosa va storto, si torna indietro rimettendo i valori di prima. La cronologia esiste, Vercel resta lì, il tuo sito nuovo non sparisce.

### 7.1 Cosa stiamo per fare (in parole semplici)

Oggi, quando una persona scrive **climbpolestudio.it** nel browser, vede il **vecchio sito WordPress**. Il sito nuovo, bello e già pronto, vive su un altro indirizzo di prova: `https://climbpolestudio-it.vercel.app`.

L'obiettivo di questo capitolo è uno solo: far sì che **climbpolestudio.it mostri il sito nuovo** (quello su Vercel) al posto del vecchio.

Pensa al dominio `climbpolestudio.it` come a un **cartello stradale**. Oggi il cartello indica la vecchia casa (WordPress). Noi giriamo il cartello in modo che indichi la casa nuova (Vercel). La casa nuova è già costruita e arredata: dobbiamo solo cambiare la freccia.

Quando il cartello sarà girato, **il vecchio sito WordPress sparirà** dall'indirizzo climbpolestudio.it (continuerà a esistere altrove, ma nessuno lo vedrà più scrivendo il tuo dominio). Questo è esattamente quello che vogliamo: si chiama "go-live", cioè "andare in diretta".

### 7.2 Cos'è il DNS (la "rubrica di internet")

Per girare il cartello dobbiamo toccare una cosa che si chiama **DNS**. Ti spiego cos'è, perché lo nomineremo spesso.

Il **DNS** è come la **rubrica del telefono di internet**. Tu conosci i nomi ("climbpolestudio.it"), ma i computer tra loro si parlano con dei numeri (gli indirizzi dei server, tipo `76.76.21.21`). Il DNS è la rubrica che traduce: *"al nome climbpolestudio.it corrisponde questo server qui"*.

Dentro questa rubrica ci sono delle righe, chiamate **record**. A noi ne interessano due tipi:

- Un record di tipo **A**: è quello che dice *"il nome → questo numero di server"*. Lo useremo per `climbpolestudio.it` (scritto come `@`, che vuol dire "il dominio così com'è, senza www").
- Un record di tipo **CNAME**: è quello che dice *"questo nome → è un soprannome di quest'altro nome"*. Lo useremo per `www.climbpolestudio.it`.

Non serve che tu impari a memoria la differenza. Ti basta sapere: **modificheremo due righe nella rubrica** del dominio, seguendo i valori esatti che ci dà Vercel.

### 7.3 Importante: il cambio NON è istantaneo

Questa è la cosa più importante da capire **prima** di iniziare, così non ti spaventi.

Quando cambi i record DNS, il nuovo cartello **non viene visto subito da tutto il mondo**. La nuova informazione deve "fare il giro" di internet, server dopo server. Questo si chiama **propagazione**.

La propagazione può richiedere **da pochi minuti fino a 24-48 ore**. Nel frattempo può succedere una cosa normalissima: tu vedi ancora il vecchio sito, mentre un'amica da un altro computer vede già quello nuovo (o viceversa). **È normale. Non hai sbagliato niente.** Devi solo aspettare.

Quindi: non fare questa operazione cinque minuti prima di un evento importante. Falla con calma, magari di sera, e dai tempo a internet di aggiornarsi.

### 7.4 Prima di iniziare: cosa tenere a portata di mano

Fai questo prima di toccare qualsiasi cosa:

1. **Le credenziali di Register.it**: nome utente e password con cui entri nel pannello di Register.it (il sito dove hai registrato climbpolestudio.it). Se non le ricordi, recuperale **adesso**, non a metà operazione.
2. **L'accesso a Vercel**: devi poter entrare nel progetto su Vercel.
3. **Tempo e tranquillità**: niente fretta. Mezz'ora con la testa libera.
4. **Un aiuto, se vuoi**: questa è davvero l'operazione in cui conviene **farsi affiancare**. Puoi tenere aperto **Claude Code** e chiedergli passo passo (gli incolli quello che vedi e lui ti guida), oppure farti aiutare da una persona che conosce Register.it. Non è una sconfitta: è il passo dove un secondo paio d'occhi vale oro.

> **Perché tanta prudenza?** Perché qui stiamo toccando il dominio "vero", quello che i clienti usano davvero. Tutto il resto della guida lo abbiamo provato sull'indirizzo di prova. Questo è l'unico passo che ha effetto immediato sul mondo reale. Ma anche qui, lo ripeto: se sbagli un valore, il sito non "esplode"; semplicemente rimetti i valori giusti e aspetti di nuovo.

### 7.5 Passo 1 — Su Vercel: aggiungere il dominio e leggere i record esatti

Cominciamo da **Vercel**, perché è Vercel a dirci **quali valori esatti** scrivere poi su Register.it. Pensa a Vercel come al proprietario della casa nuova: è lui che ti dà l'indirizzo preciso da scrivere sul cartello.

1. Entra su **Vercel** e apri il progetto del sito (Climb Pole Studio).
2. In alto, clicca su **Settings** (Impostazioni).
3. Nel menù a sinistra, clicca su **Domains** (Domini).
4. Vedrai una casella per aggiungere un dominio. Scrivici dentro:
   ```
   climbpolestudio.it
   ```
   e conferma (di solito un pulsante **Add**).
5. Ripeti e aggiungi anche la versione con **www**:
   ```
   www.climbpolestudio.it
   ```

**Cosa vedrai:** Vercel ti dirà che il dominio non è ancora collegato (comparirà una scritta tipo *"Invalid Configuration"* o un avviso giallo). **È giusto così**: non l'abbiamo ancora collegato dalla parte di Register.it. La cosa importante è che, accanto, Vercel ti mostra **i record DNS esatti da inserire**.

Tipicamente Vercel mostra qualcosa come:

- un record **A**, con nome `@`, che punta a un numero (di solito `76.76.21.21`);
- un record **CNAME**, con nome `www`, che punta a `cname.vercel-dns.com`.

> **Regola d'oro:** usa **sempre i valori ESATTI che vedi scritti nella pagina Domains di Vercel**, anche se qui te ne scrivo degli esempi. Se Vercel ti mostra un numero o un nome leggermente diverso, vale quello di Vercel, non quello di questa guida. È come copiare un indirizzo da una busta: copi quello che c'è scritto lì, non quello che ricordi.

**Se non funziona / non sai quale valore copiare:** lascia questa pagina **aperta** in una scheda del browser. La rileggeremo tra un attimo. Se hai un dubbio su cosa copiare, fai uno screenshot e mostralo a Claude Code: ti dirà esattamente quale riga è la "A" e quale la "CNAME".

### 7.6 Passo 2 — Su Register.it: modificare i record DNS

Ora andiamo a **girare il cartello**. Apri **un'altra scheda** del browser (tieni Vercel aperto nell'altra, ci serve sotto gli occhi).

1. Vai sul sito di **Register.it** e fai **accesso** con le tue credenziali.
2. Cerca la sezione dei tuoi domini (può chiamarsi **"I miei domini"**, **"Domini"** o simile) e clicca sul dominio **climbpolestudio.it**.
3. Cerca la voce **"Gestione DNS"** oppure **"Modifica DNS"** (a volte è dentro **"Impostazioni avanzate"** o **"DNS / Nameserver"**). È la pagina dove si vede l'elenco dei **record** (quella "rubrica" di cui parlavamo).

**Cosa vedrai:** un elenco di righe, con colonne tipo *Tipo* (A, CNAME, MX, TXT...), *Nome/Host* (`@`, `www`, ...) e *Valore/Destinazione*. Non spaventarti se ci sono diverse righe: a noi ne interessano solo due.

Adesso il cuore dell'operazione. Lo facciamo con ordine.

**A) Il record A (per climbpolestudio.it "nudo", cioè senza www):**

1. Cerca nell'elenco una riga di **Tipo `A`** con **Nome `@`** (oppure il campo nome vuoto, che significa la stessa cosa). Quella riga oggi punta al **vecchio WordPress**.
2. **Modificala** (di solito c'è una matitina o un pulsante "Modifica"): nel campo *Valore/Destinazione* metti il **numero esatto che ti mostra Vercel** (di norma `76.76.21.21`).
3. Salva.

Se **non esiste** una riga A con `@`, creane una nuova: Tipo `A`, Nome `@`, Valore = il numero di Vercel.

**B) Il record CNAME (per www.climbpolestudio.it):**

1. Cerca una riga di **Tipo `CNAME`** con **Nome `www`**.
2. **Modificala** mettendo nel valore esattamente:
   ```
   cname.vercel-dns.com
   ```
   (o, di nuovo, il valore preciso che ti mostra Vercel).
3. Salva.

Se non esiste, creala: Tipo `CNAME`, Nome `www`, Valore `cname.vercel-dns.com`.

**C) Togliere i vecchi record che puntano a WordPress:**

Questa parte serve perché il vecchio sito non "litighi" con il nuovo. Se nell'elenco restano vecchie righe **A** o **CNAME** (per `@` o `www`) che puntavano al vecchio hosting WordPress, vanno **rimosse**. In pratica: dopo le tue modifiche, per `@` deve esserci **solo** la riga A che punta al numero di Vercel, e per `www` **solo** il CNAME verso Vercel.

> **Attenzione, da fare bene:** **non cancellare** le righe che non c'entrano con il sito! In particolare lascia stare i record di tipo **MX** (servono per la **posta elettronica** del dominio) e quelli **TXT**. Se tocchi gli MX, rischi di far smettere di funzionare le email. Noi cambiamo **solo** la A di `@` e il CNAME di `www`. Tutto il resto **non si tocca**.

**Cosa vedrai dopo aver salvato:** Register.it di solito mostra un messaggio tipo *"Modifiche salvate"* e l'elenco aggiornato con i nuovi valori. A volte avvisa che le modifiche "saranno attive entro alcune ore": è la **propagazione** di cui parlavamo. Tutto normale.

**Se non trovi "Gestione DNS" / vedi solo "Nameserver":** alcuni domini su Register.it usano i "nameserver" di un altro servizio, e in quel caso i record si modificano altrove. Se ti trovi spaesato, **fermati** e chiedi a Claude Code (incollagli quello che vedi a schermo) oppure a chi ti affianca, prima di toccare i nameserver. Cambiare i nameserver è un'operazione diversa e più invasiva: meglio non improvvisare.

### 7.7 Passo 3 — Aspettare (e l'HTTPS si accende da solo)

Fatte le modifiche, il grosso è finito. Ora si **aspetta** la propagazione.

1. Torna sulla scheda di **Vercel**, nella pagina **Settings > Domains**.
2. All'inizio vedrai ancora l'avviso giallo. Man mano che la propagazione avanza, Vercel **se ne accorge da solo** e gli avvisi diventano verdi (tipo *"Valid Configuration"*). Non devi premere nulla: Vercel ricontrolla periodicamente.
3. Prova ad aprire `https://climbpolestudio.it` ogni tanto. Quando vedrai il **sito nuovo** al posto del WordPress, ce l'hai fatta.

**E il lucchetto (HTTPS)?** È quel **lucchetto** che vedi accanto all'indirizzo nel browser: vuol dire che la connessione è sicura e cifrata. Bella notizia: **non devi fare niente**. Appena il dominio è collegato, Vercel attiva **da solo** il certificato di sicurezza (si chiama Let's Encrypt) e lo **rinnova da solo** quando scade. Zero pensieri, zero scadenze da ricordare.

**Se dopo 24-48 ore vedi ancora il vecchio sito:** non è il caso di farsi prendere dal panico. Le cause più comuni sono due, ed entrambe si risolvono:
- un valore copiato male su Register.it (ricontrolla che la A di `@` sia il numero di Vercel e il CNAME di `www` sia `cname.vercel-dns.com`);
- una vecchia riga WordPress rimasta nell'elenco (vai a rimuoverla).
In ogni caso, apri Claude Code, raccontagli cosa vedi e incollagli i record DNS: ti aiuta a trovare la riga sbagliata.

### 7.8 Ultimo ritocco — dire al sito qual è il suo indirizzo "vero"

Manca un dettaglio piccolo ma utile. Il sito nuovo ha un'impostazione che dice "qual è il mio indirizzo ufficiale". Si chiama **NEXT_PUBLIC_SITE_URL** ed è una delle "variabili d'ambiente" di cui hai sentito parlare nei capitoli precedenti (le impostazioni segrete/di configurazione che stanno su Vercel).

Finché eravamo in prova, puntava all'indirizzo `.vercel.app`. Ora che il sito vive su climbpolestudio.it, conviene aggiornarla, così link e anteprime (ad esempio quando condividi il sito su WhatsApp o Facebook) mostrano l'indirizzo giusto.

1. Su **Vercel**, apri il progetto, poi **Settings** > **Environment Variables** (Variabili d'ambiente).
2. Cerca la variabile **`NEXT_PUBLIC_SITE_URL`**.
3. Modificane il valore mettendo:
   ```
   https://climbpolestudio.it
   ```
4. Salva.
5. Perché il cambiamento abbia effetto, il sito va **ripubblicato** (in gergo "redeploy"): Vercel di solito lo propone, oppure trovi l'opzione **Redeploy** nella sezione **Deployments**. Se non sai dove, chiedi a Claude Code: te lo fa fare in due clic.

**Cosa vedrai:** nulla di visibilmente diverso nel sito a occhio nudo; è una rifinitura "sotto il cofano" che serve ai link condivisi e ai motori di ricerca. Va benissimo anche farla il giorno dopo, con calma.

### 7.9 In due righe (il riassunto da tenere a mente)

- **Vercel** ti dà i valori esatti (Settings > Domains, aggiungi `climbpolestudio.it` e `www.climbpolestudio.it`).
- **Register.it** è dove giri il cartello: cambi la **A di `@`** verso il numero di Vercel e il **CNAME di `www`** verso `cname.vercel-dns.com`, togli i vecchi record WordPress, **non toccare gli MX** (la posta).
- Poi **aspetti** (fino a 24-48h), il **lucchetto HTTPS si accende da solo**, e aggiorni **NEXT_PUBLIC_SITE_URL** su Vercel.
- Nel dubbio: **fermati e fatti affiancare** da Claude Code o da chi conosce Register.it. Non puoi rompere niente di irreparabile: si rimettono i valori e si aspetta di nuovo.

## 8. Far funzionare il modulo contatti (email con Resend)

Sul sito c'è una pagina "Contatti" con un piccolo modulo: il visitatore scrive nome, email e messaggio, poi clicca "Invia". Perché quel messaggio arrivi davvero nella tua casella di posta, serve un servizio esterno che spedisca le email al posto del sito. Quel servizio si chiama **Resend**.

Pensa a Resend come al "postino" del sito. Il sito scrive la lettera, ma da solo non sa portarla all'ufficio postale. Resend è il postino che la prende e la consegna.

### Tranquilla: senza Resend il sito NON è rotto

Questa è la cosa più importante da capire prima di iniziare, così la affronti senza ansia.

Finché Resend non è configurato, il modulo contatti **non si blocca e non dà errore**. Il sito è furbo: se si accorge che il "postino" non c'è, propone in automatico di scrivere su **WhatsApp**. Quindi chi ti vuole contattare riesce comunque a farlo.

Tradotto: questo capitolo serve a **migliorare** il sito (avere anche le email), non a ripararlo. Puoi farlo con calma, anche fra qualche settimana.

> Promemoria: non puoi rompere niente di grave. Ogni modifica che fai su Vercel si può annullare, e c'è sempre la cronologia. Stai aggiungendo una funzione, non smontandone una.

### Quando conviene fare questo capitolo

Resend, per spedire email "ufficiali" dal tuo dominio (cioè da un indirizzo tipo `nadia@climbpolestudio.it`), ha bisogno che tu **verifichi il dominio** `climbpolestudio.it`.

Verificare il dominio significa aggiungere alcuni record DNS su Register.it: **è la stessissima operazione del Capitolo 7** (quella per puntare il dominio a Vercel). Stessi schermi, stessa logica: incolli dei valori che Resend ti dà, dentro il pannello DNS di Register.it.

Per questo il consiglio è semplice:

- Fai questo capitolo **insieme o subito dopo il go-live del dominio** (Capitolo 7).
- Così entri nel pannello DNS di Register.it una volta sola, con la testa già "calda" sull'argomento, e aggiungi tutti i record in un colpo.

Se invece il dominio non è ancora passato a Vercel, puoi comunque creare l'account Resend e tornare alla verifica dopo. Nessun problema.

### Passo 1 — Crea l'account su Resend

1. Apri il browser e vai su:

```text
https://resend.com
```

2. Clicca sul pulsante **"Sign Up"** (in italiano: "Registrati"), in alto a destra.

3. Registrati. Il modo più comodo è cliccare **"Continue with Google"** e usare il tuo account Google. In alternativa, scrivi una email e una password.

**Cosa vedrai:** dopo la registrazione entri in una "dashboard" (il pannello di controllo di Resend), con un menù sulla sinistra. È normale che all'inizio sia tutto vuoto.

**Se non funziona:** se non ricevi l'email di conferma, controlla la cartella "Spam"/"Posta indesiderata". Capita spesso.

### Passo 2 — Verifica il dominio climbpolestudio.it

Questo è il passo che collega Resend al tuo dominio. È quello che richiede i record DNS su Register.it.

1. Nel menù di sinistra di Resend, clicca su **"Domains"** (in italiano: "Domini").

2. Clicca il pulsante **"Add Domain"** ("Aggiungi dominio").

3. Nel campo che appare, scrivi esattamente:

```text
climbpolestudio.it
```

poi conferma (pulsante "Add").

**Cosa vedrai:** Resend ti mostra una tabella con alcuni **record DNS** da aggiungere. Saranno righe di tipo **TXT**, **CNAME** e **MX**. Ogni riga ha un "Name/Host" (un nome) e un "Value" (un valore lungo). Sembrano scritte aliene: è normalissimo, non devi capirle, devi solo **copiarle** così come sono.

4. Apri **un'altra scheda del browser** e accedi a **Register.it**, esattamente come hai fatto nel Capitolo 7, fino ad arrivare alla pagina di gestione **DNS** del dominio `climbpolestudio.it`.

5. Per ogni riga che Resend ti mostra, crea un nuovo record nel pannello di Register.it:
   - scegli il **Tipo** giusto (TXT, CNAME o MX, come indicato da Resend);
   - copia il **Name/Host** dal campo di Resend e incollalo nel campo "Nome/Host" di Register.it;
   - copia il **Value** da Resend e incollalo nel "Valore" di Register.it;
   - salva.

> Suggerimento per copiare senza errori: usa il pulsantino "copia" (di solito un'iconcina con due fogliettini) che Resend mette accanto a ogni valore. Così eviti di sbagliare anche una sola lettera. Un solo carattere fuori posto e il record non viene riconosciuto.

6. Quando hai inserito tutti i record su Register.it, torna nella scheda di Resend e clicca il pulsante **"Verify DNS Records"** (in italiano: "Verifica i record DNS").

**Cosa vedrai:** all'inizio probabilmente alcune righe risultano ancora "in attesa" (di solito con un pallino giallo o la scritta "Pending"). I cambiamenti DNS **ci mettono un po' a propagarsi**: come quando spedisci una cartolina, non arriva nello stesso istante. Può volerci da qualche minuto fino a qualche ora.

7. Aspetta un po' e ripremi **"Verify DNS Records"** ogni tanto. Quando tutte le righe diventano **verdi / "Verified"** e il dominio risulta **"Verified"**, hai finito questo passo.

**Se non funziona (record sempre "Pending"):**
- ricontrolla di aver scelto il **Tipo** esatto (un TXT messo come CNAME non verrà mai riconosciuto);
- controlla che nel "Name/Host" non ci sia per sbaglio scritto due volte il dominio (a volte Register.it lo aggiunge da solo: se Resend chiede `resend._domainkey` potrebbe bastare quello, non `resend._domainkey.climbpolestudio.it`);
- dai più tempo: spesso è solo lentezza della propagazione, non un errore tuo.

> Se a questo punto ti senti persa tra "TXT", "CNAME" e "Host", non incaponirti da sola. Apri Claude Code (il comando `claude` nel terminale, come nel Capitolo 2) e scrivigli una cosa tipo: *"Sto verificando il dominio climbpolestudio.it su Resend, ho questi record DNS da mettere su Register.it, mi guidi uno per uno?"* e incolla quello che vedi. Ti accompagna passo passo. Non è un esame: chiedere aiuto è la mossa giusta.

### Passo 3 — Genera la API KEY

La "API key" è una specie di **password speciale**: è la chiave che permette al tuo sito di dire a Resend "ehi, sono io, spedisci questa email per me". Ora la creiamo.

1. Nel menù di sinistra di Resend, clicca su **"API Keys"** ("Chiavi API").

2. Clicca **"Create API Key"** ("Crea chiave API").

3. Dai un nome qualsiasi (serve solo a te per ricordartelo), per esempio:

```text
sito climbpolestudio
```

Lascia gli altri campi sui valori predefiniti e conferma.

**Cosa vedrai:** Resend ti mostra una **lunga stringa** che inizia con `re_...`. Quella è la tua chiave.

4. **Copiala subito** con il pulsante "Copy" e tienila da parte un momento (puoi incollarla temporaneamente in un blocco note).

> ATTENZIONE: questa chiave Resend te la mostra **una volta sola**. Se chiudi la finestra senza copiarla, non potrai più rivederla — ma niente panico: basta cancellarla e crearne un'altra. Trattala come una password: non scriverla nelle email, non mandarla a nessuno.

### Passo 4 — Incolla la chiave su Vercel (variabile RESEND_API_KEY)

Adesso devi consegnare questa chiave al sito. Lo fai tramite Vercel, esattamente con la stessa procedura delle **variabili d'ambiente** che hai imparato nel **Capitolo 5**.

1. Vai su Vercel, entra nel progetto del sito e apri **Settings → Environment Variables** (Impostazioni → Variabili d'ambiente), come nel Capitolo 5.

2. Cerca se esiste già una variabile chiamata:

```text
RESEND_API_KEY
```

3. Inseriscila / aggiornala:
   - nel campo **Name** (Nome) scrivi esattamente `RESEND_API_KEY` (tutto maiuscolo, con i trattini bassi);
   - nel campo **Value** (Valore) **incolla la chiave** `re_...` che hai copiato dal Passo 3;
   - assicurati che sia attiva per tutti gli ambienti (di solito ci sono tre caselline: Production, Preview, Development — lasciale spuntate tutte);
   - salva con **Save**.

**Cosa vedrai:** la variabile `RESEND_API_KEY` compare nell'elenco. Il valore resta nascosto (puntini o asterischi): è giusto così, è una chiave segreta.

**Se non funziona:** controlla di non aver lasciato uno **spazio** prima o dopo la chiave quando l'hai incollata. È l'errore più comune e basta a impedire l'invio.

### Passo 5 — Fai un "redeploy" (ripubblica il sito)

Le variabili d'ambiente non hanno effetto da sole: il sito le "legge" solo quando viene ripubblicato. Questa operazione si chiama **redeploy** (ri-pubblicazione) e l'hai già vista nel Capitolo 5.

1. Sempre su Vercel, vai nella sezione **"Deployments"** (le pubblicazioni del sito).

2. Trova la pubblicazione più recente in cima alla lista. Clicca il menù con i **tre puntini (…)** alla sua destra.

3. Clicca **"Redeploy"** e conferma.

**Cosa vedrai:** parte una nuova pubblicazione. Dopo uno o due minuti diventa **"Ready"** (pronta), con un pallino verde. A quel punto il sito gira con la nuova chiave attiva.

### Passo 6 — Prova: invia un messaggio dal form

L'ultimo passo è il più soddisfacente: vediamo se le email arrivano davvero.

1. Apri il sito vero (il dominio, oppure l'indirizzo di prova `https://climbpolestudio-it.vercel.app`) e vai sulla pagina **Contatti**.

2. Compila il modulo come farebbe un visitatore: scrivi un nome, **la TUA email** nel campo email, e un messaggio tipo "prova invio modulo".

3. Clicca **"Invia"**.

**Cosa vedrai:** un messaggio di conferma sul sito (tipo "Messaggio inviato, grazie"). Poco dopo, l'email dovrebbe arrivare nella casella di posta collegata.

4. Controlla la posta. Guarda anche nello **Spam** la prima volta: capita che la primissima email finisca lì, poi la "segni come attendibile" e in futuro arriva nella posta normale.

**Se non funziona (l'email non arriva):**
- ricontrolla che il dominio su Resend sia davvero **"Verified"** (Passo 2): finché non è verde, le email dal dominio non partono;
- ricontrolla che la variabile `RESEND_API_KEY` su Vercel sia **giusta e senza spazi**, e che tu abbia fatto il **redeploy** (Passo 5) DOPO averla inserita;
- guarda nella dashboard di Resend, alla voce **"Logs"** (registri): lì vedi i tentativi di invio e l'eventuale motivo dell'errore. Se non capisci il messaggio, copialo e chiedi a Claude Code di tradurtelo e dirti cosa fare.

> Anche qui, se a un certo punto ti sembra tutto troppo: respira. Non hai rotto niente. Il form, nel frattempo, continua a proporre WhatsApp ai visitatori, quindi nessun contatto va perso mentre sistemi le email con calma. E se vuoi una guida passo-passo sui record o sui log, basta aprire Claude Code e chiedere.

## 9. Sistemare la scheda Google (Google Business Profile)

Hai presente quando cerchi un ristorante su Google e ti compare a destra un riquadro con nome, foto, orari, numero di telefono, indirizzo e le stelline delle recensioni? Quella cosa lì si chiama **Google Business Profile** (prima si chiamava "Google My Business"). È la "carta d'identità" della tua attività su Google.

Per "Climb Pole Studio" questa scheda **esiste già**. Non devi crearla da zero: devi rivendicarla (cioè dimostrare a Google che sei tu il proprietario) e poi sistemarla.

### Perché conta davvero

Quando una persona a Torino cerca su Google "**pole dance Torino**", oppure "**arti aeree Torino**", o ancora apre **Google Maps** per cercare una scuola vicino a casa, Google decide cosa mostrarle. La scheda è uno dei pezzi che Google guarda per capire chi sei, dove sei e se sei affidabile.

In pratica:

- È la prima cosa che molte persone vedono di te, **prima ancora del sito**.
- Da lì la gente ti telefona, chiede indicazioni stradali, guarda gli orari e legge le recensioni.
- Se i dati sono giusti e completi, Google ti mostra più spesso e più in alto nelle ricerche locali.

C'è una regola d'oro che ripeteremo più volte: **i dati sulla scheda devono essere IDENTICI a quelli del sito**. Stesso nome, stesso indirizzo, stesso telefono, scritti nello stesso identico modo. Questa coerenza in gergo si chiama **NAP** (dall'inglese *Name, Address, Phone* = Nome, Indirizzo, Telefono). Pensala così: se a Google racconti due versioni leggermente diverse della stessa cosa (es. "Corso Dante 109/A" sul sito e "C.so Dante 109" su Google), Google si insospettisce e ti penalizza. Una versione sola, scritta uguale ovunque: è questo il segreto.

Non puoi rompere niente di grave qui. Le modifiche alla scheda si possono sempre correggere, e Google tiene una cronologia delle modifiche. Quindi vai tranquilla.

### I dati ufficiali (copia-incolla da qui, sempre uguali)

Tieni questo elenco sotto mano: sono i dati **esatti** da usare ovunque, identici al sito. Non cambiare la punteggiatura, non abbreviare.

- **Nome:** Climb Pole Studio
- **Indirizzo:** Corso Dante 109/A, 10126 Torino (TO)
- **Telefono:** +39 393 025 1482
- **Orari:** Lunedì-Venerdì 13:00-21:30 · Sabato 11:00-16:00 · Domenica chiuso
- **Sito:** climbpolestudio.it *(da mettere solo dopo il "go-live" del dominio — vedi più avanti)*

### Passo 1 — Entrare con l'account Google giusto

1. Decidi **un solo account Google** da usare come "proprietario" della scheda. L'ideale è un account intestato all'attività o alla titolare (Nadia). Annota da qualche parte qual è, perché sarà quello che comanda sulla scheda per sempre.
2. Apri il browser e vai su **google.com/business** (oppure cerca su Google "Profilo dell'attività su Google").
3. Clicca su **Accedi** (in alto a destra) ed entra con quell'account.

**Cosa vedrai:** una pagina che ti invita a gestire o trovare la tua attività.

**Se non funziona:** se non ricordi quale account era già collegato, prova quelli che potreste aver usato in passato. Se proprio non lo trovi, nessun dramma: nel passo successivo Google ti farà cercare l'attività e capirà da solo se esiste già.

### Passo 2 — Trovare e rivendicare la scheda

"Rivendicare" vuol dire dire a Google: *"questa attività è mia, fammela gestire"*.

1. Nella barra di ricerca scrivi **Climb Pole Studio Torino** e selezionala quando compare.
2. Se la scheda risulta già di qualcun altro (es. di chi l'ha gestita prima), Google te lo dice e ti propone di **richiederne l'accesso**. Segui quella procedura: l'attuale proprietario riceve una richiesta e può passartela.
3. Clicca su **Rivendica** / **Gestisci adesso**.

**Cosa vedrai:** una schermata che ti chiede di **verificare** che sei davvero tu il titolare.

**Se non funziona:** se appare "Questa attività è già stata rivendicata", clicca su **Richiedi l'accesso** e compila il modulo. Ci possono volere alcuni giorni perché Google risponda. È normale, abbi pazienza.

### Passo 3 — La verifica (è il passaggio che richiede più pazienza)

Google deve essere sicuro che tu sia il titolare. Per farlo ti propone uno di questi metodi (non li scegli tu, te li offre Google in base al caso):

- **Codice via posta:** ti spedisce una cartolina con un codice all'indirizzo dello studio. Quando arriva (alcuni giorni), digiti il codice nella scheda.
- **Codice via telefono o SMS:** ti chiama o ti manda un messaggio con un codice da inserire.
- **Codice via email.**
- **Video:** ti chiede di registrare un breve video (con il cellulare) che mostra l'ingresso dello studio, l'insegna, l'interno e magari un documento, per provare che il posto esiste e che ci lavori.

Cosa fare:

1. Scegli il metodo proposto e segui le istruzioni a schermo.
2. Quando ricevi il **codice**, torna sulla scheda e **inseriscilo** dove indicato.

**Cosa vedrai:** dopo la verifica, un messaggio tipo "La tua attività è stata verificata". Da quel momento puoi modificare tutto.

**Se non funziona:** se la cartolina non arriva entro un paio di settimane, puoi richiederne una nuova. Se ti tocca il video, registralo con calma in orario diurno e con buona luce: si può rifare. Finché non sei verificata, alcune modifiche restano "in attesa" e non si vedono online: è normale.

### Passo 4 — Impostare la categoria giusta

La **categoria** dice a Google "che tipo di posto sei". È importantissima per uscire nelle ricerche giuste.

1. Nella scheda apri **Modifica profilo** → **Informazioni** (o "Categoria e dettagli").
2. Imposta una **categoria principale**. La più adatta è **"Scuola di danza"**. Se non la trovi così, vanno bene anche **"Studio di danza"** o **"Palestra"**.
3. Aggiungi qualche **categoria secondaria** se ti vengono proposte e sono pertinenti (es. "Centro fitness", "Studio di pilates/ginnastica"). Non esagerare: solo quelle che ti descrivono davvero.

**Cosa vedrai:** la categoria comparirà sotto il nome dell'attività.

### Passo 5 — Inserire Nome, Indirizzo, Telefono e Orari (NAP)

Qui usi **esattamente** i dati dell'elenco qui sopra. Stessa scrittura del sito.

1. **Nome:** scrivi `Climb Pole Studio`. Niente aggiunte tipo "Torino" o "pole dance" nel nome: Google lo vieta e rischi una sospensione. Il nome è solo il nome.
2. **Indirizzo:** `Corso Dante 109/A, 10126 Torino (TO)`. Controlla anche che il **segnaposto sulla mappa** (lo spillo) sia esattamente sull'ingresso dello studio; se è spostato, trascinalo nel punto giusto.
3. **Telefono:** `+39 393 025 1482`.
4. **Orari di apertura:** imposta così:
   - Lunedì 13:00-21:30
   - Martedì 13:00-21:30
   - Mercoledì 13:00-21:30
   - Giovedì 13:00-21:30
   - Venerdì 13:00-21:30
   - Sabato 11:00-16:00
   - Domenica **Chiuso**
5. Salva.

**Cosa vedrai:** ogni modo salvato mostra una conferma. Alcune modifiche possono restare "in revisione" qualche ora prima di comparire online.

**Se non funziona:** se vedi "Modifica in attesa di approvazione", non rifarla più volte: aspetta. Google a volte controlla a mano i cambiamenti, soprattutto su nome e indirizzo.

> Nota sul telefono: usa lo **stesso identico numero** del sito. Se sul sito è scritto con gli spazi (`+39 393 025 1482`), va benissimo lasciarlo leggibile anche qui. L'importante è che sia lo stesso numero, non un altro.

### Passo 6 — Mettere il sito (solo dopo il go-live)

Il campo "Sito web" deve puntare a **climbpolestudio.it**.

- **Attenzione al tempismo:** oggi il dominio `climbpolestudio.it` mostra ancora il **vecchio sito WordPress**. Il passaggio al nuovo sito (il "go-live") è un'operazione separata, trattata in un altro capitolo della guida.
- Finché il dominio non è passato al nuovo sito, hai due scelte sensate:
  - **Opzione consigliata:** metti comunque `climbpolestudio.it` (l'indirizzo non cambia, cambia solo cosa c'è dietro).
  - In alternativa, se preferisci che la gente veda subito la versione nuova, puoi mettere temporaneamente l'indirizzo di prova `https://climbpolestudio-it.vercel.app` e poi cambiarlo in `climbpolestudio.it` dopo il go-live.

1. In **Modifica profilo** → **Contatti** → **Sito web**, inserisci l'indirizzo.
2. Salva.

**Cosa vedrai:** comparirà un pulsante "Sito web" sulla scheda, che porta al sito.

### Passo 7 — Caricare foto di qualità

Le foto fanno una differenza enorme: una scheda con belle foto riceve molti più clic e contatti.

1. Vai su **Foto** → **Aggiungi foto**.
2. Carica:
   - Una **foto di copertina** (l'immagine grande in alto): scegli la più bella e rappresentativa.
   - Il **logo** di Climb Pole Studio.
   - Foto **dell'interno** dello studio, della sala, dei pali e dei cerchi aerei.
   - Foto **dell'esterno/insegna**, così chi arriva riconosce l'ingresso.
   - Qualche foto **delle lezioni e delle discipline** (con persone in azione: rende tutto più vivo). Se ci sono allievi riconoscibili, chiedi prima il loro consenso.
3. Usa foto **orizzontali**, ben illuminate, nitide. Niente immagini sfocate o con scritte invadenti.

**Cosa vedrai:** le foto compaiono nella galleria della scheda nel giro di poco.

### Passo 8 — Elencare i servizi (le discipline)

I "servizi" aiutano Google a capire cosa offri e fanno comparire le parole giuste.

1. Apri la sezione **Servizi** (o "Modifica servizi").
2. Aggiungi una voce per ciascuna disciplina, scrivendole **come sul sito**:
   - Pole Dance
   - Cerchio Aereo
   - Functional Training
   - Flexibility
   - Verticali
   - Exotic
3. Se Google ti lascia aggiungere una **breve descrizione** per ciascun servizio, scrivi una frase semplice (es. per "Pole Dance": *"Corsi di pole dance per tutti i livelli, dai principianti agli avanzati."*).

**Cosa vedrai:** i servizi compaiono in un elenco dedicato nella scheda.

### Passo 9 — Scrivere la descrizione con le parole chiave locali

La descrizione è un breve testo che racconta chi sei. Sfruttala per inserire, in modo naturale, le parole che la gente cerca: la città e le discipline.

1. Apri **Modifica profilo** → **Descrizione**.
2. Scrivi un testo come questo (puoi usarlo così com'è o adattarlo):

   *"Climb Pole Studio è uno studio di arti aeree e movimento a Torino, in Corso Dante. Proponiamo corsi di pole dance, cerchio aereo, functional training, flexibility, verticali ed exotic, per tutti i livelli, dai principianti agli avanzati. Un ambiente accogliente dove imparare, allenarsi e divertirsi in sicurezza."*

3. Salva.

**Suggerimento:** cita Torino e le discipline, ma scrivi per le persone, non "a raffica" di parole chiave. Google premia i testi naturali e leggibili. Non ripetere "pole dance Torino" dieci volte: suona finto e non aiuta.

### Passo 10 — Chiedere recensioni e rispondere

Le recensioni con le stelline sono uno dei fattori che pesano di più, sia per la fiducia delle persone sia per Google.

1. Dalla schermata di gestione cerca il pulsante **"Chiedi recensioni"** (o "Condividi il modulo di recensione"): Google ti dà un **link breve** da inviare agli allievi.
2. Invia quel link agli allievi più affezionati (via WhatsApp, email, o un QR code in studio) chiedendo gentilmente una recensione onesta.
3. **Rispondi sempre** a tutte le recensioni, sia belle che brutte:
   - Alle positive: un grazie sincero e personale.
   - Alle negative: con calma ed educazione, mostrando disponibilità a sistemare. Mai litigare: rispondi come se leggessero in cento.

**Cosa vedrai:** le recensioni compaiono sulla scheda con la media a stelle.

**Se non funziona:** non puoi cancellare le recensioni negative a piacimento, e **non** comprare recensioni finte (Google le scopre e ti penalizza). Le risposte gentili valgono più di mille recensioni cancellate.

### Passo 11 — Pubblicare i Post (novità, open day, saggi)

I **Post** sono piccoli annunci che compaiono sulla scheda, come dei mini-articoli. Sono perfetti per tenere viva la pagina.

1. Apri la sezione **Aggiungi aggiornamento** / **Post**.
2. Pubblica novità tipo:
   - un **open day** o una lezione di prova gratuita,
   - l'apertura delle **iscrizioni** ai corsi,
   - un **saggio** o uno spettacolo,
   - promozioni e nuovi orari.
3. Aggiungi una **foto** e, se serve, un pulsante (es. "Chiama ora", "Maggiori informazioni").

**Cosa vedrai:** il post appare sulla scheda per un periodo (gli eventi restano fino alla data indicata).

**Suggerimento:** anche un post ogni due o tre settimane basta a far capire a Google (e alle persone) che lo studio è attivo.

### Promemoria finale: coerenza, coerenza, coerenza

Se ricordi una cosa sola di questo capitolo, sia questa: **scrivi Nome, Indirizzo e Telefono nello stesso identico modo qui, sul sito e ovunque tu compaia online** (Facebook, Instagram, elenchi vari). Questa coerenza (il famoso **NAP**) è uno dei modi più semplici e potenti per farti trovare meglio quando qualcuno cerca "pole dance Torino".

E come sempre: non puoi combinare guai irreparabili. Ogni dato si può ricorreggere, e Google tiene traccia delle modifiche.

## 10. Quando qualcosa non va: piccola guida ai problemi

Prima di tutto, respira. Quasi niente di quello che fai è davvero pericoloso. Il sito vero, quello che vedono le persone, vive su internet (su Vercel) e ha una sua cronologia: anche se sul tuo computer combini un pasticcio, online non cambia nulla finché non lo decidi tu.

Pensa al tuo computer come a un "banco da lavoro" privato. Puoi sporcare, provare, sbagliare. Il cliente non lo vede. E quasi tutto si può annullare.

In questo capitolo trovi i problemi più comuni, spiegati con parole semplici. Per ognuno ti dico: cosa succede, perché, e come si risolve passo passo.

### La regola d'oro (leggila e tienila a mente)

Se vedi un errore e non lo capisci, NON cancellare niente e NON chiudere tutto di fretta.

Fai una cosa sola: **copia il testo dell'errore e incollalo a Claude Code**, chiedendo in italiano "cosa significa questo errore e come lo risolvo?".

Claude Code è come un collega esperto seduto accanto a te: legge l'errore, te lo traduce e ti dice cosa fare. Non si stanca, non si offende, e puoi chiedergli di rispiegare quante volte vuoi.

Per copiare il testo dal terminale: selezionalo con il mouse, poi premi i tasti per copiare (su Windows di solito `Ctrl` + `C`, su Mac `Cmd` + `C`). Poi incollalo nella chat di Claude Code e premi Invio.

Tienilo presente per tutto il capitolo: ogni volta che sei in dubbio, la risposta è "chiedi a Claude Code e incolla l'errore".

### 10.1 "Il comando non viene riconosciuto"

Stai digitando un comando (per esempio `claude`, oppure `node`, oppure `git`) e il terminale risponde qualcosa tipo:

```
'claude' non è riconosciuto come comando interno o esterno
```

oppure, su Mac:

```
command not found: claude
```

Tradotto: il computer ti sta dicendo "non so cosa sia questa parola". Non è grave, è solo che il programma non lo trova.

Le cause più comuni sono due, in ordine di probabilità:

1. **Il terminale va riaperto.** Quando installi un programma nuovo (Node, Git, Claude Code), il terminale che era già aperto non se ne accorge. È come aprire il frigo, mettere dentro il latte, ma guardare in un frigo che avevi fotografato prima: il latte non si vede perché stai guardando una foto vecchia.

   **Cosa fare:** chiudi completamente la finestra del terminale e riaprila. Poi riprova il comando.

   **Cosa vedrai:** se era solo questo, il comando adesso funziona.

2. **Il programma non è davvero installato** (o l'installazione non è andata a buon fine). Hai già visto nel Capitolo 2 come si installano Node e Claude Code; se il comando continua a non funzionare dopo aver riaperto il terminale, l'installazione probabilmente non è completa.

   **Cosa fare:** controlla che Node ci sia digitando:

   ```
   node -v
   ```

   Questo comando chiede a Node "che versione sei?".

   **Cosa vedrai:** un numero, idealmente che inizia con `v20` (ti serve la versione 20). Se vedi un numero, Node c'è.

   **Se non funziona:** se anche `node -v` dà "comando non riconosciuto", torna al Capitolo 2 e rifai l'installazione di Node. Tutto il resto dipende da lui.

Se dopo questi due controlli sei ancora bloccata: incolla l'errore a Claude Code. Lui ti dirà esattamente cosa manca.

### 10.2 "Sono nella cartella sbagliata"

Il terminale lavora sempre "dentro" una cartella, una alla volta. È come una persona che può stare in una sola stanza della casa: per fare qualcosa in cucina, deve prima entrare in cucina.

Se dai un comando del progetto (per esempio `npm run dev`) mentre sei nella cartella sbagliata, ti dirà che non trova i file giusti. Niente di rotto: sei solo nella stanza sbagliata.

#### Come capire dove sei

Digita:

```
pwd
```

Questo comando significa "dimmi in quale cartella mi trovo adesso" (sta per "print working directory", cioè "stampa la cartella di lavoro").

**Cosa vedrai:** un percorso, cioè la "strada" di cartelle dove ti trovi, per esempio qualcosa che finisce con `climbpolestudio.it`. Se finisce con il nome del progetto, sei nel posto giusto.

Per vedere cosa c'è nella cartella in cui sei, digita:

```
ls
```

(`ls` sta per "list", cioè "elenca").

**Cosa vedrai:** la lista dei file e delle cartelle lì dentro. Se sei nella cartella giusta del progetto, dovresti vedere nomi come `package.json`, `next.config`, una cartella `src` e simili. Se vedi questi nomi, sei a casa.

#### Come spostarti nella cartella giusta

Per entrare in una cartella si usa `cd` (sta per "change directory", cioè "cambia cartella"). Per esempio:

```
cd climbpolestudio.it
```

Questo "entra" nella cartella del progetto.

**Trucco comodo:** scrivi `cd ` (con lo spazio dopo) e poi **trascina la cartella del progetto dentro la finestra del terminale** con il mouse: il percorso si scrive da solo. Poi premi Invio.

**Se non funziona** (ti dice che la cartella non esiste): probabilmente non sei "un piano sopra" la cartella del progetto. Il modo più semplice e sicuro è il trucco del trascinamento qui sopra: non devi indovinare niente, ci pensa il computer a scrivere il percorso esatto.

In caso di dubbio, anche qui: chiedi a Claude Code "come faccio ad entrare nella cartella del progetto?" e incolla quello che vedi.

### 10.3 "npm install dà errori"

`npm install` è il comando che scarica tutti i "pezzi" di cui il sito ha bisogno per funzionare (li hai conosciuti nel Capitolo 2). Scarica tante cose da internet, quindi a volte qualcosa va storto. Spesso non è colpa tua.

Prova questi rimedi in ordine. Dopo ognuno, ridai semplicemente il comando:

```
npm install
```

1. **Riprova e basta.** Sembra banale, ma `npm install` a volte fallisce per un intoppo momentaneo di rete e al secondo tentativo va liscio. Dagli una seconda possibilità.

2. **Controlla la connessione a internet.** Questo comando scarica file dalla rete. Se la connessione è lenta o è caduta un attimo, fallisce. Apri una pagina qualsiasi nel browser per verificare che internet vada, poi riprova.

3. **Controlla la versione di Node.** Il progetto vuole Node 20. Se per sbaglio hai una versione troppo diversa, `npm install` può lamentarsi. Controlla con:

   ```
   node -v
   ```

   **Cosa vedrai:** dovrebbe iniziare con `v20`. Se vedi un numero molto diverso (per esempio `v16` o `v23`), il problema potrebbe essere quello: torna al Capitolo 2 per la versione giusta.

4. **Riparti pulito (mossa un po' più decisa).** Se proprio non ne vuole sapere, si può cancellare la cartella dei pezzi scaricati e rifare il download da zero. Non perdi nulla di tuo: sono solo file scaricabili di nuovo.

   ```
   rm -rf node_modules
   npm install
   ```

   Il primo comando cancella la cartella `node_modules` (la "scatola dei pezzi"); il secondo la riscarica intera.

**La cosa importante:** se compare un muro di testo rosso e non capisci niente, è normale. Non spaventarti. Copia tutto e incollalo a Claude Code chiedendo "npm install mi dà questo errore, come lo risolvo?". Quei messaggi sembrano spaventosi ma per Claude Code sono pane quotidiano.

### 10.4 "Ho modificato qualcosa e ora il sito locale non parte"

Hai chiesto una modifica, oppure hai toccato qualcosa, e adesso `npm run dev` non avvia più il sito sul tuo computer (quello su `localhost:3000`). Magari vedi una pagina di errore al posto del sito.

Prima cosa: **non è successo niente al sito vero online.** Stai vedendo solo la versione di prova sul tuo computer. I visitatori non vedono nulla di tutto questo.

Seconda cosa, ed è la più bella: con Git si può **tornare indietro**. Git è come la "cronologia delle versioni" di un documento: registra ogni passo, quindi si può sempre riavvolgere il nastro all'ultimo momento in cui tutto funzionava. È la tua rete di sicurezza.

Non devi imparare i comandi di Git a memoria. Devi solo saperlo chiedere. Apri Claude Code e scrivi, in italiano semplice, qualcosa come:

> "Ho fatto una modifica e ora il sito locale non parte. Puoi annullare l'ultima modifica e riportare tutto a com'era prima?"

Claude Code capisce, ti spiega cosa sta per fare, e riporta i file allo stato precedente. Poi prova di nuovo:

```
npm run dev
```

**Cosa vedrai:** se l'annullamento ha funzionato, il sito riparte e su `localhost:3000` torni a vedere la pagina normale.

Un paio di varianti utili da chiedere a Claude Code, a parole tue:

- "Mostrami cosa ho cambiato rispetto a prima" (per capire cosa è successo).
- "Annulla solo le modifiche non ancora salvate" oppure "torna all'ultima versione che era online" (se vuoi essere più precisa).

**Promemoria che vale oro:** finché non hai "pubblicato" (cioè finché la modifica non è andata online), puoi buttarla via senza conseguenze. E anche dopo aver pubblicato, su Vercel resta lo storico delle versioni precedenti, quindi si può comunque tornare indietro. Non sei mai davvero in trappola.

### 10.5 "Ho pubblicato ma online non si vede"

Hai mandato una modifica online, vai sul sito a controllare... e ti sembra tutto come prima. Calma, nella stragrande maggioranza dei casi è una di queste tre cose, tutte normali.

1. **Devi solo aspettare un minuto.** Quando pubblichi, Vercel (il servizio che ospita il sito) deve "ricostruire" il sito prima di mostrarlo aggiornato. È come infornare una torta: la metti dentro, ma non è pronta nello stesso istante. Aspetta uno o due minuti e ricontrolla.

2. **Il browser ti sta mostrando una versione vecchia (la cache).** Per essere veloce, il browser tiene da parte una "fotografia" delle pagine già viste e te la rimostra invece di riscaricarle. Devi dirgli "no, ricaricala davvero". Questo si chiama **hard refresh** (ricaricamento forzato):

   - Su Windows: tieni premuto `Ctrl` e premi `F5` (oppure `Ctrl` + `Shift` + `R`).
   - Su Mac: tieni premuto `Cmd` + `Shift` e premi `R`.

   **Cosa vedrai:** la pagina si ricarica da capo e, se la modifica era pronta, adesso compare.

   **Trucco extra:** apri il sito in una finestra di navigazione "in incognito" (privata). Lì la cache non c'è, quindi vedi sempre la versione più aggiornata.

3. **Controlla che la pubblicazione sia andata a buon fine su Vercel.** Vercel ti mostra l'esito di ogni pubblicazione, come il tabellone delle partenze in stazione.

   **Passi:**
   1. Vai su `vercel.com` ed entra con il tuo account.
   2. Apri il progetto di Climb Pole Studio.
   3. Guarda l'elenco dei "Deployments" (le pubblicazioni).
   4. L'ultima in cima dovrebbe avere lo stato verde **"Ready"** (pronta).

   **Cosa vedrai:** se è verde e dice "Ready", la modifica è online: il problema era la cache (rifai l'hard refresh). Se invece è rossa e dice **"Error"** (errore), la pubblicazione è fallita: il sito vecchio resta su (per fortuna!) e la novità non è passata.

   **Se è in errore:** clicca sulla pubblicazione rossa, copia il messaggio di errore che vedi e incollalo a Claude Code chiedendo aiuto. Spesso è una piccola cosa da sistemare.

### 10.6 "Le modifiche fatte in Sanity non compaiono sul sito"

Sanity è il pannello dove modifichi i **contenuti** (testi, foto, orari, corsi) senza toccare il codice: lo trovi su `https://climbpolestudio-it.vercel.app/studio`. Hai cambiato un testo lì, hai salvato, ma sul sito pubblico non si vede.

Anche qui, prima di tutto: prova un **hard refresh** del sito (vedi sopra, paragrafo 10.5, punto 2). A volte è solo la cache del browser.

Se dopo il ricaricamento forzato continui a non vedere la modifica, la causa quasi sempre è un meccanismo tecnico chiamato **webhook di revalidation**. In parole semplici: è il "campanello" che Sanity deve suonare al sito per dirgli "ehi, ho cambiato un contenuto, aggiornati". Se quel campanello non è ancora stato collegato, il sito non sa di doversi aggiornare e continua a mostrare la versione vecchia.

Buona notizia: non è un guasto, è una cosa **ancora da attivare** una volta sola. La trovi spiegata nel capitolo dedicato a Sanity e al webhook (riguarda la variabile `SANITY_REVALIDATE_SECRET` su Vercel e l'impostazione del webhook nel pannello Sanity). Una volta collegato il campanello, le modifiche ai contenuti si vedranno da sole.

Nel frattempo, se ti serve vedere subito un cambiamento di contenuto online, l'effetto si ottiene anche ripubblicando il sito da Vercel (una nuova pubblicazione lo costringe a rileggere i contenuti aggiornati da Sanity).

In dubbio? Chiedi a Claude Code: "ho cambiato un testo in Sanity ma online non si vede, il webhook è già attivo?".

### 10.7 "Il dominio climbpolestudio.it non punta ancora al sito nuovo"

Oggi `climbpolestudio.it` mostra ancora il vecchio sito WordPress. Il passaggio al sito nuovo (il "go-live") è un'operazione che si fa una volta, ed è spiegata nel capitolo dedicato al dominio. Qui ti spiego solo il problema più comune **subito dopo** aver fatto il cambio: hai modificato le impostazioni, ma il dominio sembra ancora "fermo" al vecchio sito.

Nella maggior parte dei casi non c'è nessun errore: è solo questione di **tempo**.

Il motivo si chiama **propagazione DNS**. Il DNS è come la rubrica del telefono di internet: associa il nome `climbpolestudio.it` al "numero" del server giusto. Quando cambi quel collegamento, la notizia deve fare il giro del mondo e raggiungere tutti gli "elenchi telefonici" sparsi ovunque. Non è istantaneo: può richiedere da qualche minuto fino a 24-48 ore.

**Cosa fare:** aspettare, con pazienza. Nel frattempo:

1. Prova a vedere il dominio in una finestra "in incognito" del browser (così eviti la cache che ti fa vedere il vecchio sito).
2. Prova da una rete diversa, per esempio dal telefono con i dati mobili invece del wifi di casa: a volte una rete si è già "aggiornata" e l'altra no, ed è del tutto normale durante il passaggio.
3. Controlla su Vercel, nella pagina **Domains** del progetto, che accanto al dominio non ci siano avvisi: se Vercel mostra "valido" o una spunta, da parte sua è tutto a posto e stai solo aspettando la propagazione.

**Importante:** usa sempre i valori ESATTI (i record DNS) che Vercel ti mostra nella sua pagina Domains, perché sono quelli giusti per il tuo caso. E non preoccuparti per il "lucchetto" della sicurezza (HTTPS): Vercel lo attiva e lo rinnova da solo, senza che tu debba fare nulla.

Se dopo un paio di giorni il dominio ancora non punta al sito nuovo, allora sì che vale la pena indagare: copia quello che vedi e chiedi aiuto a Claude Code, oppure controlla le impostazioni su Register.it (dove è registrato il dominio).

### 10.8 Mini-promemoria: chi fa cosa

Quando qualcosa non va, metà del lavoro è capire **a quale "sportello" rivolgersi**. Ogni pezzo del tuo sito ha il suo. Tieni questa lista a portata di mano:

- **Codice del sito** (come è fatto, le funzioni, l'aspetto) → si modifica con **Claude Code**, il codice vive su **GitHub**, va online tramite **Vercel**.
- **Contenuti** (testi, foto, orari, corsi, prezzi) → si cambiano in **Sanity** (`/studio`).
- **Dominio** `climbpolestudio.it` (l'indirizzo) → si gestisce su **Register.it**.
- **Email del form contatti** (i messaggi che ti arrivano dal sito) → passano da **Resend**.
- **Feed Instagram** (i post mostrati sul sito) → arriva da **Behold**.
- **Scheda Google** (quella che appare su Google e Maps con indirizzo, orari, telefono) → si gestisce su **Google Business**.

Regola pratica: prima di agire, chiediti "questo è codice o è contenuto?". Se è un testo, una foto, un orario, vai su Sanity. Se è il modo in cui il sito funziona o appare, è codice, e parti da Claude Code. Nel dubbio, indovina un po'... chiedi a Claude Code: ti saprà dire a quale sportello bussare.

E ricordati sempre l'idea di fondo di tutto questo capitolo: **non puoi rompere niente di grave.** C'è la cronologia di Git, ci sono le versioni precedenti su Vercel, e c'è Claude Code che ti aiuta a leggere ogni errore. Vai tranquilla.

---

## E adesso? (i primi 3 passi)
1. Vai al **Capitolo 2** e installa tutto: alla fine vedrai il sito girare sul tuo computer.
2. Apri **Claude Code** (Capitolo 3) e come prima frase scrivigli:
   «*Leggi i file HANDOFF.md e GUIDA-PRINCIPIANTE.md, poi aspetta le mie istruzioni.*»
3. Per cambiare testi e foto ti basta **Sanity** (Capitolo 4): non serve toccare il codice.

Buon lavoro! 💪 E ricorda: non puoi rompere niente in modo permanente — c'è sempre la cronologia e il deploy precedente su Vercel.
