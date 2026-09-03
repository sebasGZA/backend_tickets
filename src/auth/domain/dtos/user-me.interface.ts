import { RoleEnum } from '../../../role/domain/enums/role.enum';

export interface UserMe {
  userId: string;
  email: string;
  role: RoleEnum;
}
