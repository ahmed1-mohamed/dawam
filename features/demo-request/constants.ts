export const COMPANY_SIZES = ["1-20", "21-50", "51-200", "200+"] as const;

/** Display labels for company sizes (numbers render the same in both locales). */
export const COMPANY_SIZE_LABELS: Record<(typeof COMPANY_SIZES)[number], string> = {
  "1-20": "1–20",
  "21-50": "21–50",
  "51-200": "51–200",
  "200+": "+200",
};

/** Simulated submit time before the success message (matches the design). */
export const SUBMIT_DELAY_MS = 1000;

/** Anchor id of the form, used by every "request a demo" CTA on the page. */
export const DEMO_ANCHOR_ID = "demo";
