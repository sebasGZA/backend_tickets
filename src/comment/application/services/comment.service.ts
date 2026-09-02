import { Inject, Injectable } from "@nestjs/common";

import { COMMENT_REPOSITORY, type CommentRepositoryPort } from "../../domain/ports/repositories/comment-repository.port";
import { CreateComment } from "../../domain/dtos/create-comment.interface";
import { TicketService } from "../../../tickets/application/services/ticket.service";

@Injectable()
export class CommentService {
    constructor(
        @Inject(COMMENT_REPOSITORY)
        private readonly commentRepo: CommentRepositoryPort,
        private readonly ticketService: TicketService,
    ) { }

    getAllByTicket(ticketId: string) {
        return this.commentRepo.findAllByTicketId(ticketId);
    }

    async createComment(createDto: CreateComment) {
        await this.ticketService.getById(createDto.ticketId)
        return this.commentRepo.save(createDto)
    }
}