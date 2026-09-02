import { Pagination } from "../../../shared/domain/dtos/pagination.interface";

export interface QueryTicket extends Pagination {
    term?: string;
    statusId?: string;
    priorityId?: string;
    clientId?: string;
    createdById?: string;
}