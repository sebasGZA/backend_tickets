import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { TicketTypeORMEntity } from '../../../tickets/infrastructure/persistence/ticket-typeorm.entity';
import { PriorityEnum } from '../../domain/enums/priority.enum';

@Entity('priorities')
export class PriorityTypeORMEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ type: 'enum', enum: PriorityEnum })
  name!: PriorityEnum;

  @CreateDateColumn({
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
    type: 'timestamp',
  })
  createdAt!: Date;

  @OneToMany(() => TicketTypeORMEntity, (tickets) => tickets.priority)
  tickets!: TicketTypeORMEntity[];
}
