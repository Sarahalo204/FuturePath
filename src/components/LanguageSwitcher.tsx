"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/navigation";
import { Languages } from "lucide-react";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLanguage = () => {
        const nextLocale = locale === "en" ? "ar" : "en";
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600 font-medium text-sm"
            title={locale === "ar" ? "تغيير اللغة إلى العربية" : "Change language to English"}
        >
            <Languages className="w-4 h-4" />
            <span>{locale === "ar" ? "العربية" : "English"}</span>
        </button>
    );
}
