"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, User, BookOpen, BarChart2, CheckCircle, HelpCircle, Youtube, GraduationCap, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface SubmissionDetail {
    id: string;
    score: number;
    createdAt: string;
    user: { name: string; email: string };
    subject: { nameEn: string; nameAr: string };
    analysis: {
        roadmap: { id: string; topic: string; type: string; description: string }[];
        resources: { title: string; url: string; type: string }[];
        majorSuggestions: string[];
    };
    answers: any[];
}

export default function AnalyticsDetailPage() {
    const t = useTranslations("Admin.analytics_detail");
    const locale = useLocale();
    const params = useParams();
    const router = useRouter();
    const [submission, setSubmission] = useState<SubmissionDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            fetch(`/api/admin/analytics/${params.id}`)
                .then(res => res.json())
                .then(data => {
                    setSubmission(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [params.id]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
    );

    if (!submission || (submission as any).error) return (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <HelpCircle className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-400">{t("not_found")}</h2>
            <button onClick={() => router.back()} className="mt-6 text-blue-600 font-bold hover:underline">
                {t("back")}
            </button>
        </div>
    );

    return (
        <div className="space-y-8 pb-20">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors mb-4 group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> {t("back")}
            </button>

            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">{t("title")}</h1>
                    <p className="text-slate-500 font-medium tracking-tight">Academic performance breakdown & AI-optimized study roadmap.</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className={`px-4 py-2 rounded-xl text-sm font-black ${submission.score >= 70 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                        }`}>
                        {submission.score}%
                    </div>
                    <div className="text-sm font-bold text-slate-400">
                        {new Date(submission.createdAt).toLocaleDateString(locale)}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Analysis */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <BarChart2 className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-black text-slate-800">{t("ai_analysis")}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {submission.analysis.roadmap.map((item, idx) => (
                                <motion.div
                                    key={item.id || idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className={`p-6 rounded-2xl border ${item.type === "WEAKNESS" ? "bg-rose-50/30 border-rose-100" : "bg-emerald-50/30 border-emerald-100"
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${item.type === "WEAKNESS" ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"
                                            }`}>
                                            {item.type}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-slate-800 mb-2">{item.topic}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Recommendations / Resources */}
                    <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-900/10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-white/10 rounded-lg">
                                <Youtube className="w-5 h-5 text-rose-400" />
                            </div>
                            <h2 className="text-xl font-black tracking-tight">{t("recommendations")}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {submission.analysis.resources.map((res, idx) => (
                                <a
                                    key={idx}
                                    href={res.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-5 bg-white/5 hover:bg-white/10 rounded-3xl transition-all border border-white/5 group"
                                >
                                    <div className="w-12 h-12 bg-rose-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Youtube className="w-6 h-6 text-rose-400" />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="font-bold text-sm leading-tight text-white/90">{res.title}</span>
                                        <span className="text-[10px] text-white/30 uppercase font-black tracking-widest leading-none">{res.type}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Sidebar Metadata */}
                <div className="space-y-8">
                    <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                            <User className="w-24 h-24 text-slate-900" />
                        </div>
                        <div className="flex items-center gap-3 mb-8 relative z-10">
                            <div className="p-2 bg-slate-50 rounded-lg">
                                <User className="w-5 h-5 text-slate-600" />
                            </div>
                            <h2 className="text-lg font-black text-slate-800">{t("student_info")}</h2>
                        </div>
                        <div className="space-y-6 relative z-10">
                            <div className="flex flex-col border-b border-slate-50 pb-4">
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Student Name</span>
                                <span className="font-bold text-slate-700">{submission.user.name}</span>
                            </div>
                            <div className="flex flex-col border-b border-slate-50 pb-4">
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Email Address</span>
                                <span className="font-bold text-slate-700 truncate">{submission.user.email}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Academic Subject</span>
                                <span className="font-black text-blue-600 text-lg">
                                    {locale === "ar" ? submission.subject.nameAr : submission.subject.nameEn}
                                </span>
                            </div>
                        </div>
                    </section>

                    <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-xl shadow-blue-500/30">
                        <div className="flex items-center gap-3 mb-8">
                            <GraduationCap className="w-6 h-6 text-blue-100" />
                            <h2 className="text-xl font-black">{t("recommendations")}</h2>
                        </div>
                        <p className="text-blue-100/80 text-sm font-bold mb-8 leading-relaxed">
                            Academic profile matches the following university major specializations:
                        </p>
                        <div className="space-y-3">
                            {submission.analysis.majorSuggestions.map((major, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-4 bg-white/10 rounded-2xl border border-white/5 hover:bg-white/15 transition-all cursor-default">
                                    <div className="w-2 h-2 rounded-full bg-blue-300" />
                                    <span className="font-bold text-sm text-white/90">{major}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
