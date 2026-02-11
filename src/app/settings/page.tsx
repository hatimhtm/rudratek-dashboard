"use client";

import { User, Bell, Shield, Moon, Sun, Globe, Smartphone, Mail } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function SettingsPage() {
    const { theme, toggleTheme } = useTheme();

    return (
        <main className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl tracking-tight">
                    Settings
                </h1>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    Manage your account preferences and application settings.
                </p>
            </div>

            <div className="space-y-6">

                {/* Profile Section */}
                <section className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                    <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
                        <User className="w-5 h-5 text-neutral-500" />
                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Profile</h2>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xl font-bold text-neutral-400">
                                HE
                            </div>
                            <div>
                                <button className="text-sm font-medium text-neutral-900 dark:text-white hover:underline">Change Avatar</button>
                                <p className="text-xs text-neutral-500">JPG, GIF or PNG. 1MB max.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue="Hatim El Hassak"
                                    className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-neutral-400" />
                                    <input
                                        type="email"
                                        defaultValue="hatim@rudratek.com"
                                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Preferences Section */}
                <section className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                    <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-neutral-500" />
                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Preferences</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                                    {theme === 'light' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                </div>
                                <div>
                                    <p className="font-medium text-neutral-900 dark:text-white">Appearance</p>
                                    <p className="text-sm text-neutral-500">Customize how the dashboard looks on your device.</p>
                                </div>
                            </div>
                            <button
                                onClick={toggleTheme}
                                className="px-4 py-2 text-sm font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                            >
                                {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
                            </button>
                        </div>

                        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-neutral-900 dark:text-white">Language</p>
                                    <p className="text-sm text-neutral-500">Select your preferred language.</p>
                                </div>
                            </div>
                            <select className="px-3 py-2 text-sm font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 bg-transparent outline-none">
                                <option>English (US)</option>
                                <option>French (FR)</option>
                                <option>Spanish (ES)</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Notifications */}
                <section className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                    <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-neutral-500" />
                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Notifications</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        {['Project updates', 'New client added', 'Weekly reports'].map((item) => (
                            <div key={item} className="flex items-center justify-between">
                                <span className="text-neutral-700 dark:text-neutral-300 font-medium">{item}</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-neutral-300 dark:peer-focus:ring-neutral-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-neutral-900 dark:peer-checked:bg-white"></div>
                                </label>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </main>
    );
}
