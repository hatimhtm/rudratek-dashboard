import { Project } from "@/types/project";
import { X, Building2, Clock, CheckCircle2, Flag, Tag, Users, ListChecks } from "lucide-react";
import { formatDate, formatCurrency } from "@/utils/format";
import { StatusBadge } from "@/components/StatusBadge";
import { PriorityChip } from "@/components/ui/PriorityChip";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Avatar } from "@/components/ui/Avatar";
import { Sparkline } from "@/components/ui/Sparkline";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

interface ProjectDetailProps {
    project: Project | null;
    onClose: () => void;
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (project) {
            setIsVisible(true);
            document.body.style.overflow = "hidden";
        } else {
            setIsVisible(false);
            document.body.style.overflow = "auto";
        }

        const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onEsc);
        return () => window.removeEventListener("keydown", onEsc);
    }, [project, onClose]);

    if (!project && !isVisible) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300",
                    project ? "opacity-100" : "opacity-0 pointer-events-none",
                )}
                onClick={onClose}
            />

            {/* Panel */}
            <div
                className={cn(
                    "fixed inset-y-0 right-0 w-full md:w-[520px] bg-surface shadow-2xl z-[70] transform transition-transform duration-300 ease-out border-l border-[rgb(var(--border))]",
                    project ? "translate-x-0" : "translate-x-full",
                )}
            >
                {project && (
                    <div className="h-full flex flex-col">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-[rgb(var(--border))] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-[11px] text-muted">#{project.id.split("-")[1]}</span>
                                <StatusBadge status={project.status} />
                                <PriorityChip priority={project.priority} />
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-foreground/[0.05] rounded-full transition-colors text-muted"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-default">
                            {/* Title */}
                            <div>
                                <h1 className="font-display text-2xl font-bold text-foreground leading-tight">
                                    {project.name}
                                </h1>
                                <p className="mt-2 text-sm text-muted flex items-center">
                                    <Building2 className="w-4 h-4 mr-2" />
                                    {project.clientName}
                                </p>

                                {project.tags.length > 0 && (
                                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                                        <Tag className="w-3.5 h-3.5 text-muted" />
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-foreground/[0.05] text-muted">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Progress + Budget summary */}
                            <div className="card p-5 space-y-5">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Progress</p>
                                        <p className="font-mono text-sm font-semibold text-foreground tabular-nums">{project.progress}%</p>
                                    </div>
                                    <ProgressBar value={project.progress} size="md" />
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[rgb(var(--border))]">
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted mb-1">Budget</p>
                                        <p className="font-mono text-base text-foreground tabular-nums">{formatCurrency(project.budget)}</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted mb-1">Spent</p>
                                        <p className="font-mono text-base text-foreground tabular-nums">{formatCurrency(project.spent)}</p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-[rgb(var(--border))]">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted mb-2">Revenue trend (12 mo)</p>
                                    <Sparkline values={project.revenueTrend} width={460} height={48} className="w-full" />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted mb-3">Overview</h3>
                                <p className="text-sm text-foreground/85 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            {/* Team */}
                            <div>
                                <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted mb-3 flex items-center">
                                    <Users className="w-3.5 h-3.5 mr-1.5" /> Team ({project.team.length})
                                </h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {project.team.map((m) => (
                                        <li key={m.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-foreground/[0.03] border border-[rgb(var(--border))]">
                                            <Avatar name={m.name} color={m.avatarColor} size="md" />
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-foreground truncate">{m.name}</p>
                                                <p className="text-[11px] text-muted truncate">{m.role}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Milestones */}
                            <div>
                                <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted mb-3 flex items-center">
                                    <Flag className="w-3.5 h-3.5 mr-1.5" /> Milestones
                                </h3>
                                <ol className="relative space-y-3 pl-5 border-l border-[rgb(var(--border))]">
                                    {project.milestones.map((m) => (
                                        <li key={m.id} className="relative">
                                            <span className={cn(
                                                "absolute -left-[26px] top-1 w-3 h-3 rounded-full border-2 border-surface",
                                                m.done ? "bg-success" : "bg-[rgb(var(--border))]",
                                            )} />
                                            <p className={cn("text-sm", m.done ? "text-foreground line-through decoration-[rgb(var(--border))] decoration-1" : "text-foreground")}>
                                                {m.title}
                                            </p>
                                            <p className="text-[11px] font-mono text-muted mt-0.5">{formatDate(m.dueDate)}</p>
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            {/* Tasks */}
                            <div>
                                <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted mb-3 flex items-center">
                                    <ListChecks className="w-3.5 h-3.5 mr-1.5" /> Tasks
                                    <span className="ml-auto font-mono text-[11px] text-muted">
                                        {project.tasks.filter(t => t.done).length}/{project.tasks.length} done
                                    </span>
                                </h3>
                                <ul className="space-y-1.5">
                                    {project.tasks.map((t) => (
                                        <li key={t.id} className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-foreground/[0.03] border border-[rgb(var(--border))]">
                                            <span className={cn(
                                                "w-4 h-4 rounded border flex items-center justify-center shrink-0",
                                                t.done ? "bg-success border-success" : "bg-surface border-[rgb(var(--border))]",
                                            )}>
                                                {t.done && <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />}
                                            </span>
                                            <span className={cn("text-sm", t.done ? "text-muted line-through" : "text-foreground")}>
                                                {t.title}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Timeline */}
                            <div>
                                <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted mb-3 flex items-center">
                                    <Clock className="w-3.5 h-3.5 mr-1.5" /> Timeline
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-[11px] text-muted mb-0.5">Started</p>
                                        <p className="font-mono text-foreground tabular-nums">{formatDate(project.startDate)}</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-muted mb-0.5">Target end</p>
                                        <p className="font-mono text-foreground tabular-nums">{formatDate(project.endDate)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-[rgb(var(--border))] bg-foreground/[0.02] flex items-center gap-2">
                            <button className="flex-1 py-2.5 rounded-lg bg-accent text-accent-fg font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center">
                                <CheckCircle2 className="w-4 h-4 mr-2" /> Mark as complete
                            </button>
                            <button onClick={onClose} className="px-4 py-2.5 rounded-lg bg-surface border border-[rgb(var(--border))] text-foreground font-semibold text-sm hover:bg-foreground/[0.04] transition-colors">
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
