"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Lock, ArrowRight, Zap, GraduationCap, Video, ExternalLink } from "lucide-react";
import { type RoadmapItem, type RoadmapResponse } from "@/lib/ai-service";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function LearningPath({ subjectId, locale = "en" }: { subjectId?: string; locale?: string }) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const isArabic = locale === "ar";

    useEffect(() => {
        async function fetchPath() {
            try {
                const url = subjectId
                    ? `/api/learning-path?subjectId=${subjectId}`
                    : "/api/learning-path";
                const res = await fetch(url);
                const json = await res.json();
                if (res.ok && json.success) {
                    setData(json);
                } else {
                    setError(json.error || "Failed to load path");
                }
            } catch (err) {
                setError("Failed to load learning path.");
            } finally {
                setLoading(false);
            }
        }
        fetchPath();
    }, [subjectId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-24 space-y-6">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin" />
                    <Zap className="w-8 h-8 text-blue-600 absolute inset-0 m-auto animate-pulse" />
                </div>
                <p className="text-xl font-black text-slate-800 animate-pulse uppercase tracking-widest">
                    {isArabic ? "جاري إنشاء FuturePath..." : "Generating FuturePath..."}
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="glass-panel p-12 text-center max-w-lg mx-auto bg-white/80 border-slate-200">
                <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-10 h-10 text-rose-500" />
                </div>
                <h2 className="text-2xl font-black text-slate-800 mb-4 italic">Observation Needed</h2>
                <p className="text-slate-500 font-bold mb-8 leading-relaxed">{error}</p>
                <button
                    onClick={() => window.location.href = "/diagnostic"}
                    className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl hover:bg-slate-800 transition-all flex items-center gap-3 mx-auto"
                >
                    {isArabic ? "بدء التقييم" : "Start Diagnostic"} <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl w-full mx-auto space-y-12 pb-24">
            {/* Overview Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-8 space-y-4 border-l-4 border-blue-600 bg-white/80 shadow-sm">
                    <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3 italic">
                        <GraduationCap className="text-blue-600 w-8 h-8" />
                        {isArabic ? data?.subject?.nameAr : data?.subject?.nameEn} {isArabic ? "خارطة طريق" : "Roadmap"}
                    </h2>
                    <p className="text-slate-500 font-bold leading-relaxed">
                        {isArabic
                            ? `لقد حللنا أداءك في ${data?.subject?.nameAr} وقمنا بتحسين مسارك لتحديد الفجوات المعرفية الخاصة بك.`
                            : `We've analyzed your performance in ${data?.subject?.nameEn} and optimized your path to prioritize your specific knowledge gaps.`
                        }
                    </p>
                </div>
                {data?.resources && data.resources.length > 0 && (
                    <div className="glass-panel p-8 space-y-4 bg-white/80 border-slate-100 shadow-sm">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                            {isArabic ? "موارد مقترحة" : "Recommended Resources"}
                        </h3>
                        <div className="flex flex-wrap gap-3 mt-4">
                            {data.resources.slice(0, 3).map((res: any, i: number) => (
                                <a
                                    key={i}
                                    href={res.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-black border border-slate-100 hover:border-blue-200 hover:bg-white transition-all flex items-center gap-2"
                                >
                                    <Video className="w-3 h-3 text-blue-500" /> {res.title}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* Milestone Stepper */}
            <div className="relative space-y-10 pl-4 md:pl-0">
                {/* Connector Line */}
                <div className="absolute left-[31px] top-4 bottom-4 w-1 bg-slate-100" />

                {data?.roadmap.map((item: any, index: number) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-8 relative group"
                    >
                        {/* Status Icon */}
                        <div className={cn(
                            "w-16 h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 z-10 border-4 transition-all duration-500",
                            item.status === "COMPLETED" ? "bg-emerald-500 border-emerald-100 text-white rotate-12" :
                                item.status === "AVAILABLE" ? "bg-white border-blue-100 text-blue-600 shadow-xl shadow-blue-500/10" :
                                    "bg-slate-50 border-slate-100 text-slate-300"
                        )}>
                            {item.status === "COMPLETED" ? <CheckCircle2 className="w-8 h-8" /> :
                                item.status === "AVAILABLE" ? <Zap className="w-8 h-8 animate-pulse" /> : <Lock className="w-8 h-8" />}
                        </div>

                        {/* Content Card */}
                        <div className={cn(
                            "glass-panel p-8 flex-1 transition-all duration-500 border bg-white/90",
                            item.status === "AVAILABLE" ? "border-blue-100 shadow-xl shadow-blue-500/5 translate-x-1" : "border-slate-100 opacity-60 grayscale-[0.5]"
                        )}>
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                                <div>
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">{item.subject}</span>
                                    <h3 className="text-2xl font-black text-slate-800 italic tracking-tight">{item.topic}</h3>
                                </div>
                                <div className={cn(
                                    "px-4 py-2 rounded-xl text-[10px] font-black border uppercase tracking-widest",
                                    item.type === "WEAKNESS" ? "bg-rose-50 border-rose-100 text-rose-500" : "bg-emerald-50 border-emerald-100 text-emerald-600"
                                )}>
                                    {item.type === "WEAKNESS"
                                        ? (isArabic ? "نقطة ضعف" : "Weakness Point")
                                        : (isArabic ? "نقطة قوة" : "Strength Point")}
                                </div>
                            </div>

                            <p className="text-slate-500 font-bold leading-relaxed mb-8">
                                {item.description}
                            </p>

                            <div className="flex items-center gap-4">
                                {item.status === "AVAILABLE" && item.resourceLink && (
                                    <a
                                        href={item.resourceLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 bg-slate-900 text-white px-8 py-3 rounded-2xl text-sm font-black hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                                    >
                                        {isArabic ? "ابدأ التعلم" : "Start Learning"} <ExternalLink className="w-5 h-5" />
                                    </a>
                                )}
                                <div className="flex gap-2 ml-auto">
                                    <div className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer border border-slate-100">
                                        <Video className="w-5 h-5" />
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-all cursor-pointer border border-slate-100">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
