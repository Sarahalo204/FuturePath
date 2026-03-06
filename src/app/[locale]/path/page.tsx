import { redirect, Link } from "@/navigation";
import LearningPath from "@/components/LearningPath";
import BackButton from "@/components/BackButton";

export default async function PathPage({
    params,
    searchParams
}: {
    params: Promise<{ locale: string }>,
    searchParams: Promise<{ subjectId?: string }>
}) {
    const { locale } = await params;
    const { subjectId } = await searchParams;

    return (
        <div className="min-h-screen pt-32 px-6">
            <div className="max-w-4xl mx-auto py-8 flex justify-between items-center">
                <BackButton />
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-6 py-2.5 bg-white/50 backdrop-blur-md border border-slate-200 rounded-2xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-all"
                >
                    Dashboard
                </Link>
            </div>
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                <div className="text-center space-y-4 mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient">
                        Your FuturePath
                    </h1>
                    <p className="text-xl text-slate-400">
                        A dynamic learning journey crafted just for you.
                    </p>
                </div>

                <LearningPath subjectId={subjectId} locale={locale} />
            </div>

            {/* Background Decorative Elements */}
            <div className="fixed top-1/4 -left-20 w-80 h-80 bg-blue-500/10 blur-[120px] -z-10 rounded-full" />
            <div className="fixed bottom-1/4 -right-20 w-80 h-80 bg-indigo-500/10 blur-[120px] -z-10 rounded-full" />
        </div>
    );
}
