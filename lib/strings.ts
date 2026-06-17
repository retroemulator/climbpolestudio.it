/**
 * Stringhe UI centralizzate (italiano).
 *
 * v1 = solo IT, ma TUTTE le stringhe d'interfaccia passano da qui così
 * che un futuro EN sia un secondo dizionario, senza toccare i componenti.
 * (Brief §0 / Assunzione 1: struttura pronta per EN, niente i18n completo ora.)
 */
export const strings = {
  brand: {
    name: "Climb Pole Studio",
    payoff: "Arti aeree e movimento",
    city: "Torino",
  },
  nav: {
    discipline: "Discipline",
    orari: "Orari",
    prezzi: "Prezzi",
    chiSiamo: "Chi siamo",
    contatti: "Contatti",
    prenota: "Prenota",
    accedi: "Accedi",
    areaPersonale: "Area personale",
  },
  cta: {
    prenotaProva: "Prenota la prova",
    scopriDiscipline: "Scopri le discipline",
    vediOrari: "Vedi gli orari",
    vediPrezzi: "Vedi i prezzi",
  },
} as const;

export type Strings = typeof strings;
