"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Search, Loader2, User, Mail, Calendar, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Student {
    id: string;
    name: string | null;
    email: string;
    role: string;
    createdAt: string;
    _count: { submissions: number };
}

export default function StudentsPage() {
    const t = useTranslations("Admin.students");
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("/api/admin/students")
            .then(res => res.json())
            .then(data => {
                setStudents(data);
                setLoading(false);
            });
    }, []);

    const filteredStudents = students.filter(s =>
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        (s.name?.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">{t("title")}</h1>
                    <p className="text-slate-500 font-medium">{t("subtitle")}</p>
                </div>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rtl:left-auto rtl:right-4" />
                    <input
                        type="text"
                        placeholder={t("search_placeholder")}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all font-bold text-sm shadow-sm rtl:pl-4 rtl:pr-11"
                    />
                </div>
            </header>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left rtl:text-right">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">{t("col_student")}</th>
                            <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">{t("col_role")}</th>
                            <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">{t("col_assessments")}</th>
                            <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">{t("col_joined")}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <AnimatePresence mode="popLayout">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-8 py-20 text-center">
                                        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
                                    </td>
                                </tr>
                            ) : filteredStudents.map((student, idx) => (
                                <motion.tr
                                    key={student.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.03 }}
                                    className="hover:bg-slate-50/50 transition-colors"
                                >
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xs">
                                                {student.name?.[0] || student.email[0].toUpperCase()}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-800">{student.name || "N/A"}</span>
                                                <span className="text-xs font-medium text-slate-400">{student.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${student.role === "ADMIN" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                                            }`}>
                                            {student.role}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <GraduationCap className="w-4 h-4 text-slate-400" />
                                            <span className="font-bold text-slate-700">{student._count.submissions}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-sm font-bold text-slate-500">
                                        {new Date(student.createdAt).toLocaleDateString()}
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
