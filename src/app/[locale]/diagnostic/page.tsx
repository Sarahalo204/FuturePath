import DiagnosticQuiz from "@/components/DiagnosticQuiz";
import { getTranslations } from "next-intl/server";
import { Calculator, Atom, Microscope, BookOpen, GraduationCap, ArrowRight, ShieldAlert } from "lucide-react";
import { Link } from "@/navigation";
import { auth } from "@/auth";

const SUBJECTS = [
    { id: "math", icon: <Calculator className="w-8 h-8" />, color: "bg-blue-500", border: "border-blue-100" },
    { id: "physics", icon: <Atom className="w-8 h-8" />, color: "bg-indigo-500", border: "border-indigo-100" },
    { id: "biology", icon: <Microscope className="w-8 h-8" />, color: "bg-emerald-500", border: "border-emerald-100" },
    { id: "chemistry", icon: <BookOpen className="w-8 h-8" />, color: "bg-rose-500", border: "border-rose-100" },
    { id: "english", icon: <GraduationCap className="w-8 h-8" />, color: "bg-amber-500", border: "border-amber-100" },
];

export default async function DiagnosticPage({ params, searchParams }: { params: Promise<{ locale: string }>, searchParams: Promise<{ subject?: string }> }) {
    const { locale } = await params;
    const { subject } = await searchParams;
    const session = await auth();
    const t = await getTranslations("Landing");
    const diagT = await getTranslations("Diagnostic");

    if (session?.user?.role === "ADMIN") {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center px-4">
                <div className="max-w-xl w-full text-center space-y-8 glass-panel p-12 bg-white/80 border-rose-100">
                    <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center mx-auto text-rose-600 border border-rose-100 shadow-xl shadow-rose-500/10">
                        <ShieldAlert className="w-10 h-10" />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-3xl font-black text-slate-800">
                            {diagT("restricted_title")}
                        </h1>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            {diagT("restricted_desc")}
                        </p>
                    </div>
                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black transition-all hover:bg-slate-800 shadow-xl shadow-slate-900/10"
                    >
                        {diagT("restricted_back")}
                    </Link>
                </div>
            </div>
        );
    }

    if (subject) {
        return (
            <div className="min-h-screen pt-12 flex flex-col items-center px-4">
                <div className="max-w-4xl w-full text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">
                        {t(`subjects.${subject}`)} {diagT("title")}
                    </h1>
                </div>
                <DiagnosticQuiz subjectId={subject} locale={locale} />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-black text-blue-600 uppercase tracking-widest">
                        {diagT("stage_1_badge")}
                    </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tight">
                    {diagT("selection_title")}
                </h1>
                <p className="text-slate-500 font-medium text-xl max-w-2xl mx-auto leading-relaxed">
                    {diagT("selection_desc")}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SUBJECTS.map((s) => (
                    <Link
                        key={s.id}
                        href={`/diagnostic?subject=${s.id}`}
                        className="group relative glass-panel p-10 bg-white hover:border-blue-400 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 block"
                    >
                        <div className="space-y-8">
                            <div className={`w-20 h-20 rounded-3xl ${s.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                {s.icon}
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-3xl font-black text-slate-800 tracking-tight">
                                    {t(`subjects.${s.id}`)}
                                </h3>
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    {t(`subjects.${s.id}_desc`, { defaultValue: "" })}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-blue-600 font-black text-sm pt-4 border-t border-slate-50 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                {diagT("start_btn")} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="text-center pt-12 border-t border-slate-100">
                <p className="text-slate-400 font-black text-xs uppercase tracking-widest italic">
                    SmartPath AI • Powered by Advanced Neural Networks
                </p>
            </div>
        </div>
    );
}
