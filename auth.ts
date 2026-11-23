import NextAuth, { CredentialsSignin, type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/features/auth/schemas";
import { APP_CONFIG } from "@/constants";
import type { UserRole } from "@/types";

class InvalidCredentialsError extends CredentialsSignin {
  code = "invalid_credentials";
}

interface LoginApiResponse {
  data: {
    accessToken: string;
    user: { id: string; name: string; email: string; role?: UserRole; avatarUrl?: string };
  };
}

/**
 * Authenticates against the backend `POST /auth/login` endpoint.
 * Adjust the path / response mapping here to match your API.
 */
async function loginWithApi(email: string, password: string): Promise<User | null> {
  const res = await fetch(`${APP_CONFIG.apiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  if (!res.ok) return null;

  const { data } = (await res.json()) as LoginApiResponse;
  return {
    id: data.user.id,
    name: data.user.name,
    email: data.user.email,
    image: data.user.avatarUrl ?? null,
    role: data.user.role ?? "developer",
    accessToken: data.accessToken,
  };
}

/**
 * Optional local demo account (development only), enabled by setting
 * AUTH_DEMO_EMAIL and AUTH_DEMO_PASSWORD. Lets you log in without a backend.
 */
function loginWithDemoAccount(email: string, password: string): User | null {
  const demoEmail = process.env.AUTH_DEMO_EMAIL;
  const demoPassword = process.env.AUTH_DEMO_PASSWORD;
  if (process.env.NODE_ENV === "production" || !demoEmail || !demoPassword) return null;
  if (email !== demoEmail || password !== demoPassword) return null;

  return {
    id: "demo-user",
    name: "Demo User",
    email: demoEmail,
    image: null,
    role: "admin",
    accessToken: "demo-access-token",
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  pages: {
    // Locale-less path; the middleware adds the locale prefix.
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) throw new InvalidCredentialsError();

        const { email, password } = parsed.data;
        const user =
          loginWithDemoAccount(email, password) ??
          (await loginWithApi(email, password).catch(() => null));

        if (!user) throw new InvalidCredentialsError();
        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
