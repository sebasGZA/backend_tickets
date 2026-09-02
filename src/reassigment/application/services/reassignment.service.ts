import { Inject, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";

import { REASSIGNMENT_REPOSITORY, type ReassignmentRepositoryPort } from "../../domain/ports/repositories/reassignment-repository.port";
import { CreateReassignment } from "../../domain/dtos/create-reassignment.interface";
import { Reassignment } from "../../domain/entities/reassignment.entity";
import { UserService } from './../../../user/application/services/user.service';
import { TicketService } from "../../../tickets/application/services/ticket.service";

@Injectable()
export class ReassignmentService {
    private readonly logger: Logger
    constructor(
        @Inject(REASSIGNMENT_REPOSITORY)
        private readonly reassignmentRepo: ReassignmentRepositoryPort,
        private readonly ticketService: TicketService,
        private readonly userService: UserService,
    ) {
        this.logger = new Logger(Reassignment.name)
    }

    async create(createDto: CreateReassignment) {
        await this.userService.getUserById(createDto.lastUserId);
        await this.userService.getUserById(createDto.newUserId);
        await this.ticketService.updateTicket(
            createDto.ticketId,
            {
                assignedToId: createDto.newUserId
            }
        )
        try {
            const reassignment = Reassignment.create(createDto);
            await this.reassignmentRepo.save(reassignment);
        } catch (error: any) {
            this.logger.error(error.message)
            throw new InternalServerErrorException(error.message)
        }
    }
}