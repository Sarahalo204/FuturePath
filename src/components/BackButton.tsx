"use client";

import { ChevronLeft, ArrowLeft } from "lucide-react";
import { Link } from "@/navigation";
import { useTranslations, useLocale } from "next-intl";

export default function BackButton({ href = "/dashboard", label }: { href?: string; label?: string }) {
    const t = useTranslations("Navigation");
    const locale = useLocale();
    const isArabic = locale === "ar";

    return (
        <Link
            href={href}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl text-slate-600 font-black text-sm transition-all hover:bg-white/60 hover:shadow-lg hover:shadow-slate-200/50 group active:scale-95"
        >
            {isArabic ? (
                <>
                    <span className="group-hover:translate-x-1 transition-transform">{label || t("dashboard")}</span>
                    <ChevronLeft className="w-4 h-4 rotate-180" />
                </>
            ) : (
                <>
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>{label || t("dashboard")}</span>
                </>
            )}
        </Link>
    );
}
