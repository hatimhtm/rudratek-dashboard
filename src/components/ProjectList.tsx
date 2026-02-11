"use client";

import { useState, useMemo } from "react";
import { Project, ProjectStatus } from "@/types/project";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectDetail } from "@/components/ProjectDetail";
import { Filters } from "@/components/Filters";
import { EmptyState } from "@/components/EmptyState";
import { useDebounce } from "@/hooks/useDebounce";

interface ProjectListProps {
    initialProjects: Project[];
}

export default function ProjectList({ initialProjects }: ProjectListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatuses, setSelectedStatuses] = useState<ProjectStatus[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const debouncedSearch = useDebounce(searchQuery, 300);

    const filteredProjects = useMemo(() => {
        return initialProjects.filter((project) => {
            // Filter by Status
            if (selectedStatuses.length > 0 && !selectedStatuses.includes(project.status)) {
                return false;
            }

            // Filter by Search (Name or Client)
            if (debouncedSearch) {
                const query = debouncedSearch.toLowerCase();
                const matchesName = project.name.toLowerCase().includes(query);
                const matchesClient = project.clientName.toLowerCase().includes(query);
                if (!matchesName && !matchesClient) {
                    return false;
                }
            }

            return true;
        });
    }, [initialProjects, selectedStatuses, debouncedSearch]);

    return (
        <div className="space-y-6">
            <Filters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedStatuses={selectedStatuses}
                onStatusChange={setSelectedStatuses}
            />

            <div className="bg-white dark:bg-neutral-900/50 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 shadow-sm overflow-hidden">

                {/* Table Header (Desktop) */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-neutral-50/50 dark:bg-neutral-800/30 border-b border-neutral-200/60 dark:border-neutral-800 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    <div className="col-span-4">Project Name</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-3">Timeline</div>
                    <div className="col-span-2">Budget</div>
                    <div className="col-span-1"></div>
                </div>

                {/* List Content */}
                <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={setSelectedProject}
                            />
                        ))
                    ) : (
                        <EmptyState
                            title={debouncedSearch || selectedStatuses.length > 0 ? "No works found" : "No projects yet"}
                            description={
                                debouncedSearch || selectedStatuses.length > 0
                                    ? "Try adjusting your search or filters to find what you're looking for."
                                    : "Get started by creating a new project from the dashboard."
                            }
                            actionLabel={debouncedSearch || selectedStatuses.length > 0 ? "Clear Filters" : "New Project"}
                            onAction={() => {
                                setSearchQuery("");
                                setSelectedStatuses([]);
                            }}
                        />
                    )}
                </div>
            </div>

            <ProjectDetail
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </div>
    );
}
