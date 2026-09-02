import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PriorityRepositoryPort } from "../../../domain/ports/repositories/priority-repository.port";
import { PriorityTypeORMEntity } from "../../persistence/priority-typeorm.entity";
import { Priority } from "../../../domain/entities/priority.entity";

export class PriorityTypeOrmRepository implements PriorityRepositoryPort {
    constructor(
        @InjectRepository(PriorityTypeORMEntity)
        private readonly repo: Repository<PriorityTypeORMEntity>
    ) { }

    async save(priority: Priority): Promise<void> {
        await this.repo.save(priority)
    }

    async findAll(): Promise<Priority[]> {
        const priorities = await this.repo.find({});
        return this.transformResult(priorities);
    }

    private transformResult(prioritiesDB: PriorityTypeORMEntity[]): Priority[] {
        return prioritiesDB.map((r) => new Priority(r.id, r.name, r.createdAt));
    }
}