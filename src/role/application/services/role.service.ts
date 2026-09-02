import { Inject, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";

import { ROLE_REPOSITORY, type RoleRepositoryPort } from "../../domain/ports/repositories/role-repository.port";
import { Role } from "../../domain/entities/role.entity";
import { CreateRole } from "../../domain/dtos/create-role.interface";

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
}