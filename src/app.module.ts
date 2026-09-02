import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { ClientModule } from './client/client.module';
import { PriorityModule } from './priority/priority.module';
import { RoleModule } from './role/role.module';
import { StatusModule } from './status/status.module';


@Module({
  imports: [
    DatabaseModule,
    ClientModule,
    PriorityModule,
    RoleModule,
    StatusModule,
  ],
})
export class AppModule { }
