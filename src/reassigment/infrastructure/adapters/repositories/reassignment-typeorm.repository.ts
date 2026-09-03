import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ReassignmentRepositoryPort } from '../../../domain/ports/repositories/reassignment-repository.port';
import { ReassignmentTypeORMEntity } from '../../persistence/reassignment-typeorm.entity';
import { Reassignment } from '../../../domain/entities/reassignment.entity';

@Injectable()
export class ReassignmentTypeORMRepository implements ReassignmentRepositoryPort {
  constructor(
    @InjectRepository(ReassignmentTypeORMEntity)
    private readonly repo: Repository<ReassignmentTypeORMEntity>,
  ) {}

  async save({
    id,
    createdById,
    newUserId,
    ticketId,
    lastUserId,
  }: Reassignment): Promise<void> {
    const reassignToCretate = this.repo.create({
      id,
      createdBy: {
        id: createdById,
      },
      newUserBy: {
        id: newUserId,
      },
      lastUserBy: {
        id: lastUserId,
      },
      ticket: {
        id: ticketId,
      },
    });
    await this.repo.save(reassignToCretate);
  }
}
