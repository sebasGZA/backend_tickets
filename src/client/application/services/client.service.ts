import {
    BadRequestException,
    Inject,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from "@nestjs/common";

import { CLIENT_REPOSITORY, type ClientRepositoryPort } from "../../domain/ports/repositories/client-repository.port";
import { QueryClient } from './../../domain/dtos/query-client.interface';
import { Client } from "../../domain/entities/client.entity";
import { CreateClient } from "../../domain/dtos/create-client.interface";

@Injectable()
export class ClientService {
    private readonly logger: Logger;
    constructor(
        @Inject(CLIENT_REPOSITORY)
        private readonly clientRepo: ClientRepositoryPort
    ) {
        this.logger = new Logger(ClientService.name)
    }

    async create({ name, email }: CreateClient) {
        try {
            const client = Client.create(name, email)
            await this.clientRepo.save(client)
        } catch (error: any) {
            this.logger.error(error.message)
            if (error.code === '23505') throw new BadRequestException(`Client with email ${email} already exists`)
            throw new InternalServerErrorException(error.mesage)
        }
    }

    async getById(id: string) {
        const client = await this.clientRepo.findById(id)
        if (!client) throw new NotFoundException(`Client with id ${id} not found`)
        return client
    }

    getClients(queryClient: QueryClient) {
        return this.clientRepo.findAll(queryClient);
    }
}