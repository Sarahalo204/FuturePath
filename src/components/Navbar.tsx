"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { GraduationCap, Search, Bell, User, LogIn } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
    const { data: session } = useSession();
    const t = useTranslations("Navigation");

    return (
        <nav className="fixed top-0 w-full z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto glass-panel px-6 py-3 flex items-center justify-between border-slate-200/60 shadow-sm">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                        <GraduationCap className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-extrabold tracking-tight text-slate-800">
                        Future<span className="text-blue-600">Path</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
                        {t("home")}
                    </Link>
                    {session?.user?.role !== "ADMIN" && (
                        <Link href="/diagnostic" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
                            {t("diagnostic")}
                        </Link>
                    )}
                    <Link
                        href={session?.user?.role === "ADMIN" ? "/admin" : "/dashboard"}
                        className={`text-sm font-bold transition-colors ${!session ? "text-slate-300 cursor-not-allowed" : "text-slate-600 hover:text-blue-600"}`}
                    >
                        {t("dashboard")}
                    </Link>
                    <span className="text-sm font-bold text-slate-300 cursor-not-allowed">
                        {t("subjects")}
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <LanguageSwitcher />

                    <div className="h-6 w-[1px] bg-slate-200 mx-1 hidden sm:block" />

                    <button className="p-2 hover:bg-slate-100 rounded-full transition-colors hidden sm:block">
                        <Search className="w-5 h-5 text-slate-500" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-full transition-colors relative hidden sm:block">
                        <Bell className="w-5 h-5 text-slate-500" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                    </button>

                    {session?.user ? (
                        <ProfileDropdown user={session.user} />
                    ) : (
                        <Link
                            href="/auth/login"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/10 hover:bg-blue-700 transition-all"
                        >
                            <LogIn className="w-4 h-4" />
                            <span>{t("login")}</span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
