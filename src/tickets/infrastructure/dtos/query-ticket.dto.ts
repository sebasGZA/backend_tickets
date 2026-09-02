import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";

import { PaginationDto } from "../../../shared/infrastructure/dtos/pagination.dto";

export class QueryTicketDto extends PaginationDto {

    @ApiPropertyOptional({
        description: 'Enter the term to find'
    })
    @IsOptional()
    @IsString()
    term?: string;

    @ApiPropertyOptional({
        description: 'Enter the statusId to find'
    })
    @IsOptional()
    @IsUUID()
    statusId?: string;

    @ApiPropertyOptional({
        description: 'Enter the priorityId to find'
    })
    @IsOptional()
    @IsUUID()
    priorityId?: string;

    @ApiPropertyOptional({
        description: 'Enter the clientId to find'
    })
    @IsOptional()
    @IsUUID()
    clientId?: string;

    @ApiPropertyOptional({
        description: 'Enter the createdById to find'
    })
    @IsOptional()
    @IsUUID()
    createdById?: string;
} 