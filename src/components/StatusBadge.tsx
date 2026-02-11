import { ProjectStatus } from "@/types/project";
import { cn } from "@/utils/cn";

interface StatusBadgeProps {
    status: ProjectStatus;
    className?: string;
}

const statusStyles: Record<ProjectStatus, string> = {
    Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
    "On Hold": "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",
    Completed: "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                statusStyles[status],
                className
            )}
        >
            <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", {
                "bg-emerald-500": status === "Active",
                "bg-amber-500": status === "On Hold",
                "bg-neutral-500": status === "Completed",
            })} />
            {status}
        </span>
    );
}
