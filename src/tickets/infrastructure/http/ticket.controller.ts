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

import { TicketService } from '../../application/services/ticket.service';
import { CreateTicketDto } from '../dtos/create-ticket.dto';
import { QueryTicketDto } from '../dtos/query-ticket.dto';
import { UpdateTicketDto } from '../dtos/update-ticket.dto';
import { Roles } from '../../../auth/infrastructure/decorators/roles.decorator';
import { RoleEnum } from '../../../role/domain/enums/role.enum';
import { CurrentUser } from '../../../auth/infrastructure/decorators/current-user.decorator';
import { type UserMe } from '../../../auth/domain/dtos/user-me.interface';

@ApiBearerAuth()
@ApiTags('Tickets')
@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Roles(RoleEnum.ADMIN, RoleEnum.SUPERVISOR, RoleEnum.SOPORTE)
  @Get()
  getAll(@Query() queryDto: QueryTicketDto) {
    return this.ticketService.getAll(queryDto);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.SUPERVISOR, RoleEnum.SOPORTE)
  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.ticketService.getById(id);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.SUPERVISOR, RoleEnum.SOPORTE)
  @Get('/detail/:id')
  getByIdDetail(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.ticketService.getByIdDetail(id);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.SOPORTE)
  @Post()
  postTicket(@CurrentUser() user: UserMe, @Body() createDto: CreateTicketDto) {
    return this.ticketService.create(user, {
      ...createDto,
      createdById: user.userId,
    });
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.SOPORTE)
  @Patch(':id')
  patchTicket(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @CurrentUser() user: UserMe,
    @Body() updateDto: UpdateTicketDto,
  ) {
    return this.ticketService.updateTicket(id, updateDto, user);
  }
}
