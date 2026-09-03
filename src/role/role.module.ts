import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleTypeORMEntity } from './infrastructure/persistence/role-typeorm.entity';
import { RoleService } from './application/services/role.service';
import { ROLE_REPOSITORY } from './domain/ports/repositories/role-repository.port';
import { RoleTypeOrmRepository } from './infrastructure/adapters/repositories/role-typeorm.repository';
import { RoleController } from './infrastructure/http/role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoleTypeORMEntity])],
  providers: [
    RoleService,
    {
      provide: ROLE_REPOSITORY,
      useClass: RoleTypeOrmRepository,
    },
  ],
  exports: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
