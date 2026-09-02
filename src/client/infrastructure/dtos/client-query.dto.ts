import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

import { PaginationDto } from "../../../shared/infrastructure/dtos/pagination.dto";

export class ClientQueryDto extends PaginationDto {
    @ApiPropertyOptional({
        description: 'Enter a term to find clients by name'
    })
    @IsOptional()
    @IsString()
    term?: string
}