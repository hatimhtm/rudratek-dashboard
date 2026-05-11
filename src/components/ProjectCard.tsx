import { Project } from "@/types/project";
import { formatDate, formatCurrency } from "@/utils/format";
import { StatusBadge } from "@/components/StatusBadge";
import { PriorityChip } from "@/components/ui/PriorityChip";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AvatarStack } from "@/components/ui/Avatar";
import { ChevronRight, Calendar, Building2 } from "lucide-react";

interface ProjectCardProps {
    project: Project;
    onClick: (project: Project) => void;
}

function timeAgo(iso: string) {
    const then = new Date(iso).getTime();
    const now = Date.now();
    const d = Math.floor((now - then) / 86_400_000);
    if (d <= 0) return "today";
    if (d < 7) return `${d}d ago`;
    if (d < 30) return `${Math.floor(d / 7)}w ago`;
    return `${Math.floor(d / 30)}mo ago`;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
    return (
        <>
            {/* Desktop Row */}
            <button
                type="button"
                onClick={() => onClick(project)}
                className="hidden md:grid grid-cols-12 gap-4 items-center w-full px-5 py-4 text-left hover:bg-foreground/[0.025] border-b border-[rgb(var(--border))] cursor-pointer transition-colors group"
            >
                <div className="col-span-4">
                    <div className="flex items-center gap-3">
                        <div className="font-display text-sm font-semibold text-foreground truncate">
                            {project.name}
                        </div>
                        <PriorityChip priority={project.priority} />
                    </div>
                    <p className="text-xs text-muted flex items-center mt-1">
                        <Building2 className="w-3 h-3 mr-1" />
                        {project.clientName}
                    </p>
                </div>

                <div className="col-span-2">
                    <StatusBadge status={project.status} />
                </div>

                <div className="col-span-2">
                    <div className="flex items-center gap-2">
                        <ProgressBar value={project.progress} className="flex-1" />
                        <span className="font-mono text-[11px] text-muted tabular-nums shrink-0 w-9 text-right">
                            {project.progress}%
                        </span>
                    </div>
                    <p className="text-[10.5px] text-muted/80 mt-1 font-mono">
                        upd. {timeAgo(project.lastActivityAt)}
                    </p>
                </div>

                <div className="col-span-2">
                    <AvatarStack members={project.team} max={3} size="sm" />
                </div>

                <div className="col-span-1 text-sm text-foreground/80 font-mono tabular-nums">
                    {formatCurrency(project.budget)}
                </div>

                <div className="col-span-1 flex justify-end text-muted group-hover:text-foreground transition-colors">
                    <ChevronRight className="w-4 h-4" />
                </div>
            </button>

            {/* Mobile Card */}
            <button
                type="button"
                onClick={() => onClick(project)}
                className="md:hidden card p-4 w-full text-left active:scale-[0.99] transition-transform space-y-3"
            >
                <div className="flex justify-between items-start gap-3">
                    <div className="space-y-1 min-w-0">
                        <h3 className="font-display font-semibold text-foreground line-clamp-1">
                            {project.name}
                        </h3>
                        <p className="text-sm text-muted flex items-center">
                            <Building2 className="w-3.5 h-3.5 mr-1.5" />
                            {project.clientName}
                        </p>
                    </div>
                    <StatusBadge status={project.status} />
                </div>

                <div className="pt-3 border-t border-[rgb(var(--border))] space-y-3">
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">Progress</span>
                            <span className="text-[11px] font-mono text-foreground tabular-nums">{project.progress}%</span>
                        </div>
                        <ProgressBar value={project.progress} />
                    </div>
                    <div className="flex items-center justify-between">
                        <AvatarStack members={project.team} max={3} size="sm" />
                        <div className="text-right">
                            <p className="text-[11px] text-muted flex items-center justify-end">
                                <Calendar className="w-3 h-3 mr-1" />
                                {formatDate(project.startDate)}
                            </p>
                            <p className="text-sm font-mono text-foreground tabular-nums">
                                {formatCurrency(project.budget)}
                            </p>
                        </div>
                    </div>
                </div>
            </button>
        </>
    );
}
