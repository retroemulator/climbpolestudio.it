import type { SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { discipline } from "./discipline";
import { instructor } from "./instructor";
import { scheduleSlot } from "./scheduleSlot";
import { pricingPlan } from "./pricingPlan";
import { galleryItem } from "./galleryItem";
import { newsPost } from "./newsPost";
import { testimonial } from "./testimonial";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  discipline,
  instructor,
  scheduleSlot,
  pricingPlan,
  galleryItem,
  newsPost,
  testimonial,
];
