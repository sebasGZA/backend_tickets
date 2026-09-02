import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";

import { type TicketRepositoryPort } from "../../../domain/ports/repositories/ticket-repository.port";
import { TicketTypeORMEntity } from "../../persistence/ticket-typeorm.entity";
import { Ticket } from "../../../domain/entities/ticket.entity";
import { QueryTicket } from "../../../domain/dtos/query-ticket.interface";
import { FindAllResponseDto } from "../../../../shared/domain/dtos/find-all-response.interface";
import { UpdateTicket } from "../../../domain/dtos/update-ticket.interface";

@Injectable()
export class TicketTypeORMRepository implements TicketRepositoryPort {
    constructor(
        @InjectRepository(TicketTypeORMEntity)
        private readonly repo: Repository<TicketTypeORMEntity>
    ) { }

    async save(ticket: Ticket): Promise<void> {
        await this.repo.save(ticket);
    }

    findById(id: string): Promise<Ticket | null> {
        return this.repo.findOne({ where: { id } })
    }

    async findAll(queryTicket: QueryTicket): Promise<FindAllResponseDto<Ticket>> {
        const { limit, page, term, priorityId, statusId, createdById } = queryTicket;

        const queryBuilder = this.repo.createQueryBuilder('ticket')
            .leftJoinAndSelect('ticket.priority', 'priority')
            .leftJoinAndSelect('ticket.status', 'status')

        if (limit && page) queryBuilder.skip((page - 1) * limit).take(limit)

        if (term) {
            queryBuilder
                .where('ticket.title ILIKE :term', { term: `%${term.toLowerCase()}%` })
                .orWhere('ticket.description ILIKE :term', { term: `%${term.toLowerCase()}%` })
        } else {
            queryBuilder.where('1 = 1')
        }

        if (priorityId) queryBuilder.andWhere('ticket.priorityId = :priorityId', { priorityId })
        if (statusId) queryBuilder.andWhere('ticket.statusId = :statusId', { statusId })
        if (createdById) queryBuilder.andWhere('ticket.createdById = :createdById', { createdById })

        const [result, total] = await queryBuilder.getManyAndCount()
        return {
            data: this.transformResult(result),
            total,
            currentPage: page,
            totalPages: limit && Math.ceil(total / limit)
        }
    }

    async update(id: string, updateDto: UpdateTicket): Promise<void> {
        const ticket = await this.repo.preload({ id, ...updateDto })
        if (!ticket) throw new NotFoundException(`Ticket with id ${id} not found`)
        await this.repo.save(ticket)
    }

    private transformResult(ticketsDB: TicketTypeORMEntity[]): Ticket[] {
        return ticketsDB.map((t) => new Ticket(
            t.id,
            t.title,
            t.description,
            t.statusId,
            t.priorityId,
            t.clientId,
            t.createdById,
            t.createdAt,
            t.assignedToId,
            t.updatedAt,
            t.updatedById,
            t.closedAt,
            t.resolvedAt
        ));
    }
}