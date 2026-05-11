import { Priority } from "@/types/project";
import { cn } from "@/utils/cn";

const STYLES: Record<Priority, string> = {
    Low:      "bg-foreground/[0.06] text-muted",
    Medium:   "bg-accent-soft text-accent",
    High:     "bg-warning/15 text-warning",
    Critical: "bg-danger/15 text-danger",
};

export function PriorityChip({ priority }: { priority: Priority }) {
    return (
        <span className={cn(
            "inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-semibold tracking-wide uppercase",
            STYLES[priority],
        )}>
            <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
            {priority}
        </span>
    );
}
