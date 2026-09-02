import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { UserService } from "../../application/services/user.service";
import { QueryUserDto } from "../dtos/query-user.dto";
import { CreateUserDto } from "../dtos/create-user.dto";

@ApiTags('Users')
@Controller('users')
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