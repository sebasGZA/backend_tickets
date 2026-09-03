import { NestFactory } from '@nestjs/core';
import { INestApplicationContext, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from '../../app.module';
import { RoleService } from '../../role/application/services/role.service';
import { RoleEnum } from '../../role/domain/enums/role.enum';
import { UserService } from '../../user/application/services/user.service';
import { StatusService } from '../../status/application/services/status.service';
import { StatusEnum } from '../../status/domain/enums/status.enum';
import { PriorityService } from '../../priority/application/services/priority.service';
import { PriorityEnum } from '../../priority/domain/enums/priority.enum';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  await prioritiesToCreate(app);
  await statusesToCreate(app);
  const role = await rolesToCreate(app);
  await userToCreate(app, role.id);

  await app.close();
  Logger.log('Seeds completed', 'Seed');
  process.exit(0);
}

const prioritiesToCreate = async (app: INestApplicationContext) => {
  const priorityService = app.get(PriorityService);
  const existPriorities = await priorityService.getAll();
  if (existPriorities.length > 0) return;

  const prioritiesToCreate = [
    PriorityEnum.BAJA,
    PriorityEnum.MEDIA,
    PriorityEnum.ALTA,
    PriorityEnum.CRITICA,
  ];

  const priorityPromises = prioritiesToCreate.map((name) =>
    priorityService.save({ name }),
  );
  await Promise.allSettled(priorityPromises);
};

const statusesToCreate = async (app: INestApplicationContext) => {
  const statusService = app.get(StatusService);
  const existStatuses = await statusService.getAll();
  if (existStatuses.length > 0) return;

  const statusToCreate = [
    StatusEnum.ABIERTO,
    StatusEnum.EN_PROGRESSO,
    StatusEnum.CERRADO,
    StatusEnum.REABIERTO,
  ];

  const statusPromises = statusToCreate.map((name) =>
    statusService.save({ name }),
  );
  await Promise.allSettled(statusPromises);
};

const rolesToCreate = async (app: INestApplicationContext) => {
  const roleService = app.get(RoleService);
  const existRole = await roleService.getByName(RoleEnum.ADMIN);
  if (existRole) return existRole;

  const rolesToCreate = [RoleEnum.ADMIN, RoleEnum.SUPERVISOR, RoleEnum.SOPORTE];
  const rolesPromises = rolesToCreate.map((name) => roleService.save({ name }));
  await Promise.allSettled(rolesPromises);
  const adminRole = await roleService.getByName(RoleEnum.ADMIN);
  if (!adminRole) throw new Error('Admin role is not found');
  return adminRole;
};

const userToCreate = async (app: INestApplicationContext, roleId: string) => {
  const configService = app.get(ConfigService);
  const userService = app.get(UserService);
  const name = 'admin';
  const email = configService.get<string>('ADMIN_EMAIL');
  const password = configService.get<string>('ADMIN_PASSWORD');
  if (!email || !password)
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD variables are required');

  const adminExist = await userService.getUserSeed(email);
  if (adminExist) return;

  await userService.createUser({ name, email, roleId, password });
};

bootstrap().catch((err: any) => {
  Logger.error(err.message, 'Seed');
  process.exit(1);
});
