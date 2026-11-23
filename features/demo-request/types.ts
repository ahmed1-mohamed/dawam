import type { COMPANY_SIZES } from "./constants";

export type CompanySize = (typeof COMPANY_SIZES)[number];

/** Payload sent to `POST /demo-requests`. */
export interface CreateDemoRequestPayload {
  name: string;
  companyName: string;
  phone: string;
  email: string;
  companySize: CompanySize;
  /** UI locale the visitor used — lets the sales team reply in the same language. */
  locale: string;
}

/** Resource returned by the backend after a demo request is created. */
export interface DemoRequest {
  id: string;
  status?: "new" | "contacted" | "scheduled";
  createdAt?: string;
}
