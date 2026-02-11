"use client";

import ProjectList from "@/components/ProjectList";
import projectsData from "@/data/projects.json";
import { Project } from "@/types/project";
import { StatsCard } from "@/components/StatsCard";
import { FolderOpen, Activity, DollarSign } from "lucide-react";
import { formatCurrency } from "@/utils/format";

// In a real app, this data might come from getServerSideProps or an API call
const projects: Project[] = projectsData as Project[];

export default function Home() {
    const totalProjects = projects.length;
    const activeProjects = projects.filter((p) => p.status === "Active").length;
    const totalValue = projects.reduce((acc, curr) => acc + curr.budget, 0);

    return (
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">

            {/* Dashboard Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl tracking-tight">
                        Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                        Overview of your projects and performance metrics.
                    </p>
                </div>
                <div className="text-sm font-medium text-neutral-500 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-4 py-2 rounded-lg shadow-sm">
                    Today: {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                <StatsCard
                    label="Total Projects"
                    value={totalProjects}
                    icon={FolderOpen}
                    trend="+2 this month"
                    trendUp={true}
                />
                <StatsCard
                    label="Active Projects"
                    value={activeProjects}
                    icon={Activity}
                    trend="Stable"
                    trendUp={true}
                />
                <StatsCard
                    label="Total Value"
                    value={formatCurrency(totalValue)}
                    icon={DollarSign}
                    trend="+12% vs last year"
                    trendUp={true}
                />
            </div>

            {/* Projects List Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Recent Projects</h2>
                    {/* Add 'View All' link if we had pagination */}
                </div>
                <ProjectList initialProjects={projects} />
            </div>
        </main>
    );
}
