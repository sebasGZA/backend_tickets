import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtStrategy } from './application/strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './infrastructure/http/auth.controller';
import { AuthService } from './application/services/auth.service';

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: config.get<number>('JWT_ACCESS_EXPIRATION_SECONDS'),
                },
            }),
        }),
        UserModule,
    ],
    providers: [JwtStrategy, AuthService],
    exports: [JwtModule],
    controllers: [AuthController],
})
export class AuthModule { }