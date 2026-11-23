import type { FAQ_KEYS } from "./constants";

export type FaqKey = (typeof FAQ_KEYS)[number];

export interface FaqItem {
  id: FaqKey;
  question: string;
  answer: string;
}
