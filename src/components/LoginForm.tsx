"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { Mail, Lock, LogIn, Loader2, AlertCircle } from "lucide-react";

export default function LoginForm() {
    const t = useTranslations("Auth");
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid credentials. Please try again.");
                setLoading(false);
            } else {
                // Fetch user data to determine role for redirection
                // In a real app, this could be part of the session
                // We refresh to ensure session is updated
                router.refresh();
                // We'll let the middleware handle the dashboard redirection
                // but we can also manually push to home which triggers middleware
                router.push("/");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md mx-auto"
        >
            <div className="glass-panel p-8 md:p-10 bg-white/70 border-white/40 shadow-2xl backdrop-blur-xl rounded-[2.5rem] space-y-8">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">{t("login_title")}</h2>
                    <p className="text-slate-500 font-medium">{t("description", { defaultValue: "Access your personalized learning path" })}</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-bold"
                    >
                        <AlertCircle className="w-5 h-5" />
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">{t("email")}</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                required
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">{t("password")}</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                required
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3"
                    >
                        {loading ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            <>
                                <span>{t("login")}</span>
                                <LogIn className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                <div className="text-center pt-4">
                    <p className="text-slate-500 font-bold text-sm">
                        {t("no_account")}{" "}
                        <Link href="/auth/signup" className="text-blue-600 hover:underline">
                            {t("signup")}
                        </Link>
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
