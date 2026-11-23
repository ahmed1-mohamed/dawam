import createIntlMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { routing, type Locale } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

/** Paths (without locale prefix) that require a signed-in user. */
const PROTECTED_ROUTES = ["/dashboard"];
/** Paths only for guests; signed-in users are sent to the dashboard. */
const GUEST_ONLY_ROUTES = ["/login"];

function matches(path: string, routes: string[]) {
  return routes.some((route) => path === route || path.startsWith(`${route}/`));
}

export default auth((req) => {
  const { pathname, search } = req.nextUrl;
  const [, firstSegment, ...rest] = pathname.split("/");
  const hasLocale = routing.locales.includes(firstSegment as Locale);
  const locale = hasLocale ? firstSegment : routing.defaultLocale;
  const path = hasLocale ? `/${rest.join("/")}` : pathname;
  const isLoggedIn = !!req.auth;

  if (!isLoggedIn && matches(path, PROTECTED_ROUTES)) {
    const loginUrl = new URL(`/${locale}/login`, req.url);
    loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoggedIn && matches(path, GUEST_ONLY_ROUTES)) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
  }

  return intlMiddleware(req);
});

export const config = {
  // Skip API routes (incl. /api/auth), Next internals and static files
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
