export type ProjectStatus = "Active" | "On Hold" | "Completed";

export interface Project {
    id: string;
    name: string;
    clientName: string;
    status: ProjectStatus;
    startDate: string;
    endDate: string | null;
    budget: number;
    description: string;
}
