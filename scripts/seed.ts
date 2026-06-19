/**
 * Seed dei contenuti reali (brief §5) su Sanity.
 *
 * Esegui:  npm run seed
 * Richiede in `.env.local`: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET
 * e SANITY_API_TOKEN (permesso Editor).
 *
 * IDEMPOTENTE: usa `createOrReplace` con _id deterministici → rieseguibile,
 * niente duplicati. (Nota: sovrascrive le modifiche fatte a mano nello Studio
 * sui documenti "seed". I documenti creati a mano con altri _id restano intatti.)
 */
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

import { createClient } from "@sanity/client";

import {
  disciplineContent,
  instructors as instructorContent,
  testimonials as testimonialContent,
  news as newsContent,
  faqs as faqContent,
} from "../content/studio-content";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) throw new Error("Manca NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
if (!token) throw new Error("Manca SANITY_API_TOKEN (permesso Editor) in .env.local");

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

// NB: gli _id NON devono contenere punti — Sanity riserva il "." a namespace
// speciali (drafts./versions./system.) e i doc con punto vengono esclusi dalla
// lettura pubblica (reason: permission). Usiamo quindi il trattino.
const discRef = (slug: string) => ({ _type: "reference" as const, _ref: `discipline-${slug}` });

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[àáâãä]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const instrId = (name: string) => `instructor-${slugify(name)}`;

/** Paragrafi (string[]) → blocchi Portable Text con _key deterministici. */
const blocks = (paragraphs: string[]) =>
  paragraphs.map((text, i) => ({
    _type: "block",
    _key: `b${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `b${i}s0`, text, marks: [] }],
  }));

// Insegnante di riferimento per disciplina (per popolare gli slot orario).
const instructorForDiscipline: Record<string, string> = {};
for (const ins of instructorContent) {
  for (const slug of ins.disciplineSlugs) {
    if (!instructorForDiscipline[slug]) instructorForDiscipline[slug] = instrId(ins.name);
  }
}

// ── Discipline (§5) ───────────────────────────────────────────────
const disciplines = [
  {
    slug: "pole-dance",
    title: "Pole Dance",
    order: 1,
    summary: "Danza, ginnastica e fitness attorno al palo: forza, ritmo, tonicità ed espressione.",
    levels: ["Base 1", "Base 2", "Intermedio", "Int/Adv", "Open"],
  },
  {
    slug: "cerchio-aereo",
    title: "Cerchio Aereo",
    order: 2,
    summary: "Disciplina aerea su cerchio: forza, eleganza, controllo e figure sospese.",
    levels: ["Base", "Intermedio"],
  },
  {
    slug: "functional-training",
    title: "Functional Training",
    order: 3,
    summary: "Preparazione fisica e condizionamento a supporto delle discipline aeree.",
    levels: ["Tutti i livelli"],
  },
  {
    slug: "flexibility",
    title: "Flexibility",
    order: 4,
    summary: "Mobilità e flessibilità, adatta anche da zero, per movimenti più armoniosi.",
    levels: ["Tutti i livelli"],
  },
  {
    slug: "verticali",
    title: "Verticali",
    order: 5,
    summary: "Handstand ed equilibri: forza, allineamento e controllo, dal muro al libero.",
    levels: ["Base", "Intermedio"],
  },
  {
    slug: "exotic",
    title: "Exotic",
    order: 6,
    summary: "Variante della Pole sui tacchi: flow, musicalità ed espressione.",
    levels: ["Base", "Intermedio"],
  },
];

// ── Orario settimanale (§5) ───────────────────────────────────────
// d=giorno, t=ora, dur=durata min, title, disc=slug disciplina (o null)
type SlotSeed = { d: string; t: string; dur: number; title: string; disc: string | null; level?: string };
const slots: SlotSeed[] = [
  // LUNEDÌ
  { d: "lun", t: "13:00", dur: 60, title: "Pole Open (anche Base 1)", disc: "pole-dance", level: "Open" },
  { d: "lun", t: "17:30", dur: 60, title: "Base 1", disc: "pole-dance", level: "Base 1" },
  { d: "lun", t: "18:30", dur: 60, title: "Pole Base 2", disc: "pole-dance", level: "Base 2" },
  { d: "lun", t: "19:45", dur: 60, title: "Cerchio", disc: "cerchio-aereo" },
  // MARTEDÌ
  { d: "mar", t: "11:30", dur: 60, title: "Exotic Intermedio", disc: "exotic", level: "Intermedio" },
  { d: "mar", t: "13:00", dur: 60, title: "Cerchio", disc: "cerchio-aereo" },
  { d: "mar", t: "16:30", dur: 90, title: "Allenamento Libero", disc: null },
  { d: "mar", t: "18:30", dur: 60, title: "Pole Int/Adv", disc: "pole-dance", level: "Int/Adv" },
  { d: "mar", t: "19:30", dur: 60, title: "Allenamento Funzionale", disc: "functional-training" },
  { d: "mar", t: "20:30", dur: 60, title: "Base 1", disc: "pole-dance", level: "Base 1" },
  // MERCOLEDÌ
  { d: "mer", t: "11:00", dur: 90, title: "Allenamento Libero", disc: null },
  { d: "mer", t: "13:00", dur: 60, title: "Pole Open (anche Base 1)", disc: "pole-dance", level: "Open" },
  { d: "mer", t: "18:30", dur: 60, title: "Intro to Pole", disc: "pole-dance", level: "Intro" },
  { d: "mer", t: "19:30", dur: 60, title: "Flessibilità", disc: "flexibility" },
  { d: "mer", t: "20:30", dur: 60, title: "Pole Open (no Base 1)", disc: "pole-dance", level: "Open" },
  // GIOVEDÌ
  { d: "gio", t: "11:30", dur: 60, title: "Exotic Base", disc: "exotic", level: "Base" },
  { d: "gio", t: "13:00", dur: 60, title: "Cerchio", disc: "cerchio-aereo" },
  { d: "gio", t: "16:00", dur: 90, title: "Allenamento Libero", disc: null },
  { d: "gio", t: "18:00", dur: 60, title: "Base 1", disc: "pole-dance", level: "Base 1" },
  { d: "gio", t: "19:00", dur: 60, title: "Pole Base 2", disc: "pole-dance", level: "Base 2" },
  { d: "gio", t: "20:00", dur: 60, title: "Pole Intermedio", disc: "pole-dance", level: "Intermedio" },
  // VENERDÌ
  { d: "ven", t: "11:00", dur: 90, title: "Allenamento Libero", disc: null },
  { d: "ven", t: "13:00", dur: 60, title: "Pole Open (anche Base 1)", disc: "pole-dance", level: "Open" },
  { d: "ven", t: "17:30", dur: 60, title: "Intro to Pole", disc: "pole-dance", level: "Intro" },
  { d: "ven", t: "18:30", dur: 60, title: "Flessibilità / Allenamento Funz.", disc: "flexibility" },
  { d: "ven", t: "19:30", dur: 60, title: "Pole Combo", disc: "pole-dance" },
  // SABATO
  { d: "sab", t: "10:30", dur: 60, title: "Cerchio", disc: "cerchio-aereo" },
  { d: "sab", t: "12:00", dur: 60, title: "Intro / Base 1", disc: "pole-dance", level: "Base 1" },
  { d: "sab", t: "13:00", dur: 60, title: "Pole Base 2 / Intermedio", disc: "pole-dance", level: "Base 2 / Int" },
  { d: "sab", t: "14:00", dur: 60, title: "Verticali", disc: "verticali" },
  { d: "sab", t: "15:00", dur: 120, title: "Workshop & Lab", disc: null, level: "Su programmazione" },
];

// ── Listino (§5) ──────────────────────────────────────────────────
type PriceSeed = {
  category: string;
  title: string;
  detail?: string;
  price?: number;
  priceFrom?: boolean;
  note?: string;
  badge?: string;
};
const pricing: PriceSeed[] = [
  { category: "iscrizione", title: "Iscrizione annuale", price: 40 },
  { category: "mensile", title: "Mensile · 2 volte a settimana", detail: "8 lezioni", price: 120 },
  { category: "mensile", title: "Mensile · 3 volte a settimana", detail: "12 lezioni", price: 165 },
  { category: "trimestrale", title: "Trimestrale · 2 volte a settimana", detail: "24 lezioni", price: 325, note: "Pagabile in 2 rate" },
  { category: "trimestrale", title: "Trimestrale · 3 volte a settimana", detail: "36 lezioni", price: 430, note: "Pagabile in 2 rate" },
  { category: "trimestrale", title: "Trimestrale Cerchio · 2 volte a settimana", detail: "24 lezioni", price: 370 },
  { category: "semestrale", title: "Semestrale · 2 volte a settimana", detail: "48 lezioni", price: 610, note: "Pagabile in 3 rate" },
  { category: "semestrale", title: "Semestrale · 3 volte a settimana", detail: "72 lezioni", price: 800, note: "Pagabile in 3 rate" },
  { category: "annuale", title: "Annuale Open", detail: "Tutte le lezioni che vuoi · valido fino al 27/06/2027", price: 1450, note: "Pagabile in 3 rate", badge: "Più scelto" },
  { category: "pack", title: "Pack 10 ingressi", detail: "durata 6 mesi", price: 185 },
  { category: "pack", title: "Pack 20 ingressi", detail: "durata 12 mesi", price: 340 },
  { category: "pack", title: "Pack Cerchio · 10 ingressi", detail: "durata 3 mesi", price: 180 },
  { category: "pack", title: "Pack Allenamento Libero · 10 ingressi", detail: "durata 6 mesi", price: 100 },
  { category: "singola", title: "Lezione singola", price: 20 },
  { category: "singola", title: "Allenamento singolo", price: 15 },
  { category: "privata", title: "Privata 60 minuti", detail: "a discrezione dell'insegnante", price: 40, priceFrom: true },
  { category: "privata", title: "Privata 90 minuti", detail: "a discrezione dell'insegnante", price: 50, priceFrom: true },
  { category: "privata", title: "Pack 5 lezioni private", detail: "a discrezione dell'insegnante", price: 175, priceFrom: true },
];

async function main() {
  // Pulizia: rimuove eventuali documenti gestiti pre-esistenti (inclusi i vecchi
  // _id con punto, non leggibili pubblicamente). siteSettings è singleton → replace.
  await client.delete({
    query:
      '*[_type in ["discipline", "scheduleSlot", "pricingPlan", "instructor", "testimonial", "newsPost", "faq"]]',
  });

  const tx = client.transaction();

  // siteSettings (singleton)
  tx.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    title: "Climb Pole Studio",
    payoff: "Arti aeree e movimento",
    phone: "+39 393 025 1482",
    phoneE164: "+393930251482",
    whatsapp: "393930251482",
    email: "info@climbpolestudio.it",
    address: { street: "Corso Dante 109/A", zip: "10126", city: "Torino", country: "Italia" },
    geo: { lat: 45.0460915, lng: 7.6806417 },
    openingHours: ["Lun–Ven 11:00–21:30", "Sab 10:30–pomeriggio"],
    socials: [
      { _key: "ig", label: "Instagram dello studio", handle: "@climbpolestudio", url: "https://instagram.com/climbpolestudio" },
      { _key: "fb", label: "Facebook dello studio", handle: "Climb Pole Studio", url: "https://facebook.com/climbpolestudio" },
      { _key: "ign", label: "Instagram di Nadia", handle: "@_nadia.senatore_", url: "https://instagram.com/_nadia.senatore_" },
    ],
    seoTitle: "Climb Pole Studio — Arti aeree e movimento a Torino",
    seoDescription:
      "Studio di arti aeree e movimento a Torino: Pole Dance, Cerchio Aereo, Functional Training, Flexibility e Verticali. Per ogni livello, da zero all'avanzato.",
  });

  // discipline (con body Portable Text, suitableFor, youWillLearn, accent)
  for (const d of disciplines) {
    const c = disciplineContent[d.slug];
    tx.createOrReplace({
      _id: `discipline-${d.slug}`,
      _type: "discipline",
      title: d.title,
      slug: { _type: "slug", current: d.slug },
      order: d.order,
      summary: d.summary,
      levels: d.levels,
      ...(c
        ? {
            body: blocks(c.body),
            suitableFor: c.suitableFor,
            youWillLearn: c.youWillLearn,
            ...(c.accent ? { accent: c.accent } : {}),
          }
        : {}),
    });
  }

  // instructor (team)
  instructorContent.forEach((ins) => {
    tx.createOrReplace({
      _id: instrId(ins.name),
      _type: "instructor",
      name: ins.name,
      role: ins.role,
      bio: ins.bio.join("\n\n"),
      disciplines: ins.disciplineSlugs.map((slug) => ({ ...discRef(slug), _key: slug })),
    });
  });

  // testimonial
  testimonialContent.forEach((t, i) => {
    tx.createOrReplace({
      _id: `testimonial-${i}`,
      _type: "testimonial",
      author: t.author,
      text: t.text,
      context: t.context,
      rating: t.rating,
    });
  });

  // newsPost (pubblicati)
  newsContent.forEach((n) => {
    tx.createOrReplace({
      _id: `news-${slugify(n.title)}`,
      _type: "newsPost",
      title: n.title,
      slug: { _type: "slug", current: slugify(n.title) },
      date: `${n.date}T18:00:00.000Z`,
      excerpt: n.excerpt,
      body: blocks(n.body),
      published: true,
    });
  });

  // faq
  faqContent.forEach((f, i) => {
    tx.createOrReplace({
      _id: `faq-${i}`,
      _type: "faq",
      question: f.question,
      answer: f.answer,
      order: i,
    });
  });

  // scheduleSlot. `day` salvato col prefisso d'ordine ("1-lun") per l'ordinamento
  // dello Studio; il sito lo normalizza in lettura via dayCode().
  const dayValue: Record<string, string> = {
    lun: "1-lun", mar: "2-mar", mer: "3-mer", gio: "4-gio", ven: "5-ven", sab: "6-sab",
  };
  slots.forEach((s, i) => {
    const id = `slot-${s.d}-${s.t.replace(":", "")}-${i}`;
    tx.createOrReplace({
      _id: id,
      _type: "scheduleSlot",
      displayTitle: s.title,
      day: dayValue[s.d] ?? s.d,
      startTime: s.t,
      durationMin: s.dur,
      capacity: 10,
      ...(s.level ? { level: s.level } : {}),
      ...(s.disc ? { discipline: discRef(s.disc) } : {}),
      ...(s.disc && instructorForDiscipline[s.disc]
        ? { instructor: { _type: "reference", _ref: instructorForDiscipline[s.disc] } }
        : {}),
    });
  });

  // pricingPlan
  pricing.forEach((p, i) => {
    tx.createOrReplace({
      _id: `price-${i}`,
      _type: "pricingPlan",
      category: p.category,
      title: p.title,
      order: i,
      ...(p.detail ? { detail: p.detail } : {}),
      ...(p.price != null ? { price: p.price } : {}),
      ...(p.priceFrom ? { priceFrom: true } : {}),
      ...(p.note ? { note: p.note } : {}),
      ...(p.badge ? { badge: p.badge } : {}),
    });
  });

  const res = await tx.commit();
  const counts = {
    discipline: disciplines.length,
    scheduleSlot: slots.length,
    pricingPlan: pricing.length,
    instructor: instructorContent.length,
    testimonial: testimonialContent.length,
    newsPost: newsContent.length,
    faq: faqContent.length,
    siteSettings: 1,
  };
  console.log("✓ Seed completato.", counts, `(${res.results.length} documenti scritti)`);
}

main().catch((err) => {
  console.error("✗ Seed fallito:", err.message);
  process.exit(1);
});
