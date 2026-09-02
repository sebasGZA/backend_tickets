import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";

import { ROLE_REPOSITORY, type RoleRepositoryPort } from "../../domain/ports/repositories/role-repository.port";
import { Role } from "../../domain/entities/role.entity";
import { CreateRole } from "../../domain/dtos/create-role.interface";
import { RoleEnum } from "../../domain/enums/role.enum";

@Injectable()
export class RoleService {
    private readonly logger: Logger;
    constructor(
        @Inject(ROLE_REPOSITORY)
        private readonly roleRepo: RoleRepositoryPort
    ) {
        this.logger = new Logger(RoleService.name)
    }

    async save({ name }: CreateRole): Promise<void> {
        try {
            const role = Role.create(name);
            await this.roleRepo.save(role)
        } catch (error: any) {
            this.logger.error(error)
            throw new InternalServerErrorException(error.mesage)
        }
    }

    getAll(): Promise<Role[]> {
        return this.roleRepo.findAll()
    }

    async getById(id: string): Promise<Role> {
        const role = await this.roleRepo.findById(id)
        if (!role) throw new NotFoundException(`Role with id ${id} not found`)
        return role
    }

    getByName(name: RoleEnum): Promise<Role | null> {
        return this.roleRepo.findByName(name)
    }
}