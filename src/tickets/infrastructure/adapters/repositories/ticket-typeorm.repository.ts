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
import { StatusEnum } from '../../../../status/domain/enums/status.enum';
import { PriorityEnum } from '../../../../priority/domain/enums/priority.enum';
import { TicketMetric } from '../../../domain/dtos/ticket-metric.interface';
import { AgentPerformance } from '../../../domain/dtos/agent-performance.interface';
import { RoleEnum } from '../../../../role/domain/enums/role.enum';

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
    const queryBuilder = this.repo
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.status', 'status')
      .leftJoinAndSelect('ticket.priority', 'priority')
      .leftJoinAndSelect('ticket.assignedTo', 'assignedTo')
      .leftJoinAndSelect('ticket.client', 'client')
      .leftJoinAndSelect('ticket.createdBy', 'createdBy')
      .where('ticket.id = :id', { id });

    const ticket = await queryBuilder.getOne();
    if (!ticket) throw new NotFoundException(`Ticket with id:${id} not found`);
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
      closedAt: ticket.closedAt,
      createdBy: ticket.createdBy.name,
    };
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
      .leftJoinAndSelect('ticket.assignedTo', 'assignedTo')
      .leftJoinAndSelect('ticket.createdBy', 'cretedBy')

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

  async agentPerformance(): Promise<any[]> {
    const queryBuilder = this.repo.createQueryBuilder('ticket')
      .innerJoin('ticket.status', 'status')
      .innerJoin('ticket.priority', 'priority')
      .innerJoin('ticket.assignedTo', 'user')
      .innerJoin('user.role', 'role')
      .where('role.name = :roleName', { roleName: RoleEnum.SOPORTE })
      .select([
        'user.id AS "agentId"',
        'user.name AS "agentName"',
        'COUNT(ticket.id) AS "ticketsAssigned"',
        `SUM(CASE WHEN status.name = 'Cerrado' THEN 1 ELSE 0 END) AS "ticketsResolved"`
      ])
      .groupBy('user.id')
      .addGroupBy('user.name')


    const result = await queryBuilder.getRawMany()
    return result
  }

  async ticketMetrics(): Promise<TicketMetric> {
    const queryBuilder = this.repo.createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.status', 'status')
      .leftJoinAndSelect('ticket.priority', 'priority')

    const [data, total] = await queryBuilder.getManyAndCount()

    return {
      totalTickets: total,
      openTickets: data.filter(d => d.status.name === StatusEnum.ABIERTO).length ?? 0,
      closedTickets: data.filter(d => d.status.name === StatusEnum.CERRADO).length ?? 0,
      inProcessTickets: data.filter(d => d.status.name === StatusEnum.EN_PROCESO).length ?? 0,
      ticketsByPriority: {
        Baja: data.filter(d => d.priority.name === PriorityEnum.BAJA).length ?? 0,
        Media: data.filter(d => d.priority.name === PriorityEnum.MEDIA).length ?? 0,
        Alta: data.filter(d => d.priority.name === PriorityEnum.ALTA).length ?? 0,
        Critica: data.filter(d => d.priority.name === PriorityEnum.CRITICA).length ?? 0
      },
      overdueTickets: data.filter(d => d.updatedAt === null || !d.updatedAt).length ?? 0
    }

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
        createdBy
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
        createdBy: createdBy.name,
        createdAt,
        closedAt,
      }),
    );
  }
}
