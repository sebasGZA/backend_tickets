import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

import { USER_REPOSITORY, type UserRepositoryPort } from "../../domain/ports/repositories/user-repository.port";
import { QueryUser } from "../../domain/dtos/query-user.interface";
import { User } from "../../domain/entities/user.entity";
import { FindAllResponseDto } from "../../../shared/domain/dtos/find-all-response.interface";
import { CreateUser } from "../../domain/dtos/create-user.interface";
import { RoleService } from "../../../role/application/services/role.service";
import { UserResponse } from "../../domain/dtos/user-response.interface";

@Injectable()
export class UserService {
    private readonly saltRounds: number;
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepo: UserRepositoryPort,
        private readonly roleService: RoleService,
    ) {
        this.saltRounds = parseInt(process.env.PASSWORD_SALT_ROUNDS!) || 10;
    }

    getUsers(queryDto: QueryUser): Promise<FindAllResponseDto<UserResponse>> {
        return this.userRepo.findUsers(queryDto);
    }

    async getUserEmail(email: string) {
        const user = await this.userRepo.findUserEmail(email)
        if (!user) throw new NotFoundException(`User with email ${email} not found`)
        return user
    }

    async getUserSeed(email: string) {
        return this.userRepo.findUserEmail(email)
    }

    async getUserById(id: string) {
        const user = await this.userRepo.findUserId(id)
        if (!user) throw new NotFoundException(`User with id ${id} not found`)
        return user
    }

    async createUser({ name, email, roleId, password, isActive }: CreateUser): Promise<void> {
        const existingUser = await this.userRepo.findUserEmail(email)
        if (existingUser) throw new BadRequestException(`User with email ${email} already exists`)
        const role = await this.roleService.getById(roleId)
        const passwordHash = bcrypt.hashSync(password, this.saltRounds)
        const user = User.create(name, email, passwordHash, roleId, role, isActive)
        return this.userRepo.save(user)
    }
}