import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind classes conditionally and merges conflicting styles safely.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number to localized currency string.
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en"
): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Formats a localized number.
 */
export function formatNumber(value: number, locale: string = "en"): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US").format(value);
}
