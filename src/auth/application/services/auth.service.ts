import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Login } from '../../domain/dtos/login.interface';
import { UserService } from '../../../user/application/services/user.service';
import { JwtPayload } from '../../domain/dtos/jwt-payload.interface';
import { LoginResponse } from '../../domain/dtos/login-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: Login): Promise<LoginResponse> {
    const user = await this.userService.getUserEmail(email);
    let valid: boolean;
    try {
      valid = bcrypt.compareSync(password, user.password);
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
    if (!valid) throw new UnauthorizedException('Password is not valid');
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role.name,
    };

    return {
      user: {
        userId: payload.sub,
        email: payload.email,
        role: payload.role,
      },
      token: this.jwtService.sign(payload),
    };
  }

  async refreshToken(currentToken: string): Promise<LoginResponse> {
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify<JwtPayload>(currentToken);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token has expired, login');
      }
      throw new UnauthorizedException('InvalidToken');
    }

    const { sub, email, role } = payload;
    const token = this.jwtService.sign({ sub, email, role });

    return {
      user: {
        userId: sub,
        email,
        role,
      },
      token,
    };
  }
}
