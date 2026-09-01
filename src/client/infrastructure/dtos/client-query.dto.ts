import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class ClientQueryDto {
    @ApiPropertyOptional({
        description: 'Enter a term to find clients by name'
    })
    @IsOptional()
    @IsString()
    term?: string

    @ApiPropertyOptional({
        description: 'Enter the page to find'
    })
    @Type(() => Number)
    @IsOptional()
    @Min(1)
    @IsNumber()
    page?: number

    @ApiPropertyOptional({
        description: 'Enter the limit rows to find'
    })
    @Type(() => Number)
    @IsOptional()
    @Min(1)
    @IsNumber()
    limit?: number
}