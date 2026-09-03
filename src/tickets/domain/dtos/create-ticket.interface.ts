export interface CreateTicket {
  title: string;
  description: string;
  statusId: string;
  priorityId: string;
  clientId: string;
  createdById: string;
  createdAt?: Date;
  assignedToId?: string;
}
