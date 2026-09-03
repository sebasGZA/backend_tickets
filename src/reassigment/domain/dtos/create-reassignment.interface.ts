export interface CreateReassignment {
  ticketId: string;
  lastUserId: string;
  newUserId: string;
  createdById: string;
  createdAt?: Date;
}
