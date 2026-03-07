import createMiddleware from "next-intl/middleware";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { routing } from "./navigation";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
    ...routing,
    defaultLocale: "en"
});

// Use auth.config (edge-compatible, no Prisma) instead of auth.ts
const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    // Run intl-middleware first to detect/set locale
    const response = intlMiddleware(req as unknown as NextRequest);

    // Extract locale from the URL
    const pathname = nextUrl.pathname;
    const pathnameParts = pathname.split("/");
    const locale = routing.locales.includes(pathnameParts[1] as any) ? pathnameParts[1] : "en";
    const localizedBase = `/${locale}`;

    const isApiRoute = pathname.startsWith("/api");
    const isAuthRoute = pathname.includes("/auth");
    const isAdminRoute = pathname.includes("/admin");

    if (isApiRoute) return NextResponse.next();

    const isProtectedRoute = pathname.includes("/profile") ||
        pathname.includes("/diagnostic") ||
        pathname.includes("/dashboard") ||
        pathname.includes("/path") ||
        pathname.includes("/predictor");

    // Protection logic
    if (isProtectedRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL(`${localizedBase}/auth/login`, nextUrl));
    }

    if (isAdminRoute && req.auth?.user?.role !== "ADMIN") {
        return NextResponse.redirect(new URL(localizedBase, nextUrl));
    }

    if (isAuthRoute && isLoggedIn) {
        const role = req.auth?.user?.role;
        const target = role === "ADMIN" ? "/admin" : "/dashboard";
        return NextResponse.redirect(new URL(`${localizedBase}${target}`, nextUrl));
    }

    return response;
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/(ar|en)/:path*", "/admin/:path*"],
};
