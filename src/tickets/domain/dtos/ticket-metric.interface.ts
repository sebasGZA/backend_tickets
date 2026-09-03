export interface TicketMetric {
  totalTickets: number;
  openTickets: number;
  inProcessTickets: number;
  closedTickets: number;
  overdueTickets: number;
  ticketsByPriority: {
    Baja: number;
    Media: number;
    Alta: number;
    Critica: number;
  };
}
