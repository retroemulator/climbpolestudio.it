import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge condizionale di classi Tailwind (clsx + risoluzione conflitti). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
