import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class loginDto {
  @ApiProperty({
    description: "Type the user's email",
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: "Type the user's password",
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
