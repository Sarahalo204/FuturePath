import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import authConfig from "./auth.config";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Helper: retry a DB operation up to `retries` times with a delay between attempts
async function withRetry<T>(fn: () => Promise<T>, retries = 2, delayMs = 500): Promise<T> {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === retries) throw error;
            console.warn(`[auth] DB attempt ${attempt + 1} failed, retrying in ${delayMs}ms...`);
            await new Promise((r) => setTimeout(r, delayMs));
        }
    }
    throw new Error("[auth] withRetry: unreachable");
}

export const {
    handlers,
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as "STUDENT" | "ADMIN";
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            try {
                const existingUser = await withRetry(() =>
                    prisma.user.findUnique({
                        where: { id: token.sub! },
                    })
                );

                if (!existingUser) return token;

                token.role = existingUser.role;
            } catch (error) {
                console.error("[auth] jwt callback - DB error after retries:", error);
            }

            return token;
        },
    },
    ...authConfig,
    providers: [
        ...authConfig.providers.filter((p) => p.id !== "credentials"),
        {
            id: "credentials",
            name: "Credentials",
            type: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: Partial<Record<string, unknown>>) {
                const validatedFields = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(1),
                    })
                    .safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    try {
                        const user = await withRetry(() =>
                            prisma.user.findUnique({
                                where: { email },
                            })
                        );

                        if (!user || !user.password) return null;

                        const passwordsMatch = await bcrypt.compare(password, user.password);

                        if (passwordsMatch) return user;
                    } catch (error) {
                        console.error("[auth] authorize - DB error after retries:", error);
                        return null;
                    }
                }

                return null;
            },
        } as any,
    ],
});
