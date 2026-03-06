"use client";

import { useState } from "react";
import { useRouter } from "@/navigation";
import { User, Lock, Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface ProfileEditFormProps {
    user: {
        name: string | null;
        email: string;
    };
    isOpen: boolean;
    onClose: () => void;
}

export default function ProfileEditForm({ user, isOpen, onClose }: ProfileEditFormProps) {
    const t = useTranslations("Profile");
    const router = useRouter();
    const [name, setName] = useState(user.name || "");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");

        try {
            const res = await fetch("/api/user/profile", {
                method: "PATCH",
                body: JSON.stringify({ name, password }),
                headers: { "Content-Type": "application/json" }
            });

            if (res.ok) {
                setStatus("success");
                setTimeout(() => {
                    onClose();
                    router.refresh();
                }, 2000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[60]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[70] p-6"
                    >
                        <div className="glass-panel p-8 bg-white shadow-2xl space-y-8 border-slate-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-black text-slate-800 tracking-tight">{t("edit")}</h2>
                                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-slate-700"
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">New Password (Optional)</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-slate-700"
                                            placeholder="Leave blank to keep current"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || status === "success"}
                                    className={`w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-3 shadow-xl ${status === "success"
                                            ? "bg-emerald-500 text-white shadow-emerald-500/20"
                                            : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20"
                                        }`}
                                >
                                    {loading ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : status === "success" ? (
                                        <>
                                            <CheckCircle2 className="w-6 h-6" />
                                            Update Complete
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </button>

                                {status === "error" && (
                                    <div className="flex items-center gap-2 text-rose-500 font-bold text-sm bg-rose-50 p-4 rounded-xl border border-rose-100">
                                        <AlertCircle className="w-5 h-5 shrink-0" />
                                        Failed to update profile. Please try again.
                                    </div>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
