"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { Search, Filter, Calendar, ExternalLink, Loader2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Submission {
    id: string;
    score: number;
    createdAt: string;
    user: { name: string; email: string };
    subject: { nameEn: string; nameAr: string };
}

export default function AnalyticsPage() {
    const t = useTranslations("Admin.analytics");
    const locale = useLocale();

    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [subjects, setSubjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        studentName: "",
        subjectId: "all",
        minScore: "",
        startDate: "",
    });

    useEffect(() => {
        fetchAnalytics();
        fetchSubjects();
    }, []);

    const fetchAnalytics = async () => {
        setLoading(true);
        const params = new URLSearchParams(filters);
        const res = await fetch(`/api/admin/analytics?${params.toString()}`);
        const data = await res.json();
        setSubmissions(data);
        setLoading(false);
    };

    const fetchSubjects = async () => {
        const res = await fetch("/api/admin/subjects");
        const data = await res.json();
        setSubjects(data);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">{t("title")}</h1>
                <p className="text-slate-500 font-medium">{t("subtitle")}</p>
            </header>

            {/* Filters Bar */}
            <div className="glass-panel p-6 bg-white/80 border-slate-200/60 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rtl:left-auto rtl:right-4" />
                    <input
                        name="studentName"
                        value={filters.studentName}
                        onChange={handleFilterChange}
                        placeholder={t("filters.student_name")}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all font-bold text-sm rtl:pl-4 rtl:pr-11"
                    />
                </div>

                <div className="relative">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rtl:left-auto rtl:right-4" />
                    <select
                        name="subjectId"
                        value={filters.subjectId}
                        onChange={handleFilterChange}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all font-bold text-sm appearance-none rtl:pl-4 rtl:pr-11"
                    >
                        <option value="all">{t("filters.all_subjects")}</option>
                        {subjects.map(s => (
                            <option key={s.id} value={s.id}>{locale === "ar" ? s.nameAr : s.nameEn}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none rtl:right-auto rtl:left-4" />
                </div>

                <div className="flex gap-2">
                    <input
                        type="number"
                        name="minScore"
                        value={filters.minScore}
                        onChange={handleFilterChange}
                        placeholder="Min %"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all font-bold text-sm"
                    />
                </div>

                <button
                    onClick={fetchAnalytics}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : t("filters.apply")}
                </button>
            </div>

            {/* Analytics Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left rtl:text-right">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-left rtl:text-right">{t("table.student")}</th>
                            <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-left rtl:text-right">{t("table.subject")}</th>
                            <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">{t("table.score")}</th>
                            <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">{t("table.date")}</th>
                            <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right rtl:text-left">{t("table.details")}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <AnimatePresence mode="popLayout">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-16 text-center">
                                        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
                                    </td>
                                </tr>
                            ) : submissions.map((sub, idx) => (
                                <motion.tr
                                    key={sub.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="hover:bg-slate-50/50 transition-colors group"
                                >
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-700">{sub.user.name}</span>
                                            <span className="text-xs text-slate-400">{sub.user.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-600">
                                        {locale === "ar" ? sub.subject.nameAr : sub.subject.nameEn}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-black ${sub.score >= 80 ? "bg-emerald-100 text-emerald-700" :
                                            sub.score >= 50 ? "bg-amber-100 text-amber-700" :
                                                "bg-rose-100 text-rose-700"
                                            }`}>
                                            {sub.score}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-500 text-center">
                                        {new Date(sub.createdAt).toLocaleDateString(locale)}
                                    </td>
                                    <td className="px-6 py-4 text-right rtl:text-left">
                                        <Link
                                            href={`/admin/analytics/${sub.id}`}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all inline-block"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </Link>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>

                {!loading && submissions.length === 0 && (
                    <div className="p-12 text-center space-y-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                            <Search className="w-6 h-6 text-slate-300" />
                        </div>
                        <p className="text-slate-400 font-bold">{t("no_results")}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
