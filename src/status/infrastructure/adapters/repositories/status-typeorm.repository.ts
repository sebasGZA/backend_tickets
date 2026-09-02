import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { StatusRepositoryPort } from "../../../domain/ports/repositories/status-repository.port";
import { StatusTypeORMEntity } from "../../persistence/status-typeorm.entity";
import { Status } from "../../../domain/entities/status.entity";

@Injectable()
export class StatusTypeOrmRepository implements StatusRepositoryPort {
    constructor(
        @InjectRepository(StatusTypeORMEntity)
        private readonly repo: Repository<StatusTypeORMEntity>
    ) { }

    async save(status: Status): Promise<void> {
        await this.repo.save(status)
    }

    async findAll(): Promise<Status[]> {
        const status = await this.repo.find({});
        return this.transformResult(status);
    }

    private transformResult(statusDB: StatusTypeORMEntity[]): Status[] {
        return statusDB.map((r) => new Status(r.id, r.name, r.createdAt));
    }
}