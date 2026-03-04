"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calculator, Atom, Microscope, BookOpen, GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";
import { useRouter } from "@/navigation";

interface SubjectGridProps {
    subjects: any[];
}

export default function SubjectGrid({ subjects: initialSubjects }: SubjectGridProps) {
    const t = useTranslations("Landing");
    const [selectedSubject, setSelectedSubject] = useState<any>(null);
    const router = useRouter();
    const locale = useLocale();

    const subjects = initialSubjects.map(s => ({
        ...s,
        description: t(`subjects.${s.id}_desc`),
        topics: t.raw(`subjects.${s.id}_topics`)
    }));

    return (
        <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject) => (
                    <motion.div
                        key={subject.id}
                        layoutId={`subject-${subject.id}`}
                        onClick={() => setSelectedSubject(subject)}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="glass-card p-6 flex items-center gap-4 group cursor-pointer border-slate-200/50 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
                    >
                        <div className={`p-4 rounded-2xl ${subject.color} group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                            {subject.icon}
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">{subject.name}</h3>
                            <p className="text-xs text-slate-400 font-black uppercase tracking-widest">{t("subjects.specialization")}</p>
                        </div>
                    </motion.div>
                ))}

                <div className="glass-panel p-6 flex flex-col justify-center items-center gap-2 border-dashed border-slate-300 hover:border-blue-400 bg-slate-50/50 transition-all cursor-not-allowed lg:col-span-1 opacity-60">
                    <GraduationCap className="w-8 h-8 text-slate-300" />
                    <span className="text-slate-400 font-black text-xs uppercase tracking-widest">{t("coming_soon")}</span>
                </div>
            </div>

            <AnimatePresence>
                {selectedSubject && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md">
                        <motion.div
                            layoutId={`subject-${selectedSubject.id}`}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl relative"
                        >
                            <button
                                onClick={() => setSelectedSubject(null)}
                                className="absolute top-6 right-6 p-3 hover:bg-slate-100 rounded-full transition-colors z-10"
                            >
                                <X className="w-6 h-6 text-slate-400" />
                            </button>

                            <div className="p-10 space-y-10">
                                <header className="flex items-center gap-6">
                                    <div className={`p-6 rounded-[2rem] ${selectedSubject.color} shadow-lg shadow-black/5`}>
                                        {selectedSubject.icon}
                                    </div>
                                    <div>
                                        <h2 className="text-4xl font-black text-slate-800 tracking-tight">{selectedSubject.name}</h2>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{t("subjects.active_curriculum")}</span>
                                        </div>
                                    </div>
                                </header>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest">{t("subjects.about")}</h4>
                                            <p className="text-slate-600 font-medium leading-relaxed">
                                                {selectedSubject.description}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => router.push(`/diagnostic?subject=${selectedSubject.id}`)}
                                            className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3"
                                        >
                                            {t("subjects.start_assessment")}
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest">{t("subjects.curriculum")}</h4>
                                        <div className="space-y-3">
                                            {selectedSubject.topics.map((topic: string, i: number) => (
                                                <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-colors">
                                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                                    <span className="text-sm font-bold text-slate-600">{topic}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div
                            className="absolute inset-0 -z-10"
                            onClick={() => setSelectedSubject(null)}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
