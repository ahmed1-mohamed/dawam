import type { DefaultSession } from "next-auth";
import type { UserRole } from "@/types";

declare module "next-auth" {
  interface User {
    role?: UserRole;
    accessToken?: string;
  }

  interface Session {
    accessToken?: string;
    user: {
      id: string;
      role?: UserRole;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role?: UserRole;
    accessToken?: string;
  }
}
