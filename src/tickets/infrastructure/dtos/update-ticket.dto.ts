
import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsDateString, IsOptional } from "class-validator";

import { CreateTicketDto } from "./create-ticket.dto"

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
    @ApiPropertyOptional({
        description: 'Enter the closedAt date'
    })
    @IsOptional()
    @IsDateString()
    closedAt?: Date;

    @ApiPropertyOptional({
        description: 'Enter the resolvedAt date'
    })
    @IsOptional()
    @IsDateString()
    resolvedAt?: Date;
}