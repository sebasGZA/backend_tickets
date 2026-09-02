import { Role } from "../../entities/role.entity";

export const ROLE_REPOSITORY = 'ROLE_REPOSITORY';

export interface RoleRepositoryPort {
    save(role: Role): Promise<void>;
    findAll(): Promise<Role[]>
    findById(id: string): Promise<Role | null>
}