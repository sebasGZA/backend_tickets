import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserService } from '../../application/services/user.service';
import { QueryUserDto } from '../dtos/query-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Roles } from '../../../auth/infrastructure/decorators/roles.decorator';
import { RoleEnum } from '../../../role/domain/enums/role.enum';
import { UpdateUserDto } from '../dtos/update-user.dto';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Roles(RoleEnum.ADMIN, RoleEnum.SUPERVISOR)
  @Get()
  getUsers(@Query() queryDto: QueryUserDto) {
    return this.userService.getUsers(queryDto);
  }

  @Roles(RoleEnum.ADMIN)
  @Get(':email')
  getUser(@Param('email') email: string) {
    return this.userService.getUserEmail(email);
  }

  @Roles(RoleEnum.ADMIN)
  @Post()
  postUser(@Body() createDto: CreateUserDto) {
    return this.userService.createUser(createDto);
  }

  @Roles(RoleEnum.ADMIN)
  @Patch(':id')
  patchUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateDto);
  }
}
