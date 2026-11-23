/**
 * Central map of backend endpoints (relative to NEXT_PUBLIC_API_URL).
 * Keep paths here so features never hard-code URLs.
 */
export const API_ENDPOINTS = {
  landing: {
    settings: "/landing/settings",
    faqs: "/landing/faqs",
  },
  demoRequests: "/demo-requests",
} as const;
