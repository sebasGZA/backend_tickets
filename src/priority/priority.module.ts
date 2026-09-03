import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PriorityTypeORMEntity } from './infrastructure/persistence/priority-typeorm.entity';
import { PriorityService } from './application/services/priority.service';
import { PRIORITY_REPOSITORY } from './domain/ports/repositories/priority-repository.port';
import { PriorityTypeOrmRepository } from './infrastructure/adapters/repositories/priority-typeorm.repository';
import { PriorityController } from './infrastructure/http/priority.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PriorityTypeORMEntity])],
  providers: [
    PriorityService,
    {
      provide: PRIORITY_REPOSITORY,
      useClass: PriorityTypeOrmRepository,
    },
  ],
  exports: [PriorityService],
  controllers: [PriorityController],
})
export class PriorityModule {}
