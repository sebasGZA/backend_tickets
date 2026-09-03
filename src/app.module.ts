import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { DatabaseModule } from './database/database.module';
import { ClientModule } from './client/client.module';
import { PriorityModule } from './priority/priority.module';
import { ReassignmentModule } from './reassigment/reassignment.module';
import { RoleModule } from './role/role.module';
import { StatusModule } from './status/status.module';
import { UserModule } from './user/user.module';
import { TicketModule } from './tickets/ticket.module';
import { CommentModule } from './comment/comment.module';
import { envValidationSchema } from './config/env.validation';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from './auth/infrastructure/guards/roles.guard';
import { MetricModule } from './metric/metric.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    DatabaseModule,
    AuthModule,
    ClientModule,
    CommentModule,
    MetricModule,
    PriorityModule,
    ReassignmentModule,
    RoleModule,
    StatusModule,
    TicketModule,
    UserModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
