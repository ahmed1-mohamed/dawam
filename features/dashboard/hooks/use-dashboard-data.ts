"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import type { User, UserRole, UserStatus } from "@/types";
import type { PaginatedResponse } from "@/types/api";

const INITIAL_USERS: User[] = [
  {
    id: "usr_1",
    name: "Ahmad Al-Mansoor",
    email: "ahmad@technova.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-15T09:30:00Z",
    bio: "Head of Infrastructure and Systems Engineering.",
    receiveEmails: true,
  },
  {
    id: "usr_2",
    name: "Sarah Jenkins",
    email: "sarah.j@designcraft.io",
    role: "designer",
    status: "active",
    createdAt: "2024-02-10T14:15:00Z",
    bio: "Principal Product Designer leading UX systems.",
    receiveEmails: true,
  },
  {
    id: "usr_3",
    name: "Tariq Khalid",
    email: "tariq.k@devstack.org",
    role: "developer",
    status: "active",
    createdAt: "2024-02-28T11:00:00Z",
    bio: "Full Stack Next.js & TypeScript Engineer.",
    receiveEmails: false,
  },
  {
    id: "usr_4",
    name: "Elena Rostova",
    email: "elena@cloudscale.net",
    role: "manager",
    status: "pending",
    createdAt: "2024-03-04T16:45:00Z",
    bio: "Technical Project Manager for enterprise rollouts.",
    receiveEmails: true,
  },
  {
    id: "usr_5",
    name: "Omar Farooq",
    email: "omar.f@datainsight.sa",
    role: "developer",
    status: "inactive",
    createdAt: "2024-03-12T08:20:00Z",
    bio: "Backend specialist in distributed architectures.",
    receiveEmails: false,
  },
  {
    id: "usr_6",
    name: "Layla Mahmoud",
    email: "layla.m@fintechsa.com",
    role: "designer",
    status: "active",
    createdAt: "2024-03-20T10:00:00Z",
    bio: "Design Technologist specializing in Arabic typography and RTL UI.",
    receiveEmails: true,
  },
];

// In-memory store for client demo interaction
let memoryUsers = [...INITIAL_USERS];

export function useUsersQuery(params: {
  search?: string;
  role?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const { search = "", role = "all", status = "all", page = 1, limit = 5 } = params;

  return useQuery<PaginatedResponse<User>>({
    queryKey: ["users", { search, role, status, page, limit }],
    queryFn: async () => {
      // Simulate network latency for authentic query lifecycle demonstration
      await new Promise((resolve) => setTimeout(resolve, 300));

      let filtered = [...memoryUsers];

      if (search.trim()) {
        const query = search.toLowerCase();
        filtered = filtered.filter(
          (u) =>
            u.name.toLowerCase().includes(query) ||
            u.email.toLowerCase().includes(query)
        );
      }

      if (role && role !== "all") {
        filtered = filtered.filter((u) => u.role === role);
      }

      if (status && status !== "all") {
        filtered = filtered.filter((u) => u.status === status);
      }

      const total = filtered.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const startIndex = (page - 1) * limit;
      const items = filtered.slice(startIndex, startIndex + limit);

      return {
        items,
        total,
        page,
        limit,
        totalPages,
      };
    },
  });
}

export function useCreateUserMutation() {
  const queryClient = useQueryClient();
  const t = useTranslations("userForm.notifications");

  return useMutation({
    mutationFn: async (
      input: Omit<User, "id" | "createdAt">
    ): Promise<User> => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      const newUser: User = {
        ...input,
        id: `usr_${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      memoryUsers = [newUser, ...memoryUsers];
      return newUser;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(t("createSuccess"));
    },
    onError: () => {
      toast.error("Failed to create user");
    },
  });
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();
  const t = useTranslations("userForm.notifications");

  return useMutation({
    mutationFn: async (user: User): Promise<User> => {
      await new Promise((resolve) => setTimeout(resolve, 350));
      memoryUsers = memoryUsers.map((u) => (u.id === user.id ? user : u));
      return user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(t("updateSuccess"));
    },
    onError: () => {
      toast.error("Failed to update user");
    },
  });
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();
  const t = useTranslations("userForm.notifications");

  return useMutation({
    mutationFn: async (id: string): Promise<string> => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      memoryUsers = memoryUsers.filter((u) => u.id !== id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(t("deleteSuccess"));
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });
}
