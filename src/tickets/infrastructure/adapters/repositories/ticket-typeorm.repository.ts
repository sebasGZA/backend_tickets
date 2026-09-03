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
  ) { }

  async save({
    id,
    title,
    description,
    clientId,
    priorityId,
    createdById,
    statusId,
    assignedToId,
  }: Ticket): Promise<void> {
    const ticketDb = this.repo.create({
      id,
      title,
      description,
      client: {
        id: clientId,
      },
      priority: {
        id: priorityId,
      },
      status: {
        id: statusId,
      },
      createdBy: {
        id: createdById,
      },
      assignedTo: {
        id: assignedToId,
      },
    });
    await this.repo.save(ticketDb);
  }

  findById(id: string): Promise<Ticket | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findByIdDetail(id: string): Promise<TicketResponse> {
    const queryBuilder = this.repo.createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.status', 'status')
      .leftJoinAndSelect('ticket.priority', 'priority')
      .leftJoinAndSelect('ticket.assignedTo', 'assignedTo')
      .leftJoinAndSelect('ticket.client', 'client')
      .where('ticket.id = :id', { id })

    const ticket = await queryBuilder.getOne()
    if (!ticket) throw new NotFoundException(`Ticket with id:${id} not found`)
    return {
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      client: ticket.client.name,
      clientId: ticket.clientId,
      status: ticket.status.name,
      priority: ticket.priority.name,
      assignedTo: ticket.assignedTo?.name,
      assignedToId: ticket.assignedToId,
      createdAt: ticket.createdAt,
      resolvedAt: ticket.resolvedAt,
      closedAt: ticket.closedAt,
    }
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
    const ticket = await this.repo.preload({
      id,
      ...updateDto,
      status: {
        id: updateDto.statusId,
      },
      priority: {
        id: updateDto.priorityId,
      },
      client: {
        id: updateDto.clientId,
      },
      assignedTo: {
        id: updateDto.assignedToId,
      },
    });
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
        clientId: client.id,
        assignedTo: assignedTo?.name,
        assignedToId: assignedTo?.id,
        createdAt,
        closedAt,
        resolvedAt,
      }),
    );
  }
}
