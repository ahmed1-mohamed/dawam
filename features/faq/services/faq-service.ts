import apiClient from "@/lib/api/axios-client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types/api";
import type { FaqItem } from "../types";

export const faqService = {
  /** Localized by the backend from the Accept-Language header. */
  async getAll(): Promise<FaqItem[]> {
    const response = await apiClient.get<ApiResponse<FaqItem[]>>(API_ENDPOINTS.landing.faqs);
    return response.data.data;
  },
};
