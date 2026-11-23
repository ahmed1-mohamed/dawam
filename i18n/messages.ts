import type { AbstractIntlMessages } from "next-intl";

/**
 * Picks top-level namespaces from the full message catalog so each route only
 * serializes the translations its client components need into the HTML.
 */
export function pickMessages(messages: AbstractIntlMessages, namespaces: readonly string[]): AbstractIntlMessages {
  const out: AbstractIntlMessages = {};
  for (const ns of namespaces) if (ns in messages) out[ns] = messages[ns];
  return out;
}

/** Needed on every page (error / not-found boundaries, shared UI). */
export const BASE_NAMESPACES = ["common", "errorPage", "notFound", "errorState", "emptyState"] as const;

/** Needed by the authenticated app screens (dashboard, showcase, login). */
export const APP_NAMESPACES = [
  ...BASE_NAMESPACES,
  "nav",
  "auth",
  "dashboard",
  "userForm",
  "showcase",
  "footer",
] as const;

/** Needed by the landing page's client components. */
export const LANDING_NAMESPACES = [...BASE_NAMESPACES, "landing"] as const;
