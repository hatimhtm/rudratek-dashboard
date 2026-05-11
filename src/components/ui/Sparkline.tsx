interface SparklineProps {
    values: number[];
    width?: number;
    height?: number;
    stroke?: string;
    fill?: string;
    className?: string;
}

/** A dependency-free sparkline. Renders an SVG polyline + soft fill. */
export function Sparkline({
    values,
    width = 120,
    height = 36,
    stroke = "rgb(var(--accent))",
    fill = "rgb(var(--accent) / 0.12)",
    className,
}: SparklineProps) {
    if (!values || values.length === 0) {
        return <svg width={width} height={height} className={className} aria-hidden />;
    }

    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const stepX = values.length > 1 ? width / (values.length - 1) : width;

    const pts = values.map((v, i) => {
        const x = i * stepX;
        const y = height - ((v - min) / range) * (height - 4) - 2;
        return [x, y] as const;
    });

    const linePath = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`).join(" ");
    const fillPath = `${linePath} L ${width.toFixed(2)} ${height} L 0 ${height} Z`;

    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className={className}
            role="img"
            aria-label="Trend"
        >
            <path d={fillPath} fill={fill} />
            <path d={linePath} fill="none" stroke={stroke} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r={2.5} fill={stroke} />
        </svg>
    );
}
