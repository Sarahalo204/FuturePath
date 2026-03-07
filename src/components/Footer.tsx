import { GraduationCap } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";

export default async function Footer() {
    const t = await getTranslations("Footer");

    return (
        <footer className="relative mt-32 border-t border-slate-200/60 bg-slate-900 text-slate-300">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                                <GraduationCap className="text-white w-6 h-6" />
                            </div>
                            <span className="text-xl font-extrabold text-white tracking-tight">
                                Future<span className="text-blue-400">Path</span>
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                            {t("description")}
                        </p>
                    </div>

                    {/* Platform Links */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">
                            {t("platform")}
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/diagnostic" className="text-sm text-slate-400 hover:text-white transition-colors">
                                    {t("diagnostic")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="text-sm text-slate-400 hover:text-white transition-colors">
                                    {t("dashboard")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/predictor" className="text-sm text-slate-400 hover:text-white transition-colors">
                                    {t("predictor")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">
                            {t("resources")}
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <span className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">
                                    {t("about")}
                                </span>
                            </li>
                            <li>
                                <span className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">
                                    {t("features")}
                                </span>
                            </li>
                            <li>
                                <span className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">
                                    {t("contact")}
                                </span>
                            </li>
                            <li>
                                <span className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">
                                    {t("privacy")}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} FuturePath. {t("copyright")}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-slate-600">
                        <span>Powered by</span>
                        <span className="font-bold text-slate-400">AI</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
