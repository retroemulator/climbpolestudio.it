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
  whatsappMessage: "Ciao Nadia, vorrei informazioni su…",
  email: "info@climbpolestudio.it",
  address: {
    street: "Corso Dante 109/A",
    zip: "10126",
    city: "Torino",
    country: "Italia",
  },
} as const;

/** Link WhatsApp con messaggio precompilato (brief §9). */
export const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
  contact.whatsappMessage,
)}`;

/** Profili social (brief §5). `label` per `aria-label`/screen reader. */
export const socials = [
  { label: "Instagram dello studio", handle: "@climbpolestudio", href: "https://instagram.com/climbpolestudio" },
  { label: "Facebook dello studio", handle: "Climb Pole Studio", href: "https://facebook.com/climbpolestudio" },
  {
    label: "Instagram di Nadia",
    handle: "@_nadia.senatore_",
    href: "https://instagram.com/_nadia.senatore_",
  },
] as const;
