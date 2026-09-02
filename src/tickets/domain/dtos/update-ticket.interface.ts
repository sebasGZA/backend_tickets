export interface UpdateTicket {
    statusId?: string;
    priorityId?: string;
    clientId?: string;
    assignedToId?: string;
    closedAt?: Date;
    resolvedAt?: Date;
}