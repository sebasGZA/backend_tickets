import { RoleEnum } from "../../../role/domain/enums/role.enum";

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  role: RoleEnum;
  isActive?: boolean;
}
