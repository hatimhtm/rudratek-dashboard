import { Project } from "@/types/project";
import { X, Calendar, DollarSign, Building2, Clock, CheckCircle2, AlertCircle, Users } from "lucide-react";
import { formatDate, formatCurrency } from "@/utils/format";
import { StatusBadge } from "@/components/StatusBadge";
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
            document.body.style.overflow = "hidden"; // Prevent background scrolling
        } else {
            setIsVisible(false);
            document.body.style.overflow = "auto";
        }

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [project, onClose]);

    if (!project && !isVisible) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300",
                    project ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Side Panel */}
            <div
                className={cn(
                    "fixed inset-y-0 right-0 w-full md:w-[480px] bg-white dark:bg-neutral-900 shadow-2xl z-50 transform transition-transform duration-300 ease-out border-l border-neutral-100 dark:border-neutral-800",
                    project ? "translate-x-0" : "translate-x-full"
                )}
            >
                {project && (
                    <div className="h-full flex flex-col">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Project Details</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors text-neutral-500"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">

                            {/* Title Section */}
                            <div>
                                <div className="flex items-start justify-between mb-2">
                                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 leading-tight">
                                        {project.name}
                                    </h1>
                                </div>
                                <div className="flex items-center text-neutral-500 dark:text-neutral-400 mb-4">
                                    <Building2 className="w-4 h-4 mr-2" />
                                    <span className="font-medium">{project.clientName}</span>
                                </div>
                                <StatusBadge status={project.status} className="px-3 py-1 text-sm" />
                            </div>

                            {/* Grid Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-100 dark:border-neutral-800">
                                    <p className="text-xs text-neutral-400 uppercase tracking-wider font-semibold mb-1">Total Budget</p>
                                    <div className="flex items-center text-neutral-900 dark:text-neutral-100 font-mono text-lg font-medium">
                                        <DollarSign className="w-4 h-4 mr-1 text-neutral-400" />
                                        {formatCurrency(project.budget).replace('$', '')}
                                    </div>
                                </div>
                                <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-100 dark:border-neutral-800">
                                    <p className="text-xs text-neutral-400 uppercase tracking-wider font-semibold mb-1">Reference ID</p>
                                    <p className="text-neutral-900 dark:text-neutral-100 font-mono text-lg font-medium">
                                        #{project.id.split('-')[1]}
                                    </p>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div>
                                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center">
                                    <Clock className="w-4 h-4 mr-2" />
                                    Timeline
                                </h3>
                                <div className="space-y-4 relative pl-4 border-l-2 border-neutral-100 dark:border-neutral-800">
                                    <div className="relative">
                                        <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-neutral-900" />
                                        <p className="text-xs text-neutral-400 mb-0.5">Start Date</p>
                                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-200">{formatDate(project.startDate)}</p>
                                    </div>
                                    <div className="relative">
                                        <div className={cn(
                                            "absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white dark:border-neutral-900",
                                            project.endDate ? "bg-neutral-400" : "bg-neutral-200 dark:bg-neutral-700"
                                        )} />
                                        <p className="text-xs text-neutral-400 mb-0.5">End Date</p>
                                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-200">{formatDate(project.endDate)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center">
                                    <AlertCircle className="w-4 h-4 mr-2" />
                                    Description
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed bg-neutral-50 dark:bg-neutral-800/30 p-4 rounded-xl">
                                    {project.description}
                                </p>
                            </div>

                            {/* Team Members */}
                            <div>
                                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center">
                                    <Users className="w-4 h-4 mr-2" />
                                    Team
                                </h3>
                                <div className="flex items-center -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900 bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-[10px] font-medium text-neutral-600 dark:text-neutral-300">
                                            U{i}
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-medium text-neutral-400">
                                        +2
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                            <button className="w-full py-2.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center">
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Mark as Complete
                            </button>
                        </div>

                    </div>
                )}
            </div >
        </>
    );
}
