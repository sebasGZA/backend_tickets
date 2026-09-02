import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { ClientModule } from './client/client.module';
import { PriorityModule } from './priority/priority.module';
import { RoleModule } from './role/role.module';
import { StatusModule } from './status/status.module';
import { UserModule } from './user/user.module';
import { TicketModule } from './tickets/ticket.module';
import { CommentModule } from './comment/comment.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    DatabaseModule,
    ClientModule,
    CommentModule,
    PriorityModule,
    RoleModule,
    StatusModule,
    TicketModule,
    UserModule,
  ],
})
export class AppModule { }
