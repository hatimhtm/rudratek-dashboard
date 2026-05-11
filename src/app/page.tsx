"use client";

import ProjectList from "@/components/ProjectList";
import projectsData from "@/data/projects.json";
import activityData from "@/data/activity.json";
import { Project, ActivityEntry } from "@/types/project";
import { StatsCard } from "@/components/StatsCard";
import { StatusDonut } from "@/components/StatusDonut";
import { ActivityFeed } from "@/components/ActivityFeed";
import { FolderOpen, Activity, DollarSign, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/utils/format";

const projects: Project[] = projectsData as Project[];
const activity: ActivityEntry[] = activityData as ActivityEntry[];

export default function Home() {
    const totalProjects   = projects.length;
    const activeProjects  = projects.filter((p) => p.status === "Active").length;
    const totalBudget     = projects.reduce((acc, p) => acc + p.budget, 0);
    const totalSpent      = projects.reduce((acc, p) => acc + p.spent, 0);
    const utilisation     = totalBudget === 0 ? 0 : Math.round((totalSpent / totalBudget) * 100);

    // Aggregate the revenueTrend across all projects (point-wise sum) for a portfolio sparkline.
    const portfolioTrend  = Array.from({ length: 12 }, (_, i) =>
        projects.reduce((sum, p) => sum + (p.revenueTrend[i] ?? 0), 0),
    );
    // Active-projects sparkline is a synthetic running count for visual.
    const activeTrend = [2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 6, activeProjects];

    return (
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in-up">
            {/* Header */}
            <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
                        Operations · Live
                    </p>
                    <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-1">
                        Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-muted">
                        Portfolio overview — {totalProjects} engagements, {activeProjects} currently active.
                    </p>
                </div>
                <div className="text-xs font-mono text-muted bg-surface border border-[rgb(var(--border))] px-3 py-2 rounded-lg shadow-card">
                    {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                </div>
            </header>

            {/* Stats Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <StatsCard
                    label="Total Projects"
                    value={totalProjects}
                    icon={FolderOpen}
                    trend="+2 this month"
                    trendUp
                    spark={[5, 6, 7, 7, 8, 8, 9, 10, 10, 11, 11, totalProjects]}
                />
                <StatsCard
                    label="Active Projects"
                    value={activeProjects}
                    icon={Activity}
                    trend="Stable"
                    trendUp
                    spark={activeTrend}
                />
                <StatsCard
                    label="Total Budget"
                    value={formatCurrency(totalBudget)}
                    icon={DollarSign}
                    trend="+12% YoY"
                    trendUp
                    spark={portfolioTrend}
                />
                <StatsCard
                    label="Budget Utilisation"
                    value={`${utilisation}%`}
                    icon={TrendingUp}
                    trend={utilisation > 50 ? "On pace" : "Under"}
                    trendUp={utilisation < 80}
                    spark={portfolioTrend.map((v) => v * 0.6)}
                />
            </section>

            {/* Donut + Activity */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                <div className="lg:col-span-1">
                    <StatusDonut projects={projects} />
                </div>
                <div className="lg:col-span-2">
                    <ActivityFeed items={activity} />
                </div>
            </section>

            {/* Projects */}
            <section className="space-y-4">
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="font-display text-xl font-semibold text-foreground">All projects</h2>
                        <p className="text-sm text-muted mt-0.5">Filter, sort, and drill into engagement details.</p>
                    </div>
                </div>
                <ProjectList initialProjects={projects} />
            </section>
        </main>
    );
}
