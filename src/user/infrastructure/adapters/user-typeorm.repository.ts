import { Repository } from "typeorm";
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserRepositoryPort } from "../../domain/ports/repositories/user-repository.port";
import { User } from "src/user/domain/entities/user.entity";
import { UserTypeORMEntity } from "../persistence/user-typeorm.entity";
import { QueryUser } from "src/user/domain/dtos/query-user.interface";
import { FindAllResponseDto } from "src/shared/domain/dtos/find-all-response.interface";

@Injectable()
export class UserTypeORMRepository implements UserRepositoryPort {
    constructor(
        @InjectRepository(UserTypeORMEntity)
        private readonly repo: Repository<UserTypeORMEntity>
    ) { }

    async save(user: User): Promise<void> {
        try {
            await this.repo.save(user)
        } catch (error: any) {
            if (error.code === '23505') throw new BadRequestException(`User with name ${user.name} already exists`)
            throw new InternalServerErrorException(error.message)
        }
    }

    async findUsers(query: QueryUser): Promise<FindAllResponseDto<User>> {
        const { limit, page, term, roleId, isActive } = query;

        const queryBuilder = this.repo.createQueryBuilder('user').leftJoinAndSelect('user.role', 'role')
        if (limit && page) queryBuilder.skip((page - 1) * limit).take(limit)

        if (term) {
            queryBuilder
                .where('user.name ILIKE :term', { term: `%${term.toLowerCase()}%` })
                .andWhere('user.email ILIKE :term', { term: `%${term.toLowerCase()}%` })
        } else {
            queryBuilder.where('1 = 1')
        }

        if (roleId) queryBuilder.andWhere('user.roleId = :roleId', { roleId })
        if (isActive) queryBuilder.andWhere('user.isActive = :isActive', { isActive })

        const [result, total] = await queryBuilder.getManyAndCount()
        return {
            data: this.transformResult(result),
            total,
            currentPage: page,
            totalPages: limit && Math.ceil(total / limit)
        }
    }

    findUser(email: string): Promise<User | null> {
        return this.repo.findOne({ where: { email } })
    }


    private transformResult(usersDB: UserTypeORMEntity[]): User[] {
        return usersDB.map((u) => new User(
            u.id,
            u.name,
            u.email,
            u.password,
            u.roleId,
            u.role,
            u.isActive,
            u.createdAt
        ))
    }
}