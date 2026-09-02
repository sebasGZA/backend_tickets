import { Role } from "../../entities/role.entity";
import { RoleEnum } from "../../enums/role.enum";

export const ROLE_REPOSITORY = 'ROLE_REPOSITORY';

export interface RoleRepositoryPort {
    save(role: Role): Promise<void>;
    findAll(): Promise<Role[]>
    findById(id: string): Promise<Role | null>
    findByName(name: RoleEnum): Promise<Role | null>
}