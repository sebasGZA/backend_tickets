import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { ClientModule } from './client/client.module';
import { PriorityModule } from './priority/priority.module';
import { RoleModule } from './role/role.module';
import { StatusModule } from './status/status.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    DatabaseModule,
    ClientModule,
    PriorityModule,
    RoleModule,
    StatusModule,
    UserModule,
  ],
})
export class AppModule { }
