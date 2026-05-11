import { ProjectStatus } from "@/types/project";
import { cn } from "@/utils/cn";

interface StatusBadgeProps {
    status: ProjectStatus;
    className?: string;
}

const styles: Record<ProjectStatus, { wrap: string; dot: string }> = {
    Active:      { wrap: "bg-success/10 text-success",            dot: "bg-success animate-pulse-soft" },
    "On Hold":   { wrap: "bg-warning/10 text-warning",            dot: "bg-warning" },
    Completed:   { wrap: "bg-foreground/[0.06] text-muted",       dot: "bg-muted" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const s = styles[status];
    return (
        <span
            className={cn(
                "inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide",
                s.wrap,
                className,
            )}
        >
            <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", s.dot)} />
            {status}
        </span>
    );
}
