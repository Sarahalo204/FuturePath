"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Link } from "@/navigation";
import {
    User,
    LogOut,
    ChevronDown,
    LayoutDashboard,
    Settings,
    Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface ProfileDropdownProps {
    user: {
        name?: string | null;
        email?: string | null;
        role?: string;
    };
}

export default function ProfileDropdown({ user }: ProfileDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations("Navigation");
    const profT = useTranslations("Profile");

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-1 pr-3 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 transition-all active:scale-[0.98]"
            >
                <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg">
                    {user.name?.[0] || user.email?.[0].toUpperCase()}
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-3 w-64 bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-900/10 z-50 overflow-hidden"
                        >
                            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{user.role}</p>
                                <p className="font-bold text-slate-800 truncate">{user.name || "Student"}</p>
                                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                {user.role === "ADMIN" && (
                                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase mt-2">
                                        <Shield className="w-3 h-3" />
                                        System Admin
                                    </div>
                                )}
                            </div>

                            <div className="p-2">
                                <Link
                                    href="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 p-3 rounded-2xl text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all font-bold text-sm"
                                >
                                    <User className="w-5 h-5" />
                                    {profT("title")}
                                </Link>

                                <Link
                                    href={user.role === "ADMIN" ? "/admin" : "/dashboard"}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 p-3 rounded-2xl text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all font-bold text-sm"
                                >
                                    <LayoutDashboard className="w-5 h-5" />
                                    {t("dashboard")}
                                </Link>

                                {user.role === "ADMIN" && (
                                    <Link
                                        href="/admin/settings"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 p-3 rounded-2xl text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all font-bold text-sm"
                                    >
                                        <Settings className="w-5 h-5" />
                                        {profT("settings", { defaultValue: "Settings" })}
                                    </Link>
                                )}
                            </div>

                            <div className="p-2 border-t border-slate-100">
                                <button
                                    onClick={() => signOut()}
                                    className="w-full flex items-center gap-3 p-3 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all font-bold text-sm"
                                >
                                    <LogOut className="w-5 h-5" />
                                    {profT("logout")}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
