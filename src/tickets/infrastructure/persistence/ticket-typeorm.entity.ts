import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

import { ClientTypeORMEntity } from '../../../client/infrastructure/persistence/client-typeorm.entity';
import { CommentTypeORMEntity } from '../../../comment/infrastructure/persistence/comment-typeorm.entity';
import { PriorityTypeORMEntity } from '../../../priority/infrastructure/persistence/priority-typeorm.entity';
import { StatusTypeORMEntity } from '../../../status/infrastructure/persistence/status-typeorm.entity';
import { UserTypeORMEntity } from '../../../user/infrastructure/persistence/user-typeorm.entity';
import { ReassignmentTypeORMEntity } from '../../../reassigment/infrastructure/persistence/reassignment-typeorm.entity';

@Entity('tickets')
export class TicketTypeORMEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column('text')
  title!: string;

  @Column('text')
  description!: string;

  @RelationId((ticket: TicketTypeORMEntity) => ticket.status)
  statusId!: string;

  @RelationId((ticket: TicketTypeORMEntity) => ticket.priority)
  priorityId!: string;

  @RelationId((ticket: TicketTypeORMEntity) => ticket.client)
  clientId!: string;

  @RelationId((ticket: TicketTypeORMEntity) => ticket.createdBy)
  createdById!: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;

  @RelationId((ticket: TicketTypeORMEntity) => ticket.assignedTo)
  assignedToId?: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @RelationId((ticket: TicketTypeORMEntity) => ticket.updatedBy)
  updatedById?: string;

  @Column({ name: 'closed_at', type: 'timestamp', nullable: true })
  closedAt?: Date;

  @Column({ name: 'resolved_at', type: 'timestamp', nullable: true })
  resolvedAt?: Date;

  @ManyToOne(() => StatusTypeORMEntity, (status) => status.tickets)
  @JoinColumn()
  status!: StatusTypeORMEntity;

  @ManyToOne(() => PriorityTypeORMEntity, (priority) => priority.tickets)
  @JoinColumn()
  priority!: PriorityTypeORMEntity;

  @ManyToOne(() => ClientTypeORMEntity, (client) => client.tickets)
  @JoinColumn()
  client!: ClientTypeORMEntity;

  @ManyToOne(() => UserTypeORMEntity, (user) => user.createdTickets)
  @JoinColumn()
  createdBy!: UserTypeORMEntity;

  @ManyToOne(() => UserTypeORMEntity, (user) => user.assignedTickets)
  @JoinColumn()
  assignedTo?: UserTypeORMEntity;

  @ManyToOne(() => UserTypeORMEntity, (user) => user.updatedTickets)
  @JoinColumn()
  updatedBy?: UserTypeORMEntity;

  @OneToMany(() => CommentTypeORMEntity, (comment) => comment.ticket)
  comments?: CommentTypeORMEntity[];

  @OneToMany(
    () => ReassignmentTypeORMEntity,
    (reassignment) => reassignment.ticket,
  )
  reassignments?: ReassignmentTypeORMEntity[];
}
