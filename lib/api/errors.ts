import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import type { ApiError } from "@/types/api";

export function isApiError(error: unknown): error is ApiError {
  return typeof error === "object" && error !== null && "message" in error;
}

/** True when the request never got an HTTP response (offline, DNS, CORS, timeout). */
export function isNetworkError(error: unknown) {
  return isApiError(error) && error.statusCode === undefined;
}

/**
 * Applies backend validation errors (already localized by the backend through
 * Accept-Language) to react-hook-form fields.
 *
 * @param fieldMap maps backend field keys (e.g. `company_name`) to form fields.
 * @returns true when at least one field error was applied.
 */
export function applyServerFieldErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  fieldMap: Record<string, Path<T>>
): boolean {
  if (!isApiError(error) || !error.errors) return false;

  let applied = false;
  for (const [key, messages] of Object.entries(error.errors)) {
    const field = fieldMap[key];
    const message = messages?.[0];
    if (field && message) {
      setError(field, { type: "server", message }, { shouldFocus: !applied });
      applied = true;
    }
  }
  return applied;
}
