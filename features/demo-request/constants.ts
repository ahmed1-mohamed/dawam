import type { Path } from "react-hook-form";
import type { DemoRequestFormValues } from "./schemas";

export const COMPANY_SIZES = ["1-20", "21-50", "51-200", "200+"] as const;

/** Display labels for company sizes (numbers render the same in both locales). */
export const COMPANY_SIZE_LABELS: Record<(typeof COMPANY_SIZES)[number], string> = {
  "1-20": "1–20",
  "21-50": "21–50",
  "51-200": "51–200",
  "200+": "+200",
};

/** Maps backend validation keys (camelCase or snake_case) to form fields. */
export const DEMO_REQUEST_SERVER_FIELDS: Record<string, Path<DemoRequestFormValues>> = {
  name: "name",
  companyName: "companyName",
  company_name: "companyName",
  phone: "phone",
  email: "email",
  companySize: "companySize",
  company_size: "companySize",
};

/** Anchor id of the form, used by every "request a demo" CTA on the page. */
export const DEMO_ANCHOR_ID = "demo";
