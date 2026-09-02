import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TicketTypeORMEntity } from "./infrastructure/persistence/ticket-typeorm.entity";
import { TicketService } from "./application/services/ticket.service";
import { TICKET_REPOSITORY } from "./domain/ports/repositories/ticket-repository.port";
import { TicketTypeORMRepository } from "./infrastructure/adapters/repositories/ticket-typeorm.repository";
import { TicketController } from "./infrastructure/http/ticket.controller";
import { ClientModule } from "../client/client.module";
import { PriorityModule } from "../priority/priority.module";
import { StatusModule } from "../status/status.module";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TicketTypeORMEntity,
        ]),
        ClientModule,
        PriorityModule,
        StatusModule,
        UserModule,
    ],
    providers: [
        TicketService,
        {
            provide: TICKET_REPOSITORY, useClass: TicketTypeORMRepository,
        }
    ],
    exports: [TicketService],
    controllers: [TicketController],
})
export class TicketModule { }