import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StatusTypeORMEntity } from './infrastructure/persistence/status-typeorm.entity';
import { StatusService } from './application/services/status.service';
import { STATUS_REPOSITORY } from './domain/ports/repositories/status-repository.port';
import { StatusTypeOrmRepository } from './infrastructure/adapters/repositories/status-typeorm.repository';
import { StatusController } from './infrastructure/http/status.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StatusTypeORMEntity])],
  providers: [
    StatusService,
    {
      provide: STATUS_REPOSITORY,
      useClass: StatusTypeOrmRepository,
    },
  ],
  exports: [StatusService],
  controllers: [StatusController],
})
export class StatusModule {}
