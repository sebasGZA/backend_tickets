import { Inject, Injectable } from '@nestjs/common';

import {
  COMMENT_REPOSITORY,
  type CommentRepositoryPort,
} from '../../domain/ports/repositories/comment-repository.port';
import { CreateComment } from '../../domain/dtos/create-comment.interface';
import { TicketService } from '../../../tickets/application/services/ticket.service';
import { UserMe } from '../../../auth/domain/dtos/user-me.interface';
import { RoleEnum } from '../../../role/domain/enums/role.enum';

@Injectable()
export class CommentService {
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepo: CommentRepositoryPort,
    private readonly ticketService: TicketService,
  ) {}

  getAllByTicket(ticketId: string) {
    return this.commentRepo.findAllByTicketId(ticketId);
  }

  async createComment(createDto: CreateComment, user: UserMe) {
    await this.ticketService.getById(createDto.ticketId);

    const isPublic =
      user.role !== RoleEnum.SUPERVISOR ? createDto.isPublic : false;
    return this.commentRepo.save({ ...createDto, isPublic });
  }
}
