import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ClientTypeORMEntity } from '../../persistence/client-typeorm.entity';
import { ClientRepositoryPort } from '../../../domain/ports/repositories/client-repository.port';
import { Client } from '../../../domain/entities/client.entity';
import { QueryClient } from '../../../domain/dtos/query-client.interface';
import { FindAllResponseDto } from '../../../../shared/domain/dtos/find-all-response.interface';
import { UpdateClient } from '../../../domain/dtos/update-client.interface';

@Injectable()
export class ClientTypeORMRepository implements ClientRepositoryPort {
  constructor(
    @InjectRepository(ClientTypeORMEntity)
    private readonly repo: Repository<ClientTypeORMEntity>,
  ) {}

  async save(client: Client): Promise<void> {
    await this.repo.save(client);
  }

  async update(id: string, updateDto: UpdateClient): Promise<void> {
    const client = await this.repo.preload({ id, ...updateDto });
    if (!client) throw new NotFoundException(`Client with id ${id} not found`);
    await this.repo.save(client);
  }

  findById(id: string): Promise<Client | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findAll({
    term,
    page,
    limit,
  }: QueryClient): Promise<FindAllResponseDto<Client>> {
    const queryBuilder = this.repo.createQueryBuilder('client');
    if (term) {
      queryBuilder
        .where('client.name ILIKE :term', { term: `%${term.toLowerCase()}%` })
        .orWhere('client.email ILIKE :term', {
          term: `%${term.toLowerCase()}%`,
        });
    }
    if (page && limit) queryBuilder.skip((page - 1) * limit).take(limit);

    const [result, total] = await queryBuilder.getManyAndCount();
    return {
      data: this.transformResult(result),
      total,
      currentPage: page,
      totalPages: limit && Math.ceil(total / limit),
    };
  }

  private transformResult(clientsDB: ClientTypeORMEntity[]): Client[] {
    return clientsDB.map((c) => new Client(c.id, c.name, c.email, c.createdAt));
  }
}
