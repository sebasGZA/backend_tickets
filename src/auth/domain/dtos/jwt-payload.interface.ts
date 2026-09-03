import { RoleEnum } from '../../../role/domain/enums/role.enum';

export interface JwtPayload {
  sub: string;
  email: string;
  role: RoleEnum;
  iat?: number;
  exp?: number;
}
