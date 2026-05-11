import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const interTight = Inter_Tight({
    subsets: ["latin"],
    variable: "--font-display",
    display: "swap",
    weight: ["500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
    weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
    title: "Rudratek — Project Operations Dashboard",
    description:
        "A premium project-management dashboard. Track budgets, milestones, team workload, and revenue trend across active engagements.",
    openGraph: {
        title: "Rudratek — Project Operations Dashboard",
        description: "Premium project-management dashboard for modern teams.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Rudratek — Project Operations Dashboard",
        description: "Premium project-management dashboard for modern teams.",
    },
    icons: {
        icon: [
            {
                url:
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%236366F1'/%3E%3Cstop offset='1' stop-color='%23A855F7'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='14' fill='url(%23g)'/%3E%3Ctext x='32' y='44' font-family='Inter,sans-serif' font-size='34' font-weight='800' fill='white' text-anchor='middle'%3ER%3C/text%3E%3C/svg%3E",
                type: "image/svg+xml",
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable} font-sans antialiased max-w-[100vw] overflow-x-hidden`}
            >
                <ThemeProvider>
                    <div className="flex min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
                        <Sidebar />
                        <div className="flex-1 md:ml-64 transition-[margin] duration-200 ease-in-out pb-24 md:pb-0 relative">
                            {/* Sticky Top Blur */}
                            <div className="fixed top-0 left-0 md:left-64 right-0 h-10 bg-gradient-to-b from-[rgb(var(--background))]/95 to-transparent backdrop-blur-sm z-30 pointer-events-none" />
                            <div className="pt-10">{children}</div>
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
