import { Body, Controller, Get, Post, Query } from "@nestjs/common";

import { ClientService } from "../../application/services/client.service";
import { CreateClientDto } from "../dtos/create-client.dto";
import { ApiTags } from "@nestjs/swagger";
import { QueryClientDto } from "../dtos/query-client.dto";

@ApiTags('Clients')
@Controller('clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) { }

    @Post()
    postClient(@Body() createDto: CreateClientDto) {
        return this.clientService.create(createDto)
    }

    @Get()
    getClients(@Query() queryDto: QueryClientDto) {
        return this.clientService.getClients(queryDto)
    }
}