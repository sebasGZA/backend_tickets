import { Pagination } from "../../../shared/domain/dtos/pagination.interface";

export interface QueryUser extends Pagination {
    term?: string;
    isActive?: boolean;
    roleId?: string;
}