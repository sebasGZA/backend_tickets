export interface CreateComment {
  content: string;
  ticketId: string;
  createdById: string;
  isPublic?: boolean;
  createdAt?: Date;
}
