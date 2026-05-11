import { FolderSearch, Plus } from "lucide-react";

interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center col-span-full">
            <div className="w-14 h-14 bg-accent-soft text-accent rounded-2xl flex items-center justify-center mb-4">
                <FolderSearch className="w-7 h-7" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-1.5">
                {title}
            </h3>
            <p className="text-sm text-muted max-w-sm mb-6">
                {description}
            </p>
            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="inline-flex items-center px-4 py-2 bg-accent text-accent-fg rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    {actionLabel}
                </button>
            )}
        </div>
    );
}
