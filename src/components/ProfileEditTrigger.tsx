"use client";

import { useState } from "react";
import ProfileEditForm from "./ProfileEditForm";
import { Settings } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProfileWrapperProps {
    user: {
        id: string;
        name: string | null;
        email: string;
    };
}

export default function ProfileEditTrigger({ user }: ProfileWrapperProps) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const t = useTranslations("Profile");

    return (
        <>
            <button
                onClick={() => setIsEditOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-black transition-all hover:bg-slate-800 active:scale-[0.98]"
            >
                <Settings className="w-5 h-5" />
                {t("edit")}
            </button>

            <ProfileEditForm
                user={user}
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
            />
        </>
    );
}
