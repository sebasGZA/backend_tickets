import { Client } from './../../../client/domain/entities/client.entity';
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
import { Priority } from '../../../priority/domain/entities/priority.entity';
import { Status } from '../../../status/domain/entities/status.entity';

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

  async create(
    { role, userId }: UserMe,
    createDto: CreateTicket,
  ): Promise<void> {
    await this.clientService.getById(createDto.clientId);
    const priority = await this.priorityService.getByName(createDto.priority);
    const status = await this.statusService.getByName(StatusEnum.ABIERTO);

    if (createDto.assignedToId) {
      await this.userService.getUserById(createDto.assignedToId);
    } else {
      if (role == RoleEnum.SOPORTE) createDto.assignedToId = userId;
    }
    const { clientId, createdById, description, title, assignedToId } =
      createDto;
    const ticket = Ticket.create(
      title,
      description,
      status.id,
      priority.id,
      clientId,
      createdById,
      undefined,
      assignedToId,
    );
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

  getByIdDetail(id: string) {
    return this.ticketRepo.findByIdDetail(id);
  }

  async updateTicket(
    id: string,
    updateTicketDto: UpdateTicket,
    { userId, role }: UserMe,
  ) {
    const { clientId, priority, status, assignedToId } = updateTicketDto;
    if (role === RoleEnum.SOPORTE) {
      const ticket = await this.ticketRepo.findById(id);
      if (ticket?.assignedToId !== userId)
        throw new ForbiddenException('The user cannot update this ticket');
    }
    if (role == RoleEnum.SOPORTE && updateTicketDto.closedAt) {
      throw new ForbiddenException('The user cannot update this ticket');
    }
    let priorityDb: Priority | undefined;
    let statusDb: Status | undefined;

    if (clientId) await this.clientService.getById(clientId);

    if (priority) {
      priorityDb = await this.priorityService.getByName(priority);
    }
    if (status) {
      statusDb = await this.statusService.getByName(status);
      if (statusDb.name === StatusEnum.CERRADO && role === RoleEnum.SOPORTE)
        updateTicketDto.closedAt = new Date();
    }
    if (assignedToId) await this.userService.getUserById(assignedToId);
    await this.ticketRepo.update(id, {
      ...updateTicketDto,
      priorityId: priorityDb?.id,
      statusId: statusDb?.id,
    });
  }

  ticketMetrics() {
    return this.ticketRepo.ticketMetrics();
  }

  agentPerformance() {
    return this.ticketRepo.agentPerformance();
  }
}
