import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { PriorityService } from '../../application/services/priority.service';
import { Roles } from '../../../auth/infrastructure/decorators/roles.decorator';
import { RoleEnum } from '../../../role/domain/enums/role.enum';

@ApiBearerAuth()
@ApiTags('Priorities')
@Controller('priorities')
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) {}

  @Roles(RoleEnum.ADMIN, RoleEnum.SOPORTE, RoleEnum.SUPERVISOR)
  @Get()
  getPriorities() {
    return this.priorityService.getAll();
  }
}
