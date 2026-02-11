import { Search, Filter, X } from "lucide-react";
import { ProjectStatus } from "@/types/project";
import { cn } from "@/utils/cn";
import { useState, useRef, useEffect } from "react";

interface FiltersProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedStatuses: ProjectStatus[];
    onStatusChange: (statuses: ProjectStatus[]) => void;
}

const statusOptions: ProjectStatus[] = ["Active", "On Hold", "Completed"];

export function Filters({
    searchQuery,
    onSearchChange,
    selectedStatuses,
    onStatusChange
}: FiltersProps) {
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsStatusOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleStatus = (status: ProjectStatus) => {
        if (selectedStatuses.includes(status)) {
            onStatusChange(selectedStatuses.filter(s => s !== status));
        } else {
            onStatusChange([...selectedStatuses, status]);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-neutral-400" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search projects or clients..."
                    className="block w-full pl-10 pr-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-800 transition-shadow"
                />
                {searchQuery && (
                    <button
                        onClick={() => onSearchChange("")}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Status Filter */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsStatusOpen(!isStatusOpen)}
                    className={cn(
                        "flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors w-full sm:w-auto justify-between",
                        isStatusOpen || selectedStatuses.length > 0
                            ? "bg-neutral-900 text-white border-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:border-neutral-100"
                            : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800 dark:hover:bg-neutral-800"
                    )}
                >
                    <div className="flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        <span>Filter Status</span>
                    </div>
                    {selectedStatuses.length > 0 && (
                        <span className="ml-2 bg-white/20 px-1.5 py-0.5 rounded text-xs">
                            {selectedStatuses.length}
                        </span>
                    )}
                </button>

                {isStatusOpen && (
                    <div className="absolute z-10 mt-2 w-48 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 py-1 animate-fade-in right-0 sm:left-0 sm:right-auto">
                        {statusOptions.map((status) => (
                            <label
                                key={status}
                                className="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedStatuses.includes(status)}
                                    onChange={() => toggleStatus(status)}
                                    className="h-4 w-4 text-neutral-900 focus:ring-neutral-500 border-neutral-300 rounded dark:bg-neutral-800 dark:border-neutral-600"
                                />
                                <span className="ml-3">{status}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
