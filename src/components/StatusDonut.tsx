import { Project, ProjectStatus } from "@/types/project";

interface Props {
    projects: Project[];
}

const ORDER: ProjectStatus[] = ["Active", "On Hold", "Completed"];
const COLOR: Record<ProjectStatus, string> = {
    Active:    "rgb(var(--success))",
    "On Hold": "rgb(var(--warning))",
    Completed: "rgb(var(--muted))",
};

export function StatusDonut({ projects }: Props) {
    const total = projects.length;
    const counts: Record<ProjectStatus, number> = {
        Active: 0, "On Hold": 0, Completed: 0,
    };
    projects.forEach((p) => { counts[p.status] += 1; });

    const r = 56;
    const c = 2 * Math.PI * r;
    let offset = 0;

    return (
        <div className="card p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                        Status breakdown
                    </p>
                    <p className="font-display text-base font-semibold text-foreground mt-0.5">
                        Portfolio mix
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <svg width="140" height="140" viewBox="0 0 140 140" className="shrink-0">
                    <circle cx="70" cy="70" r={r}
                        fill="none"
                        stroke="rgb(var(--border))"
                        strokeWidth="14"
                    />
                    {ORDER.map((status) => {
                        const pct = total === 0 ? 0 : counts[status] / total;
                        const segLen = pct * c;
                        const dasharray = `${segLen} ${c - segLen}`;
                        const dashoffset = -offset;
                        offset += segLen;
                        return (
                            <circle
                                key={status}
                                cx="70" cy="70" r={r}
                                fill="none"
                                stroke={COLOR[status]}
                                strokeWidth="14"
                                strokeDasharray={dasharray}
                                strokeDashoffset={dashoffset}
                                transform="rotate(-90 70 70)"
                                strokeLinecap="butt"
                            />
                        );
                    })}
                    <text x="70" y="68" textAnchor="middle"
                        className="font-display fill-foreground"
                        style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>
                        {total}
                    </text>
                    <text x="70" y="84" textAnchor="middle" className="fill-muted"
                        style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        projects
                    </text>
                </svg>

                <div className="flex-1 space-y-3">
                    {ORDER.map((status) => {
                        const count = counts[status];
                        const pct = total === 0 ? 0 : Math.round((count / total) * 100);
                        return (
                            <div key={status} className="flex items-center justify-between text-sm">
                                <span className="flex items-center text-foreground">
                                    <span className="w-2 h-2 rounded-sm mr-2"
                                        style={{ background: COLOR[status] }} />
                                    {status}
                                </span>
                                <span className="font-mono tabular-nums text-muted">
                                    {count} <span className="text-foreground/40">· {pct}%</span>
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
