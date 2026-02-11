import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Rudratek Project Dashboard",
    description: "Advanced Project Management Dashboard built with Next.js 14",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} antialiased max-w-[100vw] overflow-x-hidden`}>
                <ThemeProvider>
                    <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-950">
                        <Sidebar />
                        <div className="flex-1 md:ml-64 transition-[margin] duration-200 ease-in-out pb-20 md:pb-0">
                            {children}
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
