import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { TicketTypeORMEntity } from '../../../tickets/infrastructure/persistence/ticket-typeorm.entity';
import { StatusEnum } from '../../domain/enums/status.enum';

@Entity('statuses')
export class StatusTypeORMEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ type: 'enum', enum: StatusEnum })
  name!: StatusEnum;

  @CreateDateColumn({
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
    type: 'timestamp',
  })
  createdAt!: Date;

  @OneToMany(() => TicketTypeORMEntity, (tickets) => tickets.status)
  tickets!: TicketTypeORMEntity[];
}
