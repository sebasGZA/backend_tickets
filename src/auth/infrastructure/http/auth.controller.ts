import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { AuthService } from "../../application/services/auth.service";
import { loginDto } from "../dtos/login.dto";
import { Public } from "../decorators/public.decorator";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('login')
    login(@Body() loginDto: loginDto) {
        return this.authService.login(loginDto)
    }
}