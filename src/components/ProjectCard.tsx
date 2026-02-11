import { Project } from "@/types/project";
import { formatDate, formatCurrency } from "@/utils/format";
import { StatusBadge } from "@/components/StatusBadge";
import { ChevronRight, Calendar, DollarSign, Building2 } from "lucide-react";
import { cn } from "@/utils/cn";

interface ProjectCardProps {
    project: Project;
    onClick: (project: Project) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
    return (
        <>
            {/* Desktop Row View */}
            <div
                onClick={() => onClick(project)}
                className="hidden md:grid grid-cols-12 gap-4 items-center p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 cursor-pointer transition-colors group"
            >
                <div className="col-span-4">
                    <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 truncate">
                        {project.name}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center mt-0.5">
                        <Building2 className="w-3 h-3 mr-1" />
                        {project.clientName}
                    </p>
                </div>

                <div className="col-span-2">
                    <StatusBadge status={project.status} />
                </div>

                <div className="col-span-3 text-sm text-neutral-600 dark:text-neutral-400 flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-neutral-400" />
                    <span className="truncate">
                        {formatDate(project.startDate)}
                    </span>
                </div>

                <div className="col-span-2 text-sm text-neutral-600 dark:text-neutral-400 font-medium font-mono">
                    {formatCurrency(project.budget)}
                </div>

                <div className="col-span-1 flex justify-end text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                </div>
            </div>

            {/* Mobile Card View */}
            <div
                onClick={() => onClick(project)}
                className="md:hidden bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 shadow-sm active:scale-[0.98] transition-transform cursor-pointer space-y-3"
            >
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-1">
                            {project.name}
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center">
                            <Building2 className="w-3.5 h-3.5 mr-1.5" />
                            {project.clientName}
                        </p>
                    </div>
                    <StatusBadge status={project.status} />
                </div>

                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-xs text-neutral-400 uppercase tracking-wider font-medium">Start Date</p>
                        <p className="text-sm text-neutral-700 dark:text-neutral-300 flex items-center">
                            <Calendar className="w-3.5 h-3.5 mr-1.5 text-neutral-400" />
                            {formatDate(project.startDate)}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-neutral-400 uppercase tracking-wider font-medium">Budget</p>
                        <p className="text-sm text-neutral-700 dark:text-neutral-300 font-mono flex items-center">
                            <DollarSign className="w-3.5 h-3.5 mr-1.5 text-neutral-400" />
                            {formatCurrency(project.budget)}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
