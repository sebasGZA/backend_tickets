import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';

import { TicketTypeORMEntity } from '../../../tickets/infrastructure/persistence/ticket-typeorm.entity';
import { UserTypeORMEntity } from '../../../user/infrastructure/persistence/user-typeorm.entity';

@Entity('reassignments')
export class ReassignmentTypeORMEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @RelationId((reassignment: ReassignmentTypeORMEntity) => reassignment.ticket)
  ticketId!: string;

  @RelationId(
    (reassignment: ReassignmentTypeORMEntity) => reassignment.createdBy,
  )
  lastUserId!: string;

  @RelationId(
    (reassignment: ReassignmentTypeORMEntity) => reassignment.createdBy,
  )
  newUserId!: string;

  @RelationId(
    (reassignment: ReassignmentTypeORMEntity) => reassignment.createdBy,
  )
  createdById!: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @ManyToOne(() => TicketTypeORMEntity, (ticket) => ticket.reassignments)
  @JoinColumn()
  ticket!: TicketTypeORMEntity;

  @ManyToOne(() => UserTypeORMEntity, (user) => user.createdreassignments)
  @JoinColumn()
  createdBy!: UserTypeORMEntity;

  @ManyToOne(() => UserTypeORMEntity, (user) => user.lastUserreassignments)
  @JoinColumn()
  lastUserBy!: UserTypeORMEntity;

  @ManyToOne(() => UserTypeORMEntity, (user) => user.newUserreassignments)
  @JoinColumn()
  newUserBy!: UserTypeORMEntity;
}
