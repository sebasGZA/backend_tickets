export interface CommentResponse {
  id: string;
  content: string;
  ticketId: string;
  createdById: string;
  authorName: string;
  isPublic: boolean;
  createdAt?: Date;
}
