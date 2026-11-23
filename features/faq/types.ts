/** FAQ entry as returned by `GET /landing/faqs` (already localized by the backend). */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
