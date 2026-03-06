import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
    GraduationCap,
    BookOpen,
    Target,
    Sparkles,
    ArrowRight,
    History,
    Calendar
} from "lucide-react";
import { redirect, Link } from "@/navigation";

export default async function StudentDashboard({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const session = await auth();
    const t = await getTranslations("Navigation");
    const diagT = await getTranslations("Diagnostic");
    const profileT = await getTranslations("Profile");
    const dashboardT = await getTranslations("Dashboard");

    if (!session || !session.user) {
        redirect({ href: "/auth/login", locale });
        return;
    }

    const userId = session.user.id;

    // Fetch learning paths and submissions
    const [learningPaths, submissions] = await Promise.all([
        prisma.learningPath.findMany({
            where: {
                userId,
                NOT: {
                    roadmap: {
                        equals: []
                    }
                }
            },
            include: { subject: true },
            orderBy: { updatedAt: 'desc' }
        }),
        prisma.submission.findMany({
            where: { userId },
            include: { subject: true },
            orderBy: { createdAt: 'desc' }
        })
    ]);

    return (
        <div className="min-h-screen pt-32 px-6 pb-20">
            <div className="max-w-7xl mx-auto space-y-12">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
                            <Sparkles className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-black text-blue-600 uppercase tracking-widest">
                                {diagT("stage_1_badge")}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight">
                            {dashboardT("welcome_back")}, <span className="text-blue-600">{session.user.name || "Learner"}</span>
                        </h1>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-10">
                        <section className="space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                                    <BookOpen className="w-6 h-6 text-blue-600" />
                                    {dashboardT("active_paths")}
                                </h2>
                            </div>

                            {learningPaths.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {learningPaths.map((path: any) => (
                                        <Link
                                            key={path.id}
                                            href={`/path?subjectId=${path.subjectId}`}
                                            className="glass-panel p-6 group hover:border-blue-300 transition-all bg-white hover:shadow-xl hover:shadow-blue-500/5 block"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                                    <GraduationCap className="w-6 h-6" />
                                                </div>
                                                <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">Active</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-800 mb-1">
                                                {locale === 'ar' ? path.subject.nameAr : path.subject.nameEn}
                                            </h3>
                                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6 italic">Roadmap Generated</p>

                                            <div className="flex items-center justify-between text-blue-600 font-black text-sm pt-4 border-t border-slate-50">
                                                {dashboardT("continue_path")}
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-12 text-center space-y-6">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                                        <Target className="w-8 h-8 text-slate-300" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-slate-800">
                                            {dashboardT("no_active_paths")}
                                        </h3>
                                        <p className="text-slate-500 font-medium leading-relaxed">
                                            {dashboardT("no_active_paths_desc")}
                                        </p>
                                    </div>
                                    <Link
                                        href="/diagnostic"
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black transition-all hover:bg-slate-800"
                                    >
                                        {dashboardT("take_diagnostic")} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                                    </Link>
                                </div>
                            )}
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                                        <History className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                                        {profileT("history")}
                                    </h2>
                                </div>
                                <span className="px-4 py-2 bg-slate-50 rounded-full text-xs font-black text-slate-400 uppercase tracking-widest border border-slate-100">
                                    {submissions.length} {profileT("stats_total")}
                                </span>
                            </div>

                            {submissions.length === 0 ? (
                                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-12 text-center space-y-4">
                                    <History className="w-10 h-10 text-slate-200 mx-auto" />
                                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                                        {profileT("no_history")}
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {submissions.map((sub: any) => {
                                        const answers = sub.answers as any[];
                                        const correctCount = answers.filter(a => a.isCorrect).length;
                                        const totalCount = answers.length;

                                        return (
                                            <div key={sub.id} className="glass-panel p-8 border-slate-100 group hover:border-blue-200 transition-all bg-white relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform group-hover:scale-110" />

                                                <div className="relative z-10 space-y-6">
                                                    <div className="flex justify-between items-start">
                                                        <div className="space-y-1">
                                                            <h3 className="text-2xl font-black text-slate-800">
                                                                {locale === "ar" ? sub.subject.nameAr : sub.subject.nameEn}
                                                            </h3>
                                                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                                <Calendar className="w-3 h-3" />
                                                                {new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(sub.createdAt)}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-3xl font-black text-blue-600 leading-none">{correctCount}/{totalCount}</span>
                                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter mt-1">
                                                                {profileT("score_label")}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                                        <Link
                                                            href={`/diagnostic/results/${sub.id}`}
                                                            className="flex items-center justify-center gap-2 py-3.5 bg-slate-50 text-slate-600 rounded-2xl font-black text-xs hover:bg-slate-100 transition-all border border-slate-100"
                                                        >
                                                            {profileT("view_details")}
                                                        </Link>
                                                        {learningPaths.some((lp: any) => lp.subjectId === sub.subjectId) ? (
                                                            <Link
                                                                href={`/path?subjectId=${sub.subjectId}`}
                                                                className="flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white rounded-2xl font-black text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10"
                                                            >
                                                                {profileT("view_roadmap")} <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                                                            </Link>
                                                        ) : (
                                                            <div className="flex items-center justify-center py-3.5 bg-slate-100 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-slate-200 opacity-60">
                                                                {profileT("no_roadmap")}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </section>
                    </div>

                    <div className="space-y-10">
                        <section className="space-y-6">
                            <div className="glass-panel p-8 space-y-6 bg-gradient-to-br from-indigo-600 to-blue-700 text-white border-none shadow-xl shadow-blue-500/10 relative overflow-hidden group">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />

                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 relative z-10">
                                    <GraduationCap className="w-6 h-6 text-white" />
                                </div>

                                <div className="space-y-2 relative z-10">
                                    <h3 className="text-2xl font-black tracking-tight italic">
                                        {dashboardT("major_predictor_title")}
                                    </h3>
                                    <p className="text-blue-100 font-medium leading-relaxed opacity-80">
                                        {dashboardT("major_predictor_desc")}
                                    </p>
                                </div>

                                <div className="pt-4 relative z-10">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2 text-blue-200">
                                        <span>{dashboardT("progress_to_unlock")}</span>
                                        <span>{Math.min(new Set(submissions.map((s: any) => s.subjectId)).size, 3)} / 3 Subjects</span>
                                    </div>
                                    <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-white transition-all duration-1000"
                                            style={{ width: `${Math.min((new Set(submissions.map((s: any) => s.subjectId)).size / 3) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>

                                <Link
                                    href="/predictor"
                                    className="w-full flex items-center justify-center gap-2 py-4 bg-white text-blue-600 rounded-2xl font-black transition-all hover:bg-blue-50 shadow-lg relative z-10"
                                >
                                    {dashboardT("open_predictor")}
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
