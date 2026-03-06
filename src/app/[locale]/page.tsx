import { LayoutDashboard, GraduationCap, Microscope, Calculator, Atom, BookOpen, Sparkles, Trophy, Target, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import SubjectGrid from "@/components/SubjectGrid";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations("Landing");

    const subjects = [
        {
            id: "math",
            name: t("subjects.math"),
            icon: <Calculator className="w-6 h-6 text-blue-600" />,
            color: "bg-blue-50"
        },
        {
            id: "physics",
            name: t("subjects.physics"),
            icon: <Atom className="w-6 h-6 text-indigo-600" />,
            color: "bg-indigo-50"
        },
        {
            id: "biology",
            name: t("subjects.biology"),
            icon: <Microscope className="w-6 h-6 text-emerald-600" />,
            color: "bg-emerald-50"
        },
        {
            id: "chemistry",
            name: t("subjects.chemistry"),
            icon: <Atom className="w-6 h-6 text-amber-600" />,
            color: "bg-amber-50"
        },
        {
            id: "english",
            name: t("subjects.english"),
            icon: <BookOpen className="w-6 h-6 text-rose-600" />,
            color: "bg-rose-50"
        },
    ];

    const stats = [
        { icon: <Target className="w-5 h-5 text-blue-600" />, text: t("stats.precision") },
        { icon: <Sparkles className="w-5 h-5 text-indigo-600" />, text: t("stats.optimized") },
        { icon: <Trophy className="w-5 h-5 text-emerald-600" />, text: t("stats.ranked") },
    ];

    return (
        <main className="min-h-screen pb-24 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 px-6 flex flex-col items-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl aspect-square bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.08),transparent_70%)] -z-10" />

                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100 mb-10">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{t("badge_new")}</span>
                </div>

                <div className="max-w-4xl w-full text-center space-y-10">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-800 leading-[0.9]">
                        {t("title_main")} <br />
                        <span className="text-blue-600">{t("title_ai")}</span>
                    </h1>

                    <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
                        {t("description")}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex items-center gap-2">
                                {stat.icon}
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 space-y-32">
                {/* Subjects Grid Component */}
                <section className="space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-slate-800 tracking-tight">{t("academic_subjects")}</h2>
                            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">{t("select_material")}</p>
                        </div>
                    </div>
                    <SubjectGrid subjects={subjects} />
                </section>

                {/* Features Section */}
                <section className="space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-black text-slate-800 tracking-tight">{t("features.title")}</h2>
                        <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">{t("features.subtitle")}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="glass-panel p-8 space-y-4 hover:border-blue-200 transition-all group">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Target className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">{t("features.roadmap.title")}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">{t("features.roadmap.desc")}</p>
                        </div>
                        <div className="glass-panel p-8 space-y-4 hover:border-indigo-200 transition-all group">
                            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Sparkles className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">{t("features.analytics_feat.title")}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">{t("features.analytics_feat.desc")}</p>
                        </div>
                        <div className="glass-panel p-8 space-y-4 hover:border-emerald-200 transition-all group">
                            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Trophy className="w-6 h-6 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">{t("features.predictor_feat.title")}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">{t("features.predictor_feat.desc")}</p>
                        </div>
                    </div>
                </section>


            </div>
        </main>
    );
}
