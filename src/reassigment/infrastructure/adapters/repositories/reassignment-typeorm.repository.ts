import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ReassignmentRepositoryPort } from '../../../domain/ports/repositories/reassignment-repository.port';
import { ReassignmentTypeORMEntity } from '../../persistence/reassignment-typeorm.entity';
import { CreateReassignment } from '../../../domain/dtos/create-reassignment.interface';

@Injectable()
export class ReassignmentTypeORMRepository implements ReassignmentRepositoryPort {
  constructor(
    @InjectRepository(ReassignmentTypeORMEntity)
    private readonly repo: Repository<ReassignmentTypeORMEntity>,
  ) {}

  async save(createDto: CreateReassignment): Promise<void> {
    await this.repo.save(createDto);
  }
}
