import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { StatusService } from '../../application/services/status.service';
import { RoleEnum } from '../../../role/domain/enums/role.enum';
import { Roles } from '../../../auth/infrastructure/decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags('Statuses')
@Controller('statuses')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Roles(RoleEnum.ADMIN, RoleEnum.SOPORTE, RoleEnum.SUPERVISOR)
  @Get()
  getStatuses() {
    return this.statusService.getAll();
  }
}
