import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from "@nestjs/common";

import { TicketService } from "../../application/services/ticket.service";
import { CreateTicketDto } from "../dtos/create-ticket.dto";
import { QueryTicketDto } from "../dtos/query-ticket.dto";
import { UpdateTicketDto } from "../dtos/update-ticket.dto";

@ApiTags('Tickets')
@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService) { }

    @Get()
    getAll(@Query() queryDto: QueryTicketDto) {
        return this.ticketService.getAll(queryDto);
    }

    @Get(":id")
    getById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.ticketService.getById(id);
    }

    @Post()
    postTicket(@Body() createDto: CreateTicketDto) {
        return this.ticketService.create(createDto);
    }

    @Patch(':id')
    patchTicket(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() updateDto: UpdateTicketDto) {
        return this.ticketService.updateTicket(id, updateDto)
    }
}