import { CreateTicket } from "../dtos/create-ticket.interface";

export class Ticket {
    constructor(
        readonly id: string,
        readonly title: string,
        readonly description: string,
        readonly statusId: string,
        readonly priorityId: string,
        readonly clientId: string,
        readonly createdById: string,
        readonly createdAt?: Date,
        readonly assignedToId?: string,
        readonly updatedAt?: Date,
        readonly updatedById?: string,
        readonly closedAt?: Date,
        readonly resolvedAt?: Date,
    ) { }

    static create({
        title,
        description,
        statusId,
        priorityId,
        clientId,
        createdById,
        createdAt,
        assignedToId,
    }: CreateTicket

    ): Ticket {
        const id = crypto.randomUUID();
        return new Ticket(
            id,
            title,
            description,
            statusId,
            priorityId,
            clientId,
            createdById,
            createdAt,
            assignedToId,
        );

    }
}