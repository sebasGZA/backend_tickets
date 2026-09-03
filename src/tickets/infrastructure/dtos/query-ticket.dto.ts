import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, IsUUID } from "class-validator";

import { PaginationDto } from "../../../shared/infrastructure/dtos/pagination.dto";
import { StatusEnum } from "../../../status/domain/enums/status.enum";
import { PriorityEnum } from "../../../priority/domain/enums/priority.enum";

export class QueryTicketDto extends PaginationDto {

    @ApiPropertyOptional({
        description: 'Enter the term to find'
    })
    @IsOptional()
    @IsString()
    term?: string;

    @ApiPropertyOptional({
        description: 'Enter the status to find'
    })
    @IsOptional()
    @IsEnum(StatusEnum)
    status?: StatusEnum;

    @ApiPropertyOptional({
        description: 'Enter the priority to find'
    })
    @IsOptional()
    @IsEnum(PriorityEnum)
    priority?: PriorityEnum;

    @ApiPropertyOptional({
        description: 'Enter the createdById to find'
    })
    @IsOptional()
    @IsUUID()
    createdById?: string;
} 