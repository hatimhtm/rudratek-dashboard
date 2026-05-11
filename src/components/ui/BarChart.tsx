interface BarChartProps {
    data: { label: string; value: number }[];
    height?: number;
    formatValue?: (n: number) => string;
}

/** Dependency-free horizontal-bar chart for top-N rankings. */
export function BarChart({ data, height = 240, formatValue }: BarChartProps) {
    if (!data || data.length === 0) {
        return <div className="text-sm text-muted">No data.</div>;
    }
    const max = Math.max(...data.map(d => d.value), 1);

    return (
        <div className="space-y-3" style={{ minHeight: height }}>
            {data.map((d) => {
                const pct = Math.round((d.value / max) * 100);
                return (
                    <div key={d.label} className="grid grid-cols-[1fr_auto] items-center gap-3">
                        <div>
                            <div className="flex items-center justify-between text-xs mb-1.5">
                                <span className="text-foreground truncate">{d.label}</span>
                                <span className="font-mono text-muted tabular-nums">
                                    {formatValue ? formatValue(d.value) : d.value}
                                </span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-[rgb(var(--border))] overflow-hidden">
                                <div
                                    className="h-full rounded-full accent-gradient transition-[width] duration-700 ease-out"
                                    style={{ width: `${pct}%` }}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/** Vertical bar chart, for monthly trend display. */
interface VerticalBarChartProps {
    data: { label: string; value: number }[];
    height?: number;
    formatValue?: (n: number) => string;
}

export function VerticalBarChart({ data, height = 200, formatValue }: VerticalBarChartProps) {
    if (!data || data.length === 0) {
        return <div className="text-sm text-muted">No data.</div>;
    }
    const max = Math.max(...data.map(d => d.value), 1);

    return (
        <div className="flex items-end gap-2" style={{ height }}>
            {data.map((d) => {
                const h = Math.max(2, Math.round((d.value / max) * (height - 30)));
                return (
                    <div key={d.label} className="flex-1 flex flex-col items-center gap-1.5 group">
                        <div
                            className="w-full rounded-md bg-accent-soft group-hover:bg-accent/80 transition-colors relative"
                            style={{ height: h }}
                            title={formatValue ? formatValue(d.value) : String(d.value)}
                        >
                            <div className="absolute inset-x-0 -top-5 text-center text-[10px] font-mono text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                                {formatValue ? formatValue(d.value) : d.value}
                            </div>
                        </div>
                        <span className="text-[10px] font-mono text-muted">{d.label}</span>
                    </div>
                );
            })}
        </div>
    );
}
