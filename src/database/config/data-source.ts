import 'dotenv/config'
import { ClientTypeORMEntity } from '../../client/infrastructure/persistence/client-typeorm.entity';
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DB_URL,
    entities: [ClientTypeORMEntity],
    migrations: ['src/migrations/*{.ts,.js}'],
    synchronize: false,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})