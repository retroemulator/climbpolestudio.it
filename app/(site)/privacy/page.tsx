import type { Metadata } from "next";

import { LegalPage, LegalContent, type LegalSection } from "@/components/layout/legal-page";
import { contact, legal } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Informativa privacy di Climb Pole Studio: quali dati trattiamo, perché, per quanto tempo e come esercitare i tuoi diritti.",
  alternates: { canonical: "/privacy" },
};

const addr = `${contact.address.street}, ${contact.address.zip} ${contact.address.city}`;

const sections: LegalSection[] = [
  {
    title: "Titolare del trattamento",
    blocks: [
      {
        p: `Il titolare del trattamento dei dati personali è ${legal.entity}${
          legal.taxId ? ` (C.F./P.IVA ${legal.taxId})` : ""
        }, nella persona del legale rappresentante ${legal.representative}, con sede in ${addr}.`,
      },
      {
        p: "Per qualsiasi richiesta relativa ai tuoi dati puoi scrivere a ",
        link: { href: `mailto:${contact.email}`, label: contact.email },
        tail: ".",
      },
    ],
  },
  {
    title: "Quali dati raccogliamo",
    blocks: [
      { p: "Raccogliamo soltanto i dati che ci fornisci direttamente:" },
      {
        ul: [
          "Modulo contatti: nome, indirizzo email, numero di telefono (facoltativo) e il testo del messaggio.",
          "Contatto via WhatsApp: il tuo numero di telefono e le informazioni che scegli di condividere nella chat.",
          "Area personale e prenotazioni (quando il servizio è attivo): l'indirizzo email usato per l'accesso e lo storico delle tue prenotazioni.",
        ],
      },
      {
        p: "Non raccogliamo categorie particolari di dati e non effettuiamo profilazione né processi decisionali automatizzati.",
      },
    ],
  },
  {
    title: "Perché trattiamo i tuoi dati",
    blocks: [
      { p: "Trattiamo i dati per le seguenti finalità:" },
      {
        ul: [
          "Rispondere alle tue richieste di informazioni e gestire il primo contatto (base giuridica: misure precontrattuali e nostro legittimo interesse a risponderti).",
          "Gestire le prenotazioni delle lezioni e la tua area personale, quando il servizio è attivo (base giuridica: esecuzione del contratto).",
          "Adempiere a obblighi di legge, ad esempio fiscali e contabili (base giuridica: obbligo legale).",
        ],
      },
    ],
  },
  {
    title: "Strumenti e fornitori",
    blocks: [
      {
        p: "Per far funzionare il sito e i servizi ci affidiamo a fornitori che trattano i dati per nostro conto, in qualità di responsabili del trattamento:",
      },
      {
        ul: [
          "Vercel — hosting e distribuzione del sito.",
          "Sanity — gestione dei contenuti editoriali.",
          "Supabase — autenticazione e gestione delle prenotazioni (quando il servizio è attivo).",
          "Resend — invio delle email generate dal modulo contatti (quando il servizio è attivo).",
          "OpenStreetMap — fornitura delle mappe mostrate nelle pagine.",
        ],
      },
      {
        p: "Alcuni fornitori possono trattare i dati anche al di fuori dell'Unione Europea; in tal caso il trasferimento avviene sulla base di garanzie adeguate, ad esempio le clausole contrattuali standard approvate dalla Commissione Europea.",
      },
    ],
  },
  {
    title: "Per quanto tempo conserviamo i dati",
    blocks: [
      {
        p: "Conserviamo i dati per il tempo necessario a gestire la tua richiesta o il rapporto con te e, successivamente, per il periodo richiesto da eventuali obblighi di legge. I messaggi inviati tramite il modulo contatti sono conservati per il tempo utile a darti riscontro e poi cancellati o anonimizzati.",
      },
    ],
  },
  {
    title: "I tuoi diritti",
    blocks: [
      {
        p: "In qualsiasi momento puoi esercitare i diritti previsti dagli articoli 15-22 del Regolamento (UE) 2016/679:",
      },
      {
        ul: [
          "accesso ai tuoi dati e copia degli stessi;",
          "rettifica dei dati inesatti o incompleti;",
          "cancellazione dei dati (diritto all'oblio);",
          "limitazione e opposizione al trattamento;",
          "portabilità dei dati.",
        ],
      },
      {
        p: "Per esercitare questi diritti scrivi a ",
        link: { href: `mailto:${contact.email}`, label: contact.email },
        tail: ".",
      },
      {
        p: "Hai inoltre il diritto di proporre reclamo all'autorità di controllo: il ",
        link: {
          href: "https://www.garanteprivacy.it",
          label: "Garante per la protezione dei dati personali",
        },
        tail: ".",
      },
    ],
  },
  {
    title: "Cookie",
    blocks: [
      {
        p: "Questo sito utilizza un numero minimo di cookie tecnici. Per i dettagli consulta la ",
        link: { href: "/cookie", label: "Cookie Policy" },
        tail: ".",
      },
    ],
  },
  {
    title: "Aggiornamenti a questa informativa",
    blocks: [
      {
        p: "Possiamo aggiornare questa informativa per adeguarla a modifiche normative o ai servizi offerti. La data dell'ultimo aggiornamento è indicata in cima alla pagina.",
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      intro="Come trattiamo i tuoi dati personali quando ci contatti o usi questo sito."
      updated="giugno 2026"
    >
      <LegalContent sections={sections} />
    </LegalPage>
  );
}
