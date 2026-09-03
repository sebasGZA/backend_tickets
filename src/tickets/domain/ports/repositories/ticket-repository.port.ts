import { FindAllResponseDto } from '../../../../shared/domain/dtos/find-all-response.interface';
import { AgentPerformance } from '../../dtos/agent-performance.interface';
import { QueryTicket } from '../../dtos/query-ticket.interface';
import { TicketMetric } from '../../dtos/ticket-metric.interface';
import { TicketResponse } from '../../dtos/ticket-response.interface';
import { UpdateTicket } from '../../dtos/update-ticket.interface';
import { Ticket } from '../../entities/ticket.entity';

export const TICKET_REPOSITORY = 'TICKET_REPOSITORY';

export interface TicketRepositoryPort {
  save(ticket: Ticket): Promise<void>;
  findAll(
    queryTicket: QueryTicket,
  ): Promise<FindAllResponseDto<TicketResponse>>;
  findById(id: string): Promise<Ticket | null>;
  update(id: string, updateDto: UpdateTicket): Promise<void>;
  findByIdDetail(id: string): Promise<TicketResponse>;
  ticketMetrics(): Promise<TicketMetric>;
  agentPerformance(): Promise<AgentPerformance[]>;
}
