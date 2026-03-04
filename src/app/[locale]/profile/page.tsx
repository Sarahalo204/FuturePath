import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { User as UserIcon, Mail, Shield, History, ArrowRight, ExternalLink, Settings, LogOut } from "lucide-react";
import { Link } from "@/navigation";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const session = await auth();
    const t = await getTranslations("Profile");

    if (!session || !session.user) {
        redirect("/auth/login");
    }

    const userId = session.user.id as string;

    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            submissions: {
                orderBy: { createdAt: "desc" },
                include: { subject: true }
            }
        }
    });

    if (!user) {
        redirect("/auth/login");
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Profile Card */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="glass-panel p-8 space-y-8 bg-white/80 border-slate-200/60 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
                                <Shield className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="w-24 h-24 bg-slate-900 rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-2xl">
                                {user.name?.[0] || user.email[0].toUpperCase()}
                            </div>
                            <div className="space-y-1">
                                <h1 className="text-3xl font-black text-slate-800 tracking-tight">{user.name || t("student_fallback")}</h1>
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{user.role}</p>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-100">
                            <div className="flex items-center gap-4 group">
                                <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{t("email")}</p>
                                    <p className="font-bold text-slate-700">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                    <UserIcon className="w-5 h-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{t("name")}</p>
                                    <p className="font-bold text-slate-700">{user.name || "N/A"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 space-y-3">
                            <button className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-black transition-all hover:bg-slate-800 active:scale-[0.98]">
                                <Settings className="w-5 h-5" />
                                {t("edit")}
                            </button>
                            <LogoutButton />
                        </div>
                    </div>
                </div>

                {/* History Section */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <History className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-3xl font-black text-slate-800 tracking-tight">{t("history")}</h2>
                        </div>
                        <span className="px-4 py-2 bg-slate-100 rounded-full text-xs font-black text-slate-500 uppercase tracking-widest">
                            {user.submissions.length} {t("stats_total")}
                        </span>
                    </div>

                    {user.submissions.length === 0 ? (
                        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-16 text-center space-y-6">
                            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto border border-slate-100">
                                <History className="w-10 h-10 text-slate-200" />
                            </div>
                            <p className="text-slate-500 font-bold text-xl">{t("no_history")}</p>
                            <Link
                                href="/diagnostic"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black transition-all hover:bg-blue-700 shadow-xl shadow-blue-500/10"
                            >
                                {t("start_quiz_cta")} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {user.submissions.map((sub: any) => (
                                <div key={sub.id} className="glass-panel p-6 border-slate-100 group hover:border-blue-200 transition-all">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex flex-col items-center justify-center border border-blue-100 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                                                <span className="text-lg font-black text-blue-600 group-hover:text-white leading-none">{Math.round(sub.score)}</span>
                                                <span className="text-[8px] font-black text-blue-400 group-hover:text-blue-100 uppercase tracking-tighter">{t("score_label")}</span>
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-xl font-bold text-slate-800">
                                                    {locale === "ar" ? sub.subject.nameAr : sub.subject.nameEn}
                                                </h3>
                                                <p className="text-sm font-medium text-slate-400">
                                                    {new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(sub.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Link
                                                href={`/diagnostic/results/${sub.id}`}
                                                className="px-6 py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all"
                                            >
                                                {t("details")}
                                            </Link>
                                            <Link
                                                href="/path"
                                                className="px-6 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2"
                                            >
                                                {t("view_path")} <ExternalLink className="w-4 h-4 rtl:rotate-180" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
