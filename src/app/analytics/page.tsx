"use client";

import projectsData from "@/data/projects.json";
import { Project, Priority } from "@/types/project";
import { formatCurrency } from "@/utils/format";
import { Sparkline } from "@/components/ui/Sparkline";
import { BarChart, VerticalBarChart } from "@/components/ui/BarChart";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DollarSign, Activity, Target, AlertOctagon } from "lucide-react";

const projects: Project[] = projectsData as Project[];

const MONTHS = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];

const PRIORITY_ORDER: Priority[] = ["Critical", "High", "Medium", "Low"];

export default function AnalyticsPage() {
    const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
    const totalSpent = projects.reduce((s, p) => s + p.spent, 0);
    const burnRate = totalBudget === 0 ? 0 : Math.round((totalSpent / totalBudget) * 100);

    const portfolioTrend = Array.from({ length: 12 }, (_, i) =>
        projects.reduce((sum, p) => sum + (p.revenueTrend[i] ?? 0), 0),
    );

    const monthly = MONTHS.map((label, i) => ({ label, value: portfolioTrend[i] }));

    const clientTotals = projects.reduce((acc, p) => {
        acc[p.clientName] = (acc[p.clientName] ?? 0) + p.budget;
        return acc;
    }, {} as Record<string, number>);
    const topClients = Object.entries(clientTotals)
        .map(([label, value]) => ({ label, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 6);

    const priorityCounts: Record<Priority, number> = { Low: 0, Medium: 0, High: 0, Critical: 0 };
    projects.forEach((p) => { priorityCounts[p.priority] += 1; });

    const avgProgress = Math.round(
        projects.reduce((s, p) => s + p.progress, 0) / Math.max(1, projects.length),
    );

    const criticalAtRisk = projects.filter(
        p => p.priority === "Critical" && p.status !== "Completed" && p.progress < 60,
    ).length;

    return (
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in-up">
            <header>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
                    Insights · Live
                </p>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-1">
                    Analytics
                </h1>
                <p className="mt-1 text-sm text-muted">
                    Revenue trend, client concentration, and portfolio risk signals.
                </p>
            </header>

            {/* KPI strip */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <KpiTile
                    icon={DollarSign}
                    label="Total billed"
                    value={formatCurrency(totalBudget)}
                    sub={`${formatCurrency(totalSpent)} spent`}
                />
                <KpiTile
                    icon={Activity}
                    label="Burn rate"
                    value={`${burnRate}%`}
                    sub="across all projects"
                    progress={burnRate}
                />
                <KpiTile
                    icon={Target}
                    label="Average progress"
                    value={`${avgProgress}%`}
                    sub="weighted across portfolio"
                    progress={avgProgress}
                />
                <KpiTile
                    icon={AlertOctagon}
                    label="At-risk projects"
                    value={criticalAtRisk}
                    sub="critical priority < 60% progress"
                    tone={criticalAtRisk > 0 ? "danger" : "muted"}
                />
            </section>

            {/* Trend */}
            <section className="card p-6">
                <div className="flex items-start justify-between mb-5">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                            Portfolio revenue
                        </p>
                        <p className="font-display text-lg font-semibold text-foreground mt-1">
                            Last 12 months
                        </p>
                    </div>
                    <Sparkline values={portfolioTrend} width={220} height={48} />
                </div>
                <VerticalBarChart data={monthly} height={200} formatValue={(v) => `$${v}k`} />
            </section>

            {/* Two-up: top clients + priority */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div className="card p-6">
                    <div className="mb-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                            Top clients by billed value
                        </p>
                        <p className="font-display text-lg font-semibold text-foreground mt-1">
                            Concentration
                        </p>
                    </div>
                    <BarChart data={topClients} formatValue={(v) => formatCurrency(v)} />
                </div>

                <div className="card p-6">
                    <div className="mb-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                            Priority distribution
                        </p>
                        <p className="font-display text-lg font-semibold text-foreground mt-1">
                            Where attention goes
                        </p>
                    </div>
                    <div className="space-y-4">
                        {PRIORITY_ORDER.map((p) => {
                            const count = priorityCounts[p];
                            const pct = projects.length === 0 ? 0 : Math.round((count / projects.length) * 100);
                            const tone =
                                p === "Critical" ? "danger" :
                                p === "High"     ? "warning" :
                                p === "Medium"   ? "accent" :
                                "neutral";
                            return (
                                <div key={p}>
                                    <div className="flex items-center justify-between text-sm mb-1.5">
                                        <span className="text-foreground">{p}</span>
                                        <span className="font-mono text-muted tabular-nums">
                                            {count} <span className="text-foreground/40">· {pct}%</span>
                                        </span>
                                    </div>
                                    <ProgressBar value={pct} tone={tone as "accent" | "warning" | "danger" | "neutral"} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
}

interface KpiTileProps {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string | number;
    sub: string;
    progress?: number;
    tone?: "muted" | "danger";
}

function KpiTile({ icon: Icon, label, value, sub, progress, tone = "muted" }: KpiTileProps) {
    return (
        <div className="card p-5">
            <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 bg-accent-soft text-accent rounded-xl">
                    <Icon className="w-4.5 h-4.5" />
                </div>
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">{label}</p>
            <p className={`font-display text-2xl font-bold tabular-nums mt-1 ${tone === "danger" ? "text-danger" : "text-foreground"}`}>
                {value}
            </p>
            <p className="text-[11px] text-muted mt-1">{sub}</p>
            {progress !== undefined && (
                <div className="mt-3">
                    <ProgressBar value={progress} />
                </div>
            )}
        </div>
    );
}
