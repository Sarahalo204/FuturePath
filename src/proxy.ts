import createMiddleware from "next-intl/middleware";
import { auth } from "./auth";
import { routing } from "./navigation";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiRoute = nextUrl.pathname.startsWith("/api");
    const isAuthRoute = nextUrl.pathname.includes("/auth");
    const isAdminRoute = nextUrl.pathname.includes("/admin");

    // Handle i18n for non-API routes
    if (!isApiRoute) {
        const response = intlMiddleware(req as unknown as NextRequest);

        const isProtectedRoute = nextUrl.pathname.includes("/profile") || nextUrl.pathname.includes("/diagnostic") || nextUrl.pathname.includes("/dashboard");

        if (isProtectedRoute && !isLoggedIn) {
            return NextResponse.redirect(new URL("/auth/login", nextUrl));
        }

        // Protection logic
        if (isAdminRoute && req.auth?.user?.role !== "ADMIN") {
            // If not admin, redirect to dashboard or home
            return NextResponse.redirect(new URL("/", nextUrl));
        }

        if (isAuthRoute && isLoggedIn) {
            // If logged in, redirect to respective dashboard
            const role = req.auth?.user?.role;
            const target = role === "ADMIN" ? "/admin" : "/dashboard";
            return NextResponse.redirect(new URL(target, nextUrl));
        }

        return response;
    }

    return NextResponse.next();
});

export const config = {
    // Matcher for i18n and Auth
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/(ar|en)/:path*", "/admin/:path*"],
};
