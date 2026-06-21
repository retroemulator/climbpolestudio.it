/**
 * Contenuti editoriali reali (testo) per il seed Sanity — generati per Climb
 * Pole Studio e revisionati (italiano con accenti corretti, tono del brief §2).
 * Usato SOLO da `scripts/seed.ts` (server-side): non finisce nel bundle client.
 *
 * Le foto reali restano da inserire dal cliente in Sanity; questo riempie tutto
 * ciò che è testo (body discipline, team, testimonianze, news, FAQ).
 */

export type DisciplineContent = {
  body: string[];
  suitableFor: string;
  youWillLearn: string[];
  /** Accent per-disciplina (resta nella palette brand). */
  accent?: string;
};

export const disciplineContent: Record<string, DisciplineContent> = {
  "pole-dance": {
    accent: "#F087DD",
    body: [
      "La pole dance unisce danza, ginnastica e fitness intorno al palo, fino al gesto acrobatico e pienamente artistico. Si lavora su spin e climb, su transizioni e figure, costruendo movimenti che sembrano impossibili finché non li fai tu. È un linguaggio del corpo fatto di forza, ritmo e tonicità, dove ogni elemento ha la sua tecnica precisa e ogni progresso è concreto, misurabile, tuo.",
      "Una lezione tipo parte sempre dal corpo: riscaldamento e attivazione di spalle, schiena e core, per arrivare al palo pronti e in sicurezza. Poi si entra nel vivo, salite e prese, spin in controllo, le prime inversioni quando il momento è giusto. Si prova un elemento, si pulisce, lo si concatena agli altri, fino a chiudere combinazioni a tempo di musica. Si lavora a piccoli passi e con tante ripetizioni, perché è così che la tecnica diventa solida e il gesto fluido.",
      "La progressione segue i livelli, da Base 1 e Base 2 verso Intermedio, Int/Adv e Open: ognuno aggiunge prese nuove, figure più impegnative e maggiore controllo del corpo nello spazio. Non c'è fretta e non c'è gara con nessuno, solo con la te di ieri. Nei primi mesi noti il cambiamento prima nella forza, poi nella sicurezza, infine nell'espressione: il movimento smette di essere una sequenza da ricordare e diventa qualcosa che racconti.",
      "Più che un corso, la pole è una community. La sala è fatta di persone a livelli diversi che si allenano insieme, tifano per te e festeggiano la figura che esce per la prima volta. Qui costruisci forza vera, tecnica pulita e una autostima che resta anche fuori dal palo, lezione dopo lezione.",
    ],
    suitableFor:
      "Adatta a tutti, anche a chi parte completamente da zero: non servono forza né flessibilità di partenza, si costruiscono qui passo dopo passo. Va bene anche per chi pratica già e cerca un livello superiore.",
    youWillLearn: [
      "Prese sicure e confidenza sul palo",
      "Spin e climb in controllo, tra static e spinning",
      "Transizioni fluide e le prime inversioni",
      "Figure e combinazioni coreografiche a tempo di musica",
      "Forza funzionale, tonicità e coordinazione",
      "Espressione personale e maggiore autostima",
    ],
  },
  "cerchio-aereo": {
    accent: "#2EE6FF",
    body: [
      "Il cerchio aereo, o lyra, è un anello d'acciaio sospeso su cui ti arrampichi, ti avvolgi e trovi l'equilibrio nel vuoto. Si lavora dentro, attorno e sopra il cerchio, costruendo salite, prese e figure sospese che chiedono forza, controllo e una buona dose di presenza. Ogni posa è una piccola scultura in aria: l'eleganza non è un dettaglio decorativo, è il risultato visibile di una tecnica precisa.",
      "Una lezione tipo parte sempre dal corpo: riscaldamento e attivazione di spalle, schiena e centro, perché è lì che nasce tutta la spinta. Da lì si passa al cerchio, prima basso e in sicurezza, per imparare le salite e le prese fondamentali; poi si sale di quota man mano che il corpo risponde. Si prova una figura, la si pulisce, la si lega alla successiva: piano piano una sequenza prende forma, e quello che all'inizio sembrava impossibile diventa un gesto tuo.",
      "La progressione segue due livelli, Base e Intermedio, e procede senza fretta. All'inizio costruisci la forza di trazione e la confidenza necessarie per stare appesa in controllo; con il tempo arrivano le sospensioni più audaci, le transizioni fluide e i passaggi dentro e fuori dal cerchio che danno continuità al movimento. Non c'è un traguardo unico: c'è un corpo che cambia, una tecnica che si affina e figure nuove che si sbloccano lezione dopo lezione.",
      "In sala non sei mai sola. Si lavora in piccolo gruppo, si tifa per chi ci prova e si cresce insieme, ognuna al proprio ritmo. La quota arriva quando sei pronta, mai prima: il coraggio si allena come la forza, un passo alla volta.",
    ],
    suitableFor:
      "Adatta a chi parte da zero come a chi vuole perfezionarsi: non servono forza né esperienza di partenza, perché si costruiscono qui. Si comincia bassi e in sicurezza, e si sale di quota solo quando il corpo è pronto.",
    youWillLearn: [
      "Salite e prese sicure sul cerchio",
      "Figure sospese dentro, attorno e sopra la lyra",
      "Equilibri e controllo in quota",
      "Transizioni e sequenze fluide",
      "Forza di trazione e stabilità del centro",
      "Eleganza e linee pulite nel movimento",
    ],
  },
  "functional-training": {
    accent: "#FF2EC4",
    body: [
      "Il functional training è il motore silenzioso delle arti aeree: la preparazione fisica che ti permette di salire più in alto, restare sospesa più a lungo e muoverti con controllo. Qui non si insegue il numero sull'attrezzo, ma il movimento che lo rende possibile: trazione, spinta, stabilità delle spalle, attivazione del centro. È un allenamento intelligente, costruito su pattern che usi davvero sul palo, sul cerchio e nella vita di tutti i giorni.",
      "Una lezione tipo parte sempre da una mobilità e da un riscaldamento mirati, per preparare spalle, anche e colonna a lavorare in sicurezza. Si entra poi nel cuore dell'allenamento alternando forza di trazione e di spinta, lavoro di core ed esercizi di stabilità e controllo, con progressioni adattate al tuo livello del momento. Si usano il peso del corpo e attrezzi semplici, sempre con tecnica curata e carichi dosati: l'obiettivo è farti spingere quanto basta, mai oltre ciò che il tuo corpo è pronto a gestire.",
      "Nel tempo i risultati arrivano e si vedono. Le trazioni diventano più pulite, le spalle più solide, il core risponde quando serve e le figure aeree che sembravano lontane iniziano a sbloccarsi una dopo l'altra. La progressione è graduale e concreta: parti da dove sei, costruisci basi vere e le porti direttamente dentro le altre discipline, riducendo il rischio di infortuni lungo la strada.",
      "Funziona alla perfezione come complemento a pole e cerchio, ma regge benissimo anche da solo: un condizionamento completo, senza fronzoli, per chi vuole diventare semplicemente più forte e più mobile. Ti alleni accanto a persone che spingono insieme a te, in un clima che tiene alta la motivazione lezione dopo lezione.",
    ],
    suitableFor:
      "Adatto a tutti i livelli, anche a chi parte completamente da zero: non serve forza o esperienza all'ingresso, si costruiscono qui con progressioni graduali e sicure. Perfetto per chi pratica pole o cerchio e vuole sbloccare nuove figure, ma anche per chi cerca un allenamento completo a sé stante.",
    youWillLearn: [
      "Forza di trazione e di spinta utile sull'attrezzo",
      "Stabilità e controllo delle spalle",
      "Un core solido e davvero attivabile",
      "Più mobilità articolare di spalle, anche e colonna",
      "Resistenza e controllo del movimento sotto sforzo",
      "Prevenzione degli infortuni e progressi più rapidi nelle aeree",
    ],
  },
  flexibility: {
    accent: "#F087DD",
    body: [
      "La Flexibility lavora la mobilità articolare e la flessibilità di tutto il corpo: spalle, schiena, anche, fino alle spaccate. Non è solo allungare, è guadagnare ampiezza di movimento con controllo, così che ogni gesto diventi più armonioso e libero. È la disciplina che apre il corpo e lo rende disponibile a tutto il resto: una schiena mobile, anche aperte e spalle che ruotano bene ti servono sul palo, in aria e nella vita di tutti i giorni.",
      "Una lezione tipo parte sempre da un riscaldamento che porta calore e sangue alle articolazioni, perché un corpo caldo si apre senza forzare. Da lì si entra nel lavoro mirato sui distretti del giorno, alternando mobilità attiva, allungamenti tenuti e forza nelle posizioni di massima ampiezza, così la flessibilità che conquisti la sai anche usare. Si chiude con un defaticamento che fissa il lavoro e ti lascia il corpo lungo e leggero. Si va sempre al tuo ritmo: niente strappi, niente gare, niente confronti con chi hai accanto.",
      "La flessibilità non arriva con la forza ma con la costanza, e qui sta tutta la sua bellezza. Le prime settimane noti già un corpo più sciolto e meno rigido; nei mesi successivi guadagni gradi reali di apertura nelle anche, nella schiena e nelle spalle, e le spaccate da obiettivo lontano iniziano a farsi concrete. Più diventi mobile, meno ti carichi di tensioni inutili: la mobilità è anche la tua migliore prevenzione degli infortuni.",
      "È una disciplina adatta a tutti i livelli e funziona benissimo da sola o come complemento a Pole, Cerchio e Verticali, dove l'apertura fa la differenza tra eseguire una figura e renderla bella. In sala trovi spazio, attenzione individuale e una progressione costruita sul tuo corpo, perché ogni persona parte da una mobilità diversa ed è giusto così.",
    ],
    suitableFor:
      "È adatta a chiunque, dai principianti assoluti a chi pratica già altre discipline: non serve essere flessibili per iniziare, anzi, è proprio qui che si parte. Se ti senti rigido o rigida, questo è il posto giusto per cominciare, al tuo ritmo e senza forzature.",
    youWillLearn: [
      "Migliorare la mobilità di spalle, schiena e anche con controllo",
      "Costruire le spaccate in modo progressivo e sicuro",
      "Distinguere allungamento passivo e flessibilità attiva, e usarli bene",
      "Riscaldare e defaticare il corpo per aprirti senza farti male",
      "Muoverti in modo più armonioso e fluido in ogni disciplina",
      "Prevenire tensioni e infortuni grazie a un corpo più mobile",
    ],
  },
  verticali: {
    accent: "#2EE6FF",
    body: [
      "Le verticali sembrano una questione di equilibrio, ma sono prima di tutto forza, allineamento e tecnica. In handstand impari a reggerti sulle mani trasformando polsi, avambracci e spalle in una base solida, mentre il core tiene insieme tutta la linea del corpo. Non si tratta di buttarsi a testa in giù sperando che funzioni: ogni elemento si costruisce per gradi, con un metodo preciso che rende il gesto sicuro, ripetibile e sempre più tuo.",
      "Una lezione tipo parte dal corpo: mobilità di polsi e spalle, attivazione del core e qualche esercizio di forza specifica per preparare le strutture al carico. Poi si lavora sul posizionamento delle mani e sulla spinta, si cercano l'allineamento corretto e la linea pulita, prima al muro e poi staccandosi piano piano verso il libero. Si prova, si corregge, si riprova: la verticale è fatta di micro-aggiustamenti, e ogni piccolo progresso si sente subito sotto le mani.",
      "Nel tempo il percorso è molto concreto. All'inizio costruisci forza e confidenza appoggiandoti al muro, poi inizi a gestire l'equilibrio con kick-up controllati e brevi tenute in free-standing, allungando la durata man mano che il corpo risponde. Non aspettarti scorciatoie: la verticale chiede costanza, ma restituisce una soddisfazione difficile da spiegare a parole e una consapevolezza del corpo che porti ovunque.",
      "Imparare a stare in verticale, infine, migliora tutto il resto. La forza di spalle e core, la stabilità e il controllo che alleni qui si riversano nella pole, nel cerchio e in ogni disciplina aerea, rendendo le figure più pulite e i movimenti più sicuri. È un investimento sul tuo movimento, oltre che una skill che vale la pena padroneggiare per sé stessa.",
    ],
    suitableFor:
      "Adatta a chi vuole costruire la verticale da basi solide, a qualsiasi livello: si parte da zero, senza forza o esperienza richieste, perché tutto si costruisce qui con progressioni graduali e sicure. Va benissimo sia come disciplina a sé sia come supporto a pole, cerchio e alle altre arti aeree.",
    youWillLearn: [
      "Setup delle mani e spinta corretta dal suolo",
      "Allineamento e linea pulita del corpo in verticale",
      "Forza di polsi, spalle e core specifica per l'handstand",
      "Controllo dell'equilibrio con kick-up e tenute",
      "Progressioni graduali dal muro al free-standing",
      "Mobilità di polsi e spalle per reggere il carico in sicurezza",
    ],
  },
  exotic: {
    accent: "#FF2EC4",
    body: [
      "L'Exotic è la variante più danzata e teatrale della pole. Si balla sui tacchi (heels) e si lavora tanto a terra quanto al palo: floorwork morbido, transizioni legate, spin fluidi e movimenti a tempo di musica. Non è una semplice sequenza di figure, ma un linguaggio: corpo, ritmo ed emozione che diventano presenza scenica. La tecnica e la sicurezza vengono prima di tutto, perché è proprio il controllo a rendere ogni movimento elegante e tuo.",
      "Una lezione tipo parte sempre dal riscaldamento e dall'attivazione, con un'attenzione speciale a caviglie, piedi e centro: i tacchi cambiano l'appoggio, e il corpo va preparato a gestirlo. Si passa poi al lavoro a terra, dove si costruiscono camminate, onde e transizioni, e si sale gradualmente verso spin e figure al palo. Si prova, si pulisce e si concatena, fino a comporre un flow che scorre da una posizione all'altra senza interruzioni. Si chiude con defaticamento e mobilità, per chiudere il cerchio in sicurezza.",
      "Nel tempo la differenza si sente eccome. Il rapporto con i tacchi diventa naturale, l'equilibrio si fa solido, i movimenti a terra più ampi e sicuri. La musicalità cresce: smetti di eseguire passi e cominci a interpretare la musica, costruendo uno stile personale e riconoscibile. La progressione è graduale e accompagnata, dal livello Base, dove si pongono fondamenta e confidenza, all'Intermedio, dove flow, dinamica ed espressività salgono di intensità.",
      "Più che imparare figure, qui si impara a stare in scena: a muoversi con intenzione, a riempire lo spazio, a sentirsi a proprio agio nel proprio corpo. È un percorso che restituisce sicurezza, forza e una grande dose di libertà espressiva, in una sala dove ognuna trova il proprio modo di muoversi e nessuno giudica.",
    ],
    suitableFor:
      "Adatta a chi parte da zero e a chi vuole aggiungere fluidità ed espressività alla propria pole, sui livelli Base e Intermedio. Non servono esperienza con i tacchi né doti particolari: equilibrio, musicalità e sicurezza si costruiscono passo dopo passo, in totale sicurezza.",
    youWillLearn: [
      "Floorwork e transizioni fluide a terra",
      "Camminate, equilibrio e controllo sui tacchi",
      "Spin morbidi e legati al palo",
      "Musicalità e interpretazione del movimento",
      "Presenza scenica e stile personale",
      "Connessione tra terra e palo in un unico flow",
    ],
  },
};

export type InstructorContent = {
  name: string;
  role: string;
  bio: string[];
  disciplineSlugs: string[];
};

// Per ora solo Nadia (titolare). La struttura `instructor` è pronta per
// aggiungerne altri (reali) qui o direttamente da /studio.
export const instructors: InstructorContent[] = [
  {
    name: "Nadia Senatore",
    role: "Fondatrice e insegnante",
    bio: [
      "Nadia è la fondatrice di Climb Pole Studio e insegna pole dance da anni, dopo un percorso che l'ha portata dalle prime salite al palo fino alla padronanza tecnica e all'insegnamento. Le arti aeree sono diventate il suo linguaggio: forza che si costruisce un movimento alla volta, espressività che nasce dalla tecnica e mai dalla fretta.",
      "Il suo approccio mette al primo posto la sicurezza e una progressione reale, tarata su chi ha davanti: si parte da dove sei, anche da zero, e si avanza passo dopo passo. In sala costruisce una community senza giudizio, dove ognuno trova il proprio ritmo e cresce insieme agli altri.",
      "Insegna pole dance in tutti i livelli, exotic, flexibility e functional training, intrecciando tonicità, mobilità e musicalità perché ogni figura abbia basi solide e un'espressione personale.",
    ],
    disciplineSlugs: ["pole-dance", "exotic", "flexibility", "functional-training"],
  },
];

export type TestimonialContent = {
  author: string;
  text: string;
  rating: number;
  context: string;
};

export const testimonials: TestimonialContent[] = [
  {
    author: "Martina C.",
    text: "Sono arrivata che non riuscivo nemmeno a fare una trazione e pensavo di aver sbagliato posto. Dopo qualche mese mi sono ritrovata a girare sul palo senza accorgermene. Nadia ti spiega ogni passaggio con calma e non ti fa mai sentire indietro. La forza è arrivata da sola, lezione dopo lezione.",
    rating: 5,
    context: "Allieva Pole, ha iniziato da zero",
  },
  {
    author: "Giulia R.",
    text: "Faccio pole da un paio d'anni e qui ho trovato una cura della tecnica che altrove mancava. Si lavora sulla pulizia delle figure, sulle transizioni, sul controllo vero, non solo sull'effetto. Sono passata da elementi che mi sembravano impossibili a concatenarli a tempo di musica. Continuo a migliorare e non mi annoio mai.",
    rating: 5,
    context: "Allieva Pole, da 2 anni",
  },
  {
    author: "Federico B.",
    text: "Ero convinto che la pole non fosse roba da uomini e mi sbagliavo di grosso. È l'allenamento più completo che abbia mai fatto: forza, mobilità, testa. La sala è inclusiva sul serio, nessuno ti guarda storto e tutti tifano per te quando ti riesce una figura nuova. Ci vado tre volte a settimana e non mollo più.",
    rating: 5,
    context: "Allievo Pole, da 8 mesi",
  },
  {
    author: "Sara M.",
    text: "Ho scelto il cerchio aereo quasi per caso e me ne sono innamorata. Si parte bassi e in sicurezza, la quota arriva solo quando il corpo è pronto, quindi anche la paura iniziale si scioglie pian piano. Ogni posizione in sospensione mi dà una soddisfazione difficile da spiegare. Nadia legge subito quando puoi spingere e quando serve aspettare.",
    rating: 5,
    context: "Allieva Cerchio Aereo, da 1 anno",
  },
  {
    author: "Elena P.",
    text: "Mi sono iscritta a Flexibility perché ero rigida come un asse e volevo migliorare la mobilità per la vita di tutti i giorni. Niente forzature, niente gare con le altre: solo progressioni graduali e routine da rifare a casa. La spaccata non è più un miraggio e mi muovo meglio anche fuori dalla sala. Ambiente accogliente e attento.",
    rating: 5,
    context: "Allieva Flexibility, da 6 mesi",
  },
  {
    author: "Laura V.",
    text: "Ho iniziato a cinquantadue anni, convinta di essere fuori tempo massimo. Mi sbagliavo. Qui non conta l'età, conta il punto da cui parti e dove vuoi arrivare. Nadia adatta gli esercizi al mio corpo e ai miei tempi, sempre con attenzione e mai con fretta. Sono più forte, più dritta e più sicura di anni fa. È diventato il mio momento della settimana.",
    rating: 5,
    context: "Allieva over 50, ha iniziato da zero",
  },
];

export type NewsContent = {
  title: string;
  date: string;
  excerpt: string;
  body: string[];
};

export const news: NewsContent[] = [
  {
    title: "Open Day: porte aperte e lezioni di prova gratuite",
    date: "2026-09-12",
    excerpt:
      "Sabato 12 settembre lo studio apre le porte: prova pole, cerchio, flexibility e verticali gratuitamente, senza esperienza.",
    body: [
      "Prima di scegliere, vieni a sentire com'è. Sabato 12 settembre Climb Pole Studio apre le porte per un Open Day di benvenuto alla nuova stagione: lezioni di prova gratuite di Pole Dance, Cerchio Aereo, Flexibility e Verticali, pensate per chi parte completamente da zero. Non serve forza né flessibilità di partenza: si costruiscono qui, lezione dopo lezione.",
      "Trovi Nadia e tutto lo spazio di Corso Dante 109/A pronti ad accoglierti. Indossa qualcosa di comodo, porta un po' di curiosità e lascia a casa l'idea che 'non fa per te': l'unico requisito è la voglia di provare.",
      "I posti per ogni slot sono limitati dalla capienza della sala. Prenota il tuo orario su climbpolestudio.it oppure scrivi su WhatsApp al +39 393 025 1482.",
    ],
  },
  {
    title: "Si parte: al via la stagione 2026/2027",
    date: "2026-09-14",
    excerpt:
      "Lunedì 14 settembre riapre l'orario completo, da Intro to Pole all'Open: scegli la disciplina e prenota il tuo posto.",
    body: [
      "La nuova stagione comincia lunedì 14 settembre. Torna l'orario completo, dal lunedì al sabato: Intro to Pole, Base 1 e Base 2, Intermedio e Open, Cerchio Aereo, Exotic, Flessibilità, Allenamento Funzionale e Verticali. C'è un punto d'ingresso per ogni livello, e una sala piena di persone che tifano per te.",
      "È il momento giusto per iniziare un percorso vero: la forza arriva senza che te ne accorgi, la tecnica si affina, il corpo e la testa cambiano. Dai un'occhiata alla griglia settimanale, individua gli slot adatti a te e blocca il tuo posto.",
      "Consulta gli orari e gli abbonamenti su climbpolestudio.it. Per il primo passo, prenota una lezione di prova: ti aiutiamo a trovare il livello giusto.",
    ],
  },
  {
    title: "Workshop: Inversioni in sicurezza",
    date: "2026-10-25",
    excerpt:
      "Domenica 25 ottobre un pomeriggio dedicato alle inversioni: tecnica di ingresso, attivazione del core e progressioni guidate.",
    body: [
      "Andare a testa in giù non è coraggio: è metodo. Domenica 25 ottobre un workshop tematico tutto dedicato alle inversioni sul palo, per smontare la paura e costruire una base solida. Lavoreremo sulla tecnica di ingresso, sull'attivazione di spalle e core, sulle prese sicure e sulle progressioni graduali che portano in inversione senza strappi.",
      "Il laboratorio è pensato per chi ha già confidenza con le basi della pole e vuole sbloccare il passaggio successivo in un contesto guidato e attento. Piccolo gruppo, attenzione individuale, tanto tempo per provare e pulire ogni elemento.",
      "Posti limitati. Prenota il tuo su climbpolestudio.it o scrivici su WhatsApp al +39 393 025 1482.",
    ],
  },
  {
    title: "Stage con guest: una giornata di Exotic Flow",
    date: "2027-03-14",
    excerpt:
      "Domenica 14 marzo uno stage intensivo con insegnante ospite dedicato all'exotic flow: floorwork, transizioni e musicalità sui tacchi.",
    body: [
      "Una giornata fuori dall'ordinario. Domenica 14 marzo Climb Pole Studio ospita uno stage intensivo con un'insegnante ospite, interamente dedicato all'exotic flow: floorwork, transizioni morbide, spin legati e movimento a tempo di musica, spesso sui tacchi.",
      "Lo stage è aperto a chi ha già praticato exotic o pole e vuole arricchire il proprio linguaggio con uno sguardo nuovo, lavorando su fluidità, presenza scenica e musicalità. Gli heels sono consigliati ma non obbligatori: si può partecipare anche a piedi scalzi.",
      "Numero chiuso e iscrizione anticipata. Tutti i dettagli su orario, livello e modalità su climbpolestudio.it; per prenotare scrivi su WhatsApp al +39 393 025 1482.",
    ],
  },
  {
    title: "Saggio di fine stagione: saliamo insieme",
    date: "2027-06-21",
    excerpt:
      "Domenica 21 giugno la community va in scena: il saggio di fine stagione per mostrare il percorso di un anno di lavoro.",
    body: [
      "Un anno di lavoro merita un palco. Domenica 21 giugno la community di Climb Pole Studio va in scena con il saggio di fine stagione: pole, cerchio aereo ed exotic, dai primi passi alle figure più ambiziose, ciascuno con il proprio percorso e i propri progressi reali.",
      "Non è una gara: è una festa. Un momento per celebrare la forza costruita, la tecnica affinata e l'espressione di ognuno, davanti a chi ci ha sostenuto per tutta la stagione. Sul palco c'è spazio per ogni livello, perché ogni traguardo conta.",
      "Vuoi salire anche tu? Parlane con Nadia in sala. Data, sede e dettagli sul programma arrivano su climbpolestudio.it e sui canali social dello studio.",
    ],
  },
];

export type FaqContent = { question: string; answer: string };

export const faqs: FaqContent[] = [
  {
    question: "Posso fare una lezione di prova?",
    answer:
      "Sì. La prima prova è il modo migliore per conoscere lo spazio, l'insegnante e capire quale disciplina ti somiglia. Prenotala in un attimo su WhatsApp al +39 393 025 1482: pensiamo a tutto noi.",
  },
  {
    question: "Serve esperienza? Posso partire da zero?",
    answer:
      "Parti da zero senza problemi. I corsi Base 1, Intro to Pole e Flessibilità sono pensati proprio per chi inizia: si costruisce forza e tecnica un passo alla volta, con la giusta progressione.",
  },
  {
    question: "Cosa devo portare e come mi vesto?",
    answer:
      "Per la prova bastano top e pantaloncini corti (sul palo serve un po' di pelle scoperta per la presa) e una bottiglia d'acqua. Si lavora a piedi nudi: niente scarpe né creme idratanti prima della lezione, riducono l'aderenza.",
  },
  {
    question: "Ho paura di non essere abbastanza in forma.",
    answer:
      "Non serve arrivare già allenati: la forma fisica è il risultato del percorso, non il requisito per iniziare. Ogni esercizio si adatta al tuo livello e migliori lezione dopo lezione, al tuo ritmo.",
  },
  {
    question: "Come scelgo il livello giusto?",
    answer:
      "Se è la tua prima volta inizi dai corsi Base; man mano che cresci passi a Base 2, Intermedio e oltre. Non devi indovinare da sola: alla prova l'insegnante valuta con te il punto di partenza ideale.",
  },
  {
    question: "Quanto dura una lezione?",
    answer:
      "La maggior parte delle lezioni dura circa un'ora, mentre alcuni slot (come Exotic, Allenamento Libero o Flessibilità) arrivano a 90 minuti. L'orario preciso di ogni corso lo trovi nella griglia settimanale, dal lunedì al sabato.",
  },
  {
    question: "Come prenoto le lezioni?",
    answer:
      "Puoi prenotare online dal sito creando il tuo account, oppure scriverci su WhatsApp al +39 393 025 1482. Ti confermiamo il posto e ti basta presentarti pronta per allenarti.",
  },
  {
    question: "Come funzionano le disdette?",
    answer:
      "Se non puoi venire, avvisaci con anticipo così liberi il posto per chi è in lista. Annulla la prenotazione dalla tua area personale o con un messaggio su WhatsApp: nessun problema, capita.",
  },
  {
    question: "Gli uomini sono benvenuti?",
    answer:
      "Assolutamente sì. Pole, aeree, functional e flessibilità sono discipline per tutti: contano forza, tecnica ed espressione, non il genere. In sala c'è spazio per chiunque voglia mettersi in gioco.",
  },
  {
    question: "Quali abbonamenti e pacchetti ci sono?",
    answer:
      "C'è una sola iscrizione annuale da 40 euro, poi scegli la formula che preferisci: abbonamenti mensili, trimestrali e semestrali, l'Annuale Open con lezioni illimitate, pacchetti di ingressi o lezioni singole. Trovi tutto il listino aggiornato nella pagina Prezzi.",
  },
];
