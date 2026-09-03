import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import {
  PRIORITY_REPOSITORY,
  type PriorityRepositoryPort,
} from '../../domain/ports/repositories/priority-repository.port';
import { Priority } from '../../domain/entities/priority.entity';
import { CreatePriority } from '../../domain/dtos/create-priority.interface';
import { PriorityEnum } from '../../domain/enums/priority.enum';

@Injectable()
export class PriorityService {
  private readonly logger: Logger;
  constructor(
    @Inject(PRIORITY_REPOSITORY)
    private readonly priorityRepo: PriorityRepositoryPort,
  ) {
    this.logger = new Logger(PriorityService.name);
  }

  async save({ name }: CreatePriority): Promise<void> {
    try {
      const priority = Priority.create(name);
      await this.priorityRepo.save(priority);
    } catch (error: any) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.mesage);
    }
  }

  getAll(): Promise<Priority[]> {
    return this.priorityRepo.findAll();
  }

  async getById(id: string): Promise<Priority> {
    const priority = await this.priorityRepo.findById(id);
    if (!priority)
      throw new NotFoundException(`Priority with id ${id} not found`);
    return priority;
  }

  async getByName(name: PriorityEnum): Promise<Priority> {
    const priority = await this.priorityRepo.findByName(name);
    if (!priority)
      throw new NotFoundException(`Priority with name ${name} not found`);
    return priority;
  }
}
