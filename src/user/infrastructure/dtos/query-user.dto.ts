import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationDto } from '../../../shared/infrastructure/dtos/pagination.dto';
import { RoleEnum } from '../../../role/domain/enums/role.enum';

export class QueryUserDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Enter a term to find user by name or email',
  })
  @IsOptional()
  @IsString()
  term?: string;

  @ApiPropertyOptional({
    description: 'Enter the role',
  })
  @IsOptional()
  @IsEnum(RoleEnum)
  role?: RoleEnum;

  @ApiPropertyOptional({
    description: 'Enter a term to find user by name or email',
  })
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
