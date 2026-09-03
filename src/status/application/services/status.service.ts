import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import {
  STATUS_REPOSITORY,
  type StatusRepositoryPort,
} from '../../domain/ports/repositories/status-repository.port';
import { Status } from '../../domain/entities/status.entity';
import { CreateStatus } from '../../domain/dtos/create-status.interface';
import { StatusEnum } from '../../domain/enums/status.enum';

@Injectable()
export class StatusService {
  private readonly logger: Logger;
  constructor(
    @Inject(STATUS_REPOSITORY)
    private readonly statusRepo: StatusRepositoryPort,
  ) {
    this.logger = new Logger(StatusService.name);
  }

  async save({ name }: CreateStatus): Promise<void> {
    try {
      const status = Status.create(name);
      await this.statusRepo.save(status);
    } catch (error: any) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.mesage);
    }
  }

  async getById(id: string): Promise<Status> {
    const status = await this.statusRepo.findById(id);
    if (!status) throw new NotFoundException(`Status with id ${id} not found`);
    return status;
  }

  async getByName(name: StatusEnum): Promise<Status> {
    const status = await this.statusRepo.findByName(name);
    if (!status)
      throw new NotFoundException(`Status with name ${name} not found`);
    return status;
  }

  getAll(): Promise<Status[]> {
    return this.statusRepo.findAll();
  }
}
