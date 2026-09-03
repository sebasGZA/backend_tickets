import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { type TicketRepositoryPort } from '../../../domain/ports/repositories/ticket-repository.port';
import { TicketTypeORMEntity } from '../../persistence/ticket-typeorm.entity';
import { Ticket } from '../../../domain/entities/ticket.entity';
import { QueryTicket } from '../../../domain/dtos/query-ticket.interface';
import { FindAllResponseDto } from '../../../../shared/domain/dtos/find-all-response.interface';
import { UpdateTicket } from '../../../domain/dtos/update-ticket.interface';
import { TicketResponse } from '../../../domain/dtos/ticket-response.interface';

@Injectable()
export class TicketTypeORMRepository implements TicketRepositoryPort {
  constructor(
    @InjectRepository(TicketTypeORMEntity)
    private readonly repo: Repository<TicketTypeORMEntity>,
  ) {}

  async save(ticket: Ticket): Promise<void> {
    await this.repo.save(ticket);
  }

  findById(id: string): Promise<Ticket | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findAll(
    queryTicket: QueryTicket,
  ): Promise<FindAllResponseDto<TicketResponse>> {
    const { limit, page, term, priority, status, createdById } = queryTicket;

    const queryBuilder = this.repo
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.priority', 'priority')
      .leftJoinAndSelect('ticket.status', 'status')
      .leftJoinAndSelect('ticket.client', 'client')
      .leftJoinAndSelect('ticket.assignedTo', 'assignedTo');

    if (limit && page) queryBuilder.skip((page - 1) * limit).take(limit);

    if (term) {
      queryBuilder
        .where('ticket.title ILIKE :term', { term: `%${term.toLowerCase()}%` })
        .orWhere('ticket.description ILIKE :term', {
          term: `%${term.toLowerCase()}%`,
        })
        .orWhere('client.name ILIKE :term', {
          term: `%${term.toLowerCase()}%`,
        });
    } else {
      queryBuilder.where('1 = 1');
    }

    if (priority)
      queryBuilder.andWhere('priority.name = :priority', { priority });
    if (status) queryBuilder.andWhere('status.name = :status', { status });
    if (createdById)
      queryBuilder.andWhere('ticket.createdById = :createdById', {
        createdById,
      });

    const [result, total] = await queryBuilder.getManyAndCount();
    return {
      data: this.transformResult(result),
      total,
      currentPage: page,
      totalPages: limit && Math.ceil(total / limit),
    };
  }

  async update(id: string, updateDto: UpdateTicket): Promise<void> {
    const ticket = await this.repo.preload({ id, ...updateDto });
    if (!ticket) throw new NotFoundException(`Ticket with id ${id} not found`);
    await this.repo.save(ticket);
  }

  private transformResult(ticketsDB: TicketTypeORMEntity[]): TicketResponse[] {
    return ticketsDB.map(
      ({
        id,
        title,
        description,
        status,
        priority,
        client,
        assignedTo,
        createdAt,
        closedAt,
        resolvedAt,
      }) => ({
        id,
        title,
        description,
        status: status.name,
        priority: priority.name,
        client: client.name,
        assignedTo: assignedTo?.name,
        createdAt,
        closedAt,
        resolvedAt,
      }),
    );
  }
}
