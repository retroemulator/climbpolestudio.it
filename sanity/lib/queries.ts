import { defineQuery } from "next-sanity";

/**
 * Query GROQ. `defineQuery` consente in futuro la generazione automatica dei tipi
 * (`sanity typegen`). I tipi di ritorno sono in `sanity/types.ts` (a mano, per ora).
 */

export const SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  title, payoff, logo, phone, phoneE164, whatsapp, email,
  address, geo, openingHours,
  socials[]{ label, handle, url },
  seoTitle, seoDescription, ogImage
}`);

export const DISCIPLINES_QUERY = defineQuery(`*[_type == "discipline"]|order(order asc){
  _id, title, "slug": slug.current, order, summary, levels, accent, media
}`);

export const DISCIPLINE_SLUGS_QUERY = defineQuery(`*[_type == "discipline" && defined(slug.current)]{
  "slug": slug.current
}`);

export const DISCIPLINE_BY_SLUG_QUERY = defineQuery(`*[_type == "discipline" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, summary, body, levels, suitableFor, youWillLearn,
  media, gallery, accent
}`);

export const SCHEDULE_BY_DISCIPLINE_QUERY = defineQuery(`*[_type == "scheduleSlot" && discipline->slug.current == $slug]|order(day asc, startTime asc){
  _id, displayTitle, level, day, startTime, durationMin, capacity
}`);

export const SCHEDULE_QUERY = defineQuery(`*[_type == "scheduleSlot"]|order(day asc, startTime asc){
  _id, displayTitle, level, day, startTime, durationMin, capacity, notes,
  "discipline": discipline->{ title, "slug": slug.current },
  "instructor": instructor->{ name }
}`);

export const PRICING_QUERY = defineQuery(`*[_type == "pricingPlan"]|order(order asc){
  _id, category, title, detail, price, priceFrom, note, badge, order
}`);

export const INSTRUCTORS_QUERY = defineQuery(`*[_type == "instructor"]|order(order asc){
  _id, name, role, bio, photo, order,
  "disciplines": disciplines[]->{ title, "slug": slug.current },
  socials[]{ label, url }
}`);

export const GALLERY_QUERY = defineQuery(`*[_type == "galleryItem"]|order(order asc){
  _id, type, image, videoUrl, caption,
  "discipline": disciplineTag->{ title, "slug": slug.current }
}`);

export const TESTIMONIALS_QUERY = defineQuery(`*[_type == "testimonial"]{
  _id, author, text, context, rating, photo
}`);

export const NEWS_QUERY = defineQuery(`*[_type == "newsPost" && published == true]|order(date desc){
  _id, title, "slug": slug.current, date, cover, excerpt
}`);

export const FAQ_QUERY = defineQuery(`*[_type == "faq"]|order(order asc){
  _id, question, answer
}`);
