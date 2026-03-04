import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                // Validation logic will be implemented in auth.ts (non-edge)
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
