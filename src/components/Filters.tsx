import { Search, Filter, X, ArrowDownUp } from "lucide-react";
import { ProjectStatus } from "@/types/project";
import { cn } from "@/utils/cn";
import { useState, useRef, useEffect } from "react";

type SortKey = "recent" | "progress" | "budget" | "name";

interface FiltersProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedStatuses: ProjectStatus[];
    onStatusChange: (statuses: ProjectStatus[]) => void;
    sortKey: SortKey;
    onSortChange: (k: SortKey) => void;
    resultCount: number;
}

const STATUS_OPTIONS: ProjectStatus[] = ["Active", "On Hold", "Completed"];
const SORT_OPTIONS: { key: SortKey; label: string }[] = [
    { key: "recent",   label: "Recent activity" },
    { key: "progress", label: "Progress (high → low)" },
    { key: "budget",   label: "Budget (high → low)" },
    { key: "name",     label: "Name (A → Z)" },
];

export function Filters({
    searchQuery, onSearchChange,
    selectedStatuses, onStatusChange,
    sortKey, onSortChange,
    resultCount,
}: FiltersProps) {
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const statusRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function onClickOutside(e: MouseEvent) {
            if (statusRef.current && !statusRef.current.contains(e.target as Node)) setIsStatusOpen(false);
            if (sortRef.current && !sortRef.current.contains(e.target as Node)) setIsSortOpen(false);
        }
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, []);

    const toggleStatus = (s: ProjectStatus) => {
        if (selectedStatuses.includes(s)) onStatusChange(selectedStatuses.filter(x => x !== s));
        else onStatusChange([...selectedStatuses, s]);
    };

    const sortLabel = SORT_OPTIONS.find(o => o.key === sortKey)?.label ?? "";

    return (
        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
            {/* Search */}
            <div className="relative flex-1 min-w-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-muted" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search projects, clients, or tags…"
                    className="block w-full pl-10 pr-10 py-2.5 bg-surface border border-[rgb(var(--border))] rounded-xl text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60 transition-shadow"
                />
                {searchQuery && (
                    <button
                        onClick={() => onSearchChange("")}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-foreground"
                        aria-label="Clear search"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Status filter */}
            <div className="relative" ref={statusRef}>
                <button
                    onClick={() => setIsStatusOpen((v) => !v)}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors w-full sm:w-auto justify-between border",
                        isStatusOpen || selectedStatuses.length > 0
                            ? "bg-accent text-accent-fg border-accent"
                            : "bg-surface text-foreground border-[rgb(var(--border))] hover:bg-foreground/[0.03]"
                    )}
                >
                    <span className="flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        Status
                    </span>
                    {selectedStatuses.length > 0 && (
                        <span className="bg-white/25 px-1.5 py-0.5 rounded text-[11px] font-mono">
                            {selectedStatuses.length}
                        </span>
                    )}
                </button>

                {isStatusOpen && (
                    <div className="absolute z-20 mt-2 w-52 bg-surface border border-[rgb(var(--border))] rounded-xl shadow-pop py-1 animate-fade-in right-0 sm:left-0 sm:right-auto">
                        {STATUS_OPTIONS.map((status) => (
                            <label key={status} className="flex items-center px-3 py-2 text-sm text-foreground hover:bg-foreground/[0.04] cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedStatuses.includes(status)}
                                    onChange={() => toggleStatus(status)}
                                    className="h-4 w-4 text-accent border-[rgb(var(--border))] rounded focus:ring-accent/40"
                                />
                                <span className="ml-3">{status}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Sort */}
            <div className="relative" ref={sortRef}>
                <button
                    onClick={() => setIsSortOpen((v) => !v)}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors w-full sm:w-auto justify-between border",
                        isSortOpen
                            ? "bg-accent text-accent-fg border-accent"
                            : "bg-surface text-foreground border-[rgb(var(--border))] hover:bg-foreground/[0.03]",
                    )}
                >
                    <span className="flex items-center">
                        <ArrowDownUp className="h-4 w-4 mr-2" />
                        Sort
                    </span>
                    <span className="hidden md:inline text-[11px] font-mono opacity-70 truncate max-w-[160px]">
                        {sortLabel}
                    </span>
                </button>

                {isSortOpen && (
                    <div className="absolute z-20 mt-2 w-56 bg-surface border border-[rgb(var(--border))] rounded-xl shadow-pop py-1 animate-fade-in right-0 sm:left-0 sm:right-auto">
                        {SORT_OPTIONS.map((o) => (
                            <button
                                key={o.key}
                                onClick={() => { onSortChange(o.key); setIsSortOpen(false); }}
                                className={cn(
                                    "block w-full text-left px-3 py-2 text-sm hover:bg-foreground/[0.04]",
                                    sortKey === o.key ? "text-accent font-semibold" : "text-foreground",
                                )}
                            >
                                {o.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Result count */}
            <div className="hidden sm:flex items-center px-3 text-xs text-muted font-mono whitespace-nowrap">
                {resultCount} result{resultCount === 1 ? "" : "s"}
            </div>
        </div>
    );
}
