"use client";

import * as React from "react";
import { Toaster } from "sonner";
import { QueryProvider } from "./query-provider";
import { AuthProvider } from "./auth-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useDirection } from "@/hooks/use-direction";
import { setApiLocale } from "@/lib/api/axios-client";

/**
 * Providers for the authenticated app area only (login, dashboard, showcase):
 * NextAuth session, React Query, tooltips and toasts. Kept out of the landing
 * page so its visitors don't download them.
 */
export function AppAreaProviders({ children }: { children: React.ReactNode }) {
  const { direction, locale } = useDirection();

  // Set synchronously (not in an effect) so the very first API requests fired
  // by child components already carry the right Accept-Language header.
  setApiLocale(locale);

  return (
    <AuthProvider>
      <QueryProvider>
        <TooltipProvider delayDuration={200}>
          {children}
          <Toaster dir={direction} position={direction === "rtl" ? "top-left" : "top-right"} richColors closeButton />
        </TooltipProvider>
      </QueryProvider>
    </AuthProvider>
  );
}
