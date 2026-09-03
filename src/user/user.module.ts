import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './infrastructure/http/user.controller';
import { UserService } from './application/services/user.service';
import { UserTypeORMEntity } from './infrastructure/persistence/user-typeorm.entity';
import { USER_REPOSITORY } from './domain/ports/repositories/user-repository.port';
import { UserTypeORMRepository } from './infrastructure/adapters/user-typeorm.repository';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeORMEntity]), RoleModule],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: UserTypeORMRepository,
    },
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
