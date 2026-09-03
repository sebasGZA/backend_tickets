import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsBooleanString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: "Type the comment's content",
  })
  @IsNotEmpty()
  @IsString()
  content!: string;

  @ApiProperty({
    description: "Type the comment's ticket id",
  })
  @IsNotEmpty()
  @IsUUID()
  ticketId!: string;

  @ApiProperty({
    description: 'Select if the comment is public',
  })
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  isPublic!: boolean;
}
