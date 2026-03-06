"use client";

import { useState } from "react";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { Mail, Lock, User, UserPlus, Loader2, AlertCircle, ShieldCheck, GraduationCap } from "lucide-react";

export default function SignupForm() {
    const t = useTranslations("Auth");
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [role, setRole] = useState<"STUDENT" | "ADMIN">("STUDENT");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to register.");
                setLoading(false);
            } else {
                router.push("/auth/login");
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
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">{t("signup_title")}</h2>
                    <p className="text-slate-500 font-medium">{t("signup_desc", { defaultValue: "Begin your futuristic learning journey" })}</p>
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
                    <div className="space-y-3">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">{t("role_select")}</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setRole("STUDENT")}
                                className={`flex items-center justify-center gap-2 py-3 rounded-2xl border-2 transition-all font-bold text-sm ${role === "STUDENT"
                                    ? "bg-blue-50 border-blue-500 text-blue-600 shadow-lg shadow-blue-500/10"
                                    : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                                    }`}
                            >
                                <GraduationCap className="w-4 h-4" />
                                {t("student_role")}
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole("ADMIN")}
                                className={`flex items-center justify-center gap-2 py-3 rounded-2xl border-2 transition-all font-bold text-sm ${role === "ADMIN"
                                    ? "bg-indigo-50 border-indigo-500 text-indigo-600 shadow-lg shadow-indigo-500/10"
                                    : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                                    }`}
                            >
                                <ShieldCheck className="w-4 h-4" />
                                {t("admin_role")}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                required
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
                            />
                        </div>
                    </div>

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
                                <span>{t("signup")}</span>
                                <UserPlus className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                <div className="text-center pt-4">
                    <p className="text-slate-500 font-bold text-sm">
                        {t("have_account")}{" "}
                        <Link href="/auth/login" className="text-blue-600 hover:underline">
                            {t("login")}
                        </Link>
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
