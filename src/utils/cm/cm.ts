import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind classes merge utility
 * Allows for a proper merging of tw classes
 */
export function cm(...args: ClassValue[]) {
  return twMerge(clsx(args));
}
