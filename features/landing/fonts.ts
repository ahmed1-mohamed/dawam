import { IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
  // Not preloaded: text paints at once in the size-adjusted fallback, then swaps.
  // Preloading all weights x subsets (~250 KB) delayed the first paint on slow networks.
  preload: false,
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
  // Not preloaded: text paints at once in the size-adjusted fallback, then swaps.
  // Preloading all weights x subsets (~250 KB) delayed the first paint on slow networks.
  preload: false,
});
