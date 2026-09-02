import { CreateComment } from "../dtos/create-comment.interface";

export class Comment {
    constructor(
        readonly id: string,
        readonly content: string,
        readonly ticketId: string,
        readonly createdById: string,
        readonly isPublic?: boolean,
        readonly createdAt?: Date,
    ) { }

    static create({ content, ticketId, isPublic, createdById, createdAt }: CreateComment): Comment {
        return new Comment(
            crypto.randomUUID(),
            content,
            ticketId,
            createdById,
            isPublic,
            createdAt
        );
    }
}