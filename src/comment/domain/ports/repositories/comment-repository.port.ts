import { CommentResponse } from '../../dtos/comment-response.interface';
import { CreateComment } from '../../dtos/create-comment.interface';

export const COMMENT_REPOSITORY = 'COMMENT_REPOSITORY';

export interface CommentRepositoryPort {
  save(comment: CreateComment): Promise<void>;
  findAllByTicketId(ticketId: string): Promise<CommentResponse[]>;
}
