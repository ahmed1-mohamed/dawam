"use client";

import * as React from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { setAccessToken } from "@/lib/api/axios-client";

/** Keeps the axios client's bearer token in sync with the NextAuth session. */
function AccessTokenSync() {
  const { data: session } = useSession();

  React.useEffect(() => {
    setAccessToken(session?.accessToken ?? null);
  }, [session?.accessToken]);

  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AccessTokenSync />
      {children}
    </SessionProvider>
  );
}
