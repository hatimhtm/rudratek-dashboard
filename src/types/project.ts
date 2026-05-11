export type ProjectStatus = "Active" | "On Hold" | "Completed";

export type Priority = "Low" | "Medium" | "High" | "Critical";

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    /** Auto-generated avatar URL (initials avatar via UI Avatars). */
    avatarColor?: string;
}

export interface Milestone {
    id: string;
    title: string;
    dueDate: string;
    done: boolean;
}

export interface Task {
    id: string;
    title: string;
    done: boolean;
}

export interface ActivityEntry {
    id: string;
    projectId: string;
    type: "comment" | "milestone" | "status" | "task";
    actor: string;
    summary: string;
    timestamp: string;
}

export interface Project {
    id: string;
    name: string;
    clientName: string;
    status: ProjectStatus;
    priority: Priority;
    startDate: string;
    endDate: string | null;
    budget: number;
    spent: number;
    progress: number;        // 0–100
    description: string;
    team: TeamMember[];
    milestones: Milestone[];
    tasks: Task[];
    tags: string[];
    lastActivityAt: string;
    /** 12 monthly revenue points for sparkline (most recent last). */
    revenueTrend: number[];
}
