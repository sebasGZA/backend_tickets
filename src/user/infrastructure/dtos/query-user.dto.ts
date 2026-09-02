import { ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsBoolean, IsOptional, IsString } from "class-validator"

import { PaginationDto } from "../../../shared/infrastructure/dtos/pagination.dto"

export class QueryUserDto extends PaginationDto {
    @ApiPropertyOptional({
        description: 'Enter a term to find user by name or email'
    })
    @IsOptional()
    @IsString()
    term?: string

    @ApiPropertyOptional({
        description: 'Enter the roleId'
    })
    @IsOptional()
    @IsString()
    roleId?: string

    @ApiPropertyOptional({
        description: 'Enter a term to find user by name or email'
    })
    @Type(() => Boolean)
    @IsOptional()
    @IsBoolean()
    isActive?: boolean
}