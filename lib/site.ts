/**
 * Dati strutturali del sito: navigazione, route, discipline, contatti, social.
 *
 * Separato da `lib/strings.ts` (etichette UI pure): qui sta la STRUTTURA
 * (cosa esiste e dove punta), così navbar/footer/sitemap leggono da un'unica
 * fonte. I dati di contatto sono quelli reali del cliente (brief §5) e in Fase 4
 * verranno serviti da Sanity `siteSettings` — questo file resta il fallback/seed.
 */

export type Discipline = {
  slug: string;
  name: string;
  /** Sommario breve per il mega-menu (una riga). Testo definitivo in Fase 6. */
  blurb: string;
};

/** Le 5 discipline core + Exotic (variante Pole). Brief §1/§5. */
export const disciplines: Discipline[] = [
  { slug: "pole-dance", name: "Pole Dance", blurb: "Forza e linguaggio attorno al palo." },
  { slug: "cerchio-aereo", name: "Cerchio Aereo", blurb: "Sospensione, figure e controllo in aria." },
  {
    slug: "functional-training",
    name: "Functional Training",
    blurb: "La base atletica che regge tutto il resto.",
  },
  { slug: "flexibility", name: "Flexibility", blurb: "Mobilità e apertura, senza forzare." },
  { slug: "verticali", name: "Verticali", blurb: "Equilibrio sulle mani, dal muro al libero." },
  { slug: "exotic", name: "Exotic", blurb: "Pole sui tacchi: flow ed espressione." },
];

/** Voci di navigazione principale. `mega` = Discipline apre il mega-menu. */
export type NavItem = { label: string; href: string; mega?: "discipline" };

export const navItems: NavItem[] = [
  { label: "Discipline", href: "/discipline", mega: "discipline" },
  { label: "Orari", href: "/orari" },
  { label: "Prezzi", href: "/prezzi" },
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "News", href: "/news" },
  { label: "Contatti", href: "/contatti" },
];

/** Route delle CTA/utility, riusate da navbar, footer, bottoni. */
export const routes = {
  prenota: "/prenota",
  accedi: "/accedi",
  discipline: "/discipline",
  orari: "/orari",
  prezzi: "/prezzi",
} as const;

/** Contatti reali (brief §5). Telefono in formato internazionale per i link. */
export const contact = {
  owner: "Nadia Senatore",
  phoneDisplay: "+39 393 025 1482",
  phoneE164: "+393930251482",
  whatsapp: "393930251482",
  whatsappMessage: "Ciao, vorrei informazioni su…",
  email: "info@climbpolestudio.it",
  address: {
    street: "Corso Dante 109/A",
    zip: "10126",
    city: "Torino",
    country: "Italia",
    /** Coordinate reali (geocoding OSM/Nominatim) per l'embed mappa. */
    lat: 45.0460915,
    lon: 7.6806417,
  },
} as const;

/**
 * Entità legale = TITOLARE DEL TRATTAMENTO (GDPR) e intestataria dell'attività.
 * Per un'ASD il titolare è l'associazione, non la persona fisica: Nadia Senatore
 * ne è la legale rappresentante. `contact.owner` resta il riferimento "umano"
 * (founder / persona di contatto), usato altrove sul sito.
 */
export const legal = {
  entity: "A.S.D. Climb Pole Studio",
  representative: contact.owner,
  /** C.F./P.IVA dell'associazione — da inserire: compare nell'informativa privacy. */
  taxId: "",
} as const;

/** Orari di apertura (brief §5). Fallback statico; in futuro da Sanity siteSettings. */
export const openingHours = [
  { days: "Lun – Ven", hours: "13:00 – 21:30" },
  { days: "Sabato", hours: "11:00 – 16:00" },
  { days: "Domenica", hours: "Chiuso" },
] as const;

/** Link WhatsApp con messaggio precompilato (brief §9). */
export const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
  contact.whatsappMessage,
)}`;

/** Scheda Google Maps ufficiale dello studio (short link). Usata da mappa/CTA. */
export const mapsUrl = "https://maps.app.goo.gl/DYGYSmDkfBCjRur99";

/** Giorni della settimana: chiave stabile (come in Sanity) → etichette. */
export const weekdays = [
  { key: "lun", short: "Lun", long: "Lunedì" },
  { key: "mar", short: "Mar", long: "Martedì" },
  { key: "mer", short: "Mer", long: "Mercoledì" },
  { key: "gio", short: "Gio", long: "Giovedì" },
  { key: "ven", short: "Ven", long: "Venerdì" },
  { key: "sab", short: "Sab", long: "Sabato" },
] as const;

/**
 * Normalizza il valore "giorno" salvato in Sanity al codice stabile usato da UI
 * e generazione sessioni. Lo schema salva un valore ordinabile con prefisso
 * ("1-lun"); qui togliamo il prefisso → "lun". Retro-compatibile: i valori
 * vecchi senza prefisso passano inalterati.
 */
export const dayCode = (day: string): string =>
  day.includes("-") ? day.slice(day.indexOf("-") + 1) : day;

/** Profili social (brief §5). `platform` → icona, `label` per aria-label/SR. */
export const socials = [
  {
    platform: "instagram",
    label: "Instagram dello studio",
    handle: "@climbpolestudio",
    href: "https://instagram.com/climbpolestudio",
  },
  {
    platform: "facebook",
    label: "Facebook dello studio",
    handle: "Climb Pole Studio",
    href: "https://facebook.com/climbpolestudio",
  },
] as const;
