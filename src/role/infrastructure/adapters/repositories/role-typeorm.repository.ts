import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { RoleRepositoryPort } from "../../../domain/ports/repositories/role-repository.port";
import { RoleTypeORMEntity } from "../../persistence/role-typeorm.entity";
import { Role } from "../../../domain/entities/role.entity";

export class RoleTypeOrmRepository implements RoleRepositoryPort {
    constructor(
        @InjectRepository(RoleTypeORMEntity)
        private readonly repo: Repository<RoleTypeORMEntity>
    ) { }

    async save(role: Role): Promise<void> {
        await this.repo.save(role)
    }

    async findAll(): Promise<Role[]> {
        const roles = await this.repo.find({});
        return this.transformResult(roles);
    }

    private transformResult(rolesDB: RoleTypeORMEntity[]): Role[] {
        return rolesDB.map((r) => new Role(r.id, r.name, r.createdAt));
    }
}