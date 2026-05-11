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

type SortKey = "recent" | "progress" | "budget" | "name";

export default function ProjectList({ initialProjects }: ProjectListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatuses, setSelectedStatuses] = useState<ProjectStatus[]>([]);
    const [sortKey, setSortKey] = useState<SortKey>("recent");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const debouncedSearch = useDebounce(searchQuery, 300);

    const filtered = useMemo(() => {
        const out = initialProjects.filter((project) => {
            if (selectedStatuses.length > 0 && !selectedStatuses.includes(project.status)) return false;
            if (debouncedSearch) {
                const q = debouncedSearch.toLowerCase();
                if (!project.name.toLowerCase().includes(q) &&
                    !project.clientName.toLowerCase().includes(q) &&
                    !project.tags.some(t => t.toLowerCase().includes(q))) return false;
            }
            return true;
        });

        const sorted = [...out];
        switch (sortKey) {
            case "recent":
                sorted.sort((a, b) => +new Date(b.lastActivityAt) - +new Date(a.lastActivityAt));
                break;
            case "progress":
                sorted.sort((a, b) => b.progress - a.progress);
                break;
            case "budget":
                sorted.sort((a, b) => b.budget - a.budget);
                break;
            case "name":
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
        return sorted;
    }, [initialProjects, selectedStatuses, debouncedSearch, sortKey]);

    return (
        <div className="space-y-6">
            <Filters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedStatuses={selectedStatuses}
                onStatusChange={setSelectedStatuses}
                sortKey={sortKey}
                onSortChange={setSortKey}
                resultCount={filtered.length}
            />

            <div className="card overflow-hidden">
                {/* Table Header (Desktop) */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-foreground/[0.02] border-b border-[rgb(var(--border))] text-[10.5px] font-semibold text-muted uppercase tracking-[0.08em]">
                    <div className="col-span-4">Project</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Progress</div>
                    <div className="col-span-2">Team</div>
                    <div className="col-span-1">Budget</div>
                    <div className="col-span-1"></div>
                </div>

                {/* List */}
                <div className="md:divide-y md:divide-[rgb(var(--border))] grid gap-3 md:gap-0 p-3 md:p-0">
                    {filtered.length > 0 ? (
                        filtered.map((project) => (
                            <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
                        ))
                    ) : (
                        <EmptyState
                            title={debouncedSearch || selectedStatuses.length > 0 ? "No matches" : "No projects yet"}
                            description={
                                debouncedSearch || selectedStatuses.length > 0
                                    ? "Try adjusting your search or filters to find what you're looking for."
                                    : "Get started by creating a new project from the dashboard."
                            }
                            actionLabel={debouncedSearch || selectedStatuses.length > 0 ? "Clear filters" : "New project"}
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
