"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Plus, Edit2, Trash2, Check, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Subject {
    id: string;
    nameEn: string;
    nameAr: string;
    descriptionEn?: string;
    descriptionAr?: string;
    isEnabled: boolean;
    _count?: { quizzes: number; submissions: number };
}

export default function SubjectsPage() {
    const t = useTranslations("Admin.subjects");
    const locale = useLocale();
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [formData, setFormData] = useState({ id: "", nameEn: "", nameAr: "", descriptionEn: "", descriptionAr: "", isEnabled: true });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        setLoading(true);
        const res = await fetch("/api/admin/subjects");
        const data = await res.json();
        setSubjects(data);
        setLoading(false);
    };

    const handleSave = async () => {
        setSubmitting(true);
        try {
            const url = isEditing === "new" ? "/api/admin/subjects" : `/api/admin/subjects/${isEditing}`;
            const method = isEditing === "new" ? "POST" : "PUT";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setIsEditing(null);
                setFormData({ id: "", nameEn: "", nameAr: "", descriptionEn: "", descriptionAr: "", isEnabled: true });
                fetchSubjects();
            }
        } catch (error) {
            console.error("Failed to save subject", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm(t("confirm_delete"))) return;

        try {
            const res = await fetch(`/api/admin/subjects/${id}`, { method: "DELETE" });
            if (res.ok) fetchSubjects();
        } catch (error) {
            console.error("Failed to delete subject", error);
        }
    };

    const startEdit = (subject: Subject) => {
        setFormData({
            id: subject.id,
            nameEn: subject.nameEn,
            nameAr: subject.nameAr,
            descriptionEn: subject.descriptionEn || "",
            descriptionAr: subject.descriptionAr || "",
            isEnabled: subject.isEnabled
        });
        setIsEditing(subject.id);
    };

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">{t("title")}</h1>
                    <p className="text-slate-500 font-medium">{t("subtitle")}</p>
                </div>
                <button
                    onClick={() => {
                        setFormData({ id: "", nameEn: "", nameAr: "", descriptionEn: "", descriptionAr: "", isEnabled: true });
                        setIsEditing("new");
                    }}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" /> {t("add_new")}
                </button>
            </header>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">{t("name_en")}</th>
                            <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">{t("name_ar")}</th>
                            <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">{t("status")}</th>
                            <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">{t("stats_col")}</th>
                            <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">{t("actions")}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <AnimatePresence mode="popLayout">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
                                    </td>
                                </tr>
                            ) : subjects.map((subject) => (
                                <motion.tr
                                    key={subject.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="hover:bg-slate-50/50 transition-colors"
                                >
                                    <td className="px-6 py-4 font-bold text-slate-700">{subject.nameEn}</td>
                                    <td className="px-6 py-4 font-bold text-slate-700 text-right font-arabic">{subject.nameAr}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${subject.isEnabled ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
                                            }`}>
                                            {subject.isEnabled ? t("is_enabled") : t("disabled")}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-4 text-xs font-bold text-slate-400">
                                            <span>{subject._count?.quizzes} {t("quizzes_count")}</span>
                                            <span>{subject._count?.submissions} {t("submissions_count")}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => startEdit(subject)}
                                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(subject.id)}
                                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {/* Editor Modal */}
            <AnimatePresence>
                {isEditing && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl space-y-6 overflow-y-auto max-h-[90vh]"
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-black text-slate-800">
                                    {isEditing === "new" ? t("add_new") : t("edit")}
                                </h2>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{t("is_enabled")}</span>
                                    <button
                                        onClick={() => setFormData({ ...formData, isEnabled: !formData.isEnabled })}
                                        className={`w-12 h-6 rounded-full transition-all relative ${formData.isEnabled ? "bg-blue-600" : "bg-slate-200"}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.isEnabled ? "right-1" : "left-1"}`} />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    {isEditing === "new" && (
                                        <div className="space-y-1">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Id (e.g. math)</label>
                                            <input
                                                value={formData.id}
                                                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-bold"
                                            />
                                        </div>
                                    )}
                                    <div className="space-y-1">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t("name_en")}</label>
                                        <input
                                            value={formData.nameEn}
                                            onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-bold"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t("desc_en")}</label>
                                        <textarea
                                            value={formData.descriptionEn}
                                            onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                                            rows={4}
                                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest text-right block">{t("name_ar")}</label>
                                        <input
                                            value={formData.nameAr}
                                            onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-bold text-right font-arabic"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest text-right block">{t("desc_ar")}</label>
                                        <textarea
                                            value={formData.descriptionAr}
                                            onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                                            rows={4}
                                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm text-right font-arabic"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setIsEditing(null)}
                                    className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold transition-all"
                                >
                                    {t("cancel")}
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={submitting}
                                    className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                                >
                                    {submitting && <Loader2 className="w-5 h-5 animate-spin" />}
                                    {t("save")}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
