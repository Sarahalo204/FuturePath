"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, GraduationCap, ChevronRight, Loader2, Target, HelpCircle, ArrowRight, Lock } from "lucide-react";
import { Link } from "@/navigation";
import BackButton from "@/components/BackButton";

interface Prediction {
    name: string;
    explanation: string;
    careers: string[];
    matchScore: number;
}

export default function PredictorPage() {
    const t = useTranslations("Predictor");
    const navT = useTranslations("Navigation");
    const locale = useLocale();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);

    const fetchPredictions = async (refresh = false) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/ai/predict-career?locale=${locale}${refresh ? "&refresh=true" : ""}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to fetch predictions.");
            }

            setPredictions(data.predictions);
            if (data.lastUpdated) {
                setLastUpdated(data.lastUpdated);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPredictions(false);
    }, []);

    return (
        <div className="min-h-screen py-20 px-6 max-w-7xl mx-auto space-y-12">
            <div className="pt-10 flex justify-between items-center">
                <BackButton />
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-6 py-2.5 bg-white/50 backdrop-blur-md border border-slate-200 rounded-2xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-all"
                >
                    {navT("dashboard")}
                </Link>
            </div>

            <header className="text-center space-y-6">
                <div className="inline-flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full border border-indigo-100 mb-4">
                        <Brain className="w-4 h-4 text-indigo-600" />
                        <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">{t("engine_badge")}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight">{t("title")}</h1>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed italic">{t("description")}</p>
                </div>

                {lastUpdated && predictions.length > 0 && (
                    <div className="flex flex-col items-center gap-6 pt-4">
                        <div className="flex items-center gap-3 px-6 py-2 bg-slate-50 rounded-2xl border border-slate-100">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                {t("last_updated") || "Last Updated"}: {new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(lastUpdated))}
                            </p>
                        </div>

                        <button
                            onClick={() => fetchPredictions(true)}
                            disabled={loading}
                            className="group relative px-8 py-3 bg-white text-slate-800 border border-slate-200 rounded-2xl font-black text-xs shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex items-center gap-2"
                        >
                            <Sparkles className="w-4 h-4 text-indigo-500 group-hover:rotate-12 transition-transform" />
                            {t("refresh_btn") || "Re-run AI Analysis"}
                            {loading && <Loader2 className="w-3 h-3 animate-spin ml-1" />}
                        </button>
                    </div>
                )}
            </header>

            <div className="flex justify-center">
                {predictions.length === 0 && !loading && !error && (
                    <button
                        onClick={() => fetchPredictions(true)}
                        className="group relative px-12 py-5 bg-slate-900 text-white rounded-3xl font-black text-lg shadow-2xl hover:bg-slate-800 transition-all flex items-center gap-3 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative z-10">{t("analyze")}</span>
                        <Sparkles className="w-5 h-5 relative z-10 animate-pulse" />
                    </button>
                )}
            </div>

            <AnimatePresence mode="wait">
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-20 space-y-6"
                    >
                        <div className="relative">
                            <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                            <Brain className="w-8 h-8 text-indigo-600 absolute inset-0 m-auto animate-pulse" />
                        </div>
                        <p className="text-indigo-600 font-black uppercase tracking-widest text-sm animate-bounce">{t("calculating")}</p>
                    </motion.div>
                )}

                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[2.5rem] p-12 text-center border border-slate-100 shadow-xl max-w-2xl mx-auto space-y-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-500" />

                        <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
                            {error.includes("3 different subjects") ? <Lock className="w-10 h-10 text-indigo-500" /> : <HelpCircle className="w-10 h-10 text-rose-500" />}
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-black text-slate-800 italic tracking-tight">
                                {error.includes("3 different subjects") ? t("subjects_required") : t("observation_required")}
                            </h2>
                            <p className="text-slate-500 font-bold leading-relaxed max-w-md mx-auto">{error}</p>
                        </div>

                        {error.includes("3 different subjects") && (
                            <div className="pt-4 max-w-sm mx-auto">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2 text-slate-400 px-1">
                                    <span>Knowledge Breadth</span>
                                    <span className="text-indigo-600 italic">Enhancement Needed</span>
                                </div>
                                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                                    <div
                                        className="h-full bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/20 animate-pulse"
                                        style={{ width: '33%' }}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                            <Link
                                href="/diagnostic"
                                className="inline-flex items-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black transition-all hover:bg-slate-800 shadow-xl group border-none"
                            >
                                {t("take_quiz")}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                            </Link>
                            <Link
                                href="/dashboard"
                                className="text-sm font-black text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest"
                            >
                                {navT("dashboard")}
                            </Link>
                        </div>
                    </motion.div>
                )}

                {predictions.length > 0 && !loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                    >
                        {predictions.map((pred, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all p-8 md:p-10 space-y-8 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-125 transition-transform duration-1000">
                                    <GraduationCap className="w-32 h-32 text-slate-900" />
                                </div>

                                <div className="flex justify-between items-start relative z-10">
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                                        <GraduationCap className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">{t("match_score")}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-black text-indigo-600">{pred.matchScore}%</span>
                                            <Target className="w-5 h-5 text-indigo-400" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1 relative z-10">
                                    <h3 className="text-3xl font-black text-slate-800 tracking-tight leading-tight">{pred.name}</h3>
                                </div>

                                <div className="space-y-4 relative z-10">
                                    <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{t("explanation")}</h4>
                                    <p className="text-slate-500 font-medium leading-relaxed">{pred.explanation}</p>
                                </div>

                                <div className="pt-6 relative z-10">
                                    <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">{t("careers")}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {pred.careers.map((career, idx) => (
                                            <span key={idx} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold border border-slate-100 hover:border-indigo-200 hover:bg-white transition-all cursor-default">
                                                {career}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
