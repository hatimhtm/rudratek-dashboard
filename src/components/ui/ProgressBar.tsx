import { cn } from "@/utils/cn";

interface ProgressBarProps {
    value: number; // 0–100
    size?: "sm" | "md";
    tone?: "accent" | "success" | "warning" | "danger" | "neutral";
    className?: string;
    showLabel?: boolean;
}

const TONE_BG: Record<NonNullable<ProgressBarProps["tone"]>, string> = {
    accent:  "bg-accent",
    success: "bg-success",
    warning: "bg-warning",
    danger:  "bg-danger",
    neutral: "bg-foreground/60",
};

export function ProgressBar({ value, size = "sm", tone = "accent", className, showLabel }: ProgressBarProps) {
    const clamped = Math.max(0, Math.min(100, Math.round(value)));
    return (
        <div className={cn("w-full", className)}>
            <div className={cn(
                "w-full overflow-hidden rounded-full bg-[rgb(var(--border))]",
                size === "sm" ? "h-1.5" : "h-2.5",
            )}>
                <div
                    className={cn("h-full rounded-full transition-[width] duration-500 ease-out", TONE_BG[tone])}
                    style={{ width: `${clamped}%` }}
                />
            </div>
            {showLabel && (
                <div className="mt-1 text-[11px] font-mono text-muted tabular-nums">{clamped}%</div>
            )}
        </div>
    );
}
