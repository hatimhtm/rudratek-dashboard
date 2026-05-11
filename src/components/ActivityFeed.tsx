import { ActivityEntry } from "@/types/project";
import { CheckCircle2, MessageCircle, Flag, GitBranch } from "lucide-react";
import { cn } from "@/utils/cn";

interface Props {
    items: ActivityEntry[];
}

const ICON: Record<ActivityEntry["type"], { Icon: React.ComponentType<{ className?: string }>; tone: string }> = {
    milestone: { Icon: Flag,           tone: "text-accent  bg-accent-soft" },
    task:      { Icon: CheckCircle2,   tone: "text-success bg-success/10" },
    comment:   { Icon: MessageCircle,  tone: "text-muted   bg-foreground/[0.06]" },
    status:    { Icon: GitBranch,      tone: "text-warning bg-warning/10" },
};

function timeAgo(iso: string) {
    const then = new Date(iso).getTime();
    const now = Date.now();
    const s = Math.floor((now - then) / 1000);
    if (s < 60) return "just now";
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    if (d < 30) return `${d}d ago`;
    const mo = Math.floor(d / 30);
    return `${mo}mo ago`;
}

export function ActivityFeed({ items }: Props) {
    return (
        <div className="card p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                        Recent activity
                    </p>
                    <p className="font-display text-base font-semibold text-foreground mt-0.5">
                        Last 10 events
                    </p>
                </div>
                <span className="text-[11px] font-mono text-muted">{items.length}</span>
            </div>

            <ol className="space-y-4">
                {items.slice(0, 10).map((it) => {
                    const { Icon, tone } = ICON[it.type];
                    return (
                        <li key={it.id} className="flex items-start gap-3">
                            <div className={cn("p-1.5 rounded-lg shrink-0", tone)}>
                                <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-foreground leading-snug">
                                    <span className="font-semibold">{it.actor}</span>{" "}
                                    <span className="text-muted">{it.summary}</span>
                                </p>
                                <p className="text-[11px] text-muted/80 font-mono mt-0.5">
                                    {timeAgo(it.timestamp)}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
