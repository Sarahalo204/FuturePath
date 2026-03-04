"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Atom, Microscope, BookOpen, ChevronRight, CheckCircle2, AlertCircle, Loader2, Lightbulb } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { QuizQuestion } from "@/lib/ai-service";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const subjects = [
    { id: "math", nameKey: "math", icon: <Calculator />, color: "text-blue-600", bg: "bg-blue-50" },
    { id: "physics", nameKey: "physics", icon: <Atom />, color: "text-indigo-600", bg: "bg-indigo-50" },
    { id: "biology", nameKey: "biology", icon: <Microscope />, color: "text-emerald-600", bg: "bg-emerald-50" },
    { id: "chemistry", nameKey: "chemistry", icon: <Atom />, color: "text-amber-600", bg: "bg-amber-50" },
    { id: "english", nameKey: "english", icon: <BookOpen />, color: "text-rose-600", bg: "bg-rose-50" },
];

export default function DiagnosticQuiz({ subjectId }: { subjectId?: string }) {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations("Landing");
    const diagT = useTranslations("Diagnostic");
    const navT = useTranslations("Navigation");

    // Filter subjects if a specific ID is provided
    const [activeSubjects] = useState(() =>
        subjectId ? subjects.filter(s => s.id === subjectId) : subjects
    );

    const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1: Loading Quiz, 2: Active Quiz, 3: Completed Subject, 4: All Finished
    const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuizId, setCurrentQuizId] = useState<string | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const currentSubject = activeSubjects[currentSubjectIndex];

    const fetchQuestions = async (sId: string) => {
        setCurrentStep(1);
        setError(null);
        try {
            const response = await fetch("/api/ai/generate-quiz", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    subject: sId,
                    language: locale,
                    count: 5
                }),
            });

            const data = await response.json();
            if (!data.success) throw new Error(data.error || "Failed to fetch questions");

            setQuestions(data.questions);
            setCurrentQuizId(data.quizId);
            setCurrentQuestionIndex(0);
            setCurrentStep(2);
        } catch (err: any) {
            setError(err.message);
            setCurrentStep(0);
        }
    };

    const startQuiz = () => {
        if (!currentSubject) {
            setError("Invalid subject selected.");
            return;
        }
        fetchQuestions(currentSubject.id);
    };

    const handleAnswer = (optionIndex: number) => {
        const isCorrect = optionIndex === questions[currentQuestionIndex].correctAnswerIndex;

        const newAnswer = {
            subjectId: currentSubject.id,
            quizId: currentQuizId,
            question: questions[currentQuestionIndex].question,
            isCorrect,
            topic: currentSubject.id
        };

        const updatedAnswers = [...answers, newAnswer];
        setAnswers(updatedAnswers);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Finished questions for this subject
            if (activeSubjects.length === 1) {
                // Single subject: Auto-submit for immediate feedback
                submitResults(updatedAnswers);
            } else if (currentSubjectIndex === activeSubjects.length - 1) {
                setCurrentStep(4); // Last subject in a sequence
            } else {
                setCurrentStep(3); // Wait for next subject
            }
        }
    };

    const nextSubject = () => {
        const nextIdx = currentSubjectIndex + 1;
        setCurrentSubjectIndex(nextIdx);
        fetchQuestions(activeSubjects[nextIdx].id);
    };

    const submitResults = async (providedAnswers?: any[]) => {
        setIsSubmitting(true);
        if (providedAnswers) setCurrentStep(4); // Show analyzing state even if auto-submitted

        const finalAnswers = providedAnswers || answers;

        try {
            const response = await fetch("/api/diagnostic/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answers: finalAnswers, locale }),
            });
            const data = await response.json();
            if (response.ok && data.results && data.results.length > 0) {
                const targetResult = data.results.find((r: any) =>
                    r.subjectName.toLowerCase() === currentSubject.id.toLowerCase()
                ) || data.results[0];

                router.push(`/${locale}/diagnostic/results/${targetResult.submissionId}`);
            } else {
                router.push(`/${locale}/dashboard`);
            }
        } catch (error) {
            console.error("Submission failed", error);
            setError("Failed to save your progress. Please try again.");
            setCurrentStep(0); // Back to start so they can retry
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto min-h-[600px] flex flex-col justify-center p-4">
            <AnimatePresence mode="wait">
                {currentStep === 0 && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="glass-panel p-10 text-center space-y-8 bg-white/80"
                    >
                        <div className="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
                            <CheckCircle2 className="w-12 h-12 text-blue-600" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-4xl font-extrabold text-slate-800">{t("cta")}</h2>
                            <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-md mx-auto">
                                {t("cta_desc")}
                            </p>
                        </div>

                        {error && (
                            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 flex items-center gap-3 justify-center text-sm font-semibold">
                                <AlertCircle className="w-5 h-5" />
                                {error}
                            </div>
                        )}

                        <button
                            onClick={startQuiz}
                            className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 transition-all flex items-center gap-3 mx-auto scale-105 active:scale-95"
                        >
                            {t("begin")} <ChevronRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}

                {currentStep === 1 && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center space-y-6"
                    >
                        <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto" />
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-slate-800">
                                {diagT("generating")}
                            </h3>
                            <p className="text-slate-500 font-medium">
                                {diagT("subject_label")}: {t(`subjects.${currentSubject.nameKey}`)}
                            </p>
                        </div>
                    </motion.div>
                )}

                {currentStep === 2 && questions[currentQuestionIndex] && (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="glass-panel p-8 space-y-8 bg-white/90 border-slate-200/50"
                    >
                        <div className="flex justify-between items-center border-b border-slate-100 pb-6">
                            <div className="flex items-center gap-4">
                                <span className={cn("p-3 rounded-2xl shadow-sm", currentSubject.bg, currentSubject.color)}>
                                    {currentSubject.icon}
                                </span>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                                        {t(`subjects.${currentSubject.nameKey}`)}
                                    </h4>
                                    <p className="text-xs font-bold text-slate-300">
                                        {diagT("subjects_count", { current: currentSubjectIndex + 1, total: subjects.length })}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-lg font-black text-blue-600 leading-none">
                                    {currentQuestionIndex + 1}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase">
                                    {diagT("of_questions", { total: questions.length })}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-tight">
                                {questions[currentQuestionIndex].question}
                            </h3>

                            <div className="grid gap-4 mt-8">
                                {questions[currentQuestionIndex].options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(idx)}
                                        className="glass-card p-6 text-left group hover:border-blue-400 transition-all active:scale-[0.98] border-slate-200/60 bg-white hover:bg-blue-50/30"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                {String.fromCharCode(65 + idx)}
                                            </span>
                                            <span className="text-lg font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                                                {option}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 flex items-center gap-2 text-slate-400 italic text-sm font-medium">
                            <Lightbulb className="w-4 h-4 text-amber-500" />
                            <span>{questions[currentQuestionIndex].hint}</span>
                        </div>
                    </motion.div>
                )}

                {currentStep === 3 && (
                    <motion.div
                        key="next-subject"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-panel p-12 text-center space-y-8 bg-emerald-50/30 border-emerald-100/50"
                    >
                        <div className="w-24 h-24 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto text-emerald-600">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-slate-800">
                                {diagT("excellent_job")}
                            </h2>
                            <p className="text-slate-600 font-medium text-lg">
                                {diagT("ready_for_next")}: {t(`subjects.${subjects[currentSubjectIndex + 1].nameKey}`)}
                            </p>
                        </div>
                        <button
                            onClick={nextSubject}
                            className="px-12 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-xl shadow-emerald-500/20 transition-all flex items-center gap-3 mx-auto scale-105 active:scale-95"
                        >
                            {diagT("next_subject_btn")} <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                        </button>
                    </motion.div>
                )}

                {currentStep === 4 && (
                    <motion.div
                        key="all-finished"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-panel p-12 text-center space-y-8 bg-blue-50/50 border-blue-100"
                    >
                        <div className="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto text-blue-600 shadow-xl shadow-blue-500/10">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <div className="space-y-3">
                            <h2 className="text-4xl font-black text-slate-800 leading-tight">
                                {diagT("awesome_complete")}
                            </h2>
                            <p className="text-slate-600 font-semibold text-lg max-w-sm mx-auto">
                                {diagT("analyzing_results_desc")}
                            </p>
                        </div>
                        <button
                            onClick={() => submitResults()}
                            disabled={isSubmitting}
                            className={cn(
                                "px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-2xl shadow-blue-500/30 transition-all text-xl",
                                isSubmitting && "opacity-50 cursor-not-allowed grayscale"
                            )}
                        >
                            {isSubmitting
                                ? diagT("analyzing_results_btn")
                                : diagT("view_path_btn")}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
