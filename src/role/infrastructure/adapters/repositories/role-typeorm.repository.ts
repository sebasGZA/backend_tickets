import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { RoleRepositoryPort } from "../../../domain/ports/repositories/role-repository.port";
import { RoleTypeORMEntity } from "../../persistence/role-typeorm.entity";
import { Role } from "../../../domain/entities/role.entity";
import { RoleEnum } from "../../../domain/enums/role.enum";

@Injectable()
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

    findById(id: string): Promise<Role | null> {
        return this.repo.findOne({ where: { id } })
    }

    findByName(name: RoleEnum): Promise<Role | null> {
        return this.repo.findOne({ where: { name } })
    }

    private transformResult(rolesDB: RoleTypeORMEntity[]): Role[] {
        return rolesDB.map((r) => new Role(r.id, r.name, r.createdAt));
    }
}