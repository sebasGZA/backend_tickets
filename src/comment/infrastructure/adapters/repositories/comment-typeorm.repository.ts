import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentTypeORMEntity } from '../../persistence/comment-typeorm.entity';
import { CommentRepositoryPort } from '../../../domain/ports/repositories/comment-repository.port';
import { CreateComment } from '../../../domain/dtos/create-comment.interface';
import { Comment } from '../../../domain/entities/comment.entity';
import { CommentResponse } from '../../../domain/dtos/comment-response.interface';

@Injectable()
export class CommentTypeORMRepository implements CommentRepositoryPort {
  constructor(
    @InjectRepository(CommentTypeORMEntity)
    private readonly repo: Repository<CommentTypeORMEntity>,
  ) {}

  async save(commentDto: CreateComment): Promise<void> {
    const comment = Comment.create(commentDto);
    const commetToDb = this.repo.create({
      id: comment.id,
      isPublic: comment.isPublic,
      content: comment.content,
      createdBy: {
        id: comment.createdById,
      },
      ticket: {
        id: comment.ticketId,
      },
    });
    await this.repo.save(commetToDb);
  }

  async findAllByTicketId(ticketId: string): Promise<CommentResponse[]> {
    const queryBuilder = this.repo
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.ticket', 'ticket')
      .leftJoinAndSelect('comment.createdBy', 'createdBy')
      .where('ticket.id = :id', { id: ticketId });

    const results = await queryBuilder.getMany();
    return this.transformResult(results);
  }

  private transformResult(
    commentsDb: CommentTypeORMEntity[],
  ): CommentResponse[] {
    return commentsDb.map(
      ({ id, content, isPublic, createdBy, ticket, createdAt }) => ({
        id,
        content,
        isPublic,
        createdById: createdBy.id,
        authorName: createdBy.name,
        ticketId: ticket.id,
        createdAt,
      }),
    );
  }
}
