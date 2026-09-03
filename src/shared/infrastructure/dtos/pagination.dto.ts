import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Enter the page to find',
  })
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({
    description: 'Enter the limit rows to find',
  })
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  @IsNumber()
  limit?: number;
}
