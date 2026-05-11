import { cn } from "@/utils/cn";
import { TeamMember } from "@/types/project";

interface AvatarProps {
    name: string;
    color?: string;
    size?: "xs" | "sm" | "md" | "lg";
    className?: string;
}

const SIZES: Record<NonNullable<AvatarProps["size"]>, string> = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-7 h-7 text-[11px]",
    md: "w-9 h-9 text-xs",
    lg: "w-11 h-11 text-sm",
};

function initials(name: string) {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({ name, color = "6366F1", size = "md", className }: AvatarProps) {
    return (
        <div
            title={name}
            className={cn(
                "inline-flex items-center justify-center rounded-full font-semibold text-white ring-2 ring-surface select-none shrink-0",
                SIZES[size],
                className,
            )}
            style={{ backgroundColor: `#${color}` }}
        >
            {initials(name)}
        </div>
    );
}

interface AvatarStackProps {
    members: TeamMember[];
    max?: number;
    size?: AvatarProps["size"];
}

export function AvatarStack({ members, max = 4, size = "sm" }: AvatarStackProps) {
    const shown = members.slice(0, max);
    const overflow = members.length - shown.length;
    return (
        <div className="flex -space-x-2">
            {shown.map((m) => (
                <Avatar key={m.id} name={m.name} color={m.avatarColor} size={size} />
            ))}
            {overflow > 0 && (
                <div
                    className={cn(
                        "inline-flex items-center justify-center rounded-full ring-2 ring-surface bg-surface text-foreground/70 font-semibold border border-[rgb(var(--border))]",
                        size === "xs" ? "w-6 h-6 text-[10px]" :
                        size === "sm" ? "w-7 h-7 text-[11px]" :
                        size === "lg" ? "w-11 h-11 text-sm" :
                        "w-9 h-9 text-xs",
                    )}
                >
                    +{overflow}
                </div>
            )}
        </div>
    );
}
