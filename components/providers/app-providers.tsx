"use client";

import * as React from "react";
import { ThemeProvider } from "./theme-provider";
import { QueryProvider } from "./query-provider";
import { AuthProvider } from "./auth-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { useDirection } from "@/hooks/use-direction";
import { setApiLocale } from "@/lib/api/axios-client";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  const { direction, locale } = useDirection();

  // Set synchronously (not in an effect) so the very first API requests fired
  // by child components already carry the right Accept-Language header.
  setApiLocale(locale);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <QueryProvider>
          <TooltipProvider delayDuration={200}>
            {children}
            <Toaster
              dir={direction}
              position={direction === "rtl" ? "top-left" : "top-right"}
              richColors
              closeButton
            />
          </TooltipProvider>
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
