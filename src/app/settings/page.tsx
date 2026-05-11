"use client";

import { User, Bell, Moon, Sun, Globe, Smartphone, Mail } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function SettingsPage() {
    const { theme, toggleTheme } = useTheme();

    return (
        <main className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <header>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
                    Account · Preferences
                </p>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-1">
                    Settings
                </h1>
                <p className="mt-1 text-sm text-muted">
                    Manage your profile, appearance, and notification preferences.
                </p>
            </header>

            <div className="space-y-6">
                {/* Profile */}
                <section className="card overflow-hidden">
                    <div className="px-6 py-4 border-b border-[rgb(var(--border))] flex items-center gap-2">
                        <User className="w-4.5 h-4.5 text-muted" />
                        <h2 className="font-display text-base font-semibold text-foreground">Profile</h2>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full accent-gradient flex items-center justify-center text-xl font-bold text-white">
                                HE
                            </div>
                            <div>
                                <button className="text-sm font-semibold text-foreground hover:text-accent transition-colors">Change avatar</button>
                                <p className="text-xs text-muted">JPG, GIF, or PNG. 1MB max.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Full name</label>
                                <input
                                    type="text"
                                    defaultValue="Hatim El Hassak"
                                    className="w-full px-3 py-2.5 rounded-lg border border-[rgb(var(--border))] bg-surface text-foreground focus:ring-2 focus:ring-accent/40 focus:border-accent/60 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted" />
                                    <input
                                        type="email"
                                        defaultValue="hatim@rudratek.com"
                                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[rgb(var(--border))] bg-surface text-foreground focus:ring-2 focus:ring-accent/40 focus:border-accent/60 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Preferences */}
                <section className="card overflow-hidden">
                    <div className="px-6 py-4 border-b border-[rgb(var(--border))] flex items-center gap-2">
                        <Smartphone className="w-4.5 h-4.5 text-muted" />
                        <h2 className="font-display text-base font-semibold text-foreground">Preferences</h2>
                    </div>
                    <div className="p-6 space-y-5">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="p-2 rounded-lg bg-accent-soft text-accent shrink-0">
                                    {theme === "light" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
                                </div>
                                <div className="min-w-0">
                                    <p className="font-semibold text-foreground">Appearance</p>
                                    <p className="text-sm text-muted">Switch between the light and dark themes.</p>
                                </div>
                            </div>
                            <button
                                onClick={toggleTheme}
                                className="px-4 py-2 text-sm font-semibold rounded-lg border border-[rgb(var(--border))] hover:border-accent hover:text-accent transition-colors shrink-0"
                            >
                                {theme === "light" ? "Use dark" : "Use light"}
                            </button>
                        </div>

                        <div className="pt-5 border-t border-[rgb(var(--border))] flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="p-2 rounded-lg bg-accent-soft text-accent shrink-0">
                                    <Globe className="w-4.5 h-4.5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-semibold text-foreground">Language</p>
                                    <p className="text-sm text-muted">Used across the app and exports.</p>
                                </div>
                            </div>
                            <select className="px-3 py-2 text-sm font-semibold rounded-lg border border-[rgb(var(--border))] bg-surface outline-none focus:ring-2 focus:ring-accent/40 shrink-0">
                                <option>English (US)</option>
                                <option>French (FR)</option>
                                <option>Spanish (ES)</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Notifications */}
                <section className="card overflow-hidden">
                    <div className="px-6 py-4 border-b border-[rgb(var(--border))] flex items-center gap-2">
                        <Bell className="w-4.5 h-4.5 text-muted" />
                        <h2 className="font-display text-base font-semibold text-foreground">Notifications</h2>
                    </div>
                    <div className="p-6 divide-y divide-[rgb(var(--border))]">
                        {[
                            { label: "Project updates", desc: "Status changes, milestone hits, blockers." },
                            { label: "New client added", desc: "When someone in your team adds a new client." },
                            { label: "Weekly reports",   desc: "Every Monday at 9am, in your inbox." },
                        ].map((item, i) => (
                            <div key={item.label} className={`flex items-center justify-between gap-4 ${i === 0 ? "pb-4" : "py-4"} ${i === 2 ? "pb-0" : ""}`}>
                                <div className="min-w-0">
                                    <p className="font-semibold text-foreground">{item.label}</p>
                                    <p className="text-sm text-muted">{item.desc}</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div className="w-11 h-6 bg-[rgb(var(--border))] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent" />
                                </label>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
