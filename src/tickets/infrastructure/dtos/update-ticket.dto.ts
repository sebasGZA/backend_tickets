import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';

import { CreateTicketDto } from './create-ticket.dto';
import { StatusEnum } from 'src/status/domain/enums/status.enum';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @ApiPropertyOptional({
    description: 'Enter the closedAt date',
  })
  @IsOptional()
  @IsDateString()
  closedAt?: Date;

  @ApiPropertyOptional({
    description: 'Enter the resolvedAt date',
  })
  @IsOptional()
  @IsDateString()
  resolvedAt?: Date;

  @ApiPropertyOptional({
    description: 'Enter the new status',
  })
  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;

  @ApiPropertyOptional({
    description: 'Enter the new status id',
  })
  @IsOptional()
  @IsUUID()
  statusId?: string;

  @ApiPropertyOptional({
    description: 'Enter the new priorityu id',
  })
  @IsOptional()
  @IsUUID()
  priorityId?: string;
}
