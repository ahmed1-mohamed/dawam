import type { RegisterOptions } from "react-hook-form";
import type { CompanySize } from "./types";

export interface DemoRequestFormValues {
  name: string;
  companyName: string;
  phone: string;
  email: string;
  companySize: CompanySize;
}

type TextField = Exclude<keyof DemoRequestFormValues, "companySize">;

/**
 * Validation rules (react-hook-form built-ins, no schema library, so the
 * landing page doesn't ship one). Messages are translated in the form from
 * `landing.demo.fields.<field>.error`, so rules only need to pass/fail.
 */
export const DEMO_REQUEST_RULES: Record<TextField, RegisterOptions<DemoRequestFormValues, TextField>> = {
  name: { validate: (v) => v.trim().length >= 2 },
  companyName: { validate: (v) => v.trim().length >= 2 },
  phone: { validate: (v) => v.replace(/\D/g, "").length >= 8 },
  email: { validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
};
