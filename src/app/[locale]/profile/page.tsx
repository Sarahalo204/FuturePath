import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { User as UserIcon, Mail, Shield, History, ArrowRight, ExternalLink, Settings, LogOut, LayoutDashboard } from "lucide-react";
import { redirect, Link } from "@/navigation";
import LogoutButton from "@/components/LogoutButton";
import ProfileEditTrigger from "@/components/ProfileEditTrigger";

export default async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const session = await auth();
    const t = await getTranslations("Profile");

    if (!session?.user) {
        redirect({ href: "/auth/login", locale });
        return null;
    }

    const userId = session.user.id as string;

    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            submissions: {
                orderBy: { createdAt: "desc" },
                include: { subject: true }
            },
            learningPaths: true
        }
    });

    if (!user) {
        redirect({ href: "/auth/login", locale });
        return null; // For TS
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center">
            <div className="max-w-xl w-full">
                {/* Profile Card */}
                <div className="space-y-8">
                    <div className="glass-panel p-10 md:p-12 space-y-8 bg-white/80 border-slate-200/60 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
                                <Shield className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>

                        <div className="flex flex-col items-center text-center space-y-6">
                            <div className="w-32 h-32 bg-slate-900 rounded-[2.5rem] flex items-center justify-center text-white text-5xl font-black shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                                {user.name?.[0] || user.email[0].toUpperCase()}
                            </div>
                            <div className="space-y-2">
                                <div className="flex flex-col items-center gap-2">
                                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">{user.name || t("student_fallback")}</h1>
                                    {user.role === "ADMIN" && (
                                        <div className="px-4 py-1 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase flex items-center gap-2 border border-slate-800">
                                            <Shield className="w-3.5 h-3.5" />
                                            Admin Account
                                        </div>
                                    )}
                                </div>
                                <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs pt-1">{user.role}</p>
                            </div>
                        </div>

                        <div className="space-y-4 pt-8 border-t border-slate-100">
                            <div className="flex items-center gap-6 group p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                                <div className="p-4 bg-white rounded-2xl text-slate-400 shadow-sm border border-slate-100 group-hover:text-blue-600 transition-colors">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div className="space-y-1 text-left">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{t("email")}</p>
                                    <p className="font-bold text-slate-700 text-lg">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 group p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                                <div className="p-4 bg-white rounded-2xl text-slate-400 shadow-sm border border-slate-100 group-hover:text-blue-600 transition-colors">
                                    <UserIcon className="w-6 h-6" />
                                </div>
                                <div className="space-y-1 text-left">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{t("name")}</p>
                                    <p className="font-bold text-slate-700 text-lg">{user.name || "N/A"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ProfileEditTrigger user={{ id: user.id, name: user.name, email: user.email }} />
                            <LogoutButton />
                        </div>

                        {user.role === "ADMIN" ? (
                            <Link
                                href="/admin"
                                className="w-full flex items-center justify-center gap-2 py-4 mt-2 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all shadow-xl"
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                {t("back_to_admin")}
                            </Link>
                        ) : user.submissions.length === 0 && (
                            <Link
                                href="/diagnostic"
                                className="w-full flex items-center justify-center gap-2 py-4 mt-2 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-xl"
                            >
                                <ArrowRight className="w-4 h-4" />
                                {t("start_quiz_cta")}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
