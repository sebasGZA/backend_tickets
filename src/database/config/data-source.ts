import 'dotenv/config';
import { DataSource } from 'typeorm';

import { ClientTypeORMEntity } from '../../client/infrastructure/persistence/client-typeorm.entity';
import { CommentTypeORMEntity } from '../../comment/infrastructure/persistence/comment-typeorm.entity';
import { PriorityTypeORMEntity } from '../../priority/infrastructure/persistence/priority-typeorm.entity';
import { ReassignmentTypeORMEntity } from '../../reassigment/infrastructure/persistence/reassignment-typeorm.entity';
import { RoleTypeORMEntity } from '../../role/infrastructure/persistence/role-typeorm.entity';
import { StatusTypeORMEntity } from '../../status/infrastructure/persistence/status-typeorm.entity';
import { TicketTypeORMEntity } from '../../tickets/infrastructure/persistence/ticket-typeorm.entity';
import { UserTypeORMEntity } from '../../user/infrastructure/persistence/user-typeorm.entity';

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  entities: [
    ClientTypeORMEntity,
    CommentTypeORMEntity,
    PriorityTypeORMEntity,
    ReassignmentTypeORMEntity,
    RoleTypeORMEntity,
    StatusTypeORMEntity,
    TicketTypeORMEntity,
    UserTypeORMEntity,
  ],
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: false,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
});
