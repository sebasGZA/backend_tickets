import { AgentPerformance } from '../../../tickets/domain/dtos/agent-performance.interface';
import { TicketMetric } from '../../../tickets/domain/dtos/ticket-metric.interface';

export interface MetricsOverview {
  ticketMetrics: TicketMetric;
  agentPerformance: AgentPerformance[];
}
