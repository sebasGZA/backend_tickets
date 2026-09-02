import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { ClientModule } from './client/client.module';
import { RoleModule } from './role/role.module';


@Module({
  imports: [
    DatabaseModule,
    ClientModule,
    RoleModule,
  ],
})
export class AppModule { }
