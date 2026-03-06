import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/navigation";
import { notFound } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SmartPath AI | Personalized Learning",
    description: "AI-driven EdTech platform for high school students.",
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    const messages = await getMessages();

    return (
        <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className="light">
            <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen relative`}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Providers>
                        <Navbar />
                        <main className="relative pt-16">
                            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-slate-50" />
                            {children}
                        </main>
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
