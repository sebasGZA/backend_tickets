import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { ClientModule } from './client/client.module';
import { PriorityModule } from './priority/priority.module';
import { RoleModule } from './role/role.module';


@Module({
  imports: [
    DatabaseModule,
    ClientModule,
    PriorityModule,
    RoleModule,
  ],
})
export class AppModule { }
