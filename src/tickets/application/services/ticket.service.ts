import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserMe } from './../../../auth/domain/dtos/user-me.interface';
import {
  TICKET_REPOSITORY,
  type TicketRepositoryPort,
} from '../../domain/ports/repositories/ticket-repository.port';
import { Ticket } from '../../domain/entities/ticket.entity';
import { CreateTicket } from '../../domain/dtos/create-ticket.interface';
import { QueryTicket } from '../../domain/dtos/query-ticket.interface';
import { ClientService } from '../../../client/application/services/client.service';
import { UserService } from '../../../user/application/services/user.service';
import { PriorityService } from '../../../priority/application/services/priority.service';
import { StatusService } from '../../../status/application/services/status.service';
import { UpdateTicket } from '../../domain/dtos/update-ticket.interface';
import { RoleEnum } from '../../../role/domain/enums/role.enum';
import { StatusEnum } from '../../../status/domain/enums/status.enum';

@Injectable()
export class TicketService {
  constructor(
    @Inject(TICKET_REPOSITORY)
    private readonly ticketRepo: TicketRepositoryPort,
    private readonly clientService: ClientService,
    private readonly priorityService: PriorityService,
    private readonly statusService: StatusService,
    private readonly userService: UserService,
  ) {}

  async create(createDto: CreateTicket): Promise<void> {
    await this.clientService.getById(createDto.clientId);
    await this.priorityService.getById(createDto.priorityId);
    await this.statusService.getById(createDto.statusId);
    if (createDto.assignedToId) {
      await this.userService.getUserById(createDto.assignedToId);
    }
    const ticket = Ticket.create(createDto);
    return this.ticketRepo.save(ticket);
  }

  getAll(queryTicket: QueryTicket) {
    return this.ticketRepo.findAll(queryTicket);
  }

  async getById(id: string) {
    const ticket = await this.ticketRepo.findById(id);
    if (!ticket) throw new NotFoundException(`Ticket with id ${id} not found`);
    return ticket;
  }

  async updateTicket(
    id: string,
    updateTicketDto: UpdateTicket,
    { userId, role }: UserMe,
  ) {
    const { clientId, priorityId, statusId, assignedToId } = updateTicketDto;

    if (role === RoleEnum.SOPORTE) {
      const ticket = await this.ticketRepo.findById(id);
      if (ticket?.createdById !== userId)
        throw new ForbiddenException('The user cannot update this ticket');
    }
    if (role == RoleEnum.SOPORTE && updateTicketDto.closedAt) {
      throw new ForbiddenException('The user cannot update this ticket');
    }

    if (clientId) await this.clientService.getById(clientId);
    if (priorityId) await this.priorityService.getById(priorityId);
    if (statusId) {
      const status = await this.statusService.getById(statusId);
      if (status.name === StatusEnum.REABIERTO && role === RoleEnum.SOPORTE)
        throw new ForbiddenException('The user cannot update this ticket');
    }
    if (assignedToId) await this.userService.getUserById(assignedToId);
    await this.ticketRepo.update(id, updateTicketDto);
  }
}
