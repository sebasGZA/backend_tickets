import { StatusEnum } from '../../../status/domain/enums/status.enum';
import { Pagination } from '../../../shared/domain/dtos/pagination.interface';
import { PriorityEnum } from '../../../priority/domain/enums/priority.enum';

export interface QueryTicket extends Pagination {
  term?: string;
  status?: StatusEnum;
  priority?: PriorityEnum;
  createdById?: string;
}
