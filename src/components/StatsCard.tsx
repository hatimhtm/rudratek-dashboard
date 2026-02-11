import { LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

interface StatsCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
}

export function StatsCard({ label, value, icon: Icon, trend, trendUp }: StatsCardProps) {
    return (
        <div className="bg-white dark:bg-neutral-900/50 p-6 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                    <Icon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                </div>
                {trend && (
                    <span className={cn(
                        "text-xs font-medium px-2 py-1 rounded-full",
                        trendUp
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                    )}>
                        {trend}
                    </span>
                )}
            </div>
            <div>
                <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                    {label}
                </h3>
                <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 font-mono tracking-tight">
                    {value}
                </p>
            </div>
        </div>
    );
}
