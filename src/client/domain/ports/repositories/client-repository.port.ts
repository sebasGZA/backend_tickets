import { FindAllResponseDto } from 'src/shared/domain/dtos/find-all-response.interface';
import { QueryClient } from "../../dtos/query-client.interface";
import { Client } from "../../entities/client.entity";

export const CLIENT_REPOSITORY = 'CLIENT_REPOSITORY';

export interface ClientRepositoryPort {
    save(client: Client): Promise<void>
    findAll(queryClient: QueryClient): Promise<FindAllResponseDto<Client>>
    findById(id: string): Promise<Client | null>
}