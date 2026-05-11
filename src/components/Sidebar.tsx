"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Settings, BarChart3, LogOut, Moon, Sun } from "lucide-react";
import { cn } from "@/utils/cn";
import { useTheme } from "@/contexts/ThemeContext";

const navItems = [
    { href: "/",           label: "Dashboard", icon: LayoutDashboard },
    { href: "/clients",    label: "Clients",   icon: Users },
    { href: "/analytics",  label: "Analytics", icon: BarChart3 },
    { href: "/settings",   label: "Settings",  icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 border-r border-[rgb(var(--border))] bg-surface h-screen fixed left-0 top-0 z-40 transition-colors">
                <div className="p-5 flex items-center space-x-3 border-b border-[rgb(var(--border))] h-16">
                    <div className="w-8 h-8 rounded-xl accent-gradient flex items-center justify-center font-display font-extrabold text-white text-sm">
                        R
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="font-display text-base font-bold text-foreground tracking-tight">Rudratek</span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted">Ops Console</span>
                    </div>
                </div>

                <nav className="flex-1 p-3 space-y-0.5">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative",
                                    isActive
                                        ? "bg-accent-soft text-accent"
                                        : "text-muted hover:bg-foreground/[0.04] hover:text-foreground",
                                )}
                            >
                                {isActive && (
                                    <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-accent rounded-full" />
                                )}
                                <Icon className="w-4.5 h-4.5" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-3 border-t border-[rgb(var(--border))] space-y-1">
                    <button
                        onClick={toggleTheme}
                        className="flex w-full items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted hover:bg-foreground/[0.04] hover:text-foreground transition-colors"
                    >
                        {theme === "light" ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
                        <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
                    </button>
                    <button className="flex w-full items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-danger hover:bg-danger/10 transition-colors">
                        <LogOut className="w-4.5 h-4.5" />
                        <span>Log out</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-[rgb(var(--border))] z-50 px-4 py-3 flex justify-between items-center pb-safe">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center space-y-1 px-3",
                                isActive ? "text-accent" : "text-muted",
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
                <button onClick={toggleTheme} className="flex flex-col items-center space-y-1 text-muted px-3">
                    {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    <span className="text-[10px] font-medium">Theme</span>
                </button>
            </nav>
        </>
    );
}
