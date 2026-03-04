"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Users, GraduationCap, BarChart2, TrendingDown, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardStats {
    totalStudents: number;
    totalQuizzes: number;
    subjectStats: { id: string; nameEn: string; nameAr: string; avg: number }[];
    challenging: string;
}

export default function AdminDashboard() {
    const t = useTranslations("Admin");
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/stats")
            .then((res) => res.json())
            .then((data) => {
                setStats(data);
                setLoading(false);
            });
    }, []);

    const statCards = [
        {
            id: "students",
            label: t("stats.total_students"),
            value: stats?.totalStudents || 0,
            icon: <Users className="w-6 h-6 text-blue-600" />,
            color: "blue"
        },
        {
            id: "quizzes",
            label: t("stats.total_quizzes"),
            value: stats?.totalQuizzes || 0,
            icon: <GraduationCap className="w-6 h-6 text-emerald-600" />,
            color: "emerald"
        },
        {
            id: "avg",
            label: t("stats.avg_score"),
            value: `${stats?.subjectStats?.[0]?.avg || 0}%`,
            icon: <BarChart2 className="w-6 h-6 text-amber-600" />,
            color: "amber"
        },
        {
            id: "challenging",
            label: t("stats.challenging_subject"),
            value: stats?.challenging || "N/A",
            icon: <TrendingDown className="w-6 h-6 text-rose-600" />,
            color: "rose"
        },
    ];

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-10">
            <header>
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">{t("nav.dashboard")}</h1>
                <p className="text-slate-500 font-medium">Welcome back, Administrator.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, idx) => (
                    <motion.div
                        key={card.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card p-6 bg-white border border-slate-100 shadow-sm"
                    >
                        <div className={`w-12 h-12 rounded-2xl bg-${card.color}-50 flex items-center justify-center mb-4`}>
                            {card.icon}
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{card.label}</p>
                            <h3 className="text-3xl font-black text-slate-800">{card.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Performance Chart Placeholder */}
                <div className="lg:col-span-2 glass-panel p-8 bg-white/80 border-slate-200/60">
                    <h2 className="text-xl font-extrabold text-slate-800 mb-6">Subject Performance Index</h2>
                    <div className="space-y-6">
                        {stats?.subjectStats.map((s) => (
                            <div key={s.id} className="space-y-2">
                                <div className="flex justify-between text-sm font-bold text-slate-600 uppercase">
                                    <span>{s.nameEn}</span>
                                    <span>{s.avg}%</span>
                                </div>
                                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${s.avg}%` }}
                                        className={`h-full bg-blue-600 rounded-full`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="glass-panel p-8 bg-blue-600 text-white border-none shadow-xl shadow-blue-500/20">
                    <h2 className="text-xl font-extrabold mb-6">Quick Actions</h2>
                    <div className="space-y-3">
                        <button className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold flex items-center gap-3 transition-all">
                            <BookOpen className="w-5 h-5 font-bold" />
                            Manage Subjects
                        </button>
                        <button className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold flex items-center gap-3 transition-all">
                            <Users className="w-5 h-5" />
                            Student Reports
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
