import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentTypeORMEntity } from '../../persistence/comment-typeorm.entity';
import { CommentRepositoryPort } from '../../../domain/ports/repositories/comment-repository.port';
import { CreateComment } from '../../../domain/dtos/create-comment.interface';
import { Comment } from '../../../domain/entities/comment.entity';

@Injectable()
export class CommentTypeORMRepository implements CommentRepositoryPort {
  constructor(
    @InjectRepository(CommentTypeORMEntity)
    private readonly repo: Repository<CommentTypeORMEntity>,
  ) {}

  async save(commentDto: CreateComment): Promise<void> {
    const comment = Comment.create(commentDto);
    await this.repo.save(comment);
  }

  findAllByTicketId(ticketId: string): Promise<Comment[]> {
    return this.repo.find({ where: { ticketId } });
  }
}
