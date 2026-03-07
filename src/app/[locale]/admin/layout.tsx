import { auth } from "@/auth";
import { redirect } from "@/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default async function AdminLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const session = await auth();
    const { locale } = await params;

    // Strict Server-side RBAC
    if (!session || session.user?.role !== "ADMIN") {
        redirect({ href: "/", locale });
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            <AdminSidebar />
            {/* 
              We need a responsive margin that respects RTL (ms- instead of ml-)
              and also respects the sidebar collapsed state. We'll use a wrapper
              with ms-64 / ms-20. We'll handle state from a context later if needed, 
              but for now ms-64 is safe as a default for the expanded sidebar.
            */}
            <main className="flex-1 transition-all duration-300 w-full lg:ms-64 p-4 lg:p-8">
                <div className="max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
