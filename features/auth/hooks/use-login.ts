"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import type { LoginInput } from "@/features/auth/schemas";

export class LoginError extends Error {
  constructor(public code: "invalid_credentials" | "unknown") {
    super(code);
  }
}

/**
 * Signs in with the NextAuth credentials provider via a React Query mutation,
 * so components get isPending / error state for free.
 */
export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: LoginInput) => {
      const result = await signIn("credentials", { ...input, redirect: false });

      if (!result || result.error) {
        throw new LoginError(
          result?.code === "invalid_credentials" || result?.error === "CredentialsSignin"
            ? "invalid_credentials"
            : "unknown"
        );
      }
      return result;
    },
    onSuccess: () => {
      // Drop any data cached for a previous (anonymous) user
      queryClient.clear();
    },
  });
}
