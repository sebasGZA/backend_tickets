import { CreateComment } from "../../dtos/create-comment.interface";
import { Comment } from "../../entities/comment.entity";

export const COMMENT_REPOSITORY = 'COMMENT_REPOSITORY';

export interface CommentRepositoryPort {
    save(comment: CreateComment): Promise<void>;
    findAllByTicketId(ticketId: string): Promise<Comment[]>;
}