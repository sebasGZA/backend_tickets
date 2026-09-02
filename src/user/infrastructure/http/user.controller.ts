import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { UserService } from "../../application/services/user.service";
import { QueryUserDto } from "../dtos/query-user.dto";
import { CreateUserDto } from "../dtos/create-user.dto";
import { Roles } from "../../../auth/infrastructure/decorators/roles.decorator";
import { RoleEnum } from "../../../role/domain/enums/role.enum";

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
@Roles(RoleEnum.ADMIN)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    getUsers(@Query() queryDto: QueryUserDto) {
        return this.userService.getUsers(queryDto);
    }

    @Get(':email')
    getUser(@Param('email') email: string) {
        return this.userService.getUserEmail(email);
    }

    @Post()
    postUser(@Body() createDto: CreateUserDto) {
        return this.userService.createUser(createDto)
    }
}