import { PriorityEnum } from '../../../priority/domain/enums/priority.enum';

export interface CreateTicket {
  title: string;
  description: string;
  priority: PriorityEnum;
  clientId: string;
  createdById: string;
  createdAt?: Date;
  assignedToId?: string;
}
