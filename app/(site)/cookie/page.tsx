import type { Metadata } from "next";

import { LegalPage, LegalContent, type LegalSection } from "@/components/layout/legal-page";

export const metadata: Metadata = {
  title: "Cookie",
  description:
    "Cookie policy di Climb Pole Studio: usiamo solo cookie tecnici necessari, nessun tracciamento o profilazione.",
  alternates: { canonical: "/cookie" },
};

const sections: LegalSection[] = [
  {
    title: "Cosa sono i cookie",
    blocks: [
      {
        p: "I cookie sono piccoli file di testo che i siti salvano sul tuo dispositivo per funzionare o per raccogliere informazioni. Esistono cookie tecnici, necessari al funzionamento, e cookie di profilazione, usati per finalità di analisi o marketing.",
      },
    ],
  },
  {
    title: "I cookie che usiamo",
    blocks: [
      {
        p: "Questo sito utilizza esclusivamente cookie tecnici e strumenti necessari al suo funzionamento. Non utilizziamo cookie di profilazione, pubblicitari o di tracciamento.",
      },
      {
        ul: [
          "Cookie di sessione per l'accesso all'area personale e alle prenotazioni (presenti solo quando effettui il login e il servizio è attivo): servono a mantenerti autenticato in modo sicuro.",
          "Preferenze tecniche necessarie a mostrare correttamente le pagine.",
        ],
      },
      {
        p: "Trattandosi di soli cookie tecnici necessari, non è richiesto il tuo consenso preventivo e per questo non mostriamo un banner cookie.",
      },
    ],
  },
  {
    title: "Servizi di terze parti",
    blocks: [
      {
        p: "Alcune pagine caricano contenuti da servizi esterni che, per funzionare, ricevono l'indirizzo IP del tuo dispositivo:",
      },
      {
        ul: [
          "Mappe OpenStreetMap, usate per mostrare la posizione dello studio.",
          "Collegamenti a WhatsApp, Instagram e Facebook, attivati solo se clicchi sui relativi pulsanti.",
        ],
      },
      {
        p: "Questi servizi non installano cookie di profilazione tramite il nostro sito. Se in futuro introdurremo strumenti di analisi o marketing, ti chiederemo il consenso con un apposito banner prima di attivarli.",
      },
    ],
  },
  {
    title: "Come gestire i cookie",
    blocks: [
      {
        p: "Puoi gestire o eliminare i cookie già presenti dalle impostazioni del tuo browser. La disattivazione dei cookie tecnici può però compromettere alcune funzioni del sito, come l'accesso all'area personale.",
      },
    ],
  },
  {
    title: "Maggiori informazioni",
    blocks: [
      {
        p: "Per sapere come trattiamo i tuoi dati personali consulta la ",
        link: { href: "/privacy", label: "Privacy Policy" },
        tail: ".",
      },
    ],
  },
];

export default function CookiePage() {
  return (
    <LegalPage
      title="Cookie"
      intro="Quali cookie e tecnologie simili utilizza questo sito."
      updated="giugno 2026"
    >
      <LegalContent sections={sections} />
    </LegalPage>
  );
}
