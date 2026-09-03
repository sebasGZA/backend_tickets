import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Roles } from '../../../auth/infrastructure/decorators/roles.decorator';
import { RoleEnum } from '../../../role/domain/enums/role.enum';
import { MetricService } from '../../application/services/metric.service';

@ApiBearerAuth()
@ApiTags('Metrics')
@Controller('metrics')
@Roles(RoleEnum.SUPERVISOR)
export class MetricController {
  constructor(private readonly metricService: MetricService) {}

  @Get('dashboard')
  getDashboard() {
    return this.metricService.getDashboard();
  }
}
