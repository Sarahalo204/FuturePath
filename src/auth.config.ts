import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                // Actual validation happens in auth.ts (non-edge).
                // This stub is required so Credentials provider is registered.
                return null;
            },
        }),
    ],
    callbacks: {
        // These callbacks run in edge middleware and read the JWT token
        // set by the full auth.ts — no database access needed.
        async jwt({ token }) {
            return token;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role as "STUDENT" | "ADMIN";
            }
            return session;
        },
        authorized({ auth, request: { nextUrl } }) {
            // Let the middleware handle all protection logic
            return true;
        },
    },
} satisfies NextAuthConfig;
