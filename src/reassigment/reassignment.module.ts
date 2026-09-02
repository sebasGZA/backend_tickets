import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TicketModule } from "../tickets/ticket.module";
import { UserModule } from "../user/user.module";
import { ReassignmentService } from "./application/services/reassignment.service";
import { ReassignmentTypeORMEntity } from "./infrastructure/persistence/reassignment-typeorm.entity";
import { REASSIGNMENT_REPOSITORY } from "./domain/ports/repositories/reassignment-repository.port";
import { ReassignmentTypeORMRepository } from "./infrastructure/adapters/repositories/reassignment-typeorm.repository";
import { ReassignmentController } from "./infrastructure/http/reassignment.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([ReassignmentTypeORMEntity]),
        TicketModule,
        UserModule,
    ],
    providers: [
        ReassignmentService,
        {
            provide: REASSIGNMENT_REPOSITORY, useClass: ReassignmentTypeORMRepository
        }
    ],
    exports: [ReassignmentService],
    controllers: [ReassignmentController]
})
export class ReassignmentModule { }