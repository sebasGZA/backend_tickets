import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepositoryPort } from '../../domain/ports/repositories/user-repository.port';
import { User } from '../../domain/entities/user.entity';
import { UserTypeORMEntity } from '../persistence/user-typeorm.entity';
import { QueryUser } from '../../domain/dtos/query-user.interface';
import { FindAllResponseDto } from '../../../shared/domain/dtos/find-all-response.interface';
import { UserResponse } from '../../domain/dtos/user-response.interface';
import { UpdateUser } from '../../domain/dtos/update-user.interface';

@Injectable()
export class UserTypeORMRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserTypeORMEntity)
    private readonly repo: Repository<UserTypeORMEntity>,
  ) {}

  async save(user: User): Promise<void> {
    try {
      await this.repo.save(user);
    } catch (error: any) {
      if (error.code === '23505')
        throw new BadRequestException(
          `User with name ${user.name} already exists`,
        );
      throw new InternalServerErrorException(error.message);
    }
  }

  async findUsers(query: QueryUser): Promise<FindAllResponseDto<UserResponse>> {
    const { limit, page, term, role, isActive } = query;

    const queryBuilder = this.repo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role');
    if (limit && page) queryBuilder.skip((page - 1) * limit).take(limit);

    if (term) {
      queryBuilder
        .where('user.name ILIKE :term', { term: `%${term.toLowerCase()}%` })
        .orWhere('user.email ILIKE :term', { term: `%${term.toLowerCase()}%` });
    } else {
      queryBuilder.where('1 = 1');
    }

    if (role) queryBuilder.andWhere('role.name = :role', { role });
    if (isActive !== undefined && isActive !== null)
      queryBuilder.andWhere('user.isActive = :isActive', { isActive });

    const [result, total] = await queryBuilder.getManyAndCount();
    return {
      data: this.transformResult(result),
      total,
      currentPage: page,
      totalPages: limit && Math.ceil(total / limit),
    };
  }

  findUserId(id: string): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }

  findUserEmail(email: string): Promise<User | null> {
    return this.repo.findOne({
      where: { email },
      relations: {
        role: true,
      },
    });
  }

  async update(id: string, updateDto: UpdateUser): Promise<void> {
    const ticket = await this.repo.preload({
      id,
      ...updateDto,
      role: {
        id: updateDto.roleId,
      },
    });
    if (!ticket) throw new NotFoundException(`User with id ${id} not found`);
    await this.repo.save(ticket);
  }

  private transformResult(usersDB: UserTypeORMEntity[]): UserResponse[] {
    return usersDB.map(({ id, name, email, role, isActive, createdAt }) => ({
      id,
      name,
      email,
      role: role.name,
      isActive,
      createdAt,
    }));
  }
}
