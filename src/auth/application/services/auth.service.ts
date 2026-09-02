import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'

import { Login } from "../../domain/dtos/login.interface";
import { UserService } from "../../../user/application/services/user.service";
import { JwtPayload } from "../../domain/dtos/jwt-payload.interface";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jtwService: JwtService,
    ) { }

    async login({ email, password }: Login) {
        const user = await this.userService.getUserEmail(email)
        console.log(user)
        let valid: boolean
        try {
            valid = bcrypt.compareSync(password, user.password)
        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
        if (!valid) throw new UnauthorizedException('Password is not valid')
        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            role: user.role.name,
        };

        return {
            token: this.jtwService.sign(payload)
        }
    }
} 