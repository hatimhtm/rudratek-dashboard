import { LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import { Sparkline } from "@/components/ui/Sparkline";

interface StatsCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    spark?: number[];
}

export function StatsCard({ label, value, icon: Icon, trend, trendUp, spark }: StatsCardProps) {
    return (
        <div className="card p-5 sm:p-6 group hover:shadow-pop transition-shadow">
            <div className="flex items-start justify-between mb-5">
                <div className="p-2.5 bg-accent-soft text-accent rounded-xl">
                    <Icon className="w-4.5 h-4.5" />
                </div>
                {trend && (
                    <span className={cn(
                        "text-[11px] font-semibold px-2 py-0.5 rounded-full tabular-nums",
                        trendUp ? "bg-success/10 text-success" : "bg-danger/10 text-danger",
                    )}>
                        {trendUp ? "▲" : "▼"} {trend}
                    </span>
                )}
            </div>

            <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                    {label}
                </p>
                <p className="font-display text-3xl font-bold text-foreground tabular-nums">
                    {value}
                </p>
            </div>

            {spark && spark.length > 0 && (
                <div className="mt-4 -mx-1">
                    <Sparkline values={spark} width={220} height={36} className="w-full" />
                </div>
            )}
        </div>
    );
}
