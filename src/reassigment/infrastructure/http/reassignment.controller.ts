import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ReassignmentService } from './../../application/services/reassignment.service';
import { CreateReassignmentDto } from '../dtos/create-reassignment.dto';
import { CurrentUser } from '../../../auth/infrastructure/decorators/current-user.decorator';
import { type UserMe } from '../../../auth/domain/dtos/user-me.interface';
import { Roles } from '../../../auth/infrastructure/decorators/roles.decorator';
import { RoleEnum } from '../../../role/domain/enums/role.enum';

@ApiBearerAuth()
@ApiTags('Reassignments')
@Controller('reassignments')
export class ReassignmentController {
  constructor(private readonly reassignmentService: ReassignmentService) {}

  @Roles(RoleEnum.ADMIN, RoleEnum.SUPERVISOR)
  @Post()
  postReassignment(
    @CurrentUser() user: UserMe,
    @Body() { ticketId, assignedToId }: CreateReassignmentDto,
  ) {
    return this.reassignmentService.create(
      { ticketId, newUserId: assignedToId, createdById: user.userId },
      user,
    );
  }
}
