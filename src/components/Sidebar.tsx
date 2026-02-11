"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Settings, LogOut, Moon, Sun } from "lucide-react";
import { cn } from "@/utils/cn";
import { useTheme } from "@/contexts/ThemeContext";

const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/clients", label: "Clients", icon: Users },
    { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 h-screen fixed left-0 top-0 z-40 transition-colors">
                <div className="p-6 flex items-center space-x-3 border-b border-neutral-100 dark:border-neutral-800 h-16">
                    <div className="bg-neutral-900 dark:bg-white p-1.5 rounded-lg">
                        <LayoutDashboard className="w-5 h-5 text-white dark:text-neutral-900" />
                    </div>
                    <span className="text-lg font-bold text-neutral-900 dark:text-white tracking-tight">Rudratek</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-neutral-100/80 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                                        : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-neutral-200"
                                )}
                            >
                                <Icon className={cn("w-5 h-5", isActive ? "text-neutral-900 dark:text-white" : "text-neutral-400")} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
                    <button
                        onClick={toggleTheme}
                        className="flex w-full items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                    >
                        {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
                    </button>

                    <button className="flex w-full items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span>Log out</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 z-50 px-6 py-3 flex justify-between items-center pb-safe">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center space-y-1",
                                isActive ? "text-neutral-900 dark:text-white" : "text-neutral-400"
                            )}
                        >
                            <Icon className="w-6 h-6" />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
                <button onClick={toggleTheme} className="flex flex-col items-center space-y-1 text-neutral-400">
                    {theme === "light" ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                    <span className="text-[10px] font-medium">Theme</span>
                </button>
            </nav>
        </>
    );
}
