import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function normalizeIndex(index: number, total: number) {
  if (total <= 0) return 0;
  return ((index % total) + total) % total;
}
