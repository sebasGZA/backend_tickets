import { RoleEnum } from "../../../role/domain/enums/role.enum";

interface UserResponse {
    userId: string,
    email: string;
    role: RoleEnum
}

export interface LoginResponse {
    user: UserResponse;
    token: string;
}