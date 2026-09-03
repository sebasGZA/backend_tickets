import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PriorityEnum } from '../../../priority/domain/enums/priority.enum';

export class CreateTicketDto {
  @ApiProperty({
    description: 'The title of the ticket',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'The description of the ticket',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    description: "The ticket's priority",
  })
  @IsNotEmpty()
  @IsEnum(PriorityEnum)
  priority!: PriorityEnum;

  @ApiProperty({
    description: 'The ID of the client associated with the ticket',
  })
  @IsUUID()
  @IsNotEmpty()
  clientId!: string;

  @ApiPropertyOptional({
    description: 'The ID of the user who created the ticket',
  })
  @IsOptional()
  @IsUUID()
  createdById?: string;

  @ApiPropertyOptional({
    description: 'The ID of the user to whom the ticket is assigned',
  })
  @IsOptional()
  @IsUUID()
  assignedToId?: string;
}
