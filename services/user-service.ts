import apiClient from "@/lib/api/axios-client";
import type { ApiResponse, PaginatedResponse, PaginationParams } from "@/types/api";
import type { User } from "@/types";

export interface CreateUserInput {
  name: string;
  email: string;
  role: User["role"];
  status: User["status"];
  bio?: string;
  receiveEmails?: boolean;
}

export interface UpdateUserInput extends Partial<CreateUserInput> {
  id: string;
}

/**
 * Service layer for User operations interacting via centralized Axios client.
 */
export const userService = {
  /**
   * Retrieves a paginated list of users.
   */
  async getUsers(params?: PaginationParams): Promise<PaginatedResponse<User>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<User>>>("/users", {
      params,
    });
    return response.data.data;
  },

  /**
   * Retrieves a single user by ID.
   */
  async getUserById(id: string): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.data;
  },

  /**
   * Creates a new user record.
   */
  async createUser(input: CreateUserInput): Promise<User> {
    const response = await apiClient.post<ApiResponse<User>>("/users", input);
    return response.data.data;
  },

  /**
   * Updates an existing user record.
   */
  async updateUser({ id, ...data }: UpdateUserInput): Promise<User> {
    const response = await apiClient.put<ApiResponse<User>>(`/users/${id}`, data);
    return response.data.data;
  },

  /**
   * Deletes a user record by ID.
   */
  async deleteUser(id: string): Promise<{ success: boolean }> {
    const response = await apiClient.delete<ApiResponse<{ success: boolean }>>(`/users/${id}`);
    return response.data.data;
  },
};
