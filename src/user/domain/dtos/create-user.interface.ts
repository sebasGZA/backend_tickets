export interface CreateUser {
  name: string;
  email: string;
  password: string;
  roleId: string;
  isActive?: boolean;
}
