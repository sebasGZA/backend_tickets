import { RoleEnum } from "../../..//role/domain/enums/role.enum";

export interface UpdateUser {
    password?: string;
    email?: string;
    name?: string;
    roleId?: string;
    role?: RoleEnum;
    isActive?: boolean;
}