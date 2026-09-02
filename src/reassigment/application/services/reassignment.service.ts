import { Inject, Injectable } from "@nestjs/common";

import { REASSIGNMENT_REPOSITORY, type ReassignmentRepositoryPort } from "../../domain/ports/repositories/reassignment-repository.port";
import { CreateReassignment } from "../../domain/dtos/create-reassignment.interface";
import { Reassignment } from "../../domain/entities/reassignment.entity";
import { UserService } from './../../../user/application/services/user.service';
import { TicketService } from "../../../tickets/application/services/ticket.service";

@Injectable()
export class ReassignmentService {
    constructor(
        @Inject(REASSIGNMENT_REPOSITORY)
        private readonly reassignmentRepo: ReassignmentRepositoryPort,
        private readonly ticketService: TicketService,
        private readonly userService: UserService,
    ) { }

    async create(createDto: CreateReassignment) {
        await this.userService.getUserById(createDto.lastUserId);
        await this.userService.getUserById(createDto.newUserId);
        await this.ticketService.getById(createDto.ticketId);

        const reassignment = Reassignment.create(createDto);
        await this.reassignmentRepo.save(reassignment);
    }
}