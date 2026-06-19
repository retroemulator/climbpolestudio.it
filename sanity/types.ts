import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { PortableTextBlock } from "next-sanity";

/**
 * Tipi di ritorno delle query (scritti a mano per ora). Quando lo schema si
 * stabilizza si può passare a `sanity typegen` per generarli automaticamente.
 */

export type SocialLink = { label?: string; handle?: string; url?: string };

export type SiteSettings = {
  title: string;
  payoff?: string;
  logo?: SanityImageSource;
  phone?: string;
  phoneE164?: string;
  whatsapp?: string;
  email?: string;
  address?: { street?: string; zip?: string; city?: string; country?: string };
  geo?: { lat?: number; lng?: number };
  openingHours?: string[];
  socials?: SocialLink[];
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: SanityImageSource;
};

export type DisciplineMedia = { image?: SanityImageSource; videoUrl?: string };

export type DisciplineCard = {
  _id: string;
  title: string;
  slug: string;
  order?: number;
  summary?: string;
  levels?: string[];
  accent?: string;
  media?: DisciplineMedia;
};

export type Discipline = DisciplineCard & {
  body?: PortableTextBlock[];
  suitableFor?: string;
  youWillLearn?: string[];
  gallery?: SanityImageSource[];
};

export type ScheduleSlot = {
  _id: string;
  displayTitle: string;
  level?: string;
  /** Codice giorno normalizzato ("lun"…"sab") — vedi dayCode() in lib/site. */
  day: string;
  startTime: string;
  durationMin?: number;
  capacity?: number;
  notes?: string;
  discipline?: { title: string; slug: string } | null;
  instructor?: { name: string } | null;
};

export type PricingPlan = {
  _id: string;
  category: string;
  title: string;
  detail?: string;
  price?: number;
  priceFrom?: boolean;
  note?: string;
  badge?: string;
  order?: number;
};

export type Instructor = {
  _id: string;
  name: string;
  role?: string;
  order?: number;
  bio?: string;
  photo?: SanityImageSource;
  disciplines?: { title: string; slug: string }[];
  socials?: { label?: string; url?: string }[];
};

export type GalleryItem = {
  _id: string;
  type: "photo" | "video";
  image?: SanityImageSource;
  videoUrl?: string;
  caption?: string;
  discipline?: { title: string; slug: string } | null;
};

export type Testimonial = {
  _id: string;
  author: string;
  text: string;
  context?: string;
  rating?: number;
  photo?: SanityImageSource;
};

export type Faq = {
  _id: string;
  question: string;
  answer: string;
};

export type NewsPostCard = {
  _id: string;
  title: string;
  slug: string;
  date?: string;
  cover?: SanityImageSource;
  excerpt?: string;
};
