import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientTypeORMEntity } from './infrastructure/persistence/client-typeorm.entity';
import { ClientService } from './application/services/client.service';
import { ClientController } from './infrastructure/http/client.controller';
import { CLIENT_REPOSITORY } from './domain/ports/repositories/client-repository.port';
import { ClientTypeORMRepository } from './infrastructure/adapters/repositories/client-typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClientTypeORMEntity])],
  providers: [
    ClientService,
    {
      provide: CLIENT_REPOSITORY,
      useClass: ClientTypeORMRepository,
    },
  ],
  exports: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
