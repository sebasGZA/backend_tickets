import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';

import { UserTypeORMEntity } from '../../../user/infrastructure/persistence/user-typeorm.entity';
import { TicketTypeORMEntity } from '../../../tickets/infrastructure/persistence/ticket-typeorm.entity';

@Entity('comments')
export class CommentTypeORMEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column('text')
  content!: string;

  @RelationId((comment: CommentTypeORMEntity) => comment.ticket)
  ticketId!: string;

  @Column({ type: 'boolean', default: true })
  isPublic?: boolean;

  @RelationId((comment: CommentTypeORMEntity) => comment.createdBy)
  createdById!: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @ManyToOne(() => TicketTypeORMEntity, (ticket) => ticket.comments)
  @JoinColumn()
  ticket!: TicketTypeORMEntity;

  @ManyToOne(() => UserTypeORMEntity, (user) => user.createdComments)
  @JoinColumn()
  createdBy!: UserTypeORMEntity;
}
