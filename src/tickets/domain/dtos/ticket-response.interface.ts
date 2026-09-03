import { PriorityEnum } from '../../../priority/domain/enums/priority.enum';
import { StatusEnum } from '../../../status/domain/enums/status.enum';

export interface TicketResponse {
  id: string;
  title: string;
  description: string;
  status: StatusEnum;
  priority: PriorityEnum;
  client: string;
  clientId: string;
  createdBy: string;
  assignedTo?: string;
  assignedToId?: string;
  createdAt: Date;
  closedAt?: Date;
}
