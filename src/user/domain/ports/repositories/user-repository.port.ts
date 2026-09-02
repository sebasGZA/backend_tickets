import { QueryUser } from "../../dtos/query-user.interface"
import { User } from "../../entities/user.entity"
import { FindAllResponseDto } from '../../../../shared/domain/dtos/find-all-response.interface';

export const USER_REPOSITORY = 'USER_REPOSITORY'
export interface UserRepositoryPort {
    save(user: User): Promise<void>
    findUser(email: string): Promise<User | null>
    findUsers(queryUser: QueryUser): Promise<FindAllResponseDto<User>>
}