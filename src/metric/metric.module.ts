import { Module } from "@nestjs/common";

import { TicketModule } from "../tickets/ticket.module";
import { MetricController } from "./infrastructure/http/metric.controller";
import { MetricService } from "./application/services/metric.service";

@Module({
    imports: [TicketModule],
    providers: [MetricService],
    controllers: [MetricController]
})
export class MetricModule { }