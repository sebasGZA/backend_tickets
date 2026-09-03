import { PriorityEnum } from '../../../priority/domain/enums/priority.enum';
import { StatusEnum } from '../../../status/domain/enums/status.enum';

export interface UpdateTicket {
  title?: string;
  description?: string;
  status?: StatusEnum;
  statusId?: string;
  priority?: PriorityEnum;
  priorityId?: string;
  clientId?: string;
  assignedToId?: string;
  closedAt?: Date;
  resolvedAt?: Date;
}
