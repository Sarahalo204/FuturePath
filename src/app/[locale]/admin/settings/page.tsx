"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Settings, Cpu, Globe, Activity, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
    const t = useTranslations("Admin.settings");
    const [model, setModel] = useState("gemini-2.0-flash-001");
    const [isSaving, setIsSaving] = useState(false);

    const [apiStatus, setApiStatus] = useState({
        openrouter: "HEALTHY",
        database: "HEALTHY",
        storage: "HEALTHY"
    });

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1500);
    };

    return (
        <div className="space-y-12 max-w-5xl">
            <header>
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">{t("title")}</h1>
                <p className="text-slate-500 font-medium">{t("subtitle")}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* AI Configuration */}
                <div className="glass-panel p-8 bg-white/80 space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                            <Cpu className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">{t("ai_config")}</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t("active_model")}</label>
                            <select
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            >
                                <option value="gemini-2.0-flash-001">Google Gemini 2.0 Flash (Default)</option>
                                <option value="gemini-1.5-pro">Google Gemini 1.5 Pro</option>
                                <option value="gpt-4o">OpenAI GPT-4o</option>
                                <option value="claude-3-sonnet">Claude 3.5 Sonnet</option>
                            </select>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                            <Activity className="w-5 h-5 text-blue-500 mt-0.5" />
                            <p className="text-xs font-medium text-slate-500 leading-relaxed">
                                {t("failover_note")}
                            </p>
                        </div>

                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                        >
                            {isSaving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
                            {isSaving ? t("saving") : t("apply_policies")}
                        </button>
                    </div>
                </div>

                {/* API Status Monitor */}
                <div className="glass-panel p-8 bg-white/80 space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                            <Activity className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">{t("system_integrity")}</h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            { name: "OpenRouter / Gemini API", status: apiStatus.openrouter },
                            { name: "PostgreSQL Database", status: apiStatus.database },
                            { name: "S3 Object Storage", status: apiStatus.storage },
                        ].map((node) => (
                            <div key={node.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <span className="font-bold text-slate-600 text-sm">{node.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">{t("operational")}</span>
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 flex items-center gap-2 text-slate-400 italic text-xs font-medium border-t border-slate-100">
                        <span>{t("last_scan")}: {new Date().toLocaleTimeString()}</span>
                    </div>
                </div>
            </div>

            {/* Language Settings */}
            <div className="glass-panel p-8 bg-slate-900 text-white border-none space-y-8 shadow-2xl shadow-slate-900/10">
                <div className="flex items-center gap-3">
                    <Globe className="w-6 h-6 text-blue-400" />
                    <h2 className="text-2xl font-black tracking-tight">{t("locale_title")}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{t("default_locale")}</p>
                        <p className="text-lg font-bold">English (UK)</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{t("secondary_locale")}</p>
                        <p className="text-lg font-bold">Arabic (MENA)</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{t("rtl_optimization")}</p>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"></div>
                            <p className="text-lg font-bold">{t("active")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
