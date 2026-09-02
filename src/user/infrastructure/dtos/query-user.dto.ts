import { ApiPropertyOptional } from "@nestjs/swagger"
import { Transform, Type } from "class-transformer"
import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator"

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
    @IsUUID()
    roleId?: string

    @ApiPropertyOptional({
        description: 'Enter a term to find user by name or email'
    })
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean
}