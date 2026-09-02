import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ExtractJwt } from 'passport-jwt';

import { AuthService } from "../../application/services/auth.service";
import { loginDto } from "../dtos/login.dto";
import { Public } from "../decorators/public.decorator";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('login')
    login(@Body() loginDto: loginDto) {
        return this.authService.login(loginDto)
    }

    @ApiBearerAuth()
    @Post('renew')
    renew(@Req() req: Request) {
        const currentToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        return this.authService.refreshToken(currentToken);
    }
}