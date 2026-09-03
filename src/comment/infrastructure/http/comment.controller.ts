import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import { CommentService } from '../../application/services/comment.service';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { Roles } from '../../../auth/infrastructure/decorators/roles.decorator';
import { RoleEnum } from '../../../role/domain/enums/role.enum';
import { CurrentUser } from '../../../auth/infrastructure/decorators/current-user.decorator';
import { type UserMe } from '../../../auth/domain/dtos/user-me.interface';

@ApiBearerAuth()
@ApiTags('Comments')
@Controller('comments')
@Roles(RoleEnum.ADMIN, RoleEnum.SUPERVISOR, RoleEnum.SOPORTE)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('ticket/:id')
  getByTicketId(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.commentService.getAllByTicket(id);
  }

  @Post()
  postComment(
    @CurrentUser() user: UserMe,
    @Body() createDto: CreateCommentDto,
  ) {
    return this.commentService.createComment(
      { ...createDto, createdById: user.userId },
      user,
    );
  }
}
