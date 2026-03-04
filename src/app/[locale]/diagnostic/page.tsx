import DiagnosticQuiz from "@/components/DiagnosticQuiz";
import { getTranslations } from "next-intl/server";

export default async function DiagnosticPage({ params, searchParams }: { params: Promise<{ locale: string }>, searchParams: Promise<{ subject?: string }> }) {
    const { locale } = await params;
    const { subject } = await searchParams;
    const t = await getTranslations("Landing");

    return (
        <div className="min-h-screen pt-12 flex flex-col items-center px-4">
            <div className="max-w-4xl w-full text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">
                    {t("diagnostic_title")}
                </h1>
                <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
                    {t("diagnostic_desc")}
                </p>
            </div>

            <DiagnosticQuiz subjectId={subject} />

            <div className="mt-auto py-12 text-sm font-bold text-slate-300 uppercase tracking-widest">
                SmartPath AI • {t("cta")}
            </div>
        </div>
    );
}
