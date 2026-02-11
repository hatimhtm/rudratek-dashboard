"use client";

import projectsData from "@/data/projects.json";
import { Project } from "@/types/project";
import { formatCurrency } from "@/utils/format";
import { Building2, Briefcase, Calendar } from "lucide-react";

const projects: Project[] = projectsData as Project[];

// Derive clients from projects
const clientsMap = projects.reduce((acc, project) => {
    if (!acc[project.clientName]) {
        acc[project.clientName] = {
            name: project.clientName,
            projects: [],
            totalBudget: 0,
            activeProjects: 0
        };
    }
    acc[project.clientName].projects.push(project);
    acc[project.clientName].totalBudget += project.budget;
    if (project.status === "Active") {
        acc[project.clientName].activeProjects += 1;
    }
    return acc;
}, {} as Record<string, { name: string, projects: Project[], totalBudget: number, activeProjects: number }>);

const clients = Object.values(clientsMap);

export default function ClientsPage() {
    return (
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl tracking-tight">
                    Clients
                </h1>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    Manage your client relationships and portfolios.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map((client) => (
                    <div key={client.name} className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 hover:shadow-lg transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-900 transition-colors">
                                <Building2 className="w-6 h-6 text-neutral-500 dark:text-neutral-400 group-hover:text-current transition-colors" />
                            </div>
                            <span className="bg-neutral-100 dark:bg-neutral-800 text-xs font-medium px-2.5 py-1 rounded-full text-neutral-600 dark:text-neutral-400">
                                {client.projects.length} Projects
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">
                            {client.name}
                        </h3>

                        <div className="space-y-3 mt-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
                                    <Briefcase className="w-4 h-4" /> Active Works
                                </span>
                                <span className="font-medium text-neutral-900 dark:text-white">{client.activeProjects}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" /> Total Value
                                </span>
                                <span className="font-medium text-neutral-900 dark:text-white">{formatCurrency(client.totalBudget)}</span>
                            </div>
                        </div>

                        <button className="mt-4 w-full py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                            View details
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );
}
