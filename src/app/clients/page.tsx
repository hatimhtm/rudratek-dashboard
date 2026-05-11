"use client";

import projectsData from "@/data/projects.json";
import { Project } from "@/types/project";
import { formatCurrency } from "@/utils/format";
import { Building2, Briefcase, DollarSign, ArrowUpRight } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";

const projects: Project[] = projectsData as Project[];

interface ClientSummary {
    name: string;
    projects: Project[];
    totalBudget: number;
    totalSpent: number;
    activeProjects: number;
    avgProgress: number;
}

const clientsMap = projects.reduce((acc, project) => {
    if (!acc[project.clientName]) {
        acc[project.clientName] = {
            name: project.clientName,
            projects: [],
            totalBudget: 0,
            totalSpent: 0,
            activeProjects: 0,
            avgProgress: 0,
        };
    }
    const c = acc[project.clientName];
    c.projects.push(project);
    c.totalBudget += project.budget;
    c.totalSpent += project.spent;
    if (project.status === "Active") c.activeProjects += 1;
    return acc;
}, {} as Record<string, ClientSummary>);

const clients = Object.values(clientsMap)
    .map((c) => ({
        ...c,
        avgProgress: Math.round(c.projects.reduce((s, p) => s + p.progress, 0) / c.projects.length),
    }))
    .sort((a, b) => b.totalBudget - a.totalBudget);

export default function ClientsPage() {
    return (
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in-up">
            <header>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
                    Portfolio · {clients.length} clients
                </p>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-1">
                    Clients
                </h1>
                <p className="mt-1 text-sm text-muted">
                    Aggregated view across every engagement, sorted by total billed value.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {clients.map((client) => (
                    <article key={client.name} className="card p-6 group hover:shadow-pop transition-all">
                        <div className="flex justify-between items-start mb-5">
                            <div className="w-11 h-11 rounded-xl bg-accent-soft text-accent flex items-center justify-center">
                                <Building2 className="w-5 h-5" />
                            </div>
                            <span className="text-[11px] font-mono text-muted">
                                {client.projects.length} project{client.projects.length === 1 ? "" : "s"}
                            </span>
                        </div>

                        <h3 className="font-display text-lg font-semibold text-foreground leading-snug">
                            {client.name}
                        </h3>

                        <dl className="space-y-3 mt-5 pt-4 border-t border-[rgb(var(--border))]">
                            <div className="flex items-center justify-between text-sm">
                                <dt className="text-muted flex items-center gap-2">
                                    <Briefcase className="w-4 h-4" /> Active
                                </dt>
                                <dd className="font-mono text-foreground tabular-nums">{client.activeProjects}</dd>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <dt className="text-muted flex items-center gap-2">
                                    <DollarSign className="w-4 h-4" /> Total billed
                                </dt>
                                <dd className="font-mono text-foreground tabular-nums">{formatCurrency(client.totalBudget)}</dd>
                            </div>
                            <div>
                                <div className="flex items-center justify-between text-sm mb-1.5">
                                    <span className="text-muted">Avg progress</span>
                                    <span className="font-mono text-foreground tabular-nums">{client.avgProgress}%</span>
                                </div>
                                <ProgressBar value={client.avgProgress} />
                            </div>
                        </dl>

                        <button className="mt-5 w-full py-2 text-sm font-medium text-foreground/80 hover:text-accent border border-[rgb(var(--border))] hover:border-accent rounded-lg transition-colors flex items-center justify-center gap-1.5 group/btn">
                            View portfolio
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </button>
                    </article>
                ))}
            </div>
        </main>
    );
}
