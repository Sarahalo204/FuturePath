"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LogoutButton() {
    const t = useTranslations("Profile");

    return (
        <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-2 py-4 bg-rose-50 text-rose-600 rounded-2xl font-black transition-all hover:bg-rose-100 active:scale-[0.98]"
        >
            <LogOut className="w-5 h-5" />
            {t("logout")}
        </button>
    );
}
