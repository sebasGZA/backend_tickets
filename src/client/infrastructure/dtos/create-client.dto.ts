import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    description: 'Type the client name',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'Type the client email',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email!: string;
}
