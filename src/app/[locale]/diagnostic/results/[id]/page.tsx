import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { CheckCircle2, XCircle, ArrowRight, BookOpen, Target, Sparkles } from "lucide-react";
import { Link } from "@/navigation";
import { notFound } from "next/navigation";

export default async function DiagnosticResultsPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
    const { id, locale } = await params;
    const t = await getTranslations("Results");

    const submission = await prisma.submission.findUnique({
        where: { id },
        include: { subject: true }
    });

    if (!submission) {
        notFound();
    }

    const answers = submission.answers as any[];
    const correctCount = answers.filter(a => a.isCorrect).length;
    const totalCount = answers.length;
    const percentage = Math.round((correctCount / totalCount) * 100);

    const subjectName = locale === "ar" ? submission.subject.nameAr : submission.subject.nameEn;

    return (
        <div className="min-h-screen pt-24 pb-20 px-6 max-w-5xl mx-auto space-y-12">
            {/* Header / Score Display */}
            <div className="glass-panel p-10 md:p-16 text-center space-y-8 bg-white/80 border-slate-200/60 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />

                <div className="space-y-4 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100 mb-2">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{t("complete_badge")}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight">
                        {subjectName} {t("title")}
                    </h1>
                </div>

                <div className="flex flex-col items-center justify-center gap-6 relative z-10">
                    <div className="relative w-48 h-48 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90 transform">
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                className="text-slate-100"
                            />
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                strokeDasharray={552.92}
                                strokeDashoffset={552.92 * (1 - percentage / 100)}
                                className="text-blue-600 transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-black text-slate-800">{correctCount}/{totalCount}</span>
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{percentage}% {t("score_label")}</span>
                        </div>
                    </div>

                    <div className="max-w-md space-y-2">
                        <p className="text-slate-500 font-medium leading-relaxed">
                            {percentage >= 70
                                ? t("excellent_msg")
                                : t("good_msg")}
                        </p>
                    </div>
                </div>

                <div className="pt-8 flex flex-wrap justify-center gap-4 relative z-10">
                    <Link
                        href={`/path?subjectId=${submission.subjectId}`}
                        className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 transition-all flex items-center gap-3 active:scale-95"
                    >
                        {t("view_path")} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                    </Link>
                    <Link
                        href="/diagnostic"
                        className="px-10 py-4 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold transition-all active:scale-95"
                    >
                        {t("try_another")}
                    </Link>
                </div>
            </div>

            {/* Questions Breakdown */}
            <div className="space-y-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">{t("breakdown")}</h2>
                </div>

                <div className="grid gap-4">
                    {answers.map((answer, index) => (
                        <div key={index} className="glass-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border-slate-100 group hover:border-blue-200 transition-all">
                            <div className="flex gap-4 items-start">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${answer.isCorrect ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                    {answer.isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                                </div>
                                <div className="space-y-1">
                                    <p className="text-lg font-bold text-slate-700 leading-tight group-hover:text-slate-900 transition-colors">
                                        {answer.question}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{answer.topic}</span>
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${answer.isCorrect ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {answer.isCorrect ? t("correct") : t("incorrect")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
