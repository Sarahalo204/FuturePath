"use client";

import { Link, usePathname } from "@/navigation";
import {
    LayoutDashboard,
    BookOpen,
    Users,
    BarChart3,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function AdminSidebar() {
    const t = useTranslations("Admin");
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { id: "dashboard", icon: <LayoutDashboard className="w-5 h-5" />, label: t("nav.dashboard"), href: "/admin" },
        { id: "subjects", icon: <BookOpen className="w-5 h-5" />, label: t("nav.subjects"), href: "/admin/subjects" },
        { id: "analytics", icon: <BarChart3 className="w-5 h-5" />, label: t("nav.analytics"), href: "/admin/analytics" },
        { id: "students", icon: <Users className="w-5 h-5" />, label: t("nav.students"), href: "/admin/students" },
        { id: "settings", icon: <Settings className="w-5 h-5" />, label: t("nav.settings"), href: "/admin/settings" },
    ];

    return (
        <aside
            className={`fixed top-0 start-0 h-screen bg-white border-e border-slate-200 transition-all duration-300 z-50 ${isCollapsed ? "w-20" : "w-64"
                }`}
        >
            <div className="flex flex-col h-full">
                {/* Logo Section */}
                <div className="p-6 flex items-center justify-between">
                    {!isCollapsed && (
                        <span className="text-xl font-extrabold text-slate-800 tracking-tight">
                            Admin<span className="text-blue-600">Portal</span>
                        </span>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400"
                    >
                        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    </button>
                </div>

                {/* Navigation Section */}
                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-all group ${isActive
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
                                    }`}
                            >
                                <div className={`${isActive ? "text-white" : "group-hover:text-blue-600"}`}>
                                    {item.icon}
                                </div>
                                {!isCollapsed && <span className="font-bold text-sm tracking-wide">{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Section */}
                <div className="p-4 border-t border-slate-100">
                    <button className="flex items-center gap-3 p-3 rounded-xl text-rose-500 hover:bg-rose-50 transition-all w-full">
                        <LogOut className="w-5 h-5" />
                        {!isCollapsed && <span className="font-bold text-sm">{t("nav.logout")}</span>}
                    </button>
                </div>
            </div>
        </aside>
    );
}
