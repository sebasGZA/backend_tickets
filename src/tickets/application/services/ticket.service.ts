import { Inject, Injectable } from "@nestjs/common";

import { TICKET_REPOSITORY, type TicketRepositoryPort } from "../../domain/ports/repositories/ticket-repository.port";
import { Ticket } from "../../domain/entities/ticket.entity";
import { CreateTicket } from "../../domain/dtos/create-ticket.interface";
import { QueryTicket } from "../../domain/dtos/query-ticket.interface";
import { ClientService } from "../../../client/application/services/client.service";
import { UserService } from "../../../user/application/services/user.service";
import { PriorityService } from "../../../priority/application/services/priority.service";
import { StatusService } from "../../../status/application/services/status.service";

@Injectable()
export class TicketService {
    constructor(
        @Inject(TICKET_REPOSITORY)
        private readonly ticketRepo: TicketRepositoryPort,
        private readonly clientService: ClientService,
        private readonly priorityService: PriorityService,
        private readonly statusService: StatusService,
        private readonly userService: UserService,
    ) { }

    async create(createDto: CreateTicket): Promise<void> {
        await this.clientService.getById(createDto.clientId)
        await this.priorityService.getById(createDto.priorityId)
        await this.statusService.getById(createDto.statusId)
        await this.userService.getUserById(createDto.createdById)
        if (createDto.assignedToId) {
            await this.userService.getUserById(createDto.assignedToId)
        }
        const ticket = Ticket.create(createDto)
        return this.ticketRepo.save(ticket)
    }

    getAll(queryTicket: QueryTicket) {
        return this.ticketRepo.findAll(queryTicket)
    }

    getById(id: string) {
        return this.ticketRepo.findById(id)
    }
}