import apiClient from "@/lib/api/axios-client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types/api";
import type { SiteSettings } from "../types";

export const siteSettingsService = {
  async get(): Promise<SiteSettings> {
    const response = await apiClient.get<ApiResponse<SiteSettings>>(API_ENDPOINTS.landing.settings);
    return response.data.data;
  },
};
