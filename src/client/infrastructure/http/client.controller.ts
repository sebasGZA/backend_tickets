import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ClientService } from '../../application/services/client.service';
import { CreateClientDto } from '../dtos/create-client.dto';
import { QueryClientDto } from '../dtos/query-client.dto';
import { Roles } from '../../../auth/infrastructure/decorators/roles.decorator';
import { RoleEnum } from '../../../role/domain/enums/role.enum';
import { UpdateClientDto } from '../dtos/update-client.dto';
@ApiBearerAuth()
@ApiTags('Clients')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Roles(RoleEnum.ADMIN)
  @Post()
  postClient(@Body() createDto: CreateClientDto) {
    return this.clientService.create(createDto);
  }

  @Roles(RoleEnum.ADMIN)
  @Patch(':id')
  patchClient(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateDto: UpdateClientDto,
  ) {
    return this.clientService.update(id, updateDto);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.SOPORTE)
  @Get()
  getClients(@Query() queryDto: QueryClientDto) {
    return this.clientService.getClients(queryDto);
  }
}
