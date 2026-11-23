import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { signOut } from "next-auth/react";
import { APP_CONFIG } from "@/constants";
import type { ApiError } from "@/types/api";

/**
 * Bearer token for the current NextAuth session.
 * Kept in sync by <AuthProvider /> (see components/providers/auth-provider.tsx).
 */
let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

/**
 * Active UI locale, sent to the backend on every request so it can return
 * localized content and localized validation / error messages.
 * Kept in sync by <AppProviders /> via `setApiLocale`.
 */
let apiLocale: string = APP_CONFIG.defaultLocale;

export function setApiLocale(locale: string) {
  apiLocale = locale;
}

export function getApiLocale() {
  return apiLocale;
}

/**
 * Creates and configures the centralized Axios client instance.
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: APP_CONFIG.apiUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor: Injects authentication token and headers
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (accessToken && config.headers && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // Backend localization: Accept-Language drives translated responses & errors
    if (config.headers && !config.headers["Accept-Language"]) {
      config.headers["Accept-Language"] = apiLocale;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Standardizes error responses and handles auth expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
    const formattedError: ApiError = {
      message:
        error.response?.data?.message ||
        error.message ||
        "An unexpected network error occurred",
      statusCode: error.response?.status,
      errors: error.response?.data?.errors,
      code: error.code,
    };

    // Global unauthorized token expiration handling
    if (error.response?.status === 401 && typeof window !== "undefined" && accessToken) {
      accessToken = null;
      const locale = window.location.pathname.split("/")[1] || APP_CONFIG.defaultLocale;
      void signOut({ callbackUrl: `/${locale}/login` });
    }

    return Promise.reject(formattedError);
  }
);

export default apiClient;
