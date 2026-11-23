import apiClient from "@/lib/api/axios-client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types/api";
import type { CreateDemoRequestPayload, DemoRequest } from "../types";

export const demoRequestService = {
  /** Submits a "book a demo" lead. Errors come back localized via Accept-Language. */
  async create(payload: CreateDemoRequestPayload): Promise<DemoRequest> {
    const response = await apiClient.post<ApiResponse<DemoRequest>>(
      API_ENDPOINTS.demoRequests,
      payload
    );
    return response.data.data;
  },
};
