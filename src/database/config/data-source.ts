import 'dotenv/config'
import { DataSource } from "typeorm";

import { ClientTypeORMEntity } from '../../client/infrastructure/persistence/client-typeorm.entity';
import { PriorityTypeORMEntity } from '../../priority/infrastructure/persistence/priority-typeorm.entity';
import { RoleTypeORMEntity } from '../../role/infrastructure/persistence/role-typeorm.entity';

export const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DB_URL,
    entities: [
        ClientTypeORMEntity, 
        PriorityTypeORMEntity,
        RoleTypeORMEntity,
    ],
    migrations: ['src/migrations/*{.ts,.js}'],
    synchronize: false,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})