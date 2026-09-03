import { Pagination } from '../../../shared/domain/dtos/pagination.interface';

export interface QueryClient extends Pagination {
  term?: string;
}
