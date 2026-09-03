import { Injectable } from '@nestjs/common';
import { TicketService } from '../../../tickets/application/services/ticket.service';
import { MetricsOverview } from '../../domain/dtos/metric-overview.interface';

@Injectable()
export class MetricService {
  constructor(private readonly ticketService: TicketService) {}

  async getDashboard(): Promise<MetricsOverview> {
    const ticketMetrics = await this.ticketService.ticketMetrics();
    const agentPerformance = await this.ticketService.agentPerformance();
    return {
      ticketMetrics,
      agentPerformance,
    };
  }
}
