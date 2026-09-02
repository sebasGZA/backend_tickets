import { RoleEnum } from "src/role/domain/enums/role.enum";

export interface UserMe {
    userId: string;
    email: string;
    role: RoleEnum
}