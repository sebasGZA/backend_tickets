import { RoleEnum } from "../../../role/domain/enums/role.enum";

export interface UserResponse {
    id: string;
    name: string;
    email: string;
    role: RoleEnum;
    isActive: boolean;
    createdAt: Date;
}